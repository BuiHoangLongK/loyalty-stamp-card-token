# Operations runbook

Daily checks:

- Public application returns a successful response.
- Health endpoint is reachable.
- Mainnet RPC and Horizon are responding.
- Recent transaction links resolve to the expected network and contract.
- No signing secret is present in application configuration.

For a failed wallet action, capture the wallet address, contract function,
simulation result, transaction hash if available, and UTC timestamp. Determine
whether the failure occurred during build, simulation, signature, submission, or
ledger confirmation before retrying.
