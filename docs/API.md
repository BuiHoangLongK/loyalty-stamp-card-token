# API Endpoints

Canonical inventory of every HTTP route under `app/api/`. Each entry shows the
method + path, the middleware applied (auth / rate-limit / idempotency), the
request payload, and the response shape.

> All responses use the envelope defined in `src/server/lib/http.ts:32`:
> `{ ok: true, data: T }` on success, `{ ok: false, error: { code, message, details? } }`
> on failure. Error codes are the `ApiErrorCode` union in the same file
> (`INVALID_INPUT | UNAUTHORIZED | FORBIDDEN | NOT_FOUND | ALREADY_EXISTS |
> INVALID_PUBLIC_KEY | RATE_LIMITED | CONFLICT | INTERNAL`).

## Auth shorthand

| Marker | Meaning |
|---|---|
| public | No middleware beyond `withError` |
| rate-limited | `withRateLimit` (token-bucket, in-memory) |
| session | `withAuth` — requires the `__Host-session` cookie |
| customer JWT | `withCustomerAuth` — requires the customer token from `/api/checkout/verify` |
| idem | `withIdempotency()` — requires an `Idempotency-Key` header on `POST` |

## Endpoints

### Health
| Method | Path | Auth | Payload | Response |
|---|---|---|---|---|
| GET | `/api/health` | public | — | `{ ok: true, ts: number }` |

### Auth (Stellar wallet session)
| Method | Path | Auth | Payload | Response |
|---|---|---|---|---|
| POST | `/api/auth/challenge` | rate-limited | `{ publicKey: string }` | `{ nonce, txXdr, expiresAt: ISO }` |
| POST | `/api/auth/verify` | rate-limited | `{ publicKey, signedNonce }` | `{ ok: true }` (sets `__Host-session` cookie) |
| POST | `/api/auth/logout` | session | — | `{ ok: true }` (clears cookie) |
| GET | `/api/auth/me` | session | — | `{ publicKey: string \| null }` |

### Wallets

> Caveat from `docs/ARCHITECTURE.md` §15: there is no `ownerPublicKey` column,
> so any authenticated user sees all rows. Treat this as a follow-up, not a
> shipped guarantee.

| Method | Path | Auth | Payload | Response |
|---|---|---|---|---|
| GET | `/api/wallets?limit&offset` | session | — | `{ items: Wallet[], limit, offset }` |
| POST | `/api/wallets` | session | `{ publicKey, label, network?: 'testnet' \| 'public' \| 'futurenet' }` | `Wallet` (201) |
| GET | `/api/wallets/{id}` | session | — | `Wallet` |
| PATCH | `/api/wallets/{id}` | session | `{ label? }` | `Wallet` |
| DELETE | `/api/wallets/{id}` | session | — | `{ ok: true }` |

`Wallet = { id, publicKey, label, network, createdAt, updatedAt }` — see
`src/server/db/schema/wallets.ts:18`.

### Merchants
| Method | Path | Auth | Payload | Response |
|---|---|---|---|---|
| GET | `/api/merchants` | session | — | `{ id, name, walletAddress, network, createdAt }` (auto-creates on first call) |
| PATCH | `/api/merchants` | session | `{ name? }` | `Merchant` |
| GET | `/api/merchants/me/stats` | session | — | `MerchantStats` (see below) |

`MerchantStats` (`src/server/service/stats.service.ts:12`):

```ts
{
  merchant: { id, name, network, createdAt };
  wallet: {
    usdcBalance: string;   // minor units, "0" when no trustline
    usdcTrustline: boolean;
    xlmBalance: string;    // native XLM
    accountExists: boolean; // true iff Horizon returns the account
  };
  invoices: {
    pending: number; paid: number; settled: number;
    failed: number; expired: number; total: number;
  };
  transactions: number;    // count of settlement rows
  recentSettlements: Array<{
    id, invoiceId, amountMinor: string,
    stellarTxHash: string | null,
    completedAt: Date | null,
    createdAt: Date,
  }>;
}
```

### Anchors
| Method | Path | Auth | Payload | Response |
|---|---|---|---|---|
| GET | `/api/anchors` | rate-limited | — | `{ items: AnchorEndpoint[] }` |
| GET | `/api/anchors/{domain}` | rate-limited | — | `AnchorEndpoint` |

`AnchorEndpoint = { domain, transferServerSep24, quoteServerSep38, webAuthEndpoint, signingKey, networkPassphrase, supportedAssets, fetchedAt, ttlSeconds }` — see `src/server/db/schema/anchorEndpoints.ts:15`.

### Invoices
| Method | Path | Auth | Payload | Response |
|---|---|---|---|---|
| GET | `/api/invoices?limit&offset` | session | — | `{ items: Invoice[], limit, offset }` |
| POST | `/api/invoices` | session + idem | `{ amountMinor, currency?, description?, ttlSeconds? }` (201) | `{ invoice: Invoice, signedId, checkoutUrl, qrPayload }` |
| GET | `/api/invoices/{id}` | session | — | `Invoice & { paymentIntents, settlement }` |
| DELETE | `/api/invoices/{id}` | session | — | `Invoice` (transitions `pending`→`expired`) |
| GET | `/api/invoices/by-signed/{signedId}` | public | — | `PublicInvoiceView` |
| GET | `/api/invoices/by-signed/{signedId}/status` | public | — | `{ status, version, settlement: { stellarTxHash, status } \| null }` |
| GET | `/api/invoices/by-signed/{signedId}/stream` | public | — | **SSE** — initial `invoice.updated` snapshot, then updates from the in-process event bus |

`Invoice = { id, merchantId, amountMinor, currency, description, status, signedId, expiresAt, paidAt, settledAt, destinationAddress, destinationMemo, network, version, createdAt, updatedAt }` — see `src/server/db/schema/invoices.ts:56`. Statuses: `pending | paid | settling | settled | failed | expired`.

`PublicInvoiceView = { id, amountMinor, currency, description, status, destinationAddress, destinationMemo, network, expiresAt, paidAt, settledAt, createdAt }` — see `src/server/service/invoice.service.ts:36`.

### Checkout (customer-facing)
| Method | Path | Auth | Payload | Response |
|---|---|---|---|---|
| POST | `/api/checkout/challenge` | rate-limited | `{ publicKey }` | `{ challenge: XDR, expiresAt }` (SEP-10-shaped) |
| POST | `/api/checkout/verify` | rate-limited | `{ publicKey, signedChallengeXdr }` | `{ token, expiresAt }` (customer JWT) |
| POST | `/api/checkout/build` | customer JWT | `{ signedId }` | `{ xdr, expiresAt }` (unsigned USDC payment) |
| POST | `/api/checkout/submit` | customer JWT | `{ signedId, signedXdr }` (201) | `{ txHash }` |

### Send / Receive / Convert (merchant wallet, session)
| Method | Path | Auth | Payload | Response |
|---|---|---|---|---|
| POST | `/api/wallet/send/build` | session + idem | `{ destination, amount, memo?: { type: 'text' \| 'id' \| 'hash', value }, timeoutSec? }` | `{ xdr, sourceAccount, destinationAccount, memo, amount, asset: { code, issuer }, expiresAt }` |
| POST | `/api/wallet/send/submit` | session + idem | `{ signedXdr }` (201) | `{ txHash, ledger }` |
| POST | `/api/wallet/receive/request` | session | `{ amount, memo?, origin?, msg? }` | `{ uri, qrPayload, destination, amount, asset: { code, issuer }, memo }` (SEP-7 `web+stellar:pay?...`) |
| GET | `/api/wallet/convert/quote?destinationAssetCode&destinationAssetIssuer&amount&slippageBps` | session | — | `ConvertQuote` (Horizon `paths/strict-send` + `suggestedMinDestination`) |
| POST | `/api/wallet/convert/build` | session + idem | `{ quote: ConvertQuote }` | `{ xdr, expiresAt }` |
| POST | `/api/wallet/convert/submit` | session + idem | `{ signedXdr }` (201) | `{ txHash, ledger }` |

`ConvertQuote = SwapQuote & { sourceAsset: { code, issuer }, slippageBps }` — `SwapQuote` adds `path[]`, `sourceAmount`, `destinationAmount`, `suggestedMinDestination`, and `destinationAsset` (Stellar SDK `Asset`).

### Off-ramp (anchor quotes + SEP-24 withdrawals, session)
| Method | Path | Auth | Payload | Response |
|---|---|---|---|---|
| POST | `/api/offramp/quotes` | session + idem | `{ sellAsset, buyAsset, sellAmount, buyDeliveryMethod: 'bank_deposit' \| 'cash_pickup', countryCode?, context?, sellDeliveryMethod? }` (201) | `Quote` |
| GET | `/api/offramp/quotes/{id}` | session | — | `Quote` |
| GET | `/api/offramp/withdrawals?limit&offset` | session | — | `{ items: Withdrawal[], limit, offset }` |
| POST | `/api/offramp/withdrawals` | session + idem | `{ quoteId, payoutMethod, payoutMeta: PayoutMeta, ttlSeconds? }` (201) | `Withdrawal` |
| PATCH | `/api/offramp/withdrawals` | session | `{ withdrawalId }` | `{ start: { type, id, url? } }` (SEP-24 start response) |
| GET | `/api/offramp/withdrawals/{id}` | session | — | `Withdrawal` |
| POST | `/api/offramp/withdrawals/{id}` | session | `{ signedXdr }` | `Withdrawal` (records `stellarTxHash`) |
| GET | `/api/offramp/withdrawals/{id}/stream` | session | — | **SSE** — initial `withdrawal.updated` snapshot, then updates from the in-process event bus |
| POST | `/api/offramp/withdrawals/{id}/callback` | anchor signature (public) | SEP-10/24 `{ status, ... }` + `Signature` header | `{ ok: true }` |

`Quote = { id, merchantId, anchorDomain, anchorQuoteId, sellAsset, buyAsset, sellAmount, buyAmount, totalPrice, price, feeTotal, feeAsset, buyDeliveryMethod, sellDeliveryMethod, countryCode, context, rawResponse, expiresAt, createdAt }` — see `src/server/db/schema/quotes.ts:34`.

`Withdrawal = { id, merchantId, quoteId, anchorDomain, sourceAmountMinor, destinationAsset, destinationAmount, payoutMethod, payoutMeta: PayoutMeta, status, anchorTxId, withdrawAnchorAccount, withdrawMemo, withdrawMemoType, stellarTxHash, version, expiresAt, completedAt, createdAt, updatedAt }` — see `src/server/db/schema/withdrawals.ts:78`. Statuses: `quoted | submitted | processing | completed | refunded | expired | failed`.

`PayoutMeta` is a discriminated union (see `src/server/db/schema/withdrawals.ts:33`):

```ts
| { v: 1; kind: 'bank_deposit'; data: { bankName; accountNumber; accountName } }
| { v: 1; kind: 'cash_pickup';  data: { pickupLocation; recipientName; recipientId? } }
```

### Mock anchor (test fixture; only mounted when `OFFRAMP_ANCHOR_DOMAIN=mock`)
| Method | Path | Payload | Response |
|---|---|---|---|
| GET | `/api/mock-anchor/stellar.toml` | — | text/plain TOML (SEP-1) — declares SEP-24 + SEP-38 against the same app |
| GET | `/api/mock-anchor/sep38/info` | — | `{ assets: [{ asset, country_codes, sell_delivery_methods, buy_delivery_methods }] }` |
| POST | `/api/mock-anchor/sep38/quote` | `{ sell_asset, buy_asset, sell_amount?, buy_amount?, buy_delivery_method?, sell_delivery_method?, country_code?, context? }` (exactly one of `sell_amount` / `buy_amount`) | `{ id, expires_at, total_price, price, sell_asset, sell_amount, buy_asset, buy_amount, buy_delivery_method, fee: { total, asset, details: [{ name, amount }] } }` |
| GET | `/api/mock-anchor/sep24/info` | — | `{ deposit: { USDC: { enabled: false } }, withdraw: { USDC: { enabled, fee_fixed, fee_percent, min_amount, max_amount } }, fee, features }` |
| POST | `/api/mock-anchor/sep24/transactions/withdraw/interactive` | `form`: `{ account, asset_code, amount?, dest?, quote_id? }` | `{ type: 'interactive_customer_info_needed', id, url }` |
| GET | `/api/mock-anchor/sep24/transaction?id=…` | — | `{ transaction: { id, kind: 'withdrawal', status, withdraw_anchor_account, withdraw_memo, withdraw_memo_type, amount_in, amount_in_asset } }` (auto-advances `pending_user_transfer_start` → `pending_external` → `completed`) |

## Conventions

- **API routes are not locale-prefixed.** `proxy.ts`'s matcher excludes `/api/*`
  and `/_next/*`. Route handlers speak JSON; i18n only applies to pages under
  `app/[locale]/`.
- **`/api/wallets` has no `ownerPublicKey` filter** and no `limit` upper bound
  (besides an in-controller cap of 100). Tracked in `docs/ARCHITECTURE.md` §15.
- **`withRateLimit` is in-memory** and not yet applied to `/api/wallets/*`.
- **`auth_nonces` have no reaper** — expired rows accumulate.
- **`stellarService.accountExists`** is exported but not yet consumed by any
  controller (the merchant stats route reaches the same primitive via
  `getAccountBalances` / Horizon).
