# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack at a glance

Next.js 16.2.7 (App Router, Turbopack default) + React 19 + TypeScript strict. Drizzle ORM
on Postgres (via `pg`). `next-intl` for i18n (en, vi). shadcn/ui + Tailwind v4 for UI.
Stellar wallet auth via Freighter + `@stellar/stellar-sdk`. Biome for lint+format,
ESLint for Next.js core-web-vitals only. Vitest + Testing Library for tests.

For the full architecture, read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md). For the
canonical project overview and quick start, see [`README.md`](README.md). This file
captures only what Claude needs that isn't already in those.

## Next.js 16 is not the Next.js you know

This project pins Next.js 16.2.7. The framework has breaking changes from 15 → 16:
conventions, APIs, and file structure differ from training data. Before writing any code:

- Read the relevant guide in `node_modules/next/dist/docs/` (e.g. `app-router.md`,
  `middleware.md`, `config.md`) if it's available.
- Specifically: `middleware.ts` was renamed to `proxy.ts` in this project to follow the
  Next.js 16 convention; do not add a new `middleware.ts`.
- Prefer Server Components by default. Mark client components with `'use client'`
  *only* at the file top.
- The `next-intl` plugin is wired via `next.config.ts`; locale-aware server components
  need `setRequestLocale(locale)` from `next-intl/server`.

## Commands

All commands use **npm**. The relevant subset of `package.json` scripts:

| Task | Command |
|---|---|
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Run production | `npm run start` |
| Lint (Biome, read-only) | `npm run lint` |
| Lint auto-fix | `npm run lint:fix` |
| Format | `npm run format` |
| Run all tests | `npm test` (`test` is one of npm's built-in shorthand script names) |
| Run one test file | `npm test -- tests/server/wallet.service.test.ts` |
| Watch tests | `npm run test:watch` |
| Drizzle: generate migration | `npm run db:generate` |
| Drizzle: apply migration | `npm run db:migrate` |
| Drizzle: push schema (dev only) | `npm run db:push` |
| Drizzle: open studio | `npm run db:studio` |

ESLint is configured but not in `package.json` scripts; it is invoked by `next build`
and the editor. Biome is the primary linter.

## Layout (where to look first)

| Concern | Path |
|---|---|
| Routes (pages + API) | `app/` |
| Page-level composites | `src/ui/components/pages/` |
| shadcn primitives | `src/ui/components/ui/` |
| Layout chrome | `src/ui/components/layout/` |
| Client hooks (data, wallet, session) | `src/ui/hooks/` |
| i18n config | `src/i18n/` |
| Message catalogs | `messages/{en,vi}.json` |
| Server config (env, Stellar) | `src/server/config/` |
| Controllers (thin) | `src/server/controller/` |
| Services (business logic) | `src/server/service/` |
| Drizzle schema + client | `src/server/db/` |
| Route middleware | `src/server/middleware/` |
| Server helpers (http, cookies, logger) | `src/server/lib/` |
| Edge proxy (next-intl) | `proxy.ts` (root) |
| Tests | `tests/{server,ui}/` |
| Docs | `docs/` |

Path aliases (`tsconfig.json` + `vitest.config.ts`): `@/server/...`, `@/ui/...`,
`@/i18n/...`, `@/...`. Use these instead of relative imports.

## Architectural invariants (do not violate)

These three rules have caused real bugs in this project. They are not style preferences.

1. **`env.ts` is server-only; `env.public.ts` is the only env module the client bundle
   may import.** A previous build crashed at module-evaluation time in the browser
   because `src/i18n/config.ts` imported from `env.ts`, dragging `SESSION_SECRET`
   validation into the client. The fix was to move locale config to `publicEnv` (see
   `src/i18n/config.ts:1`). When adding a new env var, see `docs/ARCHITECTURE.md` §10.4
   for the procedure. **Never import from `@/server/config/env` inside `src/ui/`.**

2. **API routes are not locale-prefixed.** `proxy.ts`'s matcher excludes `/api/*` and
   `/_next/*`. Route handlers speak JSON, not localized paths. i18n only applies to
   pages under `app/[locale]/`.

3. **DB client is a `globalThis`-backed singleton.** The pool is cached on
   `globalThis` in dev to survive HMR (`src/server/db/client.ts:5-10`). Do not
   instantiate a new `Pool` per request; do not import the `pg` driver from anywhere
   else.

## Common task patterns

- **Add a new API resource:** controller in `src/server/controller/`, service in
  `src/server/service/`, route handler in `app/api/<name>/route.ts`, wrap with
  `compose(withError, withAuth, handler)`, add a test in `tests/server/`. See
  `docs/ARCHITECTURE.md` §14.2 for the full recipe.
- **Add a new locale:** drop a `messages/<locale>.json` with the same key set as
  `en.json`, add the locale code to `NEXT_PUBLIC_SUPPORTED_LOCALES` in `.env.local`
  and `.env.example`. The locale list is read from env at boot, not hardcoded.
- **Add a shadcn primitive:** `npm dlx shadcn@4 add <primitive>` — reads
  `components.json` and writes into `src/ui/components/ui/`.
- **Modify a Zod schema:** the form, the controller, and the service should all
  consume the same shape. The Zod schema is the source of truth; types are
  inferred from it with `z.infer<typeof schema>`.
- **Bump a public env var:** update `publicEnvSchema` in
  `src/server/config/env.public.ts`, update `.env.example`, and add the entry to
  `docs/ARCHITECTURE.md` Appendix B.

## Database workflow

There are **no generated migrations yet** (`./drizzle/` is empty). The first time
you need to touch the schema:

```bash
npm run db:generate    # writes SQL to ./drizzle/
npm run db:migrate     # applies them (requires DRIZZLE_DATABASE_URL)
```

For dev iteration only, `npm run db:push` skips migration files. Never use `push` in
production. The Drizzle config (`drizzle.config.ts`) is set up correctly; only the
migration files are missing.

## Known follow-ups worth flagging

These are tracked in `docs/ARCHITECTURE.md` §15. If a review surfaces one of these
items as a regression, fix it instead of working around it.

- `withRateLimit` is in-memory and not applied to `/api/wallets/*`.
- `stellarService.accountExists` is exported but not consumed by any controller.
- No CI configured.

## House style

- Biome rules: 2-space indent, single quotes, semicolons always, trailing commas
  always, 100-char line width. `npm run lint:fix` will normalize.
- Prefer server components; mark `'use client'` only when the component needs
  browser APIs, state, or effects.
- Forms use `react-hook-form` + `zodResolver`; schemas live inline in the form
  component, not in a shared module.
- API responses use the `AppError` / `{ data }` envelope from `src/server/lib/http.ts`;
  `withError` middleware converts thrown errors to the right status.
- Use `StrKey.isValidEd25519PublicKey` (from `@stellar/stellar-sdk`) for any
  user-supplied public key. Do not roll a regex.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
