# Wallet Actions — Receive, Send, Convert

Quick reference for the three wallet-side flows that complement the customer
pay / off-ramp flows. All three live behind authenticated `wallet/*` routes
and follow the same pattern: **server builds an unsigned XDR, client signs
with Freighter, server submits to Horizon**.

## Receive

Two flavours:

1. **Plain receive** (default): just show the merchant's pubkey + QR.
2. **Request a specific amount** (`R2`): build a SEP-7
   [`web+stellar:pay`](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0007.md)
   URI the customer can paste into any Stellar wallet.

### Endpoints

| Method | Path | Auth | Body | Returns |
|---|---|---|---|---|
| `POST` | `/api/wallet/receive/request` | required | `{ amount, memo?, origin?, msg? }` | `{ uri, qrPayload, destination, amount, asset, memo }` |

The `uri` is a `web+stellar:pay?destination=G…&amount=5000000&asset_code=USDC&memo=Table%204&memo_type=text` URL. Most Stellar wallets (Freighter, Lobstr, Albedo, xBull) recognise this and pre-fill the payment screen.

### Reference

- Service: `src/server/service/receive.service.ts`
- Controller: `src/server/controller/receive.controller.ts`
- Route: `app/api/wallet/receive/request/route.ts`

---

## Send (USDC out)

Three-step UI (matches PDF §S1-S4):
1. **Recipient**: pubkey or `name*domain` (SEP-2 federation).
2. **Amount**: validate + show fee estimate.
3. **Review & sign**: slide-to-sign → Freighter prompt.

Behind the scenes:

| Method | Path | Auth | Body | Returns |
|---|---|---|---|---|
| `POST` | `/api/wallet/send/build` | required | `{ destination, amount, memo?, timeoutSec? }` | `{ xdr, sourceAccount, destinationAccount, memo, amount, asset, expiresAt }` |
| `POST` | `/api/wallet/send/submit` | required | `{ signedXdr }` | `{ txHash, ledger }` |

### Federation

The `build` endpoint accepts either:
- A `G…` (56 chars) public key, or
- A federation name in either `name*domain` (legacy) or `name@domain`
  (newer) form. Resolved via the domain's
  `https://<domain>/.well-known/federation.json` endpoint. If the federation
  server returns a `memo_type`/`memo`, the build automatically attaches
  the same memo to the XDR so the on-chain payment is attributed correctly.

### Sign verification

`submit` checks that **at least one** of the signatures on the transaction
matches the merchant's public key. The first 2 bytes of the key are
recovered from the signature hint and the whole keypair is then used to
verify against the transaction hash. This is the same pattern the off-ramp
"submit signed withdrawal" route uses.

### Reference

- Service: `src/server/service/send.service.ts`
- Federation lib: `src/server/stellar/federation.ts`
- Controller: `src/server/controller/send.controller.ts`
- Routes: `app/api/wallet/send/build/route.ts`, `app/api/wallet/send/submit/route.ts`

---

## Convert (DEX swap)

Three-step UI (matches PDF §V1-V3):
1. **Pick pair & rate**: USDC → XLM (or any asset the merchant's account has
   a trustline for), with live rate from Horizon.
2. **Review & sign**: `min` receive shown (slippage-protected), slide to
   sign.
3. **Swapped**: balance updates.

Under the hood, the swap uses Stellar's
[`path_payment_strict_send`](https://developers.stellar.org/docs/start/list-of-operations#path-payment-strict-send)
operation. The server reads best path from Horizon's `/paths/strict-send`
endpoint, applies a default 0.5% slippage (configurable), and builds the XDR.

### Endpoints

| Method | Path | Auth | Body / Query | Returns |
|---|---|---|---|---|
| `GET` | `/api/wallet/convert/quote?destinationAssetCode=XLM&destinationAssetIssuer=&amount=20000000&slippageBps=50` | required | — | `{ sourceAmount, destinationAmount, path, suggestedMinDestination, sourceAsset, slippageBps }` |
| `POST` | `/api/wallet/convert/build` | required | `{ quote: <ConvertQuote> }` | `{ xdr, expiresAt }` |
| `POST` | `/api/wallet/convert/submit` | required | `{ signedXdr }` | `{ txHash, ledger }` |

### Slippage

`slippageBps` is basis points (default `50` = 0.5%). The
`suggestedMinDestination` is computed as
`floor(destinationAmount * (10000 - slippageBps) / 10000)` and passed as
`destMin` in the `path_payment_strict_send` operation. If the path produces
less than `destMin`, the transaction fails on-chain (path doesn't exist or
slippage exceeded).

### Reference

- Service: `src/server/service/convert.service.ts`
- Stellar DEX paths: `src/server/stellar/swap.ts`
- Controller: `src/server/controller/convert.controller.ts`
- Routes: `app/api/wallet/convert/quote/route.ts`, `app/api/wallet/convert/build/route.ts`, `app/api/wallet/convert/submit/route.ts`

---

## Tests

```
tests/server/stellar/federation.test.ts   (SEP-2 resolveFederation)
tests/server/service/receive.service.test.ts  (SEP-7 URI builder)
```

Run with `npm test` — currently 37/37 passing.

## Out of scope (this branch)

- **Onboarding trustline check + sponsored changeTrust.** The PDF describes
  the merchant's wallet as having a USDC trustline guaranteed by the hub
  (sponsored reserves). Implementing that requires a server hot wallet to
  sign the `changeTrust` op; deferred.
- **Send with ClaimableBalance fallback** when the recipient lacks a USDC
  trustline. The PDF hints at this; not implemented for the MVP.
- **Cross-asset path payments** in Send. The Send flow is USDC-only; for
  XLM↔USDC swaps, the user must go through the Convert flow.
