# Production deployment

## Web application

1. Install locked dependencies with `npm ci`.
2. configure all values documented in `.env.example`.
3. Run `npm run lint`, `npm test`, and `npm run build`.
4. Deploy the immutable Git commit to Vercel.
5. Check `/api/health`, the landing page, dashboard, and wallet connection.

## Contract

Build the WASM with the pinned Rust toolchain, verify its hash, simulate every
transaction, sign through an external wallet, and record successful hashes in
`contracts/stamp-card/deployment.json`.

Never place a secret key in Vercel or this repository.
