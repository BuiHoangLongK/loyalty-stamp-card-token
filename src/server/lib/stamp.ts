/**
 * StampChain — pure business logic (no DB, no I/O).
 * All functions here are unit-tested.
 */

import { StrKey } from '@stellar/stellar-sdk';

export const STELLAR_NETWORK_PASSPHRASES = {
  testnet: 'Test SDF Network ; September 2015',
  public: 'Public Global Stellar Network ; September 2015',
  futurenet: 'Test SDF Future Network ; October 2022',
} as const;

export type StellarNetwork = keyof typeof STELLAR_NETWORK_PASSPHRASES;
export type StampOperation = 'issue' | 'redeem';

export interface StampAssetConfig {
  assetCode: string;
  assetIssuer: string;
  network: StellarNetwork;
  networkPassphrase: string;
  horizonUrl: string;
}

export interface StampConfigValidation {
  valid: boolean;
  error?: string;
}

/**
 * Validate all chain identity fields before creating a real stamp intent.
 * The merchant controls the asset code/issuer; network identity is server
 * configuration and must never be taken from the request body.
 */
export function validateStampAssetConfig(config: StampAssetConfig): StampConfigValidation {
  if (!validateAssetCode(config.assetCode)) {
    return { valid: false, error: 'Asset code must be 1-12 uppercase letters or digits' };
  }
  if (!StrKey.isValidEd25519PublicKey(config.assetIssuer)) {
    return { valid: false, error: 'Asset issuer must be a valid Stellar public key' };
  }
  if (STELLAR_NETWORK_PASSPHRASES[config.network] !== config.networkPassphrase) {
    return { valid: false, error: 'Network passphrase does not match the configured network' };
  }
  try {
    new URL(config.horizonUrl);
  } catch {
    return { valid: false, error: 'Horizon URL must be a valid URL' };
  }
  return { valid: true };
}

/** Idempotency keys are opaque, bounded identifiers—not request payloads. */
export function validateIdempotencyKey(key: string | null | undefined): StampConfigValidation {
  if (!key) return { valid: false, error: 'Idempotency-Key header is required' };
  if (key.length < 8 || key.length > 128 || !/^[A-Za-z0-9._:-]+$/.test(key)) {
    return { valid: false, error: 'Idempotency-Key must be 8-128 safe characters' };
  }
  return { valid: true };
}

export interface HorizonStampOperation {
  type: string;
  assetCode?: string;
  assetIssuer?: string;
  amount?: string;
  from?: string;
  to?: string;
}

export interface HorizonStampProof {
  hash: string;
  successful: boolean;
  ledger: number;
  sourceAccount: string;
  networkPassphrase: string;
  operations: HorizonStampOperation[];
}

export interface StampProofExpectation {
  operation: StampOperation;
  amount: number;
  assetCode: string;
  assetIssuer: string;
  networkPassphrase: string;
  customerAddress: string;
  sourceAccount: string;
}

function normalizeAmount(value: string | number | undefined): string | null {
  if (value === undefined) return null;
  const raw = String(value);
  if (!/^\d+(?:\.\d+)?$/.test(raw)) return null;
  const [whole, fraction = ''] = raw.split('.');
  const normalizedFraction = fraction.replace(/0+$/, '');
  return normalizedFraction ? `${whole}.${normalizedFraction}` : whole;
}

/**
 * Validate the proof returned by our Horizon adapter. A client may suggest a
 * signed XDR, but it cannot supply this proof or choose the hash persisted by
 * the service.
 */
export function validateHorizonStampProof(
  proof: HorizonStampProof | null,
  expected: StampProofExpectation,
): StampConfigValidation {
  if (!proof) return { valid: false, error: 'Transaction was not found on Horizon' };
  if (!proof.successful) return { valid: false, error: 'Horizon reports the transaction failed' };
  if (!Number.isInteger(proof.ledger) || proof.ledger <= 0) {
    return { valid: false, error: 'Horizon proof has no confirmed ledger' };
  }
  if (!/^[A-F0-9]{64}$/i.test(proof.hash)) {
    return { valid: false, error: 'Horizon proof has an invalid transaction hash' };
  }
  if (proof.networkPassphrase !== expected.networkPassphrase) {
    return { valid: false, error: 'Horizon proof is for a different Stellar network' };
  }
  if (proof.sourceAccount !== expected.sourceAccount) {
    return { valid: false, error: 'Horizon proof has an unexpected transaction source' };
  }

  const expectedType = expected.operation === 'issue' ? 'payment' : 'clawback';
  const expectedAmount = normalizeAmount(expected.amount);
  const matchingOperation = proof.operations.some((operation) => {
    if (operation.type !== expectedType) return false;
    if (operation.assetCode !== expected.assetCode) return false;
    if (operation.assetIssuer !== expected.assetIssuer) return false;
    if (normalizeAmount(operation.amount) !== expectedAmount) return false;
    return expected.operation === 'issue'
      ? operation.to === expected.customerAddress
      : operation.from === expected.customerAddress;
  });

  return matchingOperation
    ? { valid: true }
    : { valid: false, error: 'Horizon proof does not match the pending stamp intent' };
}

// Stellar testnet asset code max is 12 chars
export function validateAssetCode(code: string): boolean {
  return /^[A-Z0-9]{1,12}$/.test(code);
}

// SEP-7 pay URI builder for stamp payment
export function buildSep7PayUri(params: {
  destination: string;
  amount: string;
  assetCode: string;
  assetIssuer: string;
  memo?: string;
  network?: string;
}): string {
  const { destination, amount, assetCode, assetIssuer, memo, network = 'testnet' } = params;
  const base = `web+stellar:pay?destination=${encodeURIComponent(destination)}`;
  const asset = `&asset_code=${encodeURIComponent(assetCode)}&asset_issuer=${encodeURIComponent(assetIssuer)}`;
  const amtPart = `&amount=${encodeURIComponent(amount)}`;
  const memoPart = memo ? `&memo=${encodeURIComponent(memo)}&memo_type=text` : '';
  const netPart =
    network === 'testnet'
      ? `&network_passphrase=${encodeURIComponent('Test SDF Network ; September 2015')}`
      : '';
  return `${base}${asset}${amtPart}${memoPart}${netPart}`;
}

// Check if customer has enough stamps to redeem
export function canRedeem(stampCount: number, stampsRequired: number): boolean {
  return stampCount >= stampsRequired;
}

// Check reward threshold
export function isAtThreshold(stampCount: number, stampsRequired: number): boolean {
  return stampCount >= stampsRequired;
}

// Stamps remaining until reward
export function stampsUntilReward(stampCount: number, stampsRequired: number): number {
  return Math.max(0, stampsRequired - stampCount);
}

// Validate clawback: must have >= required stamps
export function validateClawback(
  currentStamps: number,
  stampsToClawback: number,
  stampsRequired: number,
): { valid: boolean; error?: string } {
  if (stampsToClawback <= 0) return { valid: false, error: 'Must clawback at least 1 stamp' };
  if (stampsToClawback > currentStamps) {
    return { valid: false, error: `Customer only has ${currentStamps} stamps` };
  }
  if (currentStamps < stampsRequired) {
    return {
      valid: false,
      error: `Customer needs ${stampsRequired} stamps to redeem, has ${currentStamps}`,
    };
  }
  if (stampsToClawback !== stampsRequired) {
    return {
      valid: false,
      error: `Must clawback exactly ${stampsRequired} stamps for full redemption`,
    };
  }
  return { valid: true };
}

// Generate mock tx hash (deterministic for demo)
export function mockTxHash(seed: string): string {
  // Simple hash for demo — realistic looking
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  const base = Math.abs(h).toString(16).padStart(8, '0');
  return (base + base + base + base + base + base + base + base).slice(0, 64).toUpperCase();
}

// Trustline authorization state machine
export type TrustlineState = 'UNAUTHORIZED' | 'AUTHORIZED' | 'AUTHORIZED_TO_MAINTAIN_LIABILITIES';

export function nextTrustlineState(
  current: TrustlineState,
  action: 'authorize' | 'revoke' | 'freeze',
): TrustlineState {
  switch (action) {
    case 'authorize':
      return 'AUTHORIZED';
    case 'revoke':
      return 'UNAUTHORIZED';
    case 'freeze':
      return 'AUTHORIZED_TO_MAINTAIN_LIABILITIES';
    default:
      return current;
  }
}

// Stellar asset AUTH_CLAWBACK_ENABLED badge info
export interface AssetFlags {
  authRequired: boolean;
  authClawbackEnabled: boolean;
  authRevocable: boolean;
}

export function getAssetFlags(): AssetFlags {
  return {
    authRequired: true,
    authClawbackEnabled: true,
    authRevocable: true,
  };
}

// SSE event format helper
export function formatSseEvent(data: Record<string, unknown>): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

// CAP-33 sponsored reserve description
export function getSponsoredReserveInfo(sponsor: string, beneficiary: string): string {
  return `Merchant ${sponsor} sponsors trustline reserve for customer ${beneficiary} (CAP-33)`;
}

// Stamp progress percentage
export function stampProgress(stampCount: number, stampsRequired: number): number {
  return Math.min(100, Math.floor((stampCount / stampsRequired) * 100));
}

// Format stamp count display
export function formatStampDisplay(count: number, total: number): string {
  return `${count}/${total}`;
}
