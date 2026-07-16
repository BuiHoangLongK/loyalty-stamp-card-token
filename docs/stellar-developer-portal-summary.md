# Stellar Developer Portal Summary

Concise summary of the [Stellar developer documentation](https://developers.stellar.org/).
The portal is the canonical reference for building on Stellar (wallets, anchors,
dapps, smart contracts, infrastructure). Source: developers.stellar.org.

## 1. What is Stellar

Stellar is a **layer-1 open-source, decentralized, peer-to-peer blockchain** that
provides a framework for creating applications, issuing assets, writing smart
contracts, and connecting to existing financial rails. Apps and services
interoperate through public standards called **Stellar Ecosystem Proposals
(SEPs)**.

The portal organizes everything into seven top-level sections:

| Section     | Purpose                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| **Build**   | Tutorials and how-to guides for smart contracts, apps, network interaction, etc.                         |
| **Learn**   | Conceptual content: accounts, transactions, operations, fees, consensus, anchors, SEPs.                  |
| **Tokens**  | How to issue Stellar assets and how to create custom smart-contract ("contract") tokens.                 |
| **Data**    | Data access: Stellar RPC, Horizon, Galexie, Hubble, indexers.                                            |
| **Tools**   | SDKs, Stellar CLI, Lab, Quickstart, OpenZeppelin, Scaffold Stellar, plus SDF platforms.                 |
| **Networks**| Mainnet, Testnet, Futurenet — endpoints, passphrases, friendbot, reset cadence.                          |
| **Validators** | How to run a core validator node.                                                                    |

## 2. Tracks ("Stellar for...")

The portal surfaces five entry tracks depending on what you're building:

- **Asset Issuers** — issue an asset or create a custom smart-contract token.
- **Smart Contract Developers** — write Soroban smart contracts.
- **Ramps (Anchors)** — set up an anchor; the on/off-ramp between traditional
  finance and Stellar.
- **Applications** — wallets, dapps, exchange listings.
- **Infrastructure Providers** — run an Horizon or RPC service.
- **Analytics** — use Hubble for network-data analysis.

## 3. Build

### 3.1 Applications (no smart contracts)
- **Wallet SDK** (TypeScript, Kotlin, Flutter/Dart, Swift) — recommended path
  to build a wallet, with first-class support for anchor integration
  (SEP-10/12/24/31/38).
- **JS SDK** — lower-level alternative; full example-application tutorial.
- **dapp frontend tutorial** — for use with smart contracts.
- **Smart / passkey contract-account wallets** — the new wallet model
  (see "contract accounts" guides).

The Build → Apps section highlights the SEPs a wallet must know:
**SEP-10** (auth), **SEP-12** (KYC), **SEP-24** (deposit/withdraw),
**SEP-31** (cross-border), **SEP-38** (RFQ). See
[`docs/sep-12-24-summary.md`](sep-12-24-summary.md) for the first two.

### 3.2 Smart contracts (Soroban)
Soroban is Stellar's smart-contract platform. Contracts are written in **Rust**
and compiled to **WebAssembly (WASM)**. Suggested path:

1. **Setup** — install Rust, configure editor, install Stellar CLI.
2. **Hello World** — write, build, test the smallest possible contract.
3. **Deploy to Testnet** — submit a contract and call it from the CLI.
4. **Storing Data** — learn storage and TTL (contract rent).
5. **Deploy the Increment Contract** — end-to-end tutorial on Testnet.
6. **Hello World Frontend** — generate TS bindings, build a dapp UI.

For the fastest path, the docs recommend
[Scaffold Stellar](https://scaffoldstellar.org/docs/quick-start), which bundles
a CLI, contract templates, a registry, and a modern frontend.

## 4. Learn (fundamentals)

Key conceptual topics:

- **Stellar Stack** — Core (consensus), Horizon/RPC (data), SDKs, Soroban
  (contracts), and how they fit together.
- **Lumens (XLM)** — native asset, used for fees, minimum reserves, and
  smart-contract rent.
- **Stellar Consensus Protocol (SCP)** — a "proof of agreement" federated
  Byzantine agreement protocol; nodes trust quorums, not total stake.
- **Stellar Data Structures** — ledgers, accounts, trustlines, offers,
  liquidity pools, contract storage.
- **Operations & Transactions** — the unit of work; each transaction contains
  ≥1 operation.
- **Fees, Resource Limits & Metering** — operation fees plus per-resource
  metering (CPU, memory, ledger I/O, bandwidth, ledger entries) for Soroban.
- **Anchors** — entities that bridge traditional finance and Stellar; the
  foundation of deposits/withdrawals.
- **SDEX / Liquidity Pools** — Stellar's built-in DEX using classic order
  books and AMM-style liquidity pools.
- **SEPs** — open standards; the docs link back to the
  [stellar-protocol](https://github.com/stellar/stellar-protocol) repo.

## 5. Tokens

Tokens exist in two forms on Stellar:

1. **Stellar assets** — issued by classic accounts (`G...`) via a built-in
   transaction. Have first-class support for compliance, asset flags
   (`AUTH_REQUIRED`, `AUTH_REVOCABLE`, `AUTH_CLAWBACK`, …), supply caps,
   metadata publishing, and home-domain discovery via `stellar.toml`.
2. **Contract tokens** — issued by a deployed WASM contract (`C...`) that
   implements the [Token Interface](https://developers.stellar.org/docs/tokens/token-interface).

**Recommendation:** issue a Stellar asset whenever possible. To use it from
smart contracts, deploy its **Stellar Asset Contract (SAC)** at the asset's
reserved address. The SAC is built into the protocol (cheaper, more efficient
than a custom WASM token) and itself implements the Token Interface, so
applications that follow the interface treat Stellar assets and contract tokens
uniformly. Use a custom contract token only when you need behaviour Stellar
assets don't support (e.g. built-in transfer fees, factory patterns).

Issuer controls: naming, access flags, supply caps, publishing asset info
(`toml`), and compliance.

## 6. Data (APIs)

Two main APIs for live data; pick by feature.

| Feature                 | RPC | Horizon |
| ----------------------- | :-: | :-----: |
| Real-time data          | ✅  | ✅      |
| Historical data         | ❌  | ⚠️ *    |
| Smart contracts         | ✅  | ❌      |
| Transaction simulation  | ✅  | ❌      |
| Curated / parsed data   | ❌  | ✅      |

*\* Horizon exposes history but Hubble / Galexie are recommended for full
historical access.*

- **RPC** — recommended API for live data. Read account state, contract state,
  simulate/submit transactions. 7-day retention window.
- **Horizon** — REST API for accounts, transactions, operations, payments,
  order books, etc. Maintained for compatibility, but no major new
  development; superseded by RPC.
- **Galexie / Hubble** — historical data pipelines and analytics.
- **Indexers** — third-party data indexers (e.g. for fast, queryable views).

## 7. Tools

### Developer tools
- **SDKs** — official Stellar SDKs (TypeScript, Go, Python, Java, Kotlin,
  Swift, Flutter/Dart, Rust, PHP, etc.) for building transactions, querying
  network state, and signing.
- **Stellar CLI** — the command-line interface to Soroban: build, deploy,
  invoke, generate keypairs, configure identities/networks, and more.
- **Stellar Lab** — a web UI for testing and exploring the network
  (account inspection, transaction building, friendbot, …).
- **Quickstart** — a local Docker-based Stellar network (Core + RPC + Horizon)
  for offline development and testing.
- **OpenZeppelin Relayer** — managed infra for submitting Soroban transactions
  with parallel processing and fee abstraction (formerly "Channels Service").
- **OpenZeppelin Contracts** — audited contract library for Stellar (tokens,
  access control, etc.).
- **Scaffold Stellar** — toolkit (CLI, templates, contract registry, frontend)
  for the fastest dapp setup.
- **More developer tools** — ecosystem-maintained helpers.

### SDF platforms
- **Anchor Platform** — a turnkey set of APIs implementing common SEPs
  (10/12/24/31/38/…) so businesses can become anchors with minimal custom code.
- **Stellar Disbursement Platform (SDP)** — bulk-payment tool for
  organizations distributing funds to many recipients over Stellar.

## 8. Networks

| Network     | Use                       | Friendbot | Resets                | Notes                                          |
| ----------- | ------------------------- | :-------: | --------------------- | ---------------------------------------------- |
| **Mainnet** | Production                | ❌        | Never                 | Real XLM; real anchor rails.                   |
| **Testnet** | Stable testing            | ✅ 10k    | 2–4×/yr (next: 2026-12-16 17:00 UTC) | Mirrors Mainnet; SDF runs 3 validators. |
| **Futurenet** | Bleeding-edge features   | ✅ 10k    | As needed             | New features land here first.                  |

Endpoints (defaults):

- **Horizon** — `https://horizon-testnet.stellar.org`, `https://horizon-futurenet.stellar.org`
- **RPC** — `https://soroban-testnet.stellar.org`, `https://rpc-futurenet.stellar.org`
- **Friendbot** — `https://friendbot.stellar.org`, `https://friendbot-futurenet.stellar.org`
- **Mainnet Horizon / RPC** — third-party providers only.

Network **passphrases** (used for tx signature hashes):

- Mainnet: `Public Global Stellar Network ; September 2015`
- Testnet: `Test SDF Network ; September 2015`
- Futurenet: `Test SDF Future Network ; October 2022`

The **network ID** is the SHA-256 of the passphrase; SDKs hardcode all three
for the public networks. Friendbot only funds `G...` and `C...` addresses; it
is rate-limited, so pre-existing funded accounts should be used to fund more
via `CreateAccount`.

## 9. Stellar Ecosystem Proposals (SEPs)

SEPs are open, public standards for wallet ↔ anchor (and other) interoperability.
The most relevant ones for application developers:

| SEP    | Title                              | Purpose                                                                                       |
| ------ | ---------------------------------- | --------------------------------------------------------------------------------------------- |
| SEP-1  | stellar.toml                       | Anchor metadata (home domain, servers, signing key, currencies, principals).                  |
| SEP-6  | Deposit & Withdrawal API           | Programmatic (server-to-server) deposit/withdraw flow.                                        |
| SEP-9  | KYC Fields                         | Standardised field names for personal info (name, address, ID docs, etc.).                   |
| SEP-10 | Stellar Web Authentication         | Challenge-response auth using a signed Stellar transaction → JWT.                             |
| SEP-12 | KYC API                            | Upload/manage customer KYC info on an anchor.                                                 |
| SEP-24 | Hosted Deposit & Withdrawal        | Interactive (popup/webview) deposit/withdraw flow.                                            |
| SEP-31 | Cross-Border Payments              | Anchor-to-anchor payments; sender's wallet authenticates a receiver's anchor.                 |
| SEP-38 | Anchor RFQ                         | Indicative and firm quotes for cross-asset exchange (used with SEP-24/6).                     |
| SEP-45 | Web Authentication for Contracts   | Auth using contract accounts (CAP-40) and smart wallets.                                      |

A practical anchor integration typically chains SEP-10 → SEP-12 → SEP-24
(or SEP-6) → SEP-38 (when exchanging non-equivalent assets).

## 10. Community & developer resources

- **Stellar Developer Discord** — `https://discord.gg/stellardev`
- **Developer site / news** — `https://stellar.org/developers`
- **Stellar Stack Exchange** — Q&A; search before posting.
- **stellar-dev Google Group** — discussion of CAPs, SEPs, Core, Horizon,
  protocol upgrades.
- **Docs source** — `https://github.com/stellar/stellar-docs` (issues and
  PRs welcome).

## 11. Quick reference for this project (hackathon template)

The template is a Next.js 16 + TypeScript app with Freighter wallet auth,
Stellar SDK integration, and is a natural fit for the **Build → Apps** track.
Useful starting points:

- **Wallet SDK (TS)** — `https://developers.stellar.org/docs/build/apps/wallet/overview`
- **JS SDK** — `https://developers.stellar.org/docs/build/apps/example-application-tutorial/overview`
- **Anchor integration** — `https://developers.stellar.org/docs/build/apps/overview#anchors`
- **Testnet Friendbot** — `https://friendbot.stellar.org` (POST `?addr=<G...>`)
- **Testnet RPC** — `https://soroban-testnet.stellar.org`
- **Testnet Horizon** — `https://horizon-testnet.stellar.org`
- **Testnet passphrase** — `Test SDF Network ; September 2015`
- **Local network** — Quickstart docker image (`stellar/quickstart`).
