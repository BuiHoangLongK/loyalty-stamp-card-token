# Recovery plan

Web releases can roll back to the last verified Vercel deployment. Database
recovery uses the provider's point-in-time restore and must be reconciled against
confirmed Mainnet transactions after restoration.

Soroban contract state cannot be rolled back by redeploying the web app. For a
contract fault, pause exposed actions, preserve the current contract ID, deploy a
reviewed replacement if required, and document the migration and new address.
