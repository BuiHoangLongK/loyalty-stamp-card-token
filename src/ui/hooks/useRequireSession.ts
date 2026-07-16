'use client';

import { useSession } from './useSession';

export type RequireSessionState =
  | { status: 'loading'; publicKey: null }
  | { status: 'unauthenticated'; publicKey: null }
  | { status: 'authenticated'; publicKey: string };

export function useRequireSession(): RequireSessionState {
  const { session, loading } = useSession();
  if (loading) return { status: 'loading', publicKey: null };
  if (!session.publicKey) return { status: 'unauthenticated', publicKey: null };
  return { status: 'authenticated', publicKey: session.publicKey };
}
