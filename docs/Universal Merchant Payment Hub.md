# Universal Merchant Payment Hub

**Technical Specification (Hackathon MVP)**

## 1. Objective

Build a merchant payment platform that allows customers to pay using different crypto wallets and chains while merchants receive settlement in Stellar USDC.

Merchant experience should be as simple as:

1. Create invoice
2. Display QR code
3. Receive payment
4. View settlement

## 2. System Architecture

### Components

#### Frontend

- Merchant Dashboard
- Customer Checkout Page

#### Backend API

- Invoice Service
- Payment Detection Service
- Settlement Service
- Notification Service

#### Blockchain Layer

**Customer Side:**

- Stellar
- Base
- Ethereum
- Arbitrum (optional)

**Settlement Side:**

- Stellar

#### Database

- PostgreSQL

## 3. User Flow

### Merchant Creates Invoice

Merchant enters:

- Amount
- Currency (USD)
- Description

**Example:**

Amount: 20 USD
Description: Coffee Purchase

Backend creates:

```
Invoice { id, amount, status, merchant_wallet, created_at }
```

Status: `PENDING`

Backend returns:

- `invoice_id`
- `checkout_url`
- `qr_code`

### Customer Payment

Customer scans QR.

Checkout page displays:

- Pay $20

Available methods:

- Stellar USDC
- Base USDC
- Ethereum USDC

Customer chooses payment method.

### Payment Detection

Backend watches blockchain events.

**Example:** Invoice #123, Expected Amount = 20 USDC

System checks:

- Incoming transfer
- Destination wallet
- Amount

If valid:

- Invoice Status: `PAID`
- Store tx hash.

### Settlement

Merchant always receives:

- USDC on Stellar

If customer pays on Stellar: Direct settlement.

If customer pays on another chain:

- For MVP: Simulate bridge execution.
- Store: `source_chain`, `source_tx`, `destination_tx`
- For demo purposes, settlement completion can be mocked.

## 4. Frontend Specification

### Merchant Dashboard

#### Create Invoice

Fields:

- Amount
- Description

Button: Generate Payment QR

#### Invoice List

Columns:

- Invoice ID
- Amount
- Status
- Created Time

Statuses: Pending, Paid, Failed

#### Invoice Details

Display:

- Invoice Data
- QR Code
- Payment Status
- Settlement Status
- Transaction Hash

### Customer Checkout

Display:

- Merchant Name
- Amount
- Description

Payment Methods:

- Stellar
- Base
- Ethereum

- Connect Wallet
- Pay Button
- Success Screen

## 5. Backend Services

### Invoice Service

Endpoints:

- `POST /invoice` — Create invoice
- `GET /invoice/:id` — Fetch invoice
- `PATCH /invoice/:id` — Update status

### Payment Service

Responsibilities:

- Track incoming payments
- Validate:
  - Amount
  - Wallet
  - Chain
- Update invoice status.

### Settlement Service

Responsibilities:

- Generate Stellar settlement record.

Tables: `settlements`

Fields: `id`, `invoice_id`, `amount`, `merchant_wallet`, `stellar_tx_hash`, `status`

### Notification Service

Send:

- Payment Success

via:

- Websocket
- Polling

## 6. Database Schema

### merchants

`id`, `name`, `wallet_address`, `created_at`

### invoices

`id`, `merchant_id`, `amount`, `status`, `payment_chain`, `payment_tx`, `created_at`

### settlements

`id`, `invoice_id`, `amount`, `status`, `stellar_tx_hash`

## 7. Stellar Integration

Use Stellar SDK.

Merchant receives: USDC on Stellar.

Functions:

- Create settlement wallet
- Check balance
- Send payment
- Track transaction status

Store:

- transaction hash
- ledger number
- timestamp

## 8. Security

MVP Scope:

- Server-side invoice validation
- Signed invoice IDs
- Wallet ownership verification
- Rate limiting

Production features are out of scope.

## 9. Demo Scenario

- **Merchant:** Coffee Shop
- **Invoice:** $5
- **Customer:**
  - Connects wallet
  - Pays USDC
- **System:**
  - Detects transaction
  - Updates invoice
  - Creates settlement
- **Merchant dashboard shows:**
  - PAID
  - Settlement Complete
  - Stellar Transaction: `0x123...`
- **Total demo time:** < 2 minutes

## 10. Future Roadmap

### Phase 2

- Real bridge integrations
- Circle CCTP
- Stellar anchors
- Fiat cash-out

### Phase 3

- POS mobile app
- Merchant analytics
- Refund support
- Subscription payments
- Multi-store management

### Phase 4

- APAC merchant network
- Bank settlement
- Cross-border payroll
- Embedded finance services
