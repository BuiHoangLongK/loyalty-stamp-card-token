'use client';

import { useMemo } from 'react';

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Returns a stable Idempotency-Key for the lifetime of the calling
 * component. Reset by changing the `seed` argument (e.g. after a successful
 * submit) so the next call uses a fresh key.
 */
export function useIdempotencyKey(seed?: string | number): string {
  // biome-ignore lint/correctness/useExhaustiveDependencies: seed intentionally triggers a fresh key
  return useMemo(() => uuid(), [seed]);
}
