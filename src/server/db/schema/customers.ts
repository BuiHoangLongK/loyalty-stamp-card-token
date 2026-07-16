import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { merchants } from './merchants';

export const customers = pgTable('customers', {
  id: uuid('id').defaultRandom().primaryKey(),
  merchantId: uuid('merchant_id')
    .notNull()
    .references(() => merchants.id),
  name: text('name').notNull(),
  stellarAddress: text('stellar_address').notNull(),
  stampCount: integer('stamp_count').notNull().default(0),
  totalRedeemed: integer('total_redeemed').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
