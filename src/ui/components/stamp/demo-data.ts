import type { Customer, Merchant, MerchantStats, StampEvent } from './types';

export const DEMO_MERCHANT: Merchant = {
  id: 'demo-merchant',
  name: "Hoa's Coffee — Hanoi",
  assetCode: 'COFFEE',
  assetIssuer: 'GCOFFEEHOAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  stampsToReward: 10,
  rewardDescription: 'Free Iced Latte (trị giá ₫45,000)',
  createdAt: '2026-01-01T00:00:00.000Z',
};

export const DEMO_CUSTOMERS: Customer[] = [
  {
    id: 'demo-customer-minh',
    merchantId: DEMO_MERCHANT.id,
    name: 'Minh Tuấn',
    stellarAddress: 'GMINHTUAN1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    stampCount: 8,
    totalRedeemed: 0,
    createdAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'demo-customer-linh',
    merchantId: DEMO_MERCHANT.id,
    name: 'Linh Phương',
    stellarAddress: 'GLINHPHUONG1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    stampCount: 10,
    totalRedeemed: 10,
    createdAt: '2026-01-03T00:00:00.000Z',
  },
  {
    id: 'demo-customer-hung',
    merchantId: DEMO_MERCHANT.id,
    name: 'Hùng Nam',
    stellarAddress: 'GHUNGNAM1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    stampCount: 3,
    totalRedeemed: 0,
    createdAt: '2026-01-04T00:00:00.000Z',
  },
];

export const DEMO_EVENTS: StampEvent[] = [
  ...Array.from({ length: 5 }, (_, index) => ({
    id: `demo-event-minh-${index + 1}`,
    customerId: DEMO_CUSTOMERS[0].id,
    merchantId: DEMO_MERCHANT.id,
    eventType: 'issued',
    amount: 1,
    txHash: `DEMO${String(index + 1).padStart(2, '0')}`.padEnd(64, '0'),
    createdAt: `2026-01-${String(index + 5).padStart(2, '0')}T00:00:00.000Z`,
  })),
];

export const DEMO_STATS: MerchantStats = {
  totalCustomers: DEMO_CUSTOMERS.length,
  readyToRedeem: 1,
  totalStampsIssued: 21,
  totalRedemptions: 1,
};

export function getDemoCustomer(customerId: string) {
  return DEMO_CUSTOMERS.find((customer) => customer.id === customerId);
}

export function getDemoCustomerEvents(customerId: string) {
  return DEMO_EVENTS.filter((event) => event.customerId === customerId);
}
