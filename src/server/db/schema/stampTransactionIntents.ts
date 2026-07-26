import { index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { customers } from './customers';
import { merchants } from './merchants';

/**
 * A pending intent is created before any balance mutation. The unsigned XDR is
 * safe to persist because it contains no signature or secret; the signed XDR
 * remains external and Horizon is the source of truth for confirmation.
 */
export const stampTransactionIntents = pgTable(
  'stamp_transaction_intents',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    operation: text('operation').notNull(), // 'issue' | 'redeem'
    idempotencyKey: text('idempotency_key').notNull(),
    requestHash: text('request_hash').notNull(),
    customerId: uuid('customer_id')
      .notNull()
      .references(() => customers.id),
    merchantId: uuid('merchant_id')
      .notNull()
      .references(() => merchants.id),
    amount: integer('amount').notNull(),
    assetCode: text('asset_code').notNull(),
    assetIssuer: text('asset_issuer').notNull(),
    network: text('network').notNull(),
    networkPassphrase: text('network_passphrase').notNull(),
    status: text('status').notNull().default('pending'), // 'pending' | 'confirmed'
    unsignedXdr: text('unsigned_xdr'),
    unsignedTxDigest: text('unsigned_tx_digest'),
    txHash: text('tx_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    confirmedAt: timestamp('confirmed_at', { withTimezone: true }),
  },
  (t) => ({
    idempotencyIdx: uniqueIndex('stamp_transaction_intents_idempotency_idx').on(
      t.operation,
      t.idempotencyKey,
    ),
    customerStatusIdx: index('stamp_transaction_intents_customer_status_idx').on(
      t.customerId,
      t.status,
    ),
  }),
);

export type StampTransactionIntent = typeof stampTransactionIntents.$inferSelect;
export type NewStampTransactionIntent = typeof stampTransactionIntents.$inferInsert;
