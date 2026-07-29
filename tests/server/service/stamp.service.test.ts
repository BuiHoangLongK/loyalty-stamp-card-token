import { describe, expect, it } from 'vitest';
import type { Database } from '@/server/db/client';
import { AppError } from '@/server/lib/http';
import { StampService } from '@/server/service/stamp.service';

/**
 * Minimal chainable fake matching the drizzle query-builder surface the
 * service uses. Each builder is thenable so `await` resolves to a configured
 * result. We queue results FIFO per operation kind.
 */
type Row = Record<string, unknown>;

function makeDb() {
  const selectQueue: Row[][] = [];
  const insertReturning: Row[][] = [];
  const calls = { update: 0, insert: 0 };

  const chainable = (resolver: () => Row[]) => {
    const builder: Record<string, unknown> = {};
    const self = () => builder;
    builder.from = self;
    builder.where = self;
    builder.orderBy = self;
    builder.limit = self;
    builder.values = self;
    builder.set = self;
    builder.returning = () => Promise.resolve(resolver());
    // biome-ignore lint/suspicious/noThenProperty: Drizzle builders are intentionally awaitable.
    builder.then = (onF: (v: Row[]) => unknown) => Promise.resolve(resolver()).then(onF);
    return builder;
  };

  const db = {
    select: () => chainable(() => selectQueue.shift() ?? []),
    update: () => {
      calls.update++;
      return chainable(() => []);
    },
    insert: () => {
      calls.insert++;
      return chainable(() => insertReturning.shift() ?? []);
    },
    delete: () => chainable(() => []),
  } as unknown as Database;

  return {
    db,
    calls,
    queueSelect: (rows: Row[]) => selectQueue.push(rows),
    queueInsert: (rows: Row[]) => insertReturning.push(rows),
  };
}

describe('StampService.getMerchant', () => {
  it('returns merchant when found', async () => {
    const h = makeDb();
    h.queueSelect([{ id: 'm1', name: 'Hoa' }]);
    const svc = new StampService(h.db);
    await expect(svc.getMerchant('m1')).resolves.toMatchObject({ id: 'm1' });
  });
  it('throws NOT_FOUND when missing', async () => {
    const h = makeDb();
    h.queueSelect([]);
    const svc = new StampService(h.db);
    await expect(svc.getMerchant('nope')).rejects.toBeInstanceOf(AppError);
  });
});

describe('StampService.getCustomer', () => {
  it('returns customer when found', async () => {
    const h = makeDb();
    h.queueSelect([{ id: 'c1', stampCount: 3 }]);
    const svc = new StampService(h.db);
    await expect(svc.getCustomer('c1')).resolves.toMatchObject({ id: 'c1' });
  });
  it('throws when missing', async () => {
    const h = makeDb();
    h.queueSelect([]);
    const svc = new StampService(h.db);
    await expect(svc.getCustomer('x')).rejects.toBeInstanceOf(AppError);
  });
});

describe('StampService.issueStamp', () => {
  it('increments stamps and records event', async () => {
    const h = makeDb();
    h.queueSelect([{ id: 'c1', stampCount: 5 }]); // customer lookup
    h.queueInsert([{ id: 'e1', eventType: 'issued', amount: 1 }]); // event insert
    const svc = new StampService(h.db);
    const out = await svc.issueStamp('c1', 'm1', 1);
    expect(out.txHash).toHaveLength(64);
    expect(out.event).toMatchObject({ eventType: 'issued' });
    expect(h.calls.update).toBe(1);
    expect(h.calls.insert).toBe(1);
  });
  it('throws when customer missing', async () => {
    const h = makeDb();
    h.queueSelect([]);
    const svc = new StampService(h.db);
    await expect(svc.issueStamp('c1', 'm1')).rejects.toBeInstanceOf(AppError);
  });
});

describe('StampService.redeemStamps', () => {
  it('redeems when at threshold (clawback + redemption)', async () => {
    const h = makeDb();
    h.queueSelect([{ id: 'c1', stampCount: 10, totalRedeemed: 0 }]); // customer
    h.queueSelect([{ id: 'm1', stampsToReward: 10, rewardDescription: 'Latte' }]); // merchant
    h.queueInsert([{ id: 'cb1' }]); // clawback event
    h.queueInsert([{ id: 'r1', reward: 'Latte' }]); // redemption
    const svc = new StampService(h.db);
    const out = await svc.redeemStamps('c1', 'm1');
    expect(out.txHash).toHaveLength(64);
    expect(out.redemption).toMatchObject({ reward: 'Latte' });
    expect(h.calls.update).toBe(1);
    expect(h.calls.insert).toBe(2);
  });
  it('rejects when below threshold', async () => {
    const h = makeDb();
    h.queueSelect([{ id: 'c1', stampCount: 4, totalRedeemed: 0 }]);
    h.queueSelect([{ id: 'm1', stampsToReward: 10, rewardDescription: 'Latte' }]);
    const svc = new StampService(h.db);
    await expect(svc.redeemStamps('c1', 'm1')).rejects.toBeInstanceOf(AppError);
  });
  it('throws when customer missing', async () => {
    const h = makeDb();
    h.queueSelect([]);
    const svc = new StampService(h.db);
    await expect(svc.redeemStamps('c1', 'm1')).rejects.toBeInstanceOf(AppError);
  });
  it('throws when merchant missing', async () => {
    const h = makeDb();
    h.queueSelect([{ id: 'c1', stampCount: 10 }]);
    h.queueSelect([]);
    const svc = new StampService(h.db);
    await expect(svc.redeemStamps('c1', 'm1')).rejects.toBeInstanceOf(AppError);
  });
});

describe('StampService.getStats', () => {
  it('aggregates customer stats', async () => {
    const h = makeDb();
    h.queueSelect([
      { id: 'c1', stampCount: 10, totalRedeemed: 10 },
      { id: 'c2', stampCount: 3, totalRedeemed: 0 },
    ]);
    const svc = new StampService(h.db);
    const stats = await svc.getStats('m1');
    expect(stats.totalCustomers).toBe(2);
    expect(stats.readyToRedeem).toBe(1);
    expect(stats.totalStampsIssued).toBe(23); // 10+10 + 3+0
    expect(stats.totalRedemptions).toBe(1); // floor((10/10)+(0/10))
  });
});

describe('StampService list helpers', () => {
  it('listMerchants / listCustomers / listEvents / listRedemptions / getCustomerEvents resolve', async () => {
    const h = makeDb();
    h.queueSelect([{ id: 'm1' }]);
    h.queueSelect([{ id: 'c1' }]);
    h.queueSelect([{ id: 'e1' }]);
    h.queueSelect([{ id: 'r1' }]);
    h.queueSelect([{ id: 'e2' }]);
    const svc = new StampService(h.db);
    await expect(svc.listMerchants()).resolves.toHaveLength(1);
    await expect(svc.listCustomers('m1')).resolves.toHaveLength(1);
    await expect(svc.listEvents('m1')).resolves.toHaveLength(1);
    await expect(svc.listRedemptions('m1')).resolves.toHaveLength(1);
    await expect(svc.getCustomerEvents('c1')).resolves.toHaveLength(1);
  });
});
