import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { customers } from './customers';
import { merchants } from './merchants';

export const redemptions = pgTable('redemptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customers.id),
  merchantId: uuid('merchant_id')
    .notNull()
    .references(() => merchants.id),
  stampsUsed: integer('stamps_used').notNull(),
  reward: text('reward').notNull(),
  redeemedAt: timestamp('redeemed_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Redemption = typeof redemptions.$inferSelect;
export type NewRedemption = typeof redemptions.$inferInsert;
