import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const merchants = pgTable('merchants', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  assetCode: text('asset_code').notNull(),
  assetIssuer: text('asset_issuer').notNull(),
  stampsToReward: integer('stamps_to_reward').notNull().default(10),
  rewardDescription: text('reward_description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type Merchant = typeof merchants.$inferSelect;
export type NewMerchant = typeof merchants.$inferInsert;
