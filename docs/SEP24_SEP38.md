# SEP-24 / SEP-38 in the Universal Merchant Payment Hub

Quick reference for the off-ramp path. The hub talks to a Stellar anchor (or our in-app mock) over the standard SEP-24 and SEP-38 protocols.

## TL;DR

- **SEP-38** = quote / RFQ. "How much local currency do I get for `N` USDC, delivered via `method`?"
- **SEP-24** = interactive withdrawal. "OK, start the withdrawal flow. The merchant's wallet will send USDC to your `withdraw_anchor_account` with `withdraw_memo`."

Both are standards from the [Stellar protocol repo](https://github.com/stellar/stellar-protocol).

## Flow

```
┌─────────┐  POST /quote        ┌──────────┐
│ Hub     │ ───────────────────▶ │ Anchor   │  (SEP-38 firm quote)
│         │ ◀─────── quote ──── │          │
│         │  start withdraw     │          │
│         │ ───────────────────▶ │          │  (SEP-24 interactive)
│         │ ◀── { id, url } ─── │          │
│  poll   │  GET /transaction   │          │
│ Hub     │ ───────────────────▶ │          │
│         │ ◀── pending_... ─── │          │
│         │  build XDR (server) │          │
│ Hub     │                     │          │
│         │  sign + submit      │          │
│ (cust)  │ ──▶ Horizon ─────▶  │          │  (USDC to anchor's withdraw_anchor_account)
│         │  GET /transaction   │          │
│ Hub     │ ◀── completed ────── │          │
└─────────┘                     └──────────┘
```

## Endpoints the hub calls

| Method | Path | Auth | Purpose |
|---|---|---|---|
| `GET` | `{TRANSFER_SERVER}/info` | none | Asset + fee + feature discovery. |
| `GET` | `{ANCHOR_QUOTE_SERVER}/info` | none | Supported assets and delivery methods. |
| `POST` | `{ANCHOR_QUOTE_SERVER}/quote` | SEP-10 JWT | Firm quote. |
| `POST` | `{TRANSFER_SERVER}/transactions/withdraw/interactive` | SEP-10 JWT | Start withdrawal. |
| `GET` | `{TRANSFER_SERVER}/transaction?id=…` | SEP-10 JWT | Status. |
| `POST` | `{TRANSFER_SERVER}/callback` (the hub exposes this URL) | SEP-10 signature | Anchor pushes status updates. |

The hub publishes its callback URL as part of the merchant's `more_info_url` and as a parameter to the withdrawal start.

## Authentication: SEP-10

The hub gets a SEP-10 JWT from the anchor by signing a challenge transaction with the merchant's key. For the MVP:

- The merchant's signing keypair is derived deterministically from `SIGNED_ID_SECRET` + the merchant id, so we don't need a `merchants.signing_key` column. A real production deployment would persist an actual `Keypair.random()` per merchant, with the secret encrypted at rest.
- The JWT is cached per `(anchorDomain, account)` for 5 minutes; a 401 from any subsequent call forces a refresh.
- See `src/server/anchor/sep10.ts` for the implementation.

## Asset identification format (SEP-38 §3)

- `stellar:CODE:ISSUER` for on-chain assets.
- `iso4217:CODE` for fiat.

The mock anchor only quotes USDC → PHP/IDR/VND at hard-coded rates (`docs/PAYMENT_HUB_PLAN.md` §6 lists the actual route URLs).

## Status enum (SEP-24)

```
incomplete · pending_user_transfer_start · pending_user_transfer_complete ·
pending_external · pending_anchor · pending_stellar · pending_trust ·
pending_user · on_hold · completed · refunded · expired ·
no_market · too_small · too_large · error
```

The hub's withdrawal state machine maps SEP-24 status → its own enum:
- `pending_user_transfer_start` → `withdrawals.submitted` (record `withdraw_anchor_account` + `withdraw_memo`).
- `pending_external` / `pending_anchor` / `pending_stellar` → `processing`.
- `completed` → `completed`.
- `refunded` → `refunded`.
- `error` / `no_market` / `too_small` / `too_large` → `failed`.

The mapping lives in `src/server/service/offramp.service.ts#applyStatus`.

## Callback signature (SEP-10 §5)

Anchor POSTs the update with a `Signature: t=<ts>, s=<base64>` header. The signed payload is:

```
<timestamp>.<host>.<body>
```

The hub verifies against the `SIGNING_KEY` published in the anchor's `stellar.toml`. Implementation: `src/server/anchor/callback.ts`.

## Notes & gotchas

- **Stream reset on signature change.** If the anchor rotates its signing key, the hub's cached `anchor_endpoints.signing_key` becomes invalid. Cache TTL is 1h; for high-frequency verification, the row should be refreshed.
- **Replay window.** The callback timestamp is accepted within ±2 minutes. Older callbacks are rejected.
- **Idempotency.** The hub's withdrawal record carries a `version` column. Anchor callbacks that arrive out of order (or after a restart) won't double-apply: `transitionWithdrawal` rejects if the optimistic version doesn't match.
- **Mock anchor.** When `OFFRAMP_ANCHOR_DOMAIN=mock` the hub uses the in-app `/api/mock-anchor/*` routes, which do not sign callbacks. Real anchors will require `SIGNING_KEY` to be set in the `stellar.toml` fetch and used to verify the `Signature` header.

## Files

- `src/server/anchor/sep24.ts` — Zod-typed SEP-24 client.
- `src/server/anchor/sep38.ts` — Zod-typed SEP-38 client.
- `src/server/anchor/sep10.ts` — SEP-10 challenge + JWT cache.
- `src/server/anchor/callback.ts` — Signature verification.
- `src/server/anchor/http.ts` — `httpJson` with timeout + retry.
- `src/server/service/offramp.service.ts` — Glues SEP-38 quote + SEP-24 withdrawal + status application.
- `app/api/mock-anchor/*` — In-app mock for demo without a real anchor.
