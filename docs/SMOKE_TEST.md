# Smoke Test — End-to-end Backend Walkthrough

Two flavours ship with the repo:

1. **`npm run smoke`** — TypeScript walkthrough that:
   - Generates a fresh test keypair.
   - Walks the auth challenge/verify flow to mint a session cookie.
   - Hits every wallet/invoice/offramp/receive/convert route.
   - Polls a withdrawal to `completed` via the mock anchor.

2. **`./scripts/smoke.sh`** — bash + curl walkthrough that exercises
   the public (no-auth) surface. Useful when you want a quick sanity
   check that the mock anchor is reachable.

## 1. TypeScript smoke (recommended)

### Prerequisites

- Dev server running on `localhost:3000`:
  ```bash
  cp .env.example .env.local       # set SESSION_SECRET (≥32 chars) and DRIZZLE_DATABASE_URL
  npm install
  npm run db:migrate
  npm run dev
  ```
- `tsx` (already a devDependency).

### Run

In another terminal:

```bash
npm run smoke
# or
npx tsx scripts/smoke.ts
# or against a different host:
BASE=http://localhost:4000 npm run smoke
```

### What it does

The script prints one tick per step, with the HTTP status. Example output:

```
=== Universal Merchant Payment Hub — Smoke Test ===
Base URL: http://localhost:3000
Stellar network: testnet

✔ GET /api/health (200)
✔ GET /api/mock-anchor/stellar.toml (200)
✔ GET /api/mock-anchor/sep24/info (200)
✔ GET /api/mock-anchor/sep38/info (200)

Generated test keypair: GBC3K...

✔ POST /api/auth/challenge (200)
✔ POST /api/auth/verify (200) — session cookie set
✔ GET /api/auth/me (200)
✔ GET /api/merchants (200)
✔ GET /api/merchants/me/stats (200) — wallet not funded (expected for random test key)
✔ POST /api/invoices (201) — id=0192a0b4 status=pending
✔ GET /api/invoices (200)
✔ GET /api/invoices/by-signed/:id (200)
✔ GET /api/invoices/by-signed/:id/status (200)
✔ POST /api/wallet/receive/request (200)
✔ POST /api/wallet/send/build (rejects self-send) (400)
✔ GET /api/wallet/convert/quote (200)
✔ POST /api/offramp/quotes (201) — quote id abc12345 buyAmount 28350
✔ POST /api/offramp/withdrawals (201) — id def67890 status quoted
✔ PATCH /api/offramp/withdrawals (start) (200)
✔ Poll /api/offramp/withdrawals/:id (OK) — final status: completed

=== Summary ===
OK: 18  FAIL: 0  TOTAL: 18
All checks passed. ✅
```

### Notes

- The merchant's wallet is **not funded on testnet** (the test keypair is
  random). Horizon-dependent calls (USDC balance, trustline, Convert
  build, settlement confirm) will report 0 balance + `accountExists: false`.
  The cash-out flow works end-to-end because the **mock anchor** is local
  and does not consult Horizon.
- Re-running the script is safe — each run generates a new keypair →
  new `merchants` row. Existing `invoices`/`withdrawals` accumulate.
- The `convert/quote` step may return either 200 (path exists) or 400
  (no path) depending on the testnet order book. Both are considered OK.

## 2. Bash smoke (public surface)

```bash
./scripts/smoke.sh
# or against a different host:
BASE=http://localhost:4000 ./scripts/smoke.sh
```

Exits 0 if every public route returns 2xx, non-zero otherwise. Use it as
a quick pre-deploy gate.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `POST /api/auth/challenge` → 500 | `DRIZZLE_DATABASE_URL` not set | Edit `.env.local` and restart dev server |
| `Mock anchor not found` | Dev server crashed during `db:push` | Re-run `npm run db:migrate` |
| `Convert/quote` → 400 forever | Testnet order book is thin | OK — try again later or switch network |
| `Poll` never reaches `completed` | `OFFRAMP_POLL_INTERVAL_MS` is too high | Set to `5000` in `.env.local` |
| `signedNonce` rejected | Server clock drift between tsx and Next.js | Sync your machine clock |

## Adding new endpoints to the smoke

Edit `scripts/smoke.ts` and add a `call(...)` + `record(...)` block in the
relevant section. The script keeps a `results` array; the summary is
printed at the end. If the response is expected to be slow (e.g. SSE),
wrap the `call` in a `Promise.race` with a timeout.
