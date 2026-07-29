# Data retention

Suggested production policy:

- Authentication nonces: delete after expiry.
- Sessions: delete after logout or expiration.
- Pending intents: retain until resolved, then archive for reconciliation.
- Operational logs: retain only as long as needed for incident analysis.
- Transaction hashes: retain as durable public evidence.
- Seeded demo records: reset freely; they are not production records.

Retention jobs must never delete blockchain evidence referenced by a completed
redemption.
