# Contract guide

The `stamp-card` contract stores program configuration, customer balances, and
the lifecycle of issued stamps.

## Expected flow

1. `initialize` configures the administrator and program.
2. `issue_stamp` records an eligible customer purchase.
3. `balance` reads the current redeemable count.
4. `redeem` consumes the required stamps.
5. `clawback` removes an invalid issued stamp when policy permits.

Authorization is enforced by the contract. Clients must treat contract errors as
final and must not update off-chain state until the transaction succeeds.
