# Observability

Record structured events for request ID, route, wallet address suffix, intent ID,
contract function, transaction hash, network, duration, and outcome. Never log a
secret, full session token, or signed reusable envelope.

Useful service indicators:

- Health endpoint availability
- Wallet-intent preparation success rate
- Mainnet confirmation latency
- Failed issue and redeem counts
- Database connection errors

Alert on sustained failures rather than individual user cancellations.
