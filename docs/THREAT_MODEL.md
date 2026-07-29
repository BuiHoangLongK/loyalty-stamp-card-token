# Threat model

Protected assets include merchant authority, customer stamp balances, redemption
integrity, session cookies, and transaction evidence.

Primary risks:

- Replaying an issue or redemption request
- Redeeming another customer's stamps
- Accepting a transaction for the wrong contract or network
- Forging off-chain confirmation before ledger success
- Leaking a wallet or session secret

Controls include contract authorization, idempotency keys, exact transaction
verification, secure cookies, external-wallet signing, and explicit Mainnet
contract configuration.
