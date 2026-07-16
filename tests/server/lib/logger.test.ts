import { afterEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@/server/lib/logger';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('logger emit levels', () => {
  it('info goes to console.log', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.info('hello', { a: 1 });
    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0]).toContain('"msg":"hello"');
  });
  it('warn goes to console.warn', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    logger.warn('careful');
    expect(spy).toHaveBeenCalledOnce();
  });
  it('error goes to console.error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('boom');
    expect(spy).toHaveBeenCalledOnce();
  });
  it('debug logs outside production', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    logger.debug('dbg');
    expect(spy).toHaveBeenCalledOnce();
  });
});

describe('logger.pubkey', () => {
  it('returns <none> for empty', () => {
    expect(logger.pubkey(null)).toBe('<none>');
    expect(logger.pubkey(undefined)).toBe('<none>');
  });
  it('returns short keys unchanged', () => {
    expect(logger.pubkey('SHORT')).toBe('SHORT');
  });
  it('truncates long keys with ellipsis', () => {
    const out = logger.pubkey('GABCDEFGHIJKLMNOPQRSTUVWXYZ123456');
    expect(out).toContain('…');
    expect(out.startsWith('GABCDEFG')).toBe(true);
  });
});
