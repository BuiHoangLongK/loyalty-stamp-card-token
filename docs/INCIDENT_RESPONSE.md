# Incident response

## Severity

- **Critical:** unauthorized contract action or exposed signing material.
- **High:** valid users cannot issue or redeem on Mainnet.
- **Medium:** stale dashboard data or intermittent API failure.
- **Low:** cosmetic or documentation issue.

## Procedure

Disable the affected UI action, preserve logs and hashes, identify the last known
good deployment, reproduce safely, and document the fix. Contract incidents
require verifying the affected ledger entries and administrator account before
normal operation resumes.
