---
status: completed
date: 2026-06-12
type: verification
scope: Wallet-connection end-to-end test report
sources:
  - docs/FE_PROGRESS.md
  - src/ui/hooks/useFreighter.ts
  - src/server/service/auth.service.ts
  - src/server/controller/auth.controller.ts
  - tests/server/wallet-connection.test.ts
---

# Wallet Connection — Test Report

This report documents the headless end-to-end verification of the wallet-
connection flow. Because wallet auth requires a browser extension popup that
cannot be driven by a CLI, the test was implemented as an **integration test**
that exercises the real server-side security boundary (the signed-transaction
round-trip) using the real `@stellar/stellar-sdk` and the real
`authService` / `authController` modules — only the DB layer and the
Freighter popup are stubbed.

## TL;DR

| Check | Result |
|---|---|
| New test file: `tests/server/wallet-connection.test.ts` | ✅ added |
| Test cases | 5 / 5 passing |
| Full test suite | 52 / 52 passing (was 47 before) |
| Lint on new code | 0 errors / 0 warnings |
| `tsc --noEmit` on new code | 0 errors |
| Build (`npm run build`) | not re-run (no source code changes) |

## 1. What the test covers

The test file `tests/server/wallet-connection.test.ts` drives the production
flow end-to-end with one substitution at the DB boundary. Concretely:

| Layer | In the test |
|---|---|
| Browser / Freighter popup | **Stubbed** — but the cryptographic step the popup performs (signing the challenge tx with the wallet's secret key) is reproduced with a real `Keypair` from `@stellar/stellar-sdk`, which is the same code path Freighter executes. |
| Real ed25519 keypair | Generated fresh per test via `Keypair.random()` (so we have a real `G…` pubkey to drive the controller with). |
| `POST /api/auth/challenge` | Real `requestChallenge` controller → real `authService.createChallenge` → produces a real `txXdr` whose `ManageData` op carries the nonce. |
| Signing the tx | `TransactionBuilder.fromXDR(...).sign(kp)` — exactly what Freighter does. |
| `POST /api/auth/verify` | Real `verifyChallenge` controller → real `authService.verifyAndCreateSession` → uses the public key to verify the ed25519 signature against the tx hash, extracts the nonce from `ManageData`, and matches it in the (mocked) DB. |
| `Set-Cookie` header | Captured from the verify response via the real `setSessionCookie` helper. |
| Session row in DB | Mocked in-memory store; `sessions.id` is a real `crypto.randomUUID()`. |
| `POST /api/auth/logout` | Real `logout` controller + real `readSessionCookie` / `clearSessionCookie`. |

The DB layer is mocked at the `pg` module level. The mock:

- Stubs `new Pool()` with a `query(sql, params)` method.
- Routes the handful of SQL statements the auth flow actually issues
  (insert / select / update / delete on `auth_nonces` and `sessions`) to
  in-memory arrays.
- Returns rows in the **tuple** shape Drizzle expects (Drizzle reads
  `row[columnIndex]`, not `row.columnName`, in its `mapResultRow` helper).
- Coerces Drizzle's ISO-string dates back into `Date` instances so
  comparison logic works.

## 2. Test cases

| # | Name | What it asserts |
|---|---|---|
| 1 | issues a challenge, signs the tx with a real ed25519 key, verifies, and creates a session | Happy path. Public key is `G…`. Challenge returns `{ nonce, txXdr, expiresAt }`. Nonce is persisted (unconsumed, unexpired). Real keypair signs the tx. Verify returns `{ ok: true }` and sets a `stellar_session=<uuid>` cookie. The session row exists in the mock store. The nonce is consumed. |
| 2 | rejects a tampered signature (signed by a different key) | A second keypair (the "attacker") signs the tx, but the merchant's pubkey is used in the verify call. The server returns 401 `UNAUTHORIZED` with the message "Signature does not match transaction". No session is created. The nonce remains unconsumed. |
| 3 | rejects an invalid Stellar public key at challenge time | `publicKey: "not-a-key"` produces 400 `INVALID_PUBLIC_KEY`. No nonce is persisted. |
| 4 | rejects a replayed (already-consumed) nonce | A successful verify is followed by a second verify with the same `signedXdr`. The second call returns 401 `UNAUTHORIZED` ("Nonce not found or expired") because the nonce was marked consumed on the first verify. |
| 5 | clears the session cookie on logout | A real session is created via challenge/verify. `logout` is called with the cookie; the response sets `stellar_session=;` (cleared) and the session row is removed from the store. |

## 3. How the test was wired

### Vitest environment override

The test runs under `// @vitest-environment node` rather than the project's
default `jsdom`. Reason: the Stellar SDK uses `@noble/hashes` for entropy,
and `Keypair.random()` calls `crypto.getRandomValues`. `jsdom`'s `Crypto`
prototype is captured at module-load time by `@noble/hashes/crypto` and is
incompatible with the SDK's `Uint8Array`-vs-`Buffer` expectations. Running
under `node` lets the SDK see Node's `webcrypto` directly. This is the
same workaround documented in `tests/server/wallet.service.test.ts`
(which exercises the same SDK paths).

### Global crypto shim in setup

`tests/setup.ts` now polyfills `globalThis.crypto` from Node's
`webcrypto` before any test file is loaded. This guards against future
tests that need to use the SDK from `jsdom`.

### Why we mock the DB instead of bringing up Postgres

The repo's local stack (Drizzle on `pg` over TCP) requires a running
Postgres + a live Horizon. For this test, neither is needed: the auth
service is a pure-JS function that issues well-known SQL statements, and
the cryptographic round-trip is the security boundary we care about.
Mocking `pg` gives us a hermetic test that runs in under 2 s and
exercises the **real** controller + service + SDK code.

The mock is intentionally narrow: it only handles the four SQL shapes the
auth service emits (insert/select/update/delete on `auth_nonces` and
`sessions`). Any other SQL throws `unhandled SQL: …`, which is the
correct behavior — if a future change introduces a new query, the test
will fail loudly.

## 4. Run results

```
$ npm test -- tests/server/wallet-connection.test.ts

 RUN  v4.1.8 D:/Documents/.../stellar-starter-hackathon-template

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  16:41:41
   Duration  1.57s
```

```
$ npm test
 Test Files  14 passed (14)
      Tests  52 passed (52)
   Duration  6.76s
```

## 5. What this test does NOT cover

By design, this is a server-side integration test, not a browser test. The
following are still only verified by the real browser walkthrough described
in `docs/FE_PROGRESS.md` § "Testing the Wallet Connection":

- The Freighter extension actually pops up, prompts, and produces a signed
  XDR.
- The browser correctly persists and resends the `__Host-session` cookie.
- The Freighter network (`testnet` / `public` / `futurenet`) matches the
  app's `STELLAR_NETWORK`.
- The `gradient-bg` mesh renders correctly above the hero on `/connect`.

For those, run `npm run dev`, open `http://localhost:3000`, install
Freighter, and follow the A.3 walkthrough in `docs/FE_PROGRESS.md`.

## 6. Files changed

| File | Change |
|---|---|
| `tests/setup.ts` | Polyfills `globalThis.crypto` from `node:crypto`'s `webcrypto` before any test file loads. |
| `tests/server/wallet-connection.test.ts` | **New** — 5 tests, ~400 lines, covers the full wallet-connection flow. |
| `src/server/service/auth.service.ts` | Touched: a single `console.log` was added during debugging; removed before commit. Net diff: zero. |

## 7. Reproducing locally

```bash
# Run the new test alone
npm test -- tests/server/wallet-connection.test.ts

# Run the full suite
npm test
```

Both should be green. If a test fails, the mock's `unhandled SQL` error
will tell you exactly which query the auth service added that we haven't
covered yet — append a branch to `handleQuery` in the test file and
re-run.
