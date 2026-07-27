# Project 031 Testnet runbook

No deployment is implied by this file. Use a disposable Testnet account and
sign through Freighter or Stellar Lab. Never place a secret key in the repo.

## Build and inspect

```bash
rustup target add wasm32v1-none
cargo build --manifest-path contracts/stamp-card/Cargo.toml \
  --target wasm32v1-none --release
stellar contract info interface \
  --wasm contracts/stamp-card/target/wasm32v1-none/release/stampchain_stamp_card.wasm
```

## Soroban promotion flow

```bash
stellar contract upload \
  --wasm contracts/stamp-card/target/wasm32v1-none/release/stampchain_stamp_card.wasm \
  --source-account <TESTNET_PUBLIC_KEY> --network testnet --sign-with-lab

stellar contract deploy \
  --wasm-hash <WASM_HASH> \
  --source-account <TESTNET_PUBLIC_KEY> --network testnet --sign-with-lab

stellar contract invoke --id <CONTRACT_ID> \
  --source-account <TESTNET_PUBLIC_KEY> --network testnet --sign-with-lab \
  -- initialize --admin <TESTNET_PUBLIC_KEY> --stamps-required 2
```

Then exercise `issue_stamp`, `balance`, `redeem`, and `clawback` one at a time,
recording the signed transaction hashes. When importing a pre-assembled
Soroban XDR into Lab, use `Auth mode: Enforce`; `Record` is only for an XDR
without an authorization footprint.
