import '@testing-library/jest-dom/vitest';

// jsdom doesn't expose Node's webcrypto on globalThis, and several libraries
// (notably @noble/hashes/crypto used by @stellar/stellar-sdk) capture
// globalThis.crypto at module-load time. We must inject it before any test
// file is imported.
import { webcrypto } from 'node:crypto';

if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true,
    writable: true,
  });
}

// Provide required env vars for tests that import modules which read env at
// module-load time. Real values are fine because these tests don't actually
// hit the network or DB — they only validate pure functions and types.
process.env.DRIZZLE_DATABASE_URL ??= 'postgres://test:test@localhost:5432/test';
process.env.SESSION_SECRET ??= 'test-session-secret-at-least-32-characters-long';
process.env.STELLAR_NETWORK ??= 'testnet';
process.env.STELLAR_HORIZON_URL ??= 'https://horizon-testnet.stellar.org';
process.env.STELLAR_NETWORK_PASSPHRASE ??= 'Test SDF Network ; September 2015';

// jsdom does not implement window.matchMedia. Several of our hooks (PWA
// install prompt, next-themes via class strategy, etc.) need it. Provide
// a minimal MediaQueryList stub that satisfies the add/remove listener
// pattern. Tests can override `matches` per call site as needed.
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => {
      const listeners = new Set<(e: MediaQueryListEvent) => void>();
      const mql: MediaQueryList = {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: (event: string, cb: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners.add(cb);
        },
        removeEventListener: (event: string, cb: (e: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners.delete(cb);
        },
        addListener: (cb: (e: MediaQueryListEvent) => void) => listeners.add(cb),
        removeListener: (cb: (e: MediaQueryListEvent) => void) => listeners.delete(cb),
        dispatchEvent: () => true,
      };
      return mql;
    },
  });
}
