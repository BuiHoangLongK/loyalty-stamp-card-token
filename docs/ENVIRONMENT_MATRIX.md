# Environment matrix

| Environment | Network | Data | Signing |
|---|---|---|---|
| Local demo | None or Testnet | Seeded/in-memory | Optional disposable wallet |
| Automated test | Mock/Testnet fixtures | Ephemeral | Never a real key |
| Preview | Testnet or demo-only | Non-production | External wallet |
| Production | Mainnet | Production database | External Freighter wallet |

Network, contract ID, RPC URL, and explorer base URL must change together. A
Mainnet contract must never be paired with a Testnet passphrase.
