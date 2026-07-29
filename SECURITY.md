# Security policy

Report suspected vulnerabilities privately to the project maintainer before
opening a public issue. Include the affected route or contract function,
reproduction steps, expected impact, and whether Mainnet funds are involved.

Never include seed phrases, secret keys, signed reusable envelopes, database
credentials, or session secrets in a report. Use a disposable account for
reproduction.

## Supported surface

- Current `main` branch
- Public Vercel deployment
- `stamp-card` Soroban contract on Stellar Mainnet

## Response priorities

1. Pause the affected UI action.
2. Preserve transaction hashes and server logs.
3. Reproduce on a local environment or Testnet.
4. Patch, test, and document the remediation.
5. Restore the action only after verification.
