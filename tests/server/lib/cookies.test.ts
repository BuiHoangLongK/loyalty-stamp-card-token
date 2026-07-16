import type { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { clearSessionCookie, readSessionCookie, setSessionCookie } from '@/server/lib/cookies';

describe('setSessionCookie', () => {
  it('appends a Set-Cookie header with the session id', () => {
    const res = new Response(null);
    setSessionCookie(res, 'sess-123');
    const header = res.headers.get('Set-Cookie') ?? '';
    expect(header).toContain('sess-123');
    expect(header).toContain('HttpOnly');
    expect(header).toContain('Max-Age=');
  });
});

describe('clearSessionCookie', () => {
  it('sets Max-Age=0 to expire the cookie', () => {
    const res = new Response(null);
    clearSessionCookie(res);
    const header = res.headers.get('Set-Cookie') ?? '';
    expect(header).toContain('Max-Age=0');
  });
});

describe('readSessionCookie', () => {
  it('returns the cookie value when present', () => {
    const req = {
      cookies: { get: () => ({ value: 'abc' }) },
    } as unknown as NextRequest;
    expect(readSessionCookie(req)).toBe('abc');
  });
  it('returns null when absent', () => {
    const req = {
      cookies: { get: () => undefined },
    } as unknown as NextRequest;
    expect(readSessionCookie(req)).toBeNull();
  });
});
