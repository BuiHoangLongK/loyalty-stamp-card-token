# StampChain Soroban stamp-card contract

This is a bounded on-chain slice for project 031. It records merchant-issued
loyalty stamps and lets a customer redeem a configured number of unique stamps.
It is a points/stamp registry, not an issued Stellar asset or SAC.

Flow:

```text
initialize -> issue_stamp* -> balance -> redeem
                         \-> clawback (before redeem)
```

The admin authorizes issuance and clawback. The customer authorizes redemption.
Each `stamp_id` is stored once, and a stamp cannot be redeemed or clawed back
twice.

## Local verification

```bash
cargo fmt --manifest-path contracts/stamp-card/Cargo.toml -- --check
cargo test --manifest-path contracts/stamp-card/Cargo.toml
```

## Mainnet deployment

The contract is live on Stellar mainnet. The complete upload, deploy,
initialize, issue, and redeem evidence is recorded in [`deployment.json`](deployment.json).

- Contract: `CABAYBURYKWLN5ZRR3CZHFO5HT5P72HH7RJJAFDSDL3A5KTARFYEUNGU`
- RPC: `https://mainnet.sorobanrpc.com`
- Flow verified: initialize → issue two stamps → redeem both

## Scope boundary

The existing web app still owns wallet UX and external transaction intents.
This contract does not create a trustline, mint an issued asset, or sign a
transaction. Wallet signing remains client-side through Freighter.
