'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { apiGet, apiPost } from '@/ui/lib/api';

type Session = { publicKey: string | null };

type Snapshot = {
  session: Session;
  loading: boolean;
};

// Module-level singleton state. One source of truth shared by every
// component that calls useSession(). All consumers re-render on changes
// (driven by useSyncExternalStore's listener mechanism).
let state: Snapshot = {
  session: { publicKey: null },
  loading: true,
};
const listeners = new Set<() => void>();

// In-flight fetch dedupe. When 5+ components mount on the same page
// (SiteHeader, AccountChip, RequireAuth, page body, data hooks), each
// runs its useEffect in the same render cycle. Without this guard, each
// one would see `state.loading === true` and fire its own /api/auth/me
// call in parallel — a 5x amplification of one network request. The guard
// collapses concurrent calls onto the same in-flight promise; only the
// first call triggers a real network fetch, the rest await the result.
let inFlightRefresh: Promise<void> | null = null;

function emit() {
  for (const l of listeners) l();
}

function setState(next: Snapshot) {
  state = next;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return state;
}

// SSR safety: useSyncExternalStore requires the same reference between
// renders on the server. We return a frozen constant snapshot so React
// doesn't infinite-loop.
const SSR_SNAPSHOT: Snapshot = Object.freeze({
  session: Object.freeze({ publicKey: null }) as Session,
  loading: true,
}) as Snapshot;
function getServerSnapshot() {
  return SSR_SNAPSHOT;
}

async function fetchAndStoreSession(): Promise<void> {
  try {
    const data = await apiGet<{ publicKey: string | null }>('/api/auth/me');
    setState({ session: { publicKey: data.publicKey }, loading: false });
  } catch {
    setState({ session: { publicKey: null }, loading: false });
  } finally {
    inFlightRefresh = null;
  }
}

export function useSession() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const refresh = useCallback(async () => {
    if (inFlightRefresh) return inFlightRefresh;
    inFlightRefresh = fetchAndStoreSession();
    return inFlightRefresh;
  }, []);

  useEffect(() => {
    // Trigger the first fetch on mount. Concurrent mounts (5+ components
    // in the same render cycle) all call refresh(), but the in-flight
    // promise guard above ensures only one network call fires.
    if (state.loading) {
      void refresh();
    }
  }, [refresh]);

  const logout = useCallback(async () => {
    try {
      await apiPost('/api/auth/logout');
    } finally {
      setState({ session: { publicKey: null }, loading: false });
    }
  }, []);

  return { session: snap.session, loading: snap.loading, refresh, logout };
}
