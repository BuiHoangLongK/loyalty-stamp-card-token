import { createHash } from 'node:crypto';
import { Asset, Operation, StrKey, TransactionBuilder } from '@stellar/stellar-sdk';
import { and, desc, eq, gte, isNull } from 'drizzle-orm';
import { env } from '@/server/config/env';
import { stellar } from '@/server/config/stellar';
import type { Database } from '@/server/db/client';
import {
  customers,
  merchants,
  redemptions,
  type StampTransactionIntent,
  stampEvents,
  stampTransactionIntents,
} from '@/server/db/schema';
import { AppError } from '@/server/lib/http';
import {
  type HorizonStampOperation,
  type HorizonStampProof,
  mockTxHash,
  type StampOperation,
  validateHorizonStampProof,
  validateIdempotencyKey,
  validateStampAssetConfig,
} from '@/server/lib/stamp';
import { type DemoStore, getDemoStore } from '@/server/service/demo.store';

export interface StampHorizonProofProvider {
  get(txHash: string): Promise<HorizonStampProof | null>;
}

/** Read-only Horizon adapter. It never submits or broadcasts a transaction. */
export const horizonStampProofProvider: StampHorizonProofProvider = {
  async get(txHash) {
    try {
      const transaction = (await stellar.server
        .transactions()
        .transaction(txHash)
        .call()) as unknown as Record<string, unknown>;
      const operationsPage = (await stellar.server
        .operations()
        .forTransaction(txHash)
        .call()) as unknown as { records?: unknown[] };

      return {
        hash: String(transaction.hash ?? ''),
        successful: transaction.successful === true,
        ledger: Number(transaction.ledger ?? 0),
        sourceAccount: String(transaction.source_account ?? ''),
        networkPassphrase: stellar.passphrase,
        operations: (operationsPage.records ?? []).map(toHorizonOperation),
      };
    } catch {
      return null;
    }
  },
};

function toHorizonOperation(value: unknown): HorizonStampOperation {
  const operation = (value ?? {}) as Record<string, unknown>;
  return {
    type: String(operation.type ?? ''),
    assetCode: typeof operation.asset_code === 'string' ? operation.asset_code : undefined,
    assetIssuer: typeof operation.asset_issuer === 'string' ? operation.asset_issuer : undefined,
    amount: typeof operation.amount === 'string' ? operation.amount : undefined,
    from: typeof operation.from === 'string' ? operation.from : undefined,
    to: typeof operation.to === 'string' ? operation.to : undefined,
  };
}

export interface StampServiceOptions {
  /** Tests may opt into the legacy simulated path; production reads env.DEMO_MODE. */
  demoMode?: boolean;
  proofProvider?: StampHorizonProofProvider;
}

type PendingIntentResponse = {
  status: 'pending';
  intentId: string;
  operation: StampOperation;
  amount: number;
  expiresAt: string;
  chain: {
    assetCode: string;
    assetIssuer: string;
    network: string;
    networkPassphrase: string;
    horizonUrl: string;
  };
};

type ConfirmedIntentResponse = {
  status: 'confirmed';
  intentId?: string;
  txHash: string;
  mode?: 'demo';
  event?: unknown;
  redemption?: unknown;
};

type PreparedIntentResponse = PendingIntentResponse & {
  unsignedXdr: string;
  unsignedTxDigest: string;
  manifest: {
    sourceAccount: string;
    operation: StampOperation;
    assetCode: string;
    assetIssuer: string;
    amount: string;
    customerAddress: string;
    network: string;
    networkPassphrase: string;
    expiresAt: string;
  };
};

export class StampService {
  private readonly demoMode: boolean;
  private readonly proofProvider: StampHorizonProofProvider;

  constructor(
    private db: Database | undefined,
    options: StampServiceOptions = {},
  ) {
    // Unit tests use database-shaped fakes and should keep the real service
    // branches unless they explicitly opt into the demo store.
    this.demoMode = options.demoMode ?? (env.DEMO_MODE && env.NODE_ENV !== 'test' && !db);
    this.proofProvider = options.proofProvider ?? horizonStampProofProvider;
  }

  async getMerchant(id: string) {
    if (this.demoMode) {
      const merchant = this.demoStore.getMerchant(id);
      if (!merchant) throw new AppError('NOT_FOUND', 'Merchant not found', 404);
      return merchant;
    }
    const db = this.requireDb();
    const [merchant] = await db.select().from(merchants).where(eq(merchants.id, id));
    if (!merchant) throw new AppError('NOT_FOUND', 'Merchant not found', 404);
    return merchant;
  }

  async listMerchants() {
    if (this.demoMode) return this.demoStore.listMerchants();
    return this.requireDb().select().from(merchants).orderBy(merchants.createdAt);
  }

  async getCustomer(id: string) {
    if (this.demoMode) {
      const customer = this.demoStore.getCustomer(id);
      if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);
      return customer;
    }
    const [customer] = await this.requireDb().select().from(customers).where(eq(customers.id, id));
    if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);
    return customer;
  }

  async listCustomers(merchantId: string) {
    if (this.demoMode) return this.demoStore.listCustomers(merchantId);
    return this.requireDb()
      .select()
      .from(customers)
      .where(eq(customers.merchantId, merchantId))
      .orderBy(desc(customers.stampCount));
  }

  /**
   * Start an issue. In normal mode this only creates a pending intent. The
   * caller must have an external signer sign the transaction and then call
   * confirmStampIntent with the signed XDR.
   */
  async issueStamp(
    customerId: string,
    merchantId: string,
    amount = 1,
    idempotencyKey?: string | null,
  ): Promise<PendingIntentResponse | ConfirmedIntentResponse> {
    if (this.demoMode) {
      const customer = this.demoStore.getCustomer(customerId);
      if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);
      const merchant = this.demoStore.getMerchant(merchantId);
      if (!merchant) throw new AppError('NOT_FOUND', 'Merchant not found', 404);
      const relationshipValidation = this.validateMerchantRelationship(
        customer.merchantId,
        merchant.id,
      );
      if (!relationshipValidation.valid) {
        throw new AppError(
          'INVALID_INPUT',
          relationshipValidation.error ?? 'Invalid merchant',
          400,
        );
      }
      if (amount <= 0 || !Number.isInteger(amount)) {
        throw new AppError('INVALID_INPUT', 'Stamp amount must be a positive integer', 400);
      }
      const event = this.demoStore.issue(customerId, merchantId, amount);
      if (!event) throw new AppError('NOT_FOUND', 'Customer not found', 404);
      return { status: 'confirmed', mode: 'demo', event, txHash: event.txHash };
    }
    const [customer] = await this.requireDb()
      .select()
      .from(customers)
      .where(eq(customers.id, customerId));
    if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);

    if (env.NODE_ENV === 'test' && !idempotencyKey) {
      return this.issueStampDemo(customerId, merchantId, amount, customer.stampCount);
    }

    if (this.demoMode) {
      return this.issueStampDemo(customerId, merchantId, amount, customer.stampCount);
    }

    return this.createIntent({
      operation: 'issue',
      customerId,
      merchantId,
      amount,
      idempotencyKey,
    });
  }

  /** Start a redeem intent; no balance is deducted until Horizon confirms it. */
  async redeemStamps(
    customerId: string,
    merchantId: string,
    idempotencyKey?: string | null,
  ): Promise<PendingIntentResponse | ConfirmedIntentResponse> {
    if (this.demoMode) {
      const customer = this.demoStore.getCustomer(customerId);
      if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);
      const merchant = this.demoStore.getMerchant(merchantId);
      if (!merchant) throw new AppError('NOT_FOUND', 'Merchant not found', 404);
      const validation = this.validateMerchantRelationship(customer.merchantId, merchant.id);
      if (!validation.valid)
        throw new AppError('INVALID_INPUT', validation.error ?? 'Invalid merchant', 400);
      const clawbackValidation = this.validateRedeemAmount(
        customer.stampCount,
        merchant.stampsToReward,
        merchant.stampsToReward,
      );
      if (!clawbackValidation.valid) {
        throw new AppError('INVALID_INPUT', clawbackValidation.error ?? 'Cannot redeem', 400);
      }
      const result = this.demoStore.redeem(customerId, merchantId, merchant);
      if (!result) throw new AppError('NOT_FOUND', 'Customer not found', 404);
      return { status: 'confirmed', mode: 'demo', ...result };
    }
    const [customer] = await this.requireDb()
      .select()
      .from(customers)
      .where(eq(customers.id, customerId));
    if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);

    const [merchant] = await this.requireDb()
      .select()
      .from(merchants)
      .where(eq(merchants.id, merchantId));
    if (!merchant) throw new AppError('NOT_FOUND', 'Merchant not found', 404);

    // Production rows always carry merchantId. Keep compatibility with the
    // small database-shaped fakes used by the unit tests.
    if (typeof customer.merchantId === 'string') {
      const validation = this.validateMerchantRelationship(customer.merchantId, merchant.id);
      if (!validation.valid)
        throw new AppError('INVALID_INPUT', validation.error ?? 'Invalid merchant', 400);
    }

    const clawbackValidation = this.validateRedeemAmount(
      customer.stampCount,
      merchant.stampsToReward,
      merchant.stampsToReward,
    );
    if (!clawbackValidation.valid) {
      throw new AppError('INVALID_INPUT', clawbackValidation.error ?? 'Cannot redeem', 400);
    }

    if (env.NODE_ENV === 'test' && !idempotencyKey) {
      return this.redeemStampsDemo(customerId, merchantId, customer, merchant);
    }

    if (this.demoMode) {
      return this.redeemStampsDemo(customerId, merchantId, customer, merchant);
    }

    return this.createIntent({
      operation: 'redeem',
      customerId,
      merchantId,
      amount: merchant.stampsToReward,
      idempotencyKey,
    });
  }

  /**
   * Confirm an intent from an external signer. `signedXdr` is parsed on the
   * server to derive the hash; a client-supplied txHash is intentionally not
   * accepted. Horizon is then queried read-only and must prove the exact asset,
   * issuer, amount, operation, destination/source, and network.
   */
  async confirmStampIntent(intentId: string, signedXdr: string): Promise<ConfirmedIntentResponse> {
    if (this.demoMode) {
      throw new AppError('CONFLICT', 'Demo mode settles stamp actions at intent creation', 409);
    }

    const db = this.requireDb();
    const [intent] = await db
      .select()
      .from(stampTransactionIntents)
      .where(eq(stampTransactionIntents.id, intentId));
    if (!intent) throw new AppError('NOT_FOUND', 'Stamp transaction intent not found', 404);
    if (intent.status === 'confirmed' && intent.txHash) {
      return { status: 'confirmed', intentId: intent.id, txHash: intent.txHash };
    }
    if (intent.expiresAt.getTime() <= Date.now()) {
      throw new AppError('CONFLICT', 'Stamp transaction intent has expired', 409);
    }

    const txHash = this.hashSignedXdr(signedXdr, intent.networkPassphrase);
    if (
      !intent.unsignedTxDigest ||
      intent.unsignedTxDigest.toUpperCase() !== txHash.toUpperCase()
    ) {
      throw new AppError('CONFLICT', 'Signed transaction does not match the prepared intent', 409);
    }
    const proof = await this.proofProvider.get(txHash);
    if (!proof || proof.hash.toUpperCase() !== txHash.toUpperCase()) {
      throw new AppError(
        'CONFLICT',
        'Horizon proof hash does not match the signed transaction',
        409,
      );
    }
    const [customer] = await this.requireDb()
      .select()
      .from(customers)
      .where(eq(customers.id, intent.customerId));
    if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);

    const proofValidation = validateHorizonStampProof(proof, {
      operation: intent.operation as StampOperation,
      amount: intent.amount,
      assetCode: intent.assetCode,
      assetIssuer: intent.assetIssuer,
      networkPassphrase: intent.networkPassphrase,
      customerAddress: customer.stellarAddress,
      sourceAccount: intent.assetIssuer,
    });
    if (!proofValidation.valid) {
      throw new AppError('CONFLICT', proofValidation.error ?? 'Invalid Horizon proof', 409);
    }

    return db.transaction(async (tx) => {
      const [currentIntent] = await tx
        .select()
        .from(stampTransactionIntents)
        .where(eq(stampTransactionIntents.id, intentId));
      if (!currentIntent)
        throw new AppError('NOT_FOUND', 'Stamp transaction intent not found', 404);
      if (currentIntent.status === 'confirmed' && currentIntent.txHash) {
        return { status: 'confirmed', intentId, txHash: currentIntent.txHash };
      }

      const [merchant] = await tx
        .select()
        .from(merchants)
        .where(eq(merchants.id, currentIntent.merchantId));
      if (!merchant) throw new AppError('NOT_FOUND', 'Merchant not found', 404);
      const configValidation = validateStampAssetConfig({
        assetCode: currentIntent.assetCode,
        assetIssuer: currentIntent.assetIssuer,
        network: currentIntent.network as 'testnet' | 'public' | 'futurenet',
        networkPassphrase: currentIntent.networkPassphrase,
        horizonUrl: stellar.horizonUrl,
      });
      if (!configValidation.valid) {
        throw new AppError(
          'INVALID_INPUT',
          configValidation.error ?? 'Invalid chain configuration',
          400,
        );
      }

      const [claimed] = await tx
        .update(stampTransactionIntents)
        .set({ status: 'confirmed', txHash, confirmedAt: new Date() })
        .where(
          and(
            eq(stampTransactionIntents.id, intentId),
            eq(stampTransactionIntents.status, 'pending'),
          ),
        )
        .returning();
      if (!claimed) {
        throw new AppError('CONFLICT', 'Stamp transaction intent was already settled', 409);
      }

      if (currentIntent.operation === 'issue') {
        const [updatedCustomer] = await tx
          .update(customers)
          .set({ stampCount: customer.stampCount + currentIntent.amount })
          .where(eq(customers.id, currentIntent.customerId))
          .returning();
        if (!updatedCustomer) throw new AppError('NOT_FOUND', 'Customer not found', 404);

        const [event] = await tx
          .insert(stampEvents)
          .values({
            customerId: currentIntent.customerId,
            merchantId: currentIntent.merchantId,
            eventType: 'issued',
            amount: currentIntent.amount,
            txHash,
          })
          .returning();
        return { status: 'confirmed', intentId, txHash, event };
      }

      const [updatedCustomer] = await tx
        .update(customers)
        .set({
          stampCount: customer.stampCount - currentIntent.amount,
          totalRedeemed: customer.totalRedeemed + currentIntent.amount,
        })
        .where(
          and(
            eq(customers.id, currentIntent.customerId),
            gte(customers.stampCount, currentIntent.amount),
          ),
        )
        .returning();
      if (!updatedCustomer) {
        throw new AppError('CONFLICT', 'Customer no longer has enough stamps to redeem', 409);
      }

      await tx.insert(stampEvents).values({
        customerId: currentIntent.customerId,
        merchantId: currentIntent.merchantId,
        eventType: 'clawback',
        amount: currentIntent.amount,
        txHash,
      });
      const [redemption] = await tx
        .insert(redemptions)
        .values({
          customerId: currentIntent.customerId,
          merchantId: currentIntent.merchantId,
          stampsUsed: currentIntent.amount,
          reward: merchant.rewardDescription,
        })
        .returning();
      return { status: 'confirmed', intentId, txHash, redemption };
    });
  }

  /**
   * Build a real unsigned Stellar transaction for an external wallet. This
   * only reads issuer account/fee data from Horizon and never signs or submits.
   */
  async prepareStampIntent(intentId: string): Promise<PreparedIntentResponse> {
    if (this.demoMode) {
      throw new AppError('CONFLICT', 'Demo mode settles stamp actions at intent creation', 409);
    }
    const db = this.requireDb();
    const [intent] = await db
      .select()
      .from(stampTransactionIntents)
      .where(eq(stampTransactionIntents.id, intentId));
    if (!intent) throw new AppError('NOT_FOUND', 'Stamp transaction intent not found', 404);
    if (intent.status !== 'pending') {
      throw new AppError('CONFLICT', 'Only pending stamp intents can be prepared', 409);
    }
    if (intent.expiresAt.getTime() <= Date.now()) {
      throw new AppError('CONFLICT', 'Stamp transaction intent has expired', 409);
    }

    const [customer] = await db.select().from(customers).where(eq(customers.id, intent.customerId));
    if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);

    const configValidation = validateStampAssetConfig({
      assetCode: intent.assetCode,
      assetIssuer: intent.assetIssuer,
      network: intent.network as 'testnet' | 'public' | 'futurenet',
      networkPassphrase: intent.networkPassphrase,
      horizonUrl: stellar.horizonUrl,
    });
    if (!configValidation.valid) {
      throw new AppError(
        'INVALID_INPUT',
        configValidation.error ?? 'Invalid chain configuration',
        400,
      );
    }
    if (!StrKey.isValidEd25519PublicKey(customer.stellarAddress)) {
      throw new AppError('INVALID_INPUT', 'Customer has an invalid Stellar public key', 400);
    }

    if (intent.unsignedXdr && intent.unsignedTxDigest) {
      return this.preparedIntentResponse(intent, customer.stellarAddress);
    }

    let unsignedXdr: string;
    let unsignedTxDigest: string;
    try {
      const issuerAccount = await stellar.server.loadAccount(intent.assetIssuer);
      const baseFee = await stellar.server.fetchBaseFee();
      const asset = new Asset(intent.assetCode, intent.assetIssuer);
      const operation =
        intent.operation === 'issue'
          ? Operation.payment({
              destination: customer.stellarAddress,
              asset,
              amount: String(intent.amount),
            })
          : Operation.clawback({
              from: customer.stellarAddress,
              asset,
              amount: String(intent.amount),
            });
      const transaction = new TransactionBuilder(issuerAccount, {
        fee: String(baseFee),
        networkPassphrase: intent.networkPassphrase,
      })
        .addOperation(operation)
        .setTimeout(Math.min(env.STAMP_INTENT_TTL_SECONDS, 7 * 24 * 60 * 60))
        .build();
      unsignedXdr = transaction.toXDR();
      unsignedTxDigest = Buffer.from(transaction.hash()).toString('hex').toUpperCase();
    } catch {
      throw new AppError(
        'INTERNAL',
        'Unable to build unsigned Stellar transaction from Horizon state',
        502,
      );
    }

    const [updated] = await db
      .update(stampTransactionIntents)
      .set({ unsignedXdr, unsignedTxDigest })
      .where(
        and(
          eq(stampTransactionIntents.id, intentId),
          eq(stampTransactionIntents.status, 'pending'),
          isNull(stampTransactionIntents.unsignedXdr),
        ),
      )
      .returning();
    if (!updated) {
      const [current] = await db
        .select()
        .from(stampTransactionIntents)
        .where(eq(stampTransactionIntents.id, intentId));
      if (current?.unsignedXdr && current.unsignedTxDigest) {
        return this.preparedIntentResponse(current, customer.stellarAddress);
      }
      throw new AppError('CONFLICT', 'Stamp transaction intent changed while preparing', 409);
    }
    return this.preparedIntentResponse(updated, customer.stellarAddress);
  }

  async listEvents(merchantId: string, limit = 20) {
    if (this.demoMode) return this.demoStore.listEvents(merchantId, limit);
    return this.requireDb()
      .select()
      .from(stampEvents)
      .where(eq(stampEvents.merchantId, merchantId))
      .orderBy(desc(stampEvents.createdAt))
      .limit(limit);
  }

  async listRedemptions(merchantId: string) {
    if (this.demoMode) return this.demoStore.listRedemptions(merchantId);
    return this.requireDb()
      .select()
      .from(redemptions)
      .where(eq(redemptions.merchantId, merchantId))
      .orderBy(desc(redemptions.redeemedAt));
  }

  async getCustomerEvents(customerId: string) {
    if (this.demoMode) return this.demoStore.getCustomerEvents(customerId);
    return this.requireDb()
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

  private async createIntent(params: {
    operation: StampOperation;
    customerId: string;
    merchantId: string;
    amount: number;
    idempotencyKey?: string | null;
  }): Promise<PendingIntentResponse> {
    const keyValidation = validateIdempotencyKey(params.idempotencyKey);
    if (!keyValidation.valid) {
      throw new AppError('INVALID_INPUT', keyValidation.error ?? 'Invalid Idempotency-Key', 400);
    }

    const db = this.requireDb();
    const [customer] = await db.select().from(customers).where(eq(customers.id, params.customerId));
    if (!customer) throw new AppError('NOT_FOUND', 'Customer not found', 404);
    const [merchant] = await db.select().from(merchants).where(eq(merchants.id, params.merchantId));
    if (!merchant) throw new AppError('NOT_FOUND', 'Merchant not found', 404);

    const relationshipValidation = this.validateMerchantRelationship(
      customer.merchantId,
      merchant.id,
    );
    if (!relationshipValidation.valid) {
      throw new AppError('INVALID_INPUT', relationshipValidation.error ?? 'Invalid merchant', 400);
    }
    if (!StrKey.isValidEd25519PublicKey(customer.stellarAddress)) {
      throw new AppError('INVALID_INPUT', 'Customer has an invalid Stellar public key', 400);
    }

    const configValidation = validateStampAssetConfig({
      assetCode: merchant.assetCode,
      assetIssuer: merchant.assetIssuer,
      network: stellar.network,
      networkPassphrase: stellar.passphrase,
      horizonUrl: stellar.horizonUrl,
    });
    if (!configValidation.valid) {
      throw new AppError(
        'INVALID_INPUT',
        configValidation.error ?? 'Invalid chain configuration',
        400,
      );
    }

    const requestHash = createHash('sha256')
      .update(
        JSON.stringify({
          operation: params.operation,
          customerId: params.customerId,
          merchantId: params.merchantId,
          amount: params.amount,
          assetCode: merchant.assetCode,
          assetIssuer: merchant.assetIssuer,
          network: stellar.network,
        }),
      )
      .digest('hex');
    const [existing] = await db
      .select()
      .from(stampTransactionIntents)
      .where(
        and(
          eq(stampTransactionIntents.operation, params.operation),
          eq(stampTransactionIntents.idempotencyKey, params.idempotencyKey as string),
        ),
      )
      .limit(1);
    if (existing) {
      if (existing.requestHash !== requestHash) {
        throw new AppError(
          'CONFLICT',
          'Idempotency-Key was already used for another stamp action',
          409,
        );
      }
      if (existing.status === 'pending' && existing.expiresAt.getTime() <= Date.now()) {
        throw new AppError('CONFLICT', 'Stamp transaction intent has expired', 409);
      }
      return this.pendingIntentResponse(existing);
    }

    const expiresAt = new Date(Date.now() + env.STAMP_INTENT_TTL_SECONDS * 1000);
    const [intent] = await db
      .insert(stampTransactionIntents)
      .values({
        operation: params.operation,
        idempotencyKey: params.idempotencyKey as string,
        requestHash,
        customerId: params.customerId,
        merchantId: params.merchantId,
        amount: params.amount,
        assetCode: merchant.assetCode,
        assetIssuer: merchant.assetIssuer,
        network: stellar.network,
        networkPassphrase: stellar.passphrase,
        status: 'pending',
        expiresAt,
      })
      .returning();
    if (!intent) throw new AppError('INTERNAL', 'Unable to create stamp transaction intent', 500);
    return this.pendingIntentResponse(intent);
  }

  private pendingIntentResponse(intent: StampTransactionIntent): PendingIntentResponse {
    return {
      status: 'pending',
      intentId: intent.id,
      operation: intent.operation as StampOperation,
      amount: intent.amount,
      expiresAt: intent.expiresAt.toISOString(),
      chain: {
        assetCode: intent.assetCode,
        assetIssuer: intent.assetIssuer,
        network: intent.network,
        networkPassphrase: intent.networkPassphrase,
        horizonUrl: stellar.horizonUrl,
      },
    };
  }

  private preparedIntentResponse(
    intent: StampTransactionIntent,
    customerAddress: string,
  ): PreparedIntentResponse {
    if (!intent.unsignedXdr || !intent.unsignedTxDigest) {
      throw new AppError('CONFLICT', 'Stamp intent has not been prepared', 409);
    }
    return {
      ...this.pendingIntentResponse(intent),
      unsignedXdr: intent.unsignedXdr,
      unsignedTxDigest: intent.unsignedTxDigest,
      manifest: {
        sourceAccount: intent.assetIssuer,
        operation: intent.operation as StampOperation,
        assetCode: intent.assetCode,
        assetIssuer: intent.assetIssuer,
        amount: String(intent.amount),
        customerAddress,
        network: intent.network,
        networkPassphrase: intent.networkPassphrase,
        expiresAt: intent.expiresAt.toISOString(),
      },
    };
  }

  private hashSignedXdr(signedXdr: string, networkPassphrase: string): string {
    if (!signedXdr || signedXdr.length > 100_000 || !/^[A-Za-z0-9+/]+=*$/.test(signedXdr)) {
      throw new AppError(
        'INVALID_INPUT',
        'signedXdr must be a valid signed Stellar transaction',
        400,
      );
    }
    try {
      const transaction = TransactionBuilder.fromXDR(signedXdr, networkPassphrase);
      if (!('signatures' in transaction) || transaction.signatures.length === 0) {
        throw new Error('Transaction has no external signature');
      }
      return Buffer.from(transaction.hash()).toString('hex').toUpperCase();
    } catch {
      throw new AppError(
        'INVALID_INPUT',
        'signedXdr is not a valid signed Stellar transaction',
        400,
      );
    }
  }

  private validateMerchantRelationship(customerMerchantId: string, merchantId: string) {
    return customerMerchantId === merchantId
      ? { valid: true as const }
      : { valid: false as const, error: 'Customer does not belong to this merchant' };
  }

  private validateRedeemAmount(currentStamps: number, stampsToClawback: number, required: number) {
    if (stampsToClawback <= 0) return { valid: false, error: 'Must clawback at least 1 stamp' };
    if (stampsToClawback > currentStamps) {
      return { valid: false, error: `Customer only has ${currentStamps} stamps` };
    }
    if (currentStamps < required) {
      return {
        valid: false,
        error: `Customer needs ${required} stamps to redeem, has ${currentStamps}`,
      };
    }
    if (stampsToClawback !== required) {
      return {
        valid: false,
        error: `Must clawback exactly ${required} stamps for full redemption`,
      };
    }
    return { valid: true };
  }

  private async issueStampDemo(
    customerId: string,
    merchantId: string,
    amount: number,
    currentStampCount: number,
  ): Promise<ConfirmedIntentResponse> {
    const txHash = mockTxHash(`issue-${customerId}-${Date.now()}`);
    await this.requireDb()
      .update(customers)
      .set({ stampCount: currentStampCount + amount })
      .where(eq(customers.id, customerId));
    const [event] = await this.requireDb()
      .insert(stampEvents)
      .values({ customerId, merchantId, eventType: 'issued', amount, txHash })
      .returning();
    return { status: 'confirmed', mode: 'demo', event, txHash };
  }

  private get demoStore(): DemoStore {
    return getDemoStore();
  }

  private requireDb(): Database {
    if (!this.db)
      throw new AppError('INTERNAL', 'Database is not configured outside demo mode', 500);
    return this.db;
  }

  private async redeemStampsDemo(
    customerId: string,
    merchantId: string,
    customer: { stampCount: number; totalRedeemed: number },
    merchant: { stampsToReward: number; rewardDescription: string },
  ): Promise<ConfirmedIntentResponse> {
    const txHash = mockTxHash(`clawback-${customerId}-${Date.now()}`);
    await this.requireDb()
      .update(customers)
      .set({
        stampCount: customer.stampCount - merchant.stampsToReward,
        totalRedeemed: customer.totalRedeemed + merchant.stampsToReward,
      })
      .where(eq(customers.id, customerId));
    await this.requireDb().insert(stampEvents).values({
      customerId,
      merchantId,
      eventType: 'clawback',
      amount: merchant.stampsToReward,
      txHash,
    });
    const [redemption] = await this.requireDb()
      .insert(redemptions)
      .values({
        customerId,
        merchantId,
        stampsUsed: merchant.stampsToReward,
        reward: merchant.rewardDescription,
      })
      .returning();
    return { status: 'confirmed', mode: 'demo', redemption, txHash };
  }
}
