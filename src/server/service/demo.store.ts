import { randomUUID } from 'node:crypto';
import type { Customer, Merchant, Redemption, StampEvent } from '@/server/db/schema';
import { mockTxHash } from '@/server/lib/stamp';

export type DemoSession = {
  publicKey: string;
  expiresAt: Date;
};

type DemoNonce = {
  publicKey: string;
  expiresAt: Date;
  consumed: boolean;
};

const merchantId = '11111111-1111-4111-8111-111111111111';
const customerIds = {
  minh: '22222222-2222-4222-8222-222222222222',
  linh: '33333333-3333-4333-8333-333333333333',
  hung: '44444444-4444-4444-8444-444444444444',
};

const demoMerchant: Merchant = {
  id: merchantId,
  name: "Hoa's Coffee — Hanoi",
  assetCode: 'COFFEE',
  assetIssuer: 'GCOFFEEHOAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  stampsToReward: 10,
  rewardDescription: 'Free Iced Latte (trị giá ₫45,000)',
  createdAt: new Date('2026-07-01T08:00:00.000Z'),
};

function demoAddress(label: string): string {
  return `G${label}XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`.slice(0, 56);
}

function makeCustomer(
  id: string,
  name: string,
  addressLabel: string,
  stampCount: number,
  totalRedeemed: number,
): Customer {
  return {
    id,
    merchantId,
    name,
    stellarAddress: demoAddress(addressLabel),
    stampCount,
    totalRedeemed,
    createdAt: new Date('2026-07-01T08:00:00.000Z'),
  };
}

function makeEvent(
  customerId: string,
  eventType: string,
  amount: number,
  index: number,
  createdAt: Date,
): StampEvent {
  return {
    id: `55555555-5555-4555-8555-${String(index).padStart(12, '0')}`,
    customerId,
    merchantId,
    eventType,
    amount,
    txHash: mockTxHash(`seed-${customerId}-${eventType}-${index}`),
    createdAt,
  };
}

function createSeed(): DemoStoreState {
  const customers = [
    makeCustomer(customerIds.minh, 'Minh Tuấn', 'MINHTUAN', 8, 0),
    makeCustomer(customerIds.linh, 'Linh Phương', 'LINHPHUONG', 10, 10),
    makeCustomer(customerIds.hung, 'Hùng Nam', 'GHUNGNAM', 3, 0),
  ];
  const events: StampEvent[] = [];
  let index = 1;

  for (let i = 0; i < 8; i += 1) {
    events.push(
      makeEvent(customerIds.minh, 'issued', 1, index, new Date(Date.now() - index * 60_000)),
    );
    index += 1;
  }
  for (let i = 0; i < 10; i += 1) {
    events.push(
      makeEvent(customerIds.linh, 'issued', 1, index, new Date(Date.now() - index * 60_000)),
    );
    index += 1;
  }
  events.push(
    makeEvent(customerIds.linh, 'clawback', 10, index, new Date(Date.now() - index * 60_000)),
  );
  index += 1;
  for (let i = 0; i < 10; i += 1) {
    events.push(
      makeEvent(customerIds.linh, 'issued', 1, index, new Date(Date.now() - index * 60_000)),
    );
    index += 1;
  }
  for (let i = 0; i < 3; i += 1) {
    events.push(
      makeEvent(customerIds.hung, 'issued', 1, index, new Date(Date.now() - index * 60_000)),
    );
    index += 1;
  }

  return {
    merchants: [demoMerchant],
    customers,
    events,
    redemptions: [
      {
        id: '66666666-6666-4666-8666-666666666666',
        customerId: customerIds.linh,
        merchantId,
        stampsUsed: 10,
        reward: demoMerchant.rewardDescription,
        redeemedAt: new Date(Date.now() - 30 * 60_000),
      },
    ],
    nonces: new Map(),
    sessions: new Map(),
  };
}

type DemoStoreState = {
  merchants: Merchant[];
  customers: Customer[];
  events: StampEvent[];
  redemptions: Redemption[];
  nonces: Map<string, DemoNonce>;
  sessions: Map<string, DemoSession>;
};

export class DemoStore {
  private readonly state: DemoStoreState;

  constructor(state = createSeed()) {
    this.state = state;
  }

  listMerchants(): Merchant[] {
    return [...this.state.merchants];
  }

  getMerchant(id: string): Merchant | undefined {
    return this.state.merchants.find((merchant) => merchant.id === id);
  }

  getCustomer(id: string): Customer | undefined {
    return this.state.customers.find((customer) => customer.id === id);
  }

  listCustomers(merchantId: string): Customer[] {
    return this.state.customers
      .filter((customer) => customer.merchantId === merchantId)
      .sort((a, b) => b.stampCount - a.stampCount);
  }

  listEvents(merchantId: string, limit = 20): StampEvent[] {
    return this.state.events
      .filter((event) => event.merchantId === merchantId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  listRedemptions(merchantId: string): Redemption[] {
    return this.state.redemptions
      .filter((redemption) => redemption.merchantId === merchantId)
      .sort((a, b) => b.redeemedAt.getTime() - a.redeemedAt.getTime());
  }

  getCustomerEvents(customerId: string): StampEvent[] {
    return this.state.events
      .filter((event) => event.customerId === customerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  issue(customerId: string, merchantId: string, amount: number) {
    const customer = this.getCustomer(customerId);
    if (!customer) return undefined;
    customer.stampCount += amount;
    const event: StampEvent = {
      id: randomUUID(),
      customerId,
      merchantId,
      eventType: 'issued',
      amount,
      txHash: mockTxHash(`issue-${customerId}-${Date.now()}`),
      createdAt: new Date(),
    };
    this.state.events.push(event);
    return event;
  }

  redeem(customerId: string, merchantId: string, merchant: Merchant) {
    const customer = this.getCustomer(customerId);
    if (!customer) return undefined;
    customer.stampCount -= merchant.stampsToReward;
    customer.totalRedeemed += merchant.stampsToReward;
    const now = new Date();
    const txHash = mockTxHash(`clawback-${customerId}-${Date.now()}`);
    const event: StampEvent = {
      id: randomUUID(),
      customerId,
      merchantId,
      eventType: 'clawback',
      amount: merchant.stampsToReward,
      txHash,
      createdAt: now,
    };
    const redemption: Redemption = {
      id: randomUUID(),
      customerId,
      merchantId,
      stampsUsed: merchant.stampsToReward,
      reward: merchant.rewardDescription,
      redeemedAt: now,
    };
    this.state.events.push(event);
    this.state.redemptions.push(redemption);
    return { event, redemption, txHash };
  }

  saveNonce(nonce: string, value: DemoNonce): void {
    this.state.nonces.set(nonce, value);
  }

  consumeNonce(nonce: string, publicKey: string): boolean {
    const value = this.state.nonces.get(nonce);
    if (
      !value ||
      value.consumed ||
      value.publicKey !== publicKey ||
      value.expiresAt <= new Date()
    ) {
      return false;
    }
    value.consumed = true;
    return true;
  }

  saveSession(sessionId: string, session: DemoSession): void {
    this.state.sessions.set(sessionId, session);
  }

  getSession(sessionId: string): DemoSession | undefined {
    return this.state.sessions.get(sessionId);
  }

  deleteSession(sessionId: string): void {
    this.state.sessions.delete(sessionId);
  }
}

const globalForDemo = globalThis as typeof globalThis & {
  stampChainDemoStore?: DemoStore;
};

export function getDemoStore(): DemoStore {
  globalForDemo.stampChainDemoStore ??= new DemoStore();
  return globalForDemo.stampChainDemoStore;
}
