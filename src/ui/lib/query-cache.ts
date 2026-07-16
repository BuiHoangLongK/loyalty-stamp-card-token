// Module-level query cache for data-fetching hooks.
//
// Problem: data hooks (useMerchant, useInvoices, useWallets, ...)
// re-fetch on every page mount. With client-side navigation, moving
// /dashboard → /wallet → /dashboard triggers three round trips for the
// same `/api/merchants` payload even though the data has not changed.
// The user sees the same loading skeleton flash repeatedly and the
// server is hit for no reason.
//
// Solution: a small TTL cache shared at module scope, keyed by the
// request URL (+ serialized params). Each entry stores the response
// payload and a timestamp. On `cachedApiGet(url, params, ttl)`:
//   - if a fresh entry exists, return it immediately (no network call);
//   - if an in-flight promise exists for the key, await it (dedupe
//     concurrent mounts of the same hook);
//   - otherwise call the API, store the result, and return it.
//
// `peekCache(url, params)` is a synchronous read used by hooks to seed
// their initial state from the cache so the component does not flash
// a loading skeleton on re-mount when fresh data is already available.
// `invalidateCache(prefix?)` lets write paths (create / delete / cancel)
// bust the affected entries.

import { api, type Envelope } from './api';

type CacheEntry<T> = { data: T; ts: number };

const store = new Map<string, CacheEntry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

/** Default freshness window. Tuned to cover normal client-side
 *  navigation (page-to-page) while still letting background data
 *  refresh within a reasonable window. */
export const DEFAULT_TTL_MS = 10_000;

function buildKey(url: string, params?: Record<string, unknown>): string {
  if (!params || Object.keys(params).length === 0) return url;
  const entries = Object.keys(params)
    .sort()
    .map((k) => [k, params[k]] as const);
  return `${url}?${JSON.stringify(entries)}`;
}

/** Synchronous cache lookup. Returns the cached value if it is still
 *  within the freshness window, otherwise null. */
export function peekCache<T>(
  url: string,
  params?: Record<string, unknown>,
  ttl = DEFAULT_TTL_MS,
): T | null {
  const key = buildKey(url, params);
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > ttl) return null;
  return entry.data as T;
}

/** Drop one cache entry, a URL prefix, or everything. */
export function invalidateCache(target?: string): void {
  if (!target) {
    store.clear();
    inFlight.clear();
    return;
  }
  for (const key of Array.from(store.keys())) {
    if (key === target || key.startsWith(target)) {
      store.delete(key);
      inFlight.delete(key);
    }
  }
}

/** Like `apiGet`, but reads/writes the module-level cache. Concurrent
 *  callers for the same key share one in-flight promise, and fresh
 *  entries are returned without a network round trip. */
export async function cachedApiGet<T>(
  url: string,
  params?: Record<string, unknown>,
  ttl = DEFAULT_TTL_MS,
): Promise<T> {
  const key = buildKey(url, params);

  const hit = store.get(key);
  if (hit && Date.now() - hit.ts <= ttl) {
    return hit.data as T;
  }

  const pending = inFlight.get(key);
  if (pending) {
    return pending as Promise<T>;
  }

  const promise = api
    .get<Envelope<T>>(url, { params })
    .then((res) => {
      if (!res.data.ok) throw new Error(res.data.error.message);
      store.set(key, { data: res.data.data, ts: Date.now() });
      return res.data.data;
    })
    .finally(() => {
      inFlight.delete(key);
    });

  inFlight.set(key, promise);
  return promise;
}
