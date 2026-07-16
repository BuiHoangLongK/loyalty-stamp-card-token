'use client';

import {
  getAddress as freighterGetAddress,
  getNetworkDetails as freighterGetNetworkDetails,
  isConnected as freighterIsConnected,
  requestAccess as freighterRequestAccess,
  signTransaction as freighterSignTransaction,
} from '@stellar/freighter-api';
import { useCallback, useEffect, useState } from 'react';

type State = {
  publicKey: string | null;
  isAvailable: boolean;
  isConnected: boolean;
  loading: boolean;
  error: string | null;
};

const INITIAL: State = {
  publicKey: null,
  isAvailable: false,
  isConnected: false,
  loading: true,
  error: null,
};

/**
 * Race a Freighter API call against a timeout. The documented
 * behavior is that `isConnected()` resolves with
 * `{ isConnected: false }` for users without the extension
 * (Connecting_Freight.md), but the message-passing layer can still
 * hang in edge cases (content script never responds, extension
 * disabled mid-load, etc.). The timeout is a safety net that forces
 * the hook to settle so the UI can degrade to the "Install
 * Freighter" branch instead of a permanent skeleton.
 */
function withTimeout<T>(promise: PromiseLike<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Freighter ${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([Promise.resolve(promise), timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  }) as Promise<T>;
}

const AVAILABILITY_TIMEOUT_MS = 2_000;
const SIGN_TIMEOUT_MS = 90_000;

export function useFreighter() {
  const [state, setState] = useState<State>(INITIAL);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Per Connecting_Freight.md: `isConnected()` returns
      // `{ isConnected: false }` for any user without the extension
      // — not just mobile users. The same call resolves with `true`
      // when the extension is installed, regardless of whether the
      // wallet is locked or the app has been authorized. So a
      // `false` result is the canonical "not installed" signal.
      try {
        const { isConnected: connected } = await withTimeout(
          freighterIsConnected(),
          AVAILABILITY_TIMEOUT_MS,
          'isConnected',
        );
        if (cancelled) return;

        if (!connected) {
          // Extension is not installed. Show the Install CTA.
          setState({ ...INITIAL, loading: false });
          return;
        }

        // Extension is installed. Try to read the address — this
        // resolves immediately if the user has previously authorized
        // the app, or prompts for permission otherwise. Failure
        // (denied / locked) means the extension is present but the
        // wallet is not yet connected.
        try {
          const { address } = await withTimeout(
            freighterGetAddress(),
            AVAILABILITY_TIMEOUT_MS,
            'getAddress',
          );
          if (cancelled) return;
          setState({
            publicKey: address,
            isAvailable: true,
            isConnected: true,
            loading: false,
            error: null,
          });
        } catch {
          if (cancelled) return;
          setState({ ...INITIAL, isAvailable: true, loading: false });
        }
      } catch {
        // isConnected timed out or threw. Treat as not installed.
        if (cancelled) return;
        setState({ ...INITIAL, loading: false });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const connect = useCallback(async () => {
    try {
      const { address } = await withTimeout(
        freighterRequestAccess(),
        AVAILABILITY_TIMEOUT_MS,
        'requestAccess',
      );
      setState({
        publicKey: address,
        isAvailable: true,
        isConnected: true,
        loading: false,
        error: null,
      });
      return address;
    } catch (err) {
      setState((s) => ({ ...s, error: (err as Error).message }));
      return null;
    }
  }, []);

  const disconnect = useCallback(() => {
    setState((s) => ({ ...s, isConnected: false, publicKey: null }));
  }, []);

  const signAuthEntry = useCallback(
    async (entryXdr: string) => {
      const pk = state.publicKey;
      if (!pk) throw new Error('Wallet not connected');
      const { networkPassphrase } = await withTimeout(
        freighterGetNetworkDetails(),
        AVAILABILITY_TIMEOUT_MS,
        'getNetworkDetails',
      );
      const result = await withTimeout(
        freighterSignTransaction(entryXdr, { address: pk, networkPassphrase }),
        SIGN_TIMEOUT_MS,
        'signTransaction',
      );
      if ('error' in result && result.error) throw new Error(String(result.error));
      return (result as { signedTxXdr: string }).signedTxXdr;
    },
    [state.publicKey],
  );

  return { ...state, connect, disconnect, signAuthEntry };
}
