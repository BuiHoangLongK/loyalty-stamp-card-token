import { describe, expect, it } from 'vitest';
import {
  buildSep7PayUri,
  canRedeem,
  formatSseEvent,
  formatStampDisplay,
  getAssetFlags,
  getSponsoredReserveInfo,
  isAtThreshold,
  mockTxHash,
  nextTrustlineState,
  stampProgress,
  stampsUntilReward,
  validateAssetCode,
  validateClawback,
} from '@/server/lib/stamp';

describe('validateAssetCode', () => {
  it('accepts valid codes', () => {
    expect(validateAssetCode('COFFEE')).toBe(true);
    expect(validateAssetCode('STAMP')).toBe(true);
    expect(validateAssetCode('A')).toBe(true);
  });
  it('rejects invalid codes', () => {
    expect(validateAssetCode('')).toBe(false);
    expect(validateAssetCode('toolongcode123')).toBe(false);
    expect(validateAssetCode('lower')).toBe(false);
  });
});

describe('buildSep7PayUri', () => {
  const params = {
    destination: 'GCOFFEEHOAXX',
    amount: '1',
    assetCode: 'COFFEE',
    assetIssuer: 'GCOFFEEISSUER',
  };
  it('builds valid SEP-7 URI', () => {
    const uri = buildSep7PayUri(params);
    expect(uri).toMatch(/^web\+stellar:pay\?/);
    expect(uri).toContain('destination=');
    expect(uri).toContain('asset_code=COFFEE');
  });
  it('includes memo when provided', () => {
    const uri = buildSep7PayUri({ ...params, memo: 'stamp-1' });
    expect(uri).toContain('memo=stamp-1');
  });
  it('omits memo when not provided', () => {
    const uri = buildSep7PayUri(params);
    expect(uri).not.toContain('memo=');
  });
  it('includes testnet passphrase', () => {
    const uri = buildSep7PayUri(params);
    expect(uri).toContain('network_passphrase=');
  });
  it('omits passphrase for public network', () => {
    const uri = buildSep7PayUri({ ...params, network: 'public' });
    expect(uri).not.toContain('network_passphrase=');
  });
});

describe('canRedeem', () => {
  it('returns true when stamps >= required', () => {
    expect(canRedeem(10, 10)).toBe(true);
    expect(canRedeem(15, 10)).toBe(true);
  });
  it('returns false when stamps < required', () => {
    expect(canRedeem(9, 10)).toBe(false);
    expect(canRedeem(0, 10)).toBe(false);
  });
});

describe('isAtThreshold', () => {
  it('detects threshold', () => {
    expect(isAtThreshold(10, 10)).toBe(true);
    expect(isAtThreshold(9, 10)).toBe(false);
  });
});

describe('stampsUntilReward', () => {
  it('calculates correctly', () => {
    expect(stampsUntilReward(8, 10)).toBe(2);
    expect(stampsUntilReward(10, 10)).toBe(0);
    expect(stampsUntilReward(15, 10)).toBe(0);
  });
});

describe('validateClawback', () => {
  it('validates full redemption', () => {
    expect(validateClawback(10, 10, 10).valid).toBe(true);
  });
  it('rejects partial clawback', () => {
    expect(validateClawback(10, 5, 10).valid).toBe(false);
  });
  it('rejects insufficient stamps', () => {
    const result = validateClawback(8, 10, 10);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('8');
  });
  it('rejects zero amount', () => {
    expect(validateClawback(10, 0, 10).valid).toBe(false);
  });
  it('rejects clawback larger than balance', () => {
    expect(validateClawback(5, 12, 10).valid).toBe(false);
  });
});

describe('mockTxHash', () => {
  it('returns 64-char uppercase string', () => {
    const hash = mockTxHash('test-seed');
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[A-F0-9]+$/);
  });
  it('is deterministic', () => {
    expect(mockTxHash('seed')).toBe(mockTxHash('seed'));
  });
  it('differs for different seeds', () => {
    expect(mockTxHash('a')).not.toBe(mockTxHash('b'));
  });
});

describe('nextTrustlineState', () => {
  it('authorizes from UNAUTHORIZED', () => {
    expect(nextTrustlineState('UNAUTHORIZED', 'authorize')).toBe('AUTHORIZED');
  });
  it('revokes from AUTHORIZED', () => {
    expect(nextTrustlineState('AUTHORIZED', 'revoke')).toBe('UNAUTHORIZED');
  });
  it('freezes to AUTHORIZED_TO_MAINTAIN_LIABILITIES', () => {
    expect(nextTrustlineState('AUTHORIZED', 'freeze')).toBe('AUTHORIZED_TO_MAINTAIN_LIABILITIES');
  });
});

describe('getAssetFlags', () => {
  it('returns correct Stellar flags', () => {
    const flags = getAssetFlags();
    expect(flags.authClawbackEnabled).toBe(true);
    expect(flags.authRequired).toBe(true);
    expect(flags.authRevocable).toBe(true);
  });
});

describe('formatSseEvent', () => {
  it('formats SSE data correctly', () => {
    const event = formatSseEvent({ type: 'issued', amount: 1 });
    expect(event).toMatch(/^data: /);
    expect(event).toMatch(/\n\n$/);
    expect(event).toContain('"type":"issued"');
  });
});

describe('getSponsoredReserveInfo', () => {
  it('returns CAP-33 info string', () => {
    const info = getSponsoredReserveInfo('MERCHANT', 'CUSTOMER');
    expect(info).toContain('CAP-33');
    expect(info).toContain('MERCHANT');
    expect(info).toContain('CUSTOMER');
  });
});

describe('stampProgress', () => {
  it('calculates percentage', () => {
    expect(stampProgress(5, 10)).toBe(50);
    expect(stampProgress(10, 10)).toBe(100);
    expect(stampProgress(15, 10)).toBe(100);
    expect(stampProgress(0, 10)).toBe(0);
  });
});

describe('formatStampDisplay', () => {
  it('formats as N/total', () => {
    expect(formatStampDisplay(8, 10)).toBe('8/10');
    expect(formatStampDisplay(0, 10)).toBe('0/10');
  });
});
