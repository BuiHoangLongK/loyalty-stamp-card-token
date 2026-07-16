# Docs

Index of the project's documentation. New reader? Start at **[ARCHITECTURE.md](./ARCHITECTURE.md)**.

## Documents

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — End-to-end system architecture for architects
  and reviewers. Covers system context, request lifecycle, i18n, auth, data layer, blockchain
  integration, UI architecture, env split, security, observability, quality gates, extension
  points, and known follow-ups. Audience: senior engineers, design reviewers, future maintainers.
- **[API.md](./API.md)** — Inventory of every HTTP route under `app/api/`: method, path,
  auth middleware, request payload, and response shape.

## Plans and implementation logs

Living documents produced during development. These are append-only, in chronological order.

- **[plans/](./plans/)** — Time-stamped implementation and design plans. Each plan is a
  snapshot of intent at the time it was written; the code is the source of truth.
- **[IMPLEMENT.md](./IMPLEMENT.md)** — Implementation log.
- **[TS_STYLE_GUIDE.md](./TS_STYLE_GUIDE.md)** — TypeScript style conventions used in the
  codebase.

## Reading paths

| If you are… | Start here |
|---|---|
| A new developer onboarding | [ARCHITECTURE.md §0 Executive summary](./ARCHITECTURE.md#0-executive-summary) → [§2 High-level architecture](./ARCHITECTURE.md#2-high-level-architecture) → [TS_STYLE_GUIDE.md](./TS_STYLE_GUIDE.md) |
| An architect / reviewer | [ARCHITECTURE.md](./ARCHITECTURE.md) (full read) |
| Adding a new feature | [ARCHITECTURE.md §14 Extension points](./ARCHITECTURE.md#14-extension-points) |
| Triaging a follow-up | [ARCHITECTURE.md §15 Known constraints](./ARCHITECTURE.md#15-known-constraints-and-follow-ups) |
| Debugging auth | [ARCHITECTURE.md §6 Authentication and session model](./ARCHITECTURE.md#6-authentication-and-session-model) |
| Debugging i18n | [ARCHITECTURE.md §5 Internationalization](./ARCHITECTURE.md#5-internationalization) |
| Looking up an endpoint | [API.md](./API.md) |
