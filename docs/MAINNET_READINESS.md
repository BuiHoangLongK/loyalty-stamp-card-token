# Mainnet readiness

Concept: merchant-issued loyalty stamp asset with trustline, reward, and clawback flows.

Current evidence: the safe slice now creates pending intents and verifies externally signed XDR against exact Horizon payment/clawback proof. No production asset issuer, deployment transaction, or mainnet evidence has been supplied.

Required gates: confirm issuer public key and asset code, generate/apply the migration for `unsigned_xdr` and `unsigned_tx_digest`, test the real unsigned-XDR preparation endpoint, test external signer verification, record real testnet/mainnet transaction links, and keep demo settlement isolated from public network.

`POST /api/stamps/intents/:id/prepare` builds a payment or clawback envelope from Horizon issuer sequence/fee data and stores only the unsigned envelope plus digest. It never signs or submits. Confirmation requires the signed XDR hash to match that prepared digest before Horizon proof is accepted.

Status: **chain-proof slice implemented; not mainnet-ready until issuer/deployment evidence and runtime tests exist**.
