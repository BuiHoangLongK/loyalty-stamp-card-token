# Troubleshooting

## Wallet does not connect

Confirm Freighter is installed, unlocked, and set to Stellar Mainnet. Reload the
page after changing network.

## Simulation fails

Check the source account balance, sequence number, contract ID, argument types,
authorization entries, and transaction time bounds.

## Submission is too late

Rebuild and simulate a fresh envelope; do not reuse expired XDR.

## UI and ledger disagree

Treat the confirmed ledger transaction as authoritative, then refresh or
reconcile the application state using its hash.
