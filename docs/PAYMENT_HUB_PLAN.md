# Universal Merchant Payment Hub — Implementation Plan (nhánh `bao`)

> Status: backend framework + mock anchor shipped; customer JWT auth finalized. Frontend, multi-chain detection (Base/Ethereum), and on-chain bridge are out of scope for this branch.

This document is the build plan for the backend framework of the **Universal Merchant Payment Hub** described in [`Universal Merchant Payment Hub.md`](./Universal%20Merchant%20Payment%20Hub.md). It is meant to be read alongside [`ARCHITECTURE.md`](./ARCHITECTURE.md) — that file describes the *existing* platform, this one describes the payment hub on top.

## 0. Decisions taken (this branch, `bao`)

1. **Real Stellar payment detection.** Horizon stream (SSE) on `/accounts/{id}/payments`, with automatic fallback to polling `/payments?account=…&cursor=…` after 3 stream failures. Cursor persisted in-process.
2. **Real Stellar settlement tracking.** The hub does **not** submit a settlement transaction — the customer's payment goes directly to the merchant's wallet. Settlement is a confirmation/audit record (tx hash, ledger) fetched from `/transactions/{hash}` and recorded against the invoice.
3. **Real Anchor off-ramp.** SEP-38 `POST /quote` and SEP-24 `POST /transactions/withdraw/interactive`. Authentication via SEP-10 JWT, obtained from the anchor's `WEB_AUTH_ENDPOINT`. Anchors cached 1h in `anchor_endpoints` after a `stellar.toml` fetch.
4. **Mock anchor for the demo.** Set `OFFRAMP_ANCHOR_DOMAIN=mock` and the hub uses the in-app `/api/mock-anchor/*` routes instead of an external anchor. The mock returns valid SEP-24 / SEP-38 shapes and auto-advances withdrawal status.
5. **Customer wallet flow.** SEP-10-shaped challenge signed by Freighter, HS256 JWT issued by `/api/checkout/verify` (`sub: pubkey, iss: stellar-hub:checkout, aud: stellar-hub:customer, 5 min TTL`). The JWT is verified by `withCustomerAuth` using `jose.jwtVerify`. Server builds USDC payment XDR, customer signs and submits back to server. Server posts to Horizon. The customer token is stateless — no in-memory map, no cleanup interval.
6. **SSE for real-time updates.** `/api/invoices/by-signed/{id}/stream` and `/api/offramp/withdrawals/{id}/stream` use `text/event-stream` with `Retry-After`, `version` field for dedupe, and 15s heartbeats.
7. **State machine guards.** `transitionInvoice` and `transitionWithdrawal` enforce legal transitions and bump a `version` column (optimistic concurrency).
8. **Idempotency.** POST mutations accept `Idempotency-Key` header; dedupe persisted in `idempotency_keys`.
9. **Rate limiting on public routes** via `withRateLimit` (token bucket) and SSE-specific `withRateLimitSse` (per-IP concurrent stream cap).
10. **Single-instance MVP.** The bootstrap starts Horizon stream watchers and an expiry sweeper. Multi-instance would need a Postgres `LISTEN/NOTIFY` or Redis pub/sub for cross-instance event bus.

## 1. New env vars (server-only)

| Var | Default | Purpose |
|---|---|---|
| `SIGNED_ID_SECRET` | falls back to `SESSION_SECRET` | HMAC key for invoice signed ids. |
| `CUSTOMER_JWT_SECRET` | falls back to `SIGNED_ID_SECRET` | HS256 key for the customer JWT (issued by `/api/checkout/verify`, verified by `withCustomerAuth`). |
| `INVOICE_DEFAULT_TTL_SECONDS` | `900` | Invoice expiry default. |
| `INVOICE_AMOUNT_MINOR_MAX` | `10_000_000_000` | Cap on a single invoice (10k USDC). |
| `WITHDRAWAL_DEFAULT_TTL_SECONDS` | `1800` | Withdrawal expiry default. |
| `OFFRAMP_ANCHOR_DOMAIN` | `mock` | Anchor domain. `mock` switches to in-app mock server. |
| `OFFRAMP_POLL_INTERVAL_MS` | `10_000` | Background poller tick. |
| `HORIZON_STREAM_ENABLED` | `true` | Use Horizon SSE; otherwise polling only. |
| `SSE_HEARTBEAT_MS` | `15_000` | SSE ping interval. |
| `SSE_MAX_CONCURRENT_PER_IP` | `5` | Cap on concurrent SSE streams per IP. |
| `IDEMPOTENCY_TTL_SECONDS` | `86_400` | Idempotency cache TTL. |
| `DEMO_MODE` | `false` | Mount simulate-* routes in production. |
| `USDC_ASSET_CODE` | `USDC` | USDC asset code. |
| `USDC_ASSET_ISSUER_TESTNET` | `GBBD47…FLA5` | Testnet USDC issuer. |
| `USDC_ASSET_ISSUER_PUBLIC` | `GA5ZSE…KZVN` | Mainnet USDC issuer. |

## 2. New schema (12 tables, 1 migration)

See `drizzle/0001_giant_goliath.sql` for the generated SQL. Tables:

- `merchants` — `id, name, wallet_address unique, network, created_at, updated_at`.
- `invoices` — `id, merchant_id FK, amount_minor text, currency, description, status (pg enum: pending|paid|settling|settled|failed|expired), signed_id unique, expires_at, paid_at, settled_at, destination_address, destination_memo, network, version int, created_at, updated_at`.
- `payment_intents` — `id, invoice_id FK, chain (pg enum: stellar), expected_amount_minor, status (pg enum: awaiting|detected|failed), detected_at, source_tx_hash, stellar_payment_id, failure_reason, created_at`. Unique `(chain, source_tx_hash)` prevents double-counting.
- `settlements` — `id, invoice_id FK, amount_minor, merchant_wallet, stellar_tx_hash, stellar_payment_id, ledger, status (pg enum: pending|completed|failed), completed_at, created_at`.
- `withdrawals` — `id, merchant_id FK, quote_id FK?, anchor_domain, source_amount_minor, destination_asset, destination_amount, payout_method (pg enum: bank_deposit|cash_pickup), payout_meta jsonb (versioned), status (pg enum: quoted|submitted|processing|completed|refunded|expired|failed), anchor_tx_id, withdraw_anchor_account, withdraw_memo, withdraw_memo_type (pg enum: text|id|hash|return), stellar_tx_hash, version int, expires_at, completed_at, created_at, updated_at`.
- `quotes` — `id, merchant_id FK, anchor_domain, anchor_quote_id, sell_asset, buy_asset, sell_amount, buy_amount, total_price, price, fee_total, fee_asset, buy_delivery_method, sell_delivery_method, country_code, context, raw_response jsonb, expires_at, created_at`.
- `anchor_endpoints` — `domain PK, transfer_server_sep24, quote_server_sep38, web_auth_endpoint, signing_key, network_passphrase, supported_assets jsonb, fetched_at, ttl_seconds`.
- `idempotency_keys` — `key, route, request_hash, response_status, response_body jsonb, created_at, expires_at`. PK `(key, route)`.
- `state_transitions` — `id, entity_type, entity_id, from_status, to_status, actor (system|merchant|customer|anchor), reason, meta jsonb, created_at`. Audit log for invoice + withdrawal transitions.

`pgEnum` constraints enforce the legal literal sets at the DB level, not just TypeScript.

## 3. New services (all in `src/server/service/`)

| Service | Responsibility |
|---|---|
| `merchant.service.ts` | `ensureFromPublicKey`, `getById`, `getByWallet`, `rename`. |
| `invoice.service.ts` | `create`, `listForMerchant`, `getForMerchant`, `getBySignedId`, `getStatusBySignedId`, `cancel`, `recordPayment`, `markSettling`, `markSettled`, `expireStale`. |
| `stateTransitions.service.ts` | `transitionInvoice`, `transitionWithdrawal` — atomic state-machine guard + version bump + audit + SSE publish. |
| `paymentDetection.service.ts` | Per-destination `watchInvoice`, `runWatcher`, `handleMatch`, `stopAll`. Reuses the lib's Horizon stream/poller. |
| `settlement.service.ts` | `confirmForInvoice` (re-fetches tx from Horizon, updates `settlements`, transitions invoice `paid→settling→settled`). |
| `withdrawal.service.ts` | `create`, `get`, `getForMerchant`, `listForMerchant`, `markSubmitted`, `markProcessing`, `markCompleted`, `markRefunded`, `markFailed`, `markExpired`, `recordStellarTxHash`, `expireStale`. |
| `offramp.service.ts` | `createQuote`, `getQuote`, `startWithdrawal`, `pollStatus`, `applyStatus`, `watchMerchantForOutbound`. |
| `anchor.service.ts` | `getOrFetch`, `listKnown`, `get`, `resolveEndpoints` — DB-cached `stellar.toml`. |
| `notification.service.ts` | Wraps `eventBus` with typed subscribe/publish. Seeds SSE with current row. |
| `checkout.service.ts` | SEP-10-style challenge + verify + build payment + submit payment for the customer flow. |

## 4. New lib (all in `src/server/lib/`)

- `bigint.ts` — minor-unit arithmetic (string in, bigint math, string out).
- `signedId.ts` — HMAC-SHA256 invoice id wrapper.
- `eventBus.ts` — typed in-process `EventEmitter` with `AbortSignal` cleanup.
- `sseStream.ts` — `createSseResponse(handler)` → `Response` with proper headers, retry hint, heartbeat, abort cleanup.
- `idempotency.ts` — `withIdempotency()` middleware factory backed by `idempotency_keys` table.
- `stellarToml.ts` — fetch + parse `/.well-known/stellar.toml` with 1h cache.
- `bootstrap.ts` — `ensureBootstrap()` starts expiry sweeper + withdrawal poller, idempotent across HMR.

## 5. New sub-modules

- `src/server/stellar/`: `network.ts`, `stream.ts`, `tx.ts`, `xdr.ts`.
- `src/server/anchor/`: `http.ts`, `sep10.ts`, `sep24.ts`, `sep38.ts`, `callback.ts`.

## 6. New routes (all in `app/api/`)

| Method | Path | Auth | Notes |
|---|---|---|---|
| `GET` `/api/merchants` | required | current merchant |
| `PATCH` `/api/merchants` | required | rename |
| `POST` `/api/invoices` | required | create; idempotent |
| `GET` `/api/invoices` | required | list |
| `GET` `/api/invoices/:id` | required | detail (with payment intents + settlement) |
| `DELETE` `/api/invoices/:id` | required | cancel pending |
| `GET` `/api/invoices/by-signed/:signedId` | public | customer lookup |
| `GET` `/api/invoices/by-signed/:signedId/status` | public | polling status |
| `GET` `/api/invoices/by-signed/:signedId/stream` | public | SSE |
| `POST` `/api/offramp/quotes` | required | firm quote (SEP-38); idempotent |
| `GET` `/api/offramp/quotes/:id` | required | fetch stored quote |
| `POST` `/api/offramp/withdrawals` | required | create; idempotent |
| `GET` `/api/offramp/withdrawals` | required | list |
| `GET` `/api/offramp/withdrawals/:id` | required | detail |
| `PATCH` `/api/offramp/withdrawals` | required | start flow (kick SEP-24) |
| `POST` `/api/offramp/withdrawals/:id` | required | submit signed XDR |
| `GET` `/api/offramp/withdrawals/:id/stream` | required | SSE |
| `POST` `/api/offramp/withdrawals/:id/callback` | public (signed) | anchor webhook |
| `GET` `/api/anchors` | public | list cached anchors |
| `GET` `/api/anchors/:domain` | public | anchor info |
| `POST` `/api/checkout/challenge` | public | SEP-10 challenge |
| `POST` `/api/checkout/verify` | public | customer JWT |
| `POST` `/api/checkout/build` | JWT | build payment XDR |
| `POST` `/api/checkout/submit` | JWT | submit signed payment |
| `GET` `/api/mock-anchor/stellar.toml` | public | mock SEP-1 |
| `GET` `/api/mock-anchor/sep24/info` | public | mock |
| `POST` `/api/mock-anchor/sep24/transactions/withdraw/interactive` | public | mock |
| `GET` `/api/mock-anchor/sep24/transaction` | public | mock; auto-advances status |
| `GET` `/api/mock-anchor/sep38/info` | public | mock |
| `POST` `/api/mock-anchor/sep38/quote` | public | mock |

## 7. Middleware (added in `src/server/middleware/`)

- `withRateLimitSse.ts` — per-IP concurrent SSE cap.
- `withDemoMode.ts` — 404 unless `DEMO_MODE=true` (or non-prod).
- `withMerchant.ts` — `withCustomerAuth` for the SEP-10 customer JWT.

## 8. Tests

- `tests/server/lib/bigint.test.ts` — string/bigint helpers.
- `tests/server/lib/signedId.test.ts` — round-trip, tampering, malformed.
- `tests/server/lib/eventBus.test.ts` — subscribe, abort, count.
- `tests/server/lib/sseStream.test.ts` — headers, retry, frames, abort.
- `tests/server/anchor/callback.test.ts` — SEP-10/24 signature verification.
- `tests/server/service/checkout.service.test.ts` — customer JWT issue/verify (8 cases: round-trip, wrong secret, wrong iss, wrong aud, expired, garbage, bad sub, cross-customer).

## 9. How to run end-to-end

1. `npm install`
2. `cp .env.example .env.local`, generate `SESSION_SECRET` (≥32 chars), set `DRIZZLE_DATABASE_URL`.
3. `npm run db:migrate` (migration `drizzle/0001_giant_goliath.sql` is included).
4. `npm run dev` — opens `http://localhost:3000`.
5. Sign in with Freighter via the existing auth flow.
6. `POST /api/invoices` with `{ "amountMinor": "20000000", "currency": "USD", "description": "Coffee" }` → returns `signedId`, `checkoutUrl`, `qrPayload`.
7. Customer pays USDC to the merchant's wallet with `destination_memo = invoice.id`. The Horizon stream detects → SSE emits `invoice.updated` with `status: "paid"`.
8. `POST /api/offramp/quotes` with `{ "sellAsset": "stellar:USDC:GBBD47…", "buyAsset": "iso4217:PHP", "sellAmount": "5000000", "buyDeliveryMethod": "cash_pickup" }` → returns firm quote.
9. `POST /api/offramp/withdrawals` with `{ "quoteId", "payoutMethod": "cash_pickup", "payoutMeta": { "v": 1, "kind": "cash_pickup", "data": { "pickupLocation": "Manila", "recipientName": "Alice" } } }`.
10. `PATCH /api/offramp/withdrawals` with `{ "withdrawalId" }` → kicks the SEP-24 flow against the mock anchor.
11. Poll `GET /api/offramp/withdrawals/:id` (or watch SSE) — auto-advances `quoted → submitted → processing → completed`.

## 10. Out of scope (this branch)

- UI (page-level composites, hooks for SSE).
- Multi-chain customer pay (Base, Ethereum).
- Real on-chain bridge.
- Multi-instance deployment (Pub/Sub).
- Production-grade rate limit (Redis-backed).
- Webhook encryption or rotation.
