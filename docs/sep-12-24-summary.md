# Stellar SEP-12 & SEP-24 Summary

Concise summary of the [SEP-12 KYC API](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0012.md)
and [SEP-24 Hosted Deposit and Withdrawal](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0024.md)
protocols, which are commonly implemented together in anchor / wallet flows.

## 1. SEP-12 — KYC API

### Purpose
Defines a standard way for wallets (clients) to upload KYC and other personal
information to an anchor (server). It is used by SEP-6, SEP-24 and SEP-31, but
can also stand alone.

### Prerequisites
- The anchor advertises its `KYC_SERVER` (or `TRANSFER_SERVER`) in `stellar.toml`.
- All requests must be authenticated using [SEP-10](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md)
  or [SEP-45](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0045.md)
  web auth. The JWT is sent as `Authorization: Bearer <JWT>`.
- Requests are `multipart/form-data` (when binary fields are present),
  `application/x-www-form-urlencoded`, or `application/json`. Responses are
  always `application/json`.
- Customer identity is normally inferred from the JWT `sub` claim
  (`G...:memo` for shared accounts or `M...` muxed accounts). The `account` /
  `memo` request parameters are now considered legacy.

### Endpoints

| Method   | Path                                    | Purpose                                                                                          |
| -------- | --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `GET`    | `/customer`                             | Fetch the KYC status of a customer, or the list of fields the anchor needs in order to start.   |
| `PUT`    | `/customer`                             | Idempotent upload of customer information (and any `<field>_verification` codes).                |
| `PUT`    | `/customer/callback`                    | Register a wallet URL the anchor should `POST` to when the customer's status changes.           |
| `DELETE` | `/customer/{account}`                   | Erase all personal data the anchor holds for a customer (right to be forgotten).                |
| `POST`   | `/customer/files`                       | Upload a binary file ahead of time and receive a `file_id` to reference from `PUT /customer`.   |
| `GET`    | `/customer/files`                       | List files previously uploaded for a `customer_id` (or look up a single `file_id`).             |
| `PUT`    | `/customer/verification` (**deprecated**) | Submit confirmation codes (e.g. SMS). Use `PUT /customer` with `<field>_verification` instead. |

### Customer status (returned by `GET /customer`)

| Status              | Meaning                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| `ACCEPTED`          | KYC complete and valid for the given `type`.                                                             |
| `PROCESSING`        | The anchor is validating; poll again later.                                                              |
| `NEEDS_INFO`        | The `fields` object lists the missing/incorrect SEP-9 fields the wallet must supply.                    |
| `REJECTED`          | Permanent failure. `message` describes the reason.                                                       |

### Provided-field status (in `provided_fields`)

`ACCEPTED` · `PROCESSING` · `REJECTED` · `VERIFICATION_REQUIRED`.

### Shared / pooled accounts
A single Stellar account can host multiple users. The JWT `sub` then takes the
form `G...:<memo>` (or the `sub` is a muxed `M...` account). The anchor uses
this value to identify the user; the wallet's `memo` request parameter must
match the memo in the JWT.

### Signature verification (callback)
The anchor signs the callback body. Wallets verify the `Signature` header
(format `t=<ts>, s=<base64>`) against the anchor's `SIGNING_KEY` in
`stellar.toml`, and reject requests whose `t` is more than ~1–2 minutes old.
The signed payload is `<timestamp>.<host>.<body>`.

---

## 2. SEP-24 — Hosted Deposit and Withdrawal

### Purpose
The interactive counterpart to SEP-6. Defines how wallets and anchors exchange
deposit and withdrawal information end-to-end inside a popup or webview, with
the anchor performing KYC and any side effects (bank transfer, etc.) itself.

### Prerequisites
- The asset issuer sets a `home_domain` whose `stellar.toml` advertises
  `TRANSFER_SERVER_SEP0024`.
- [SEP-10](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md)
  and/or
  [SEP-45](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0045.md)
  web auth is required for any user-data endpoint. `/info` is the only public
  endpoint.
- The interactive webapp is reached by short-lived JWT in the URL query string
  (because the browser cannot send an `Authorization` header).
- CORS, preflight (OPTIONS), and HTTPS are mandatory.
- `callback` / `on_change_callback` URLs are signed exactly like SEP-12's
  customer callback: header `Signature: t=<ts>, s=<base64>` over
  `<timestamp>.<host>.<body>`, verified against `stellar.toml`'s `SIGNING_KEY`.

### Endpoints

| Method | Path                              | Purpose                                                                                              |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `GET`  | `/info`                           | Capabilities, supported assets, fees, feature flags. **Unauthenticated.**                            |
| `POST` | `/transactions/deposit/interactive` | Start an interactive deposit flow. Returns an `id` and a popup `url`.                              |
| `POST` | `/transactions/withdraw/interactive` | Start an interactive withdrawal flow. Returns an `id` and a popup `url`.                          |
| `GET`  | `/transaction`                    | Status of a single transaction by `id`.                                                              |
| `GET`  | `/transactions`                   | History of a user's transactions (filtered by JWT `sub`).                                            |
| `GET`  | `/fee` (**deprecated**)           | Legacy fee lookup. Use SEP-38 `GET /price` instead.                                                  |

### `GET /info` shape (essentials)

```json
{
  "deposit":  { "USD": { "enabled": true, "fee_fixed": 5, "fee_percent": 1, "min_amount": 0.1, "max_amount": 1000 }, "native": { "enabled": true } },
  "withdraw": { "USD": { "enabled": true, "fee_minimum": 5, "fee_percent": 0.5, "min_amount": 0.1, "max_amount": 1000 }, "native": { "enabled": true } },
  "fee":      { "enabled": false },
  "features": { "account_creation": true, "claimable_balances": true }
}
```

Fee formula: `(amount * fee_percent) + fee_fixed = fee_total`.

### Deposit / Withdraw request

Both endpoints accept (besides `account`, `asset_code`, `amount`, etc.):

- Any [SEP-9](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0009.md)
  field as a body parameter (e.g. `email_address`, `first_name`) to pre-fill
  the anchor's KYC form. Binary fields go **last** in multipart bodies.
- `claimable_balance_supported: true` (deposits) — wallet opts in to receive
  funds as a [CAP-23](https://github.com/stellar/stellar-protocol/blob/master/core/cap-0023.md)
  Claimable Balance when it lacks the asset's trustline.
- `quote_id` from a SEP-38 `POST /quote` (firm rate).
- `source_asset` (deposit) or `destination_asset` (withdraw) for
  non-equivalent cross-asset flows.

### Shared interactive response

```json
{
  "type": "interactive_customer_info_needed",
  "url":  "https://anchor.example/kycflow?account=G…",
  "id":   "82fhs729f63dh0v4"
}
```

The wallet opens `url` in a popup/webview. It also appends:

- `callback` — `postMessage` or a URL the anchor calls when the flow ends.
- `on_change_callback` — `postMessage` or a URL the anchor calls every time
  `status` or `kyc_verified` changes.

Other response types:

- `{"type":"authentication_required"}` with HTTP `403`.
- `{"error":"…"}` for any other error (HTTP ≥ 400).

### Common status values (`/transaction`, `/transactions`)

`incomplete` · `pending_user_transfer_start` · `pending_user_transfer_complete` ·
`pending_external` · `pending_anchor` · `on_hold` · `pending_stellar` ·
`pending_trust` · `pending_user` · `completed` · `refunded` · `expired` ·
`no_market` · `too_small` · `too_large` · `error`.

### Wallet-side completion of a withdrawal

Once status is `pending_user_transfer_start`, the wallet reads:

- `withdraw_anchor_account` — destination Stellar account.
- `withdraw_memo` / `withdraw_memo_type` — memo to include.
- `amount_in` — expected amount.

…then submits a `payment` or `path_payment` (not `account_merge` or
`create_account`) to that account. Anchors should tolerate a ±10 % drift
between the requested `amount` and the on-chain amount actually received.

### Special cases

- **Account doesn't exist** — anchor uses `CreateAccount` (recommended 2.01 XLM
  for reserve + trustline), then waits for the trustline, then sends the
  asset. Disable via `features.account_creation: false`.
- **Account lacks trustline** — wallet can fund the trustline, the anchor can
  pre-fund the XLM (and charge the user), or both sides can opt into
  Claimable Balances (`features.claimable_balances: true`).
- **Claimable Balances** — the anchor sends a `CreateClaimableBalance`
  operation; the wallet later submits `ClaimClaimableBalance` once it has a
  trustline. This is the recommended path going forward.

### Asset exchanges (non-equivalent pairs)

Two flows are supported:

- **Market rate** — wallet calls SEP-38 `GET /price` for an indicative quote,
  then starts the SEP-24 flow with `asset_code` only.
- **Firm quote** — wallet calls SEP-38 `POST /quote` to lock a rate, then
  passes the returned `quote_id` in the SEP-24 request. The anchor must honor
  the quote if the user delivers the funds before it expires.

For non-equivalent flows, the anchor populates `amount_in_asset`,
`amount_out_asset`, and `amount_fee_asset` (SEP-38 Asset Identification
Format) on transaction records.

---

## 3. How SEP-12 and SEP-24 work together

1. The wallet discovers the anchor via `stellar.toml`
   (`TRANSFER_SERVER_SEP0024`).
2. The wallet calls `GET /info` to learn what assets and features the anchor
   supports.
3. The wallet authenticates via SEP-10 / SEP-45 and gets a JWT.
4. The wallet calls `POST /transactions/{deposit,withdraw}/interactive`. The
   anchor responds with `interactive_customer_info_needed` plus a popup URL.
5. The wallet optionally pre-fills KYC by attaching SEP-9 fields and/or the
   `customer_id` of an existing [SEP-12](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0012.md)
   customer record.
6. If the anchor still needs KYC data, it calls SEP-12
   (`GET /customer` → `PUT /customer` → `PUT /customer/callback`) internally to
   collect what's required, or expects the wallet to do so first.
7. The user completes the anchor's interactive flow in the popup. The anchor
   posts status updates to the wallet's signed `callback` /
   `on_change_callback`.
8. The wallet polls `GET /transaction` (or waits for the callback) to drive
   the UI and, for withdrawals, to learn the destination account, memo and
   amount to send on Stellar.

## 4. Quick reference for this project

- **Anchor server URL:** `TRANSFER_SERVER_SEP0024` from `stellar.toml`.
- **Auth header:** `Authorization: Bearer <SEP-10/45 JWT>`.
- **Interactive response trigger:** `type === "interactive_customer_info_needed"`.
- **Status to wait for (withdraw):** `pending_user_transfer_start` before
  sending the on-chain payment.
- **Status to wait for (deposit):** `completed` (or detect the
  `claimable_balance_id` and claim it).
- **Files & binary KYC:** use `POST /customer/files` and reference the
  `file_id` from `PUT /customer` (suffixed with `_file_id`) to avoid
  `multipart/form-data` limitations with nested JSON bodies.
- **Verify callback signature:** always check `Signature` header, anchor's
  `SIGNING_KEY` in `stellar.toml`, and reject anything older than ~1–2 minutes.
