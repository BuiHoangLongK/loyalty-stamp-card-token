import { desc, eq } from 'drizzle-orm';
import type { Database } from '@/server/db/client';
import { customers, merchants, redemptions, stampEvents } from '@/server/db/schema';
import { AppError } from '@/server/lib/http';
import { mockTxHash, validateClawback } from '@/server/lib/stamp';

export class StampService {
  constructor(private db: Database) {}

  async getMerchant(id: string) {
    const [merchant] = await this.db.select().from(merchants).where(eq(merchants.id, id));
    if (!merchant) throw new AppError('NOT_FOUND', 'Merchant not found', 404);
    return merchant;
  }

  async listMerchants() {
    return this.db.select().from(merchants).orderBy(merchants.createdAt);
  }

  async getCustomer(id: string) {
    const [customer] = await this.db.select().from(customers).where(eq(customers.id, id));
    if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);
    return customer;
  }

  async listCustomers(merchantId: string) {
    return this.db
      .select()
      .from(customers)
      .where(eq(customers.merchantId, merchantId))
      .orderBy(desc(customers.stampCount));
  }

  async issueStamp(customerId: string, merchantId: string, amount = 1) {
    const [customer] = await this.db.select().from(customers).where(eq(customers.id, customerId));
    if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);

    const txHash = mockTxHash(`issue-${customerId}-${Date.now()}`);

    // Update stamp count
    await this.db
      .update(customers)
      .set({ stampCount: customer.stampCount + amount })
      .where(eq(customers.id, customerId));

    // Record event
    const [event] = await this.db
      .insert(stampEvents)
      .values({ customerId, merchantId, eventType: 'issued', amount, txHash })
      .returning();

    return { event, txHash };
  }

  async redeemStamps(customerId: string, merchantId: string) {
    const [customer] = await this.db.select().from(customers).where(eq(customers.id, customerId));
    if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);

    const [merchant] = await this.db.select().from(merchants).where(eq(merchants.id, merchantId));
    if (!merchant) throw new AppError('NOT_FOUND', 'Merchant not found', 404);

    const validation = validateClawback(
      customer.stampCount,
      merchant.stampsToReward,
      merchant.stampsToReward,
    );
    if (!validation.valid) {
      throw new AppError('INVALID_INPUT', validation.error ?? 'Cannot redeem', 400);
    }

    const txHash = mockTxHash(`clawback-${customerId}-${Date.now()}`);

    // Deduct stamps
    await this.db
      .update(customers)
      .set({
        stampCount: customer.stampCount - merchant.stampsToReward,
        totalRedeemed: customer.totalRedeemed + merchant.stampsToReward,
      })
      .where(eq(customers.id, customerId));

    // Record stamp event (clawback)
    await this.db.insert(stampEvents).values({
      customerId,
      merchantId,
      eventType: 'clawback',
      amount: merchant.stampsToReward,
      txHash,
    });

    // Record redemption
    const [redemption] = await this.db
      .insert(redemptions)
      .values({
        customerId,
        merchantId,
        stampsUsed: merchant.stampsToReward,
        reward: merchant.rewardDescription,
      })
      .returning();

    return { redemption, txHash };
  }

  async listEvents(merchantId: string, limit = 20) {
    return this.db
      .select()
      .from(stampEvents)
      .where(eq(stampEvents.merchantId, merchantId))
      .orderBy(desc(stampEvents.createdAt))
      .limit(limit);
  }

  async listRedemptions(merchantId: string) {
    return this.db
      .select()
      .from(redemptions)
      .where(eq(redemptions.merchantId, merchantId))
      .orderBy(desc(redemptions.redeemedAt));
  }

  async getCustomerEvents(customerId: string) {
    return this.db
      .select()
      .from(stampEvents)
      .where(eq(stampEvents.customerId, customerId))
      .orderBy(desc(stampEvents.createdAt));
  }

  async getStats(merchantId: string) {
    const allCustomers = await this.listCustomers(merchantId);
    const readyToRedeem = allCustomers.filter((c) => c.stampCount >= 10).length;
    const totalStampsIssued = allCustomers.reduce(
      (sum, c) => sum + c.stampCount + c.totalRedeemed,
      0,
    );
    const totalRedemptions = allCustomers.reduce((sum, c) => sum + c.totalRedeemed / 10, 0);
    return {
      totalCustomers: allCustomers.length,
      readyToRedeem,
      totalStampsIssued,
      totalRedemptions: Math.floor(totalRedemptions),
    };
  }
}
