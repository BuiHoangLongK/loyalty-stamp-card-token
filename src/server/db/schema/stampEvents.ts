import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { customers } from './customers';
import { merchants } from './merchants';

export const stampEvents = pgTable('stamp_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => customers.id),
  merchantId: uuid('merchant_id')
    .notNull()
    .references(() => merchants.id),
  eventType: text('event_type').notNull(), // 'issued' | 'redeemed' | 'clawback'
  amount: integer('amount').notNull().default(1),
  txHash: text('tx_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type StampEvent = typeof stampEvents.$inferSelect;
export type NewStampEvent = typeof stampEvents.$inferInsert;
