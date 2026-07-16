/**
 * StampChain — pure business logic (no DB, no I/O).
 * All functions here are unit-tested.
 */

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
