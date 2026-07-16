# Universal Merchant Payment Hub — Team Handoff

> **For:** BE review (other backend dev) + FE integration
> **Branch:** `bao`
> **Status:** Backend framework complete, ready for FE integration
> **Date:** 2026-06-12

This is the single source of truth for the Universal Merchant Payment Hub
backend on the `bao` branch. It covers what's done, what's pending, the
full API contract for FE integration, and the conventions FE should
follow.

For deeper detail, see the linked docs:
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — overall platform architecture (pre-existing)
- [`PAYMENT_HUB_PLAN.md`](./PAYMENT_HUB_PLAN.md) — implementation plan, decisions, and env vars
- [`SEP24_SEP38.md`](./SEP24_SEP38.md) — anchor protocol deep dive
- [`WALLET_ACTIONS.md`](./WALLET_ACTIONS.md) — Receive / Send / Convert detail
- [`SMOKE_TEST.md`](./SMOKE_TEST.md) — how to run the smoke scripts

---

## 1. Status — what was done this branch

### 1.1 Backend framework — DONE

| Area | Status | Files |
|---|---|---|
| Auth (Freighter nonce + signed challenge) | ✅ | `src/server/{controller,service,middleware}/auth.*` |
| Merchants (auto-upsert on first call) | ✅ | `src/server/service/merchant.service.ts` + `GET/PATCH /api/merchants` |
| Invoices (create, list, get, cancel, public lookup) | ✅ | `invoice.service.ts` + 4 routes |
| Payment detection (real Horizon stream + polling fallback) | ✅ | `paymentDetection.service.ts`, `src/server/stellar/stream.ts` |
| Settlement tracking (re-fetch tx from Horizon) | ✅ | `settlement.service.ts` |
| Off-ramp (SEP-38 quote + SEP-24 withdrawal) | ✅ | `offramp.service.ts`, `src/server/anchor/*.ts` |
| Mock anchor server (in-app, no external dep) | ✅ | `app/api/mock-anchor/*` |
| Anchor webhook callback (SEP-10 signature verify) | ✅ | `app/api/offramp/withdrawals/[id]/callback` |
| SSE real-time for invoice + withdrawal | ✅ | 2 stream routes |
| Idempotency-Key middleware | ✅ | `withIdempotency()` |
| Send USDC (XDR build + sign + submit + SEP-2 federation) | ✅ | `send.service.ts` |
| Convert via Stellar DEX (`path_payment_strict_send`) | ✅ | `convert.service.ts`, `src/server/stellar/swap.ts` |
| Receive v2 (SEP-7 `web+stellar:pay` URI) | ✅ | `receive.service.ts` |
| Dashboard stats endpoint | ✅ | `stats.service.ts` + `GET /api/merchants/me/stats` |
| Customer pay flow (SEP-10 challenge → JWT → build/submit) | ✅ | `checkout.service.ts` |
| Smoke tests (TS walkthrough + bash quick check) | ✅ | `scripts/smoke.{ts,sh}` |
| Drizzle migration (12 tables) | ✅ | `drizzle/0001_giant_goliath.sql` |

**Tests:** 55/55 pass in 14 files
**Lint:** 0 errors (17 stylistic warnings, 5 infos)
**Build:** ✓ Next.js 16.2.7 + Turbopack compiles successfully

### 1.2 What's pending (after this branch merges)

| Item | Effort | Priority | Notes |
|---|---|---|---|
| Multi-chain customer pay (Base, Ethereum) | 2h | P2 | Defer — user chose Stellar only for MVP |
| Onboarding trustline check (sponsored `changeTrust`) | 1h | P1 | Hot wallet needed; defer with a simple "needs trustline" flag in stats |
| KYC SEP-12 (mock anchor) | 30 min | P2 | Mock can return `incomplete` to trigger KYC form in UI |
| Onboarding flow screens (PDF Step 1-2) | 4h | P1 | Currently uses the existing `wallets` table for onboarding; PDF expects a new connect-wallet flow. Coordinate with FE. |
| Convert end-to-end integration test (with Horizon) | 1.5h | P2 | Current unit test only covers the quote step. |
| E2E test (full mock-anchor cash-out flow) | 1.5h | P2 | Would catch race conditions. |
| Postman/Insomnia collection | 1h | P1 | Helps FE dev manual-test faster. |
| OpenAPI/Swagger spec | 1.5h | P2 | Defer — Zod schemas are the source of truth. |
| CI (GitHub Actions: lint + test + build) | 30 min | P1 | Single workflow file. |
| Logging with correlation ID (debug multi-SSE) | 1h | P2 | Defer. |

### 1.3 Known issues (not blocking, documented)

| # | Issue | Severity | Where |
|---|---|---|---|
| I1 | `merchants.walletAddress` is globally unique (ignores `network`). Same pubkey on testnet+mainnet → only the first wins. | P1 (multi-network demo) | `src/server/db/schema/merchants.ts:6` |
| I2 | `watchInvoice` refcount may leak under fast create+cancel. Untested path. | P2 | `paymentDetection.service.ts:35` |
| I3 | `withdrawals` PATCH `/` is non-standard REST (start flow). Should be `POST /:id/start`. | P1 (REST) | `offramp.controller.ts:97` |
| I4 | ~~`withCustomerAuth` accepts any non-empty Bearer token (no JWT verify).~~ **FIXED in B4.** | — | `withMerchant.ts:17` |
| I5 | `offramp.service.ts` resolves the same quote twice in `startWithdrawal`. | P3 (perf) | `offramp.service.ts:80-85` |
| I6 | `paymentDetection.handleMatch` uses dynamic imports inside the hot path. | P3 (perf) | `paymentDetection.service.ts:80-100` |

### 1.3a Bug fixes after anh Nam's endpoint test report

| # | Fix | File(s) |
|---|---|---|
| B1 | **StrKey validation** for any `publicKey` in request body. Was only `min(56).max(56)` so `"abc"` returned **500 INTERNAL** instead of **400 INVALID_PUBLIC_KEY**. Now: `.refine(v => StrKey.isValidEd25519PublicKey(v))` + `fromError` maps the Zod refine message `"INVALID_PUBLIC_KEY"` to the proper error code. | `auth.controller.ts`, `wallet.controller.ts`, `checkout.controller.ts`, `http.ts` |
| B2 | **`db:push` non-TTY fix.** drizzle-kit doesn't load `.env.local` itself. Added `dotenv-cli` and changed the script to `dotenv -e .env.local -- drizzle-kit push`. Works in any shell now. | `package.json` |
| B3 | Removed `usdcAsset` unused import flagged by biome in the mock-anchor quote route. | `mock-anchor/sep38/quote/route.ts` |
| B4 | **Customer JWT verification (closes I4 + a real bug).** The previous `withCustomerAuth` accepted any non-empty Bearer token, and `checkout.service` used an in-memory token map whose lookup helper (`tokensMatchByValue`) was actually broken — it compared `HMAC(token)` to `HMAC(token)`, which is always true, and the `.find()` always returned the **first non-expired** token in the map, so any customer token could impersonate any other. Replaced the whole thing with `jose` HS256 JWTs: `CUSTOMER_JWT_SECRET` env var (falls back to `SIGNED_ID_SECRET`, then `SESSION_SECRET`), `iss: stellar-hub:checkout`, `aud: stellar-hub:customer`, `sub: <pubkey>`, 5 min TTL. `withCustomerAuth` now calls `jwtVerify` and sets `ctx.customerAccount`. `buildPayment`/`submitPayment` take the verified account directly — no more map. Stateless, multi-instance safe, covered by 8 new unit tests. | `checkout.service.ts`, `withMerchant.ts`, `compose.ts`, `checkout.controller.ts`, `env.ts`, `package.json`, `.env.example` |

```bash
# Install
cp .env.example .env.local
# Edit .env.local: set SESSION_SECRET (≥32 chars), DRIZZLE_DATABASE_URL
npm install
npm run db:migrate

# Build + test
npm test                              # 39/39
npm run lint                          # 0 errors
DRIZZLE_DATABASE_URL=... SESSION_SECRET=... npm run build  # ✓ compiles

# Dev server
npm run dev                            # localhost:3000

# Smoke (with dev server running)
npm run smoke                          # full e2e walkthrough
./scripts/smoke.sh                     # quick public-surface check
```

---

## 2. API contract for FE integration

All API responses use this envelope:

```ts
// Success
{ "data": T, "meta"?: { ... } }
// Error
{ "error": { "code": "NOT_FOUND", "message": "Invoice not found" }, "meta"?: { ... } }
```

Standard status codes: `200 OK`, `201 Created`, `202 Accepted`,
`400 INVALID_INPUT`, `401 UNAUTHORIZED`, `403 FORBIDDEN`,
`404 NOT_FOUND`, `409 CONFLICT`, `410 GONE`, `422 UNPROCESSABLE`,
`429 RATE_LIMITED`, `500/502 INTERNAL`.

Standard error codes (enumerable):
`INVALID_INPUT`, `INVALID_PUBLIC_KEY`, `UNAUTHORIZED`, `FORBIDDEN`,
`NOT_FOUND`, `ALREADY_EXISTS`, `RATE_LIMITED`, `CONFLICT`, `INTERNAL`.

### 2.1 Auth

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| `POST` | `/api/auth/challenge` | none | `{ publicKey: string }` | `{ nonce, txXdr, expiresAt }` |
| `POST` | `/api/auth/verify` | none | `{ publicKey, signedNonce: string }` | `{ ok: true }` + `Set-Cookie: stellar_session=…` |
| `POST` | `/api/auth/logout` | session | — | `{ ok: true }` + clear cookie |
| `GET`  | `/api/auth/me` | session | — | `{ publicKey: string \| null }` |

**Flow (FE dev):**
1. `POST /api/auth/challenge` with the user's public key → get `txXdr` (base64).
2. Sign the challenge with Freighter: `await window.freighter.signTransaction(txXdr, network)`.
3. `POST /api/auth/verify` with `{ publicKey, signedNonce: signedXdr }`. The server sets a cookie; FE doesn't need to handle it (browser will send it automatically).
4. Call `GET /api/auth/me` on app load to check if a session exists.

### 2.2 Merchants

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| `GET`  | `/api/merchants` | session | — | `{ id, name, walletAddress, network, createdAt }` |
| `PATCH`| `/api/merchants` | session | `{ name?: string }` | (updated merchant) |
| `GET`  | `/api/merchants/me/stats` | session | — | See below |

`GET /api/merchants/me/stats` returns:
```json
{
  "data": {
    "merchant": { "id", "name", "network", "createdAt" },
    "wallet": {
      "usdcBalance": "1240.00",
      "usdcTrustline": true,
      "xlmBalance": "12.50",
      "accountExists": true
    },
    "invoices": { "pending": 3, "paid": 5, "settled": 12, "failed": 0, "expired": 0, "total": 20 },
    "transactions": 12,
    "recentSettlements": [
      { "id", "invoiceId", "amountMinor", "stellarTxHash", "completedAt", "createdAt" }
    ]
  }
}
```

### 2.3 Invoices

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| `POST` | `/api/invoices` | session | `{ amountMinor: string, currency?, description?, ttlSeconds? }` | `201` `{ invoice, signedId, checkoutUrl, qrPayload }` |
| `GET`  | `/api/invoices?limit=20&offset=0` | session | — | `{ items: Invoice[], limit, offset }` |
| `GET`  | `/api/invoices/:id` | session | — | `Invoice & { paymentIntents, settlement }` |
| `DELETE`| `/api/invoices/:id` | session | — | (updated invoice) |
| `GET`  | `/api/invoices/by-signed/:signedId` | public | — | `PublicInvoiceView` (no merchant data) |
| `GET`  | `/api/invoices/by-signed/:signedId/status` | public | — | `{ status, version, settlement: { stellarTxHash, status } \| null }` |
| `GET`  | `/api/invoices/by-signed/:signedId/stream` | public | — | SSE stream (see §3) |

`amountMinor` is the USDC amount in **minor units (6 decimals)** — e.g. `"20000000"` for $20.00.

`Invoice` shape:
```ts
{
  id: string,                  // uuid
  amountMinor: string,         // bigint as string
  currency: string,            // default "USD"
  description: string | null,
  status: "pending" | "paid" | "settling" | "settled" | "failed" | "expired",
  signedId: string,            // HMAC-signed id for QR
  expiresAt: string,           // ISO datetime
  paidAt: string | null,
  settledAt: string | null,
  destinationAddress: string,   // merchant wallet (customer pays here)
  destinationMemo: string | null,
  network: string,             // "testnet" | "public" | "futurenet"
  version: number,             // monotonic, for SSE dedup
  createdAt, updatedAt: string,
  paymentIntents: Array<{ chain, expectedAmountMinor, status, sourceTxHash?, stellarPaymentId? }>,
  settlement: { amountMinor, merchantWallet, stellarTxHash?, status, completedAt? } | null,
}
```

`PublicInvoiceView` (for customer checkout) is the same minus merchant-internal fields.

### 2.4 Off-ramp (Cash Out / Convert)

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| `POST` | `/api/offramp/quotes` | session | `{ sellAsset, buyAsset, sellAmount, buyDeliveryMethod, countryCode?, context?, sellDeliveryMethod? }` | `201` `Quote` |
| `GET`  | `/api/offramp/quotes/:id` | session | — | `Quote` |
| `POST` | `/api/offramp/withdrawals` | session | `{ quoteId, payoutMethod, payoutMeta, ttlSeconds? }` | `201` `Withdrawal` |
| `GET`  | `/api/offramp/withdrawals?limit=20&offset=0` | session | — | `{ items: Withdrawal[], limit, offset }` |
| `GET`  | `/api/offramp/withdrawals/:id` | session | — | `Withdrawal` |
| `PATCH`| `/api/offramp/withdrawals` | session | `{ withdrawalId }` (starts the SEP-24 flow against the anchor) | `{ start: { type, id, url? } }` |
| `POST` | `/api/offramp/withdrawals/:id` | session | `{ signedXdr }` (the USDC→anchor tx, signed by the merchant) | `{ withdrawal }` |
| `GET`  | `/api/offramp/withdrawals/:id/stream` | session | — | SSE stream (see §3) |
| `POST` | `/api/offramp/withdrawals/:id/callback` | signature | (anchor POSTs here) | `{ ok: true }` |

`Quote` shape:
```ts
{
  id, merchantId, anchorDomain, anchorQuoteId?,
  sellAsset, buyAsset, sellAmount, buyAmount,
  totalPrice, price, feeTotal, feeAsset,
  buyDeliveryMethod?, sellDeliveryMethod?, countryCode?, context?,
  rawResponse: unknown, expiresAt, createdAt,
}
```

`Withdrawal` shape:
```ts
{
  id, merchantId, quoteId?, anchorDomain,
  sourceAmountMinor, destinationAsset, destinationAmount,
  payoutMethod: "bank_deposit" | "cash_pickup",
  payoutMeta: PayoutMeta,                // see below
  status: "quoted" | "submitted" | "processing" | "completed" | "refunded" | "expired" | "failed",
  anchorTxId?, withdrawAnchorAccount?, withdrawMemo?, withdrawMemoType?,
  stellarTxHash?, version, expiresAt, completedAt?, createdAt, updatedAt,
}

type PayoutMeta =
  | { v: 1, kind: "bank_deposit", data: { bankName, accountNumber, accountName } }
  | { v: 1, kind: "cash_pickup", data: { pickupLocation, recipientName, recipientId? } };
```

**Cash-out flow (FE dev):**
1. `POST /api/offramp/quotes` with currency + amount → `Quote`.
2. `POST /api/offramp/withdrawals` with quoteId + payout method → `Withdrawal` (status: `quoted`).
3. `PATCH /api/offramp/withdrawals` with withdrawalId → starts SEP-24 at the anchor; status becomes `submitted`. The anchor returns a `url` the merchant must visit (KYC). Mock anchor auto-advances after a few seconds.
4. (For real funds) the merchant signs the USDC→anchor tx with Freighter: `POST /api/offramp/withdrawals/:id` with `{ signedXdr }`. Status: `processing`.
5. Subscribe to `GET /api/offramp/withdrawals/:id/stream` for status updates. When the anchor calls back, status becomes `completed`.

### 2.5 Wallet (Receive / Send / Convert)

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| `POST` | `/api/wallet/receive/request` | session | `{ amount, memo?, origin?, msg? }` | `{ uri, qrPayload, destination, amount, asset, memo }` |
| `POST` | `/api/wallet/send/build` | session | `{ destination, amount, memo?, timeoutSec? }` | `{ xdr, sourceAccount, destinationAccount, memo, amount, asset, expiresAt }` |
| `POST` | `/api/wallet/send/submit` | session | `{ signedXdr }` | `{ txHash, ledger }` |
| `GET`  | `/api/wallet/convert/quote?destinationAssetCode=XLM&destinationAssetIssuer=&amount=20000000&slippageBps=50` | session | — | `{ sourceAmount, destinationAmount, path, suggestedMinDestination, sourceAsset, slippageBps }` |
| `POST` | `/api/wallet/convert/build` | session | `{ quote: <ConvertQuote> }` | `{ xdr, expiresAt }` |
| `POST` | `/api/wallet/convert/submit` | session | `{ signedXdr }` | `{ txHash, ledger }` |

**Send flow (FE dev):**
1. `POST /api/wallet/send/build` with destination (pubkey or `name*domain` for SEP-2 federation) + amount → get unsigned `xdr`.
2. Sign with Freighter: `await window.freighter.signTransaction(xdr, network)`.
3. `POST /api/wallet/send/submit` with `{ signedXdr }` → `{ txHash, ledger }`.

**Convert flow (FE dev):**
1. `GET /api/wallet/convert/quote?…` to get the quote (rate, path, slippage-adjusted minimum).
2. `POST /api/wallet/convert/build` with the quote → get unsigned `xdr` (a `path_payment_strict_send` op).
3. Sign with Freighter, then `POST /api/wallet/convert/submit`.

**Receive flow (FE dev):**
1. `POST /api/wallet/receive/request` with amount + optional memo → `uri` (a `web+stellar:pay?...` SEP-7 link).
2. Display the URI as a QR code (any QR library).

### 2.6 Customer checkout (public, no merchant session)

| Method | Path | Auth | Body | Response |
|---|---|---|---|---|
| `POST` | `/api/checkout/challenge` | none | `{ publicKey: string }` | `{ challenge: string, expiresAt }` |
| `POST` | `/api/checkout/verify` | none | `{ publicKey, signedChallengeXdr }` | `{ token, expiresAt }` (customer session) |
| `POST` | `/api/checkout/build` | **customer JWT** | `{ signedId: string }` | `{ xdr, expiresAt }` |
| `POST` | `/api/checkout/submit` | **customer JWT** | `{ signedId, signedXdr }` | `{ txHash }` |

**Customer pay flow (FE dev for `/checkout/:signedId` page):**
1. `POST /api/checkout/challenge` with the customer's pubkey → `challenge` (XDR).
2. Sign with Freighter → `signedChallengeXdr`.
3. `POST /api/checkout/verify` → `token` (customer JWT, ~5 min).
4. `POST /api/checkout/build` with `signedId` → unsigned `xdr` (USDC transfer to merchant's wallet with invoice id as memo).
5. Customer signs → `POST /api/checkout/submit` with `{ signedId, signedXdr }`. The hub submits and the backend's payment detector picks it up.

### 2.7 Anchors (read-only)

| Method | Path | Auth | Response |
|---|---|---|---|
| `GET` | `/api/anchors` | none | `{ items: AnchorEndpoint[] }` (cached in DB) |
| `GET` | `/api/anchors/:domain` | none | `AnchorEndpoint` (fetches `stellar.toml` if cache is stale) |

### 2.8 Health + Mock anchor

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `/api/health` | none | Liveness — `{ ok: true, ts }` |
| `GET` | `/api/mock-anchor/stellar.toml` | none | Mock anchor SEP-1 metadata. Anchor is at `mock://anchor.local`. |
| `GET` | `/api/mock-anchor/sep24/info` | none | Mock SEP-24 info (USDC withdraw enabled). |
| `GET` | `/api/mock-anchor/sep24/transaction?id=…` | none | Mock SEP-24 status. Auto-advances: incomplete → pending_user_transfer_start (1s) → pending_external (2s) → completed (3s). |
| `POST` | `/api/mock-anchor/sep24/transactions/withdraw/interactive` | none | Mock SEP-24 start. Returns `{ type: 'interactive_customer_info_needed', id, url }`. |
| `GET` | `/api/mock-anchor/sep38/info` | none | Mock SEP-38 info. |
| `POST` | `/api/mock-anchor/sep38/quote` | none | Mock SEP-38 firm quote. Rate table: USDC→PHP @ 56.70, USDC→IDR @ 16,300, USDC→VND @ 25,400. |

### 2.9 Idempotency

Any `POST` mutation accepts an `Idempotency-Key: <uuid>` header. The
response is cached for 24h. If a request with the same key + same body
shape comes in, the cached response is returned verbatim. If the header
is absent, the key is auto-derived from `(publicKey, body-hash)` — the
second double-submit is still deduped.

---

## 3. SSE stream conventions

All SSE streams use:
- `Content-Type: text/event-stream`
- `Cache-Control: no-cache, no-transform`
- `Connection: keep-alive`
- `X-Accel-Buffering: no` (for nginx)
- Initial frame: `event: <type>\ndata: {...}\n\n` (current state)
- Subsequent frames: same shape, `retry: 5000\n\n` on first message
- Heartbeat: `:ping\n\n` every 15s
- `version` field on every event for client-side dedup

**Invoice stream** (`/api/invoices/by-signed/:signedId/stream`):
```
event: invoice.updated
data: {"invoiceId":"...","signedId":"...","version":3,"status":"paid","paidAt":"...","settledAt":null,"occurredAt":"..."}
```

**Withdrawal stream** (`/api/offramp/withdrawals/:id/stream`):
```
event: withdrawal.updated
data: {"withdrawalId":"...","version":2,"status":"processing","completedAt":null,"occurredAt":"..."}
```

FE client pseudocode:
```js
const es = new EventSource('/api/invoices/by-signed/' + signedId + '/stream');
es.addEventListener('invoice.updated', (e) => {
  const data = JSON.parse(e.data);
  // Update UI only if data.version > lastSeenVersion
});
```

---

## 4. Error handling

- All errors are `AppError` with `code` (enumerable) + `message` + `httpStatus` + optional `extras`.
- 4xx codes are client mistakes; 5xx are server/anchor mistakes.
- `withError` middleware translates `AppError` → JSON envelope, all other errors → `500 INTERNAL`.

---

## 5. CORS / auth conventions

- Session cookies: `HttpOnly; SameSite=Lax; Path=/; Max-Age=604800` (7 days).
- In production, `Secure` is also set.
- All `/api/*` are NOT locale-prefixed (e.g. `localhost:3000/api/invoices`, not `/en/api/invoices`).
- Frontend pages DO use the locale prefix (e.g. `/en/dashboard`).

---

## 6. What FE needs to do (concrete list)

1. **Auth UI** — Freighter connect button + nonce signing + session check on load.
2. **Dashboard** — call `GET /api/merchants/me/stats` and render the 3 stat cards + recent activity.
3. **Create Invoice** — form with amount + description, calls `POST /api/invoices`, displays QR with the returned `qrPayload`.
4. **Invoice list** — call `GET /api/invoices?limit=20`.
5. **Invoice detail** — call `GET /api/invoices/:id`, optionally subscribe to SSE for real-time status updates.
6. **Cash-out flow** — the 4-step PDF C1-C4:
   - C1: amount + currency selector → `POST /api/offramp/quotes`
   - C2: (anchor KYC) — mock anchor returns a `url`, FE opens in a new tab
   - C3: confirm → `PATCH /api/offramp/withdrawals` + (for real funds) build/sign/submit USDC→anchor tx
   - C4: subscribe to `/api/offramp/withdrawals/:id/stream` to show the status progression
7. **Wallet page** — 4 buttons:
   - Receive → `POST /api/wallet/receive/request`, display QR
   - Send → 3-step (recipient → amount → review), `build` → Freighter sign → `submit`
   - Cash Out → same flow as #6
   - Convert → `quote` → `build` → sign → `submit`
8. **Customer checkout page** (`/checkout/:signedId`) — public, no auth. Steps: challenge → verify → build → sign (Freighter) → submit. Then subscribe to the SSE stream on success.
9. **Account menu** — copy address, view on explorer, disconnect (`POST /api/auth/logout`).

---

## 7. Environment

```bash
# Required
DRIZZLE_DATABASE_URL=postgres://...
SESSION_SECRET=<32+ chars, random base64>

# Recommended
SIGNED_ID_SECRET=<32+ chars, separate from SESSION_SECRET>
STELLAR_NETWORK=testnet
OFFRAMP_ANCHOR_DOMAIN=mock    # use "mock" for the in-app server

# See .env.example for the full list
```

---

## 8. Git workflow

```bash
# This branch is `bao`. To push:
git add -A
git commit -m "feat(bao): Universal Merchant Payment Hub backend framework

- 12-table schema (merchants, invoices, withdrawals, ...)
- Real Stellar payment detection (Horizon stream + polling fallback)
- SEP-38 quote + SEP-24 withdrawal via in-app mock anchor
- 4 wallet actions: Receive (SEP-7), Send (with SEP-2 federation), Convert (DEX), Cash Out
- SSE real-time updates for invoice + withdrawal
- Idempotency-Key, rate limit, optimistic-concurrency state machine
- Smoke test scripts (TS + bash)
- 39/39 unit tests pass, 0 lint errors

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"

git push origin bao
```

The other BE dev should look at:
- `src/server/stellar/stream.ts` — the Horizon stream implementation
- `src/server/service/stateTransitions.service.ts` — the state machine + optimistic concurrency pattern
- `src/server/anchor/callback.ts` — SEP-10 signature verification
- `docs/SEP24_SEP38.md` for protocol context
