# Testing strategy

The test pyramid covers:

- Contract unit tests for issue, redeem, clawback, and invalid transitions
- Server unit tests for validation, idempotency, and intent handling
- UI tests for wallet addresses and state presentation
- Playwright flows for the public demo
- Production build as the final integration check

Run:

```bash
npm run lint
npm test
npm run build
cargo test --manifest-path contracts/stamp-card/Cargo.toml
```

Mainnet hashes are evidence, not a replacement for repeatable tests.
