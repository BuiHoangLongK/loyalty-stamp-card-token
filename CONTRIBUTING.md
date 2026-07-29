# Contributing

Use a short-lived branch and keep each commit focused on one behavior or
documentation topic.

## Local checks

```bash
npm install
npm run lint
npm test
npm run build
cargo test --manifest-path contracts/stamp-card/Cargo.toml
```

Pull requests should explain the user impact, list the checks run, and include a
screenshot for visible UI changes. Contract changes must document storage,
authorization, and Mainnet migration implications.

Do not commit `.env*`, wallet secrets, database URLs, or temporary signing data.
