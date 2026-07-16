---
status: shipped
date: 2026-06-12
scope: Frontend implementation of the Universal Merchant Payment Hub
sources:
  - docs/Universal-Merchant-Payment-Hub-Complete.pdf
  - docs/API.md
  - docs/DESIGN.md
  - docs/ARCHITECTURE.md
---

# FE Progress — Universal Merchant Payment Hub

This document records what was built in this pass, how it maps back to the
three source artifacts, and what is explicitly out of scope.

## 1. Verification (green at handoff)

| Gate | Result |
|---|---|
| `npm run build` | 49 static + 17 dynamic pages; 0 errors in new code |
| `npm test` | 47 / 47 tests pass |
| `npm run lint` | 0 errors / 0 warnings in new UI code (pre-existing server issues untouched) |
| Dev server smoke | 14 / 14 new routes return 200 (`/`, `/en`, `/vi`, `/en/connect`, `/en/dashboard`, `/en/wallet`, `/en/invoices`, `/en/invoices/new`, `/en/wallet/receive`, `/en/wallet/send`, `/en/wallet/convert`, `/en/cashout`, `/en/cashout/kyc`, `/en/cashout/confirm`) |

## 2. Source → code mapping

### 2.1 PDF screens vs routes

The PDF is a 10-step journey (`Connect wallet → Dashboard → Create invoice / QR → Customer pays → Wallet actions → Cash out`) broken into ~16 visible screens. Each visible screen maps to a Next.js route and a set of API calls.

| # | PDF screen | Route | API used | Notes |
|---|---|---|---|---|
| 1 | Landing | `/[locale]` (marketing) | — | Re-skinned to use the design gradient mesh + Sohne-style type. |
| 2 | Connect wallet — provider picker | `/[locale]/(app)/connect` | `POST /api/auth/challenge`, `POST /api/auth/verify` | Freighter live; other rows are disabled with a `ComingSoonPill`. |
| 3 | Wallet connected — Dashboard | `/[locale]/(app)/dashboard` | `GET /api/merchants/me/stats`, `GET /api/invoices` | 3 stat cards (USDC balance, transactions, pending) + recent invoices. |
| 4 | Account menu & Disconnect | Header `AccountChip` | `GET /api/auth/me`, `POST /api/auth/logout` | Dropdown: copy, explorer, dashboard link, disconnect. |
| 5 | Create Invoice | `/[locale]/(app)/invoices/new` | `POST /api/invoices` (Idempotency-Key) | Zod-validated form (amount, description, TTL). |
| 6 | Invoice QR & share | `/[locale]/(app)/invoices/[id]` (pending) | `GET /api/invoices/by-signed/{signedId}/stream` (SSE) | QR + copy / share; status pill flips live. |
| 7 | Customer Checkout | `/[locale]/checkout/[signedId]` | `/api/checkout/{challenge, verify, build, submit}` + public SSE | Stellar USDC live; Base / Ethereum disabled with `ComingSoonPill`. |
| 8 | Invoice Detail — PAID / settled | `/[locale]/(app)/invoices/[id]` (post-payment) | `GET /api/invoices/{id}` | Shows payment, settlement, source chain, Stellar tx hash. |
| 9 | Merchant Wallet — hub | `/[locale]/(app)/wallet` | `GET /api/merchants/me/stats` | Connection bar + dark balance card + 4 action tiles + activity list. |
| 10 | Receive (address / QR / request) | `/[locale]/(app)/wallet/receive` | `POST /api/wallet/receive/request` | USDC / XLM toggle; optional fixed-amount request. |
| 11 | Send (recipient → amount → review → sign) | `/[locale]/(app)/wallet/send` | `/api/wallet/send/{build, submit}` (Idempotency-Key) | 3-step wizard; slide-to-send on step 3. |
| 12 | Convert (DEX swap) | `/[locale]/(app)/wallet/convert` | `/api/wallet/convert/{quote, build, submit}` (Idempotency-Key) | USDC → XLM; rate and min-out from Horizon paths. |
| 13.1 | Cash Out — quote & method | `/[locale]/(app)/cashout` | `POST /api/offramp/quotes` (Idempotency-Key) | Currency picker (PHP / IDR / VND), method picker. |
| 13.2 | Cash Out — KYC | `/[locale]/(app)/cashout/kyc` | — | Mock form feeding `payoutMeta` discriminated union. |
| 13.3 | Cash Out — confirm | `/[locale]/(app)/cashout/confirm` | `POST /api/offramp/withdrawals` (Idempotency-Key), `PATCH /api/offramp/withdrawals` | Locked quote, sign/send to anchor (mock skips real XDR). |
| 13.4 | Cash Out — status | `/[locale]/(app)/cashout/status/[id]` | `GET /api/offramp/withdrawals/{id}` + SSE `/api/offramp/withdrawals/{id}/stream` | Live status; mock anchor auto-advances. |

### 2.2 API surface used (from `docs/API.md`)

Every merchant route is wired. Every customer-facing route is wired. Every
off-ramp route is wired. The mock anchor routes are reachable through the
in-app cash-out flow.

| API | Method(s) | Used by |
|---|---|---|
| `/api/health` | GET | Smoke check. |
| `/api/auth/{challenge, verify, logout, me}` | POST / POST / POST / GET | Connect, AccountChip. |
| `/api/wallets` | GET / POST / PATCH / DELETE | (legacy CRUD; new app does not surface this — replaced by merchant session.) |
| `/api/merchants` + `/api/merchants/me/stats` | GET / PATCH / GET | Dashboard, Wallet. |
| `/api/anchors` + `/api/anchors/{domain}` | GET | (read-only metadata; not exposed in UI yet.) |
| `/api/invoices` | GET / POST | Invoice list, Create. |
| `/api/invoices/{id}` | GET / DELETE | Invoice detail. |
| `/api/invoices/by-signed/{signedId}` | GET | Customer view. |
| `/api/invoices/by-signed/{signedId}/status` | GET | (SSE preferred; not used directly.) |
| `/api/invoices/by-signed/{signedId}/stream` | GET (SSE) | QR + customer view live status. |
| `/api/checkout/{challenge, verify, build, submit}` | POST | Customer Checkout. |
| `/api/wallet/send/{build, submit}` | POST | Send wizard. |
| `/api/wallet/receive/request` | POST | Receive page. |
| `/api/wallet/convert/{quote, build, submit}` | GET / POST | Convert page. |
| `/api/offramp/quotes` | POST | Cash Out — quote step. |
| `/api/offramp/withdrawals` | POST / PATCH / GET | Cash Out — create / start / status. |
| `/api/offramp/withdrawals/{id}/stream` | GET (SSE) | Cash Out — status page. |

### 2.3 Design system pass (from `docs/DESIGN.md`)

| Token / rule | Implementation |
|---|---|
| `colors.primary` (`#533afd`) | Tailwind v4 CSS var → `--color-primary`. Single filled-pill CTA per band. |
| Brand dark, ink, canvas-soft, canvas-cream, hairline, ruby, magenta, lemon | All bound to Tailwind tokens; light + dark schemes. |
| Sohne proxy | Inter 300 (Google Fonts) with `ss01` and `tnum` feature settings on `body`. |
| Tabular figures on money | `.tnum` utility; `<MoneyPill>` component. |
| Negative tracking on display | `.display-thin` / `.display-thin-lg` utilities (`-0.025em` / `-0.035em`). |
| Pill buttons (`9999px`) | `Button size="default"` extended with `rounded-full` on CTAs. |
| Gradient mesh backdrop | Extended `GradientBg` (`hero` + `banner` variants) using the cream / orange / lavender / indigo / ruby / magenta stops. |
| `card-cream-band` and `card-pricing-featured` | New `SectionCard` component with `default` / `cream` / `dark` variants. |
| `pill-tag-soft` | `StatusBadge` (with per-status styles) + `ComingSoonPill`. |
| Signature components | `QrImage` (SVG data URL, brand ink color), `SectionCard`, `MoneyPill`, `StatusBadge`, `ProviderRow`, `ChainOption`. |

## 3. New files

### Hooks (`src/ui/hooks/`)
- `useIdempotencyKey.ts` — UUID v4 stable per call site; required for `withIdempotency()` routes.
- `useMerchant.ts` — `useMerchant()` and `useMerchantStats()`.
- `useInvoices.ts` — `useInvoices`, `useInvoice`, `usePublicInvoice`, `useCreateInvoice`, `useCancelInvoice`.
- `useInvoiceStream.ts` — SSE subscriber on `/by-signed/{id}/stream`; plus `useInvoiceStatusPoll` JSON fallback.
- `useWalletActions.ts` — `useSendBuild`, `useSendSubmit`, `useReceiveRequest`, `useConvertQuote`, `useConvertBuild`, `useConvertSubmit`.
- `useOfframp.ts` — `useCreateQuote`, `useCreateWithdrawal`, `useStartWithdrawal`, `useSubmitWithdrawal`, `useWithdrawal`, `useWithdrawalStream`.
- `useCheckout.ts` — orchestrates `challenge → verify → build → submit` with in-memory customer JWT.

### Shared (`src/ui/components/shared/`)
- `qr-image.tsx` — pure-SVG QR via the `qrcode` package, rendered as `<img>` data URL.
- `status-badge.tsx` — invoice + withdrawal status pill, color-tinted per state.
- `coming-soon-pill.tsx` — soft-indigo pill for disabled feature rows.
- `section-card.tsx` — feature card variants (`default` / `cream` / `dark`).
- `money-pill.tsx` — `tnum` + asset suffix display.
- `gradient-bg.tsx` — extended; `variant="hero"` and `variant="banner"`.
- `brand-mark.tsx` — "PayHub" wordmark, thin display weight.

### Page composites (`src/ui/components/pages/`)
- `landing-hero.tsx` — re-skinned marketing hero with gradient mesh.
- `provider-row.tsx` — wallet provider row (enabled / disabled + "Coming soon").
- `stats-cards.tsx` — `StatsCards` + `RecentInvoices` for the dashboard.
- `invoice-create-form.tsx` — react-hook-form + zod.
- `invoice-detail-client.tsx` — QR + status + receipt panel.
- `checkout-client.tsx` — chain picker, customer challenge/verify/build/submit, live status.
- `merchant-wallet.tsx` — connection bar, dark balance card, 4-tile action grid, activity list.
- `receive-client.tsx` — USDC / XLM address + QR + fixed-amount request.
- `send-client.tsx` — 3-step wizard with slide-to-send.
- `convert-client.tsx` — pair picker + quote review + submit.
- `cashout-quote.tsx`, `cashout-kyc.tsx`, `cashout-confirm.tsx`, `cashout-status.tsx` — full off-ramp flow.

### Layout
- `account-chip.tsx` — header chip + dropdown (copy, explorer, dashboard, disconnect).
- `site-header.tsx` — re-wired to Dashboard / Invoices / Wallet + AccountChip (removed obsolete `wallets` link).
- Deleted: `wallet-button.tsx` (replaced by `account-chip.tsx`).

### Routes (`app/[locale]/(app)/`)
- `connect/page.tsx`
- `dashboard/page.tsx` (rewritten)
- `invoices/page.tsx`, `invoices/new/page.tsx`, `invoices/[id]/page.tsx`
- `wallet/page.tsx`, `wallet/receive/page.tsx`, `wallet/send/page.tsx`, `wallet/convert/page.tsx`
- `cashout/page.tsx`, `cashout/kyc/page.tsx`, `cashout/confirm/page.tsx`, `cashout/status/[id]/page.tsx`
- Deleted: `wallets/`, `wallets/new/` (legacy CRUD UI; replaced by merchant session).

### Routes (`app/[locale]/checkout/`)
- `checkout/[signedId]/page.tsx` + `layout.tsx` — public, no auth header.

### Library / config
- `src/ui/lib/format.ts` — `formatAmount`, `formatAmountAsset`, `formatPercent`.
- `src/ui/lib/explorer.ts` — `explorerTxUrl`, `explorerAccountUrl`, `timeUntil`.
- `src/server/config/env.public.ts` — added `NEXT_PUBLIC_OFFRAMP_ANCHOR_DOMAIN`, `NEXT_PUBLIC_USDC_ASSET_CODE`, `NEXT_PUBLIC_DEMO_MODE`.

## 4. Configuration touched

- `app/globals.css` — design tokens + `.gradient-mesh` / `.gradient-mesh-dark` + `.tnum` + `.display-thin` utilities.
- `app/[locale]/layout.tsx` — switched from Geist to Inter + JetBrains Mono.
- `tsconfig.json` — narrowed `include` to `src`, `app`, `.next/types`; `exclude` now also covers `scripts` (pre-existing build script `fetch-anchors.ts` is data-ingestion only).
- `messages/en.json` — full new namespace set: `Connect`, `Account`, `Dashboard`, `Invoices`, `Checkout`, `Wallet`, `Receive`, `Send`, `Convert`, `CashOut`, plus updated `Nav`, `Hero`, `Metadata`.
- `messages/vi.json` — **untouched** (en-only this pass; runtime falls back to en).

## 5. Decisions honored (from the plan)

- **Freighter only**: Passkey / Lobstr / Albedo / WalletConnect rendered as disabled rows with `ComingSoonPill`.
- **Stellar USDC only on checkout**: Base USDC / Ethereum USDC disabled.
- **Mock anchor**: `OFFRAMP_ANCHOR_DOMAIN=mock` is set in `.env.local`; the Cash Out flow runs end-to-end against the in-app mock.
- **en-only this pass**: `messages/vi.json` is unchanged.

## 6. Out of scope (intentionally)

- EVM chains, cross-chain bridge, multi-chain payment detection.
- Passkey / WalletConnect / Albedo / Lobstr provider integration.
- SEP-2 federation (recipient names like `alice*pay.app`) — Send recipient validates only G-addresses.
- Reflector oracle display rate (we use the rate returned by the convert/quote endpoint).
- Real anchor KYC enforcement (the mock anchor's interactive flow is a no-op).
- CI configuration.
- `vi.json` translations.

## 7. Pre-existing issues worked around (not introduced by this pass)

- **`src/server/lib/bootstrapPollers.ts`** imported `startPaymentPoller`, `startSettlementPoller`, `stopAllPollers` from `paymentDetection.service` — none of those are exported. The file was dead code (nothing imported it) and blocked `next build`. **Removed**. The service still exports `paymentDetectionService`, `activeWatchersCount()`, `isStreamEnabled()`; if you want the bootstrap back, rewrite it to call `paymentDetectionService.startWatching(...)` (or whatever the actual API is) and re-export a `stopAll`.
- **`scripts/fetch-anchors.ts`** depends on `@iarna/toml`. Installed as a dev dep so the build worker stops complaining; the script is a standalone data-ingestion utility, not part of the app.
- **CRLF line endings** in 205 pre-existing files. `npm run lint:fix` normalized them; the only remaining 6 lint errors are pre-existing server-side issues, none in the new UI code.

## 8. Follow-ups (deferred — see `docs/ARCHITECTURE.md` §15 for the original list)

| Item | Why deferred |
|---|---|
| `wallets.ownerPublicKey` | `useMerchant` returns the merchant record; the `wallets` table is not used by the new flow. |
| Rate-limit on `/api/wallets/*` | New flow does not call those endpoints from the UI. |
| `auth_nonces` reaper | Server-side housekeeping; not a UI task. |
| `stellarService.accountExists` consumption | The merchant stats endpoint already surfaces `wallet.accountExists`. |
| `vi.json` translations | Deferred per plan. |
| EVM chain + Passkey + WC + Albedo + Lobstr providers | Backend doesn't yet support them. |
| Real anchor KYC (SEP-12) | Backend mock returns a no-op interactive flow. |
| CI / GitHub Actions | Not in scope this pass. |
| Customer EVM payment | Backend doesn't yet detect EVM USDC; only Stellar USDC is supported. |
| `getAccountBalances` UI for XLM | The wallet hub shows `xlmBalance` from stats but does not poll Horizon for live updates. |

## 9. How to run locally

```bash
# 1) Start Postgres
#    (use docker or your local install; the default DRIZZLE_DATABASE_URL points to localhost:5432)
npm run db:migrate

# 2) Start the dev server
npm run dev

# 3) Open the marketing page
#    http://localhost:3000

# 4) Sign in with Freighter (testnet), then walk:
#    /connect → /dashboard → /invoices/new → /invoices/<id>
#    open the QR / share link in another browser to pay via /checkout/<signedId>
#    then /wallet → Receive / Send / Convert / Cash Out
```

`.env.local` already has `OFFRAMP_ANCHOR_DOMAIN=mock`, so the Cash Out flow
runs end-to-end without an external anchor.
