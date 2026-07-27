# Mainnet readiness

Concept: merchant-issued loyalty stamp asset with trustline, reward, and clawback flows.

Current evidence: the Soroban contract is deployed and initialized on Stellar
mainnet, with two issue calls and a successful redeem call recorded in
`contracts/stamp-card/deployment.json`.

Required gates: confirm issuer public key and asset code, generate/apply the migration for `unsigned_xdr` and `unsigned_tx_digest`, test the real unsigned-XDR preparation endpoint, test external signer verification, record real testnet/mainnet transaction links, and keep demo settlement isolated from public network.

`POST /api/stamps/intents/:id/prepare` builds a payment or clawback envelope from Horizon issuer sequence/fee data and stores only the unsigned envelope plus digest. It never signs or submits. Confirmation requires the signed XDR hash to match that prepared digest before Horizon proof is accepted.

Status: **mainnet contract live; functional flow verified**.
