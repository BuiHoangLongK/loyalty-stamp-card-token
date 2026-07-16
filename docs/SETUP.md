# Setup Guide — Universal Merchant Payment Hub

> Use this guide on any machine (Mac/Linux/Windows) to clone, configure, and run the MVP locally.

## 0. Prerequisites

- **Node.js 20+** (`.nvmrc` not yet; use `node -v` to check)
- **PostgreSQL 16+** (native or Docker)
- **Git**
- **Freighter browser extension** (Chrome/Firefox)
- **Windows users:** PowerShell, Git Bash, or WSL2

## 1. Clone

```bash
git clone <repo-url> stellar-hub
cd stellar-hub
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment

```bash
cp .env.example .env.local
```

Open `.env.local` and confirm the following (the defaults work for Stellar TESTNET):

```env
DRIZZLE_DATABASE_URL="postgres://postgres:postgres@localhost:5432/stellar_starter"
SESSION_SECRET="<32+ chars random base64>"     # MUST be >= 32 chars
SIGNED_ID_SECRET="<32+ chars, separate from SESSION_SECRET>"
CUSTOMER_JWT_SECRET="<32+ chars, separate from above>"
STELLAR_NETWORK="testnet"
STELLAR_HORIZON_URL="https://horizon-testnet.stellar.org"
STELLAR_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
OFFRAMP_ANCHOR_DOMAIN="mock"
SSE_MAX_CONCURRENT_PER_IP="20"
```

Generate fresh secrets:

```bash
node -e "for(let i=0;i<3;i++)console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy each line into the corresponding env var.

## 4. Start Postgres

**Option A — Docker (any platform):**

```bash
docker run -d --name stellar-pg -p 5432:5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=stellar_starter \
  postgres:16-alpine
```

**Option B — Native (already installed):**

```bash
# Linux/macOS
sudo systemctl start postgresql
# Or macOS
brew services start postgresql

# Windows: should auto-start as a service
# Check:
Get-Service postgresql-x64-18    # PowerShell
```

Create user and DB:

```powershell
# PowerShell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres postgres
# In psql:
ALTER USER postgres WITH PASSWORD 'postgres';
CREATE DATABASE stellar_starter;
\q
```

## 5. Run migrations

```bash
npm run db:push
```

Should print 12 CREATE TABLE / CREATE INDEX statements and end with `[✓] Changes applied`.

## 6. Start dev server

```bash
npm run dev
```

Should print `✓ Ready in <N>s` and listen on `http://localhost:3000` (or 3001 if 3000 is busy).

Verify:

```bash
curl http://localhost:3000/api/health
# → {"data":{"ok":true,"ts":...}}
```

## 7. Test the MVP

### a) Run unit tests

```bash
npm test
# → 60/60 tests pass
```

### b) Smoke test the API

```bash
./scripts/smoke.sh
# → 4/4 routes return 200
```

### c) Full UI flow with Freighter

1. Install **Freighter** extension
2. Create a new account in Freighter (or import an existing one) — **make sure network is set to TESTNET**
3. Fund the account:

```
https://friendbot.stellar.org?addr=<your-freighter-pubkey>
```

4. Open `http://localhost:3000/vi/connect` in your browser
5. Click **"Kết nối ví"** → Approve in Freighter → Sign
6. You'll land on `/vi/dashboard`

### d) Two-profile end-to-end test (merchant + customer)

To test the full payment flow on ONE machine, use **two Chrome profiles**:

**Profile 1 — Merchant:**
1. Install Freighter (creates default Account 1, e.g. `GBR5...NKD`)
2. Fund via Friendbot
3. Login at `/vi/connect` → land on `/vi/dashboard`
4. Create an invoice at `/vi/invoices/new` (e.g. 20 USDC, "Test")
5. Open the invoice detail → click **"Sao chép link"** to copy the checkout URL

**Profile 2 — Customer (separate Chrome profile, same machine):**
1. Install Freighter (creates a separate default Account 1 in this profile)
2. Fund that account via Friendbot
3. **IMPORTANT — set up USDC trustline** (one-time per account):
   - Open https://lab.stellar.org/#txbuilder?network=testnet
   - Operation: **Change Trust**
   - Asset: `USDC`, Issuer: `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5`
   - Limit: `1000000`
   - Sign with Freighter → Submit
4. Paste the checkout URL from Profile 1
5. Click **"Kết nối ví"** → Approve → Sign
6. Click **"Thanh toán ngay"** → Approve in Freighter (signs payment XDR)
7. Wait 5-10s

**Verify on Profile 1:**
- Hard reload `/vi/dashboard`
- Invoice should now show `pending → paid → settled`
- USDC balance should increase by ~20

## 8. Commit + push (after testing)

```bash
git add -A
git commit -m "verified: MVP works end-to-end on my machine"
git push origin bao
```

## Known issues / not blocking MVP

- Multi-chain (Base, Ethereum) → COMING SOON badges in UI
- Sponsored trustline (hot wallet) → not implemented; user sets up manually via Stellar Lab
- E2E test for full cashout flow with real Horizon → deferred
- OpenAPI spec → not generated; use Postman collection in `docs/postman_collection.json`

See `docs/HUB_HANDOFF.md` for full architecture + known P1/P2/P3 issues.
