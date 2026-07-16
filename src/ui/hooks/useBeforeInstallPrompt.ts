'use client';

import { useCallback, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

type State = {
  /** True when the browser fires `beforeinstallprompt` and has not been used. */
  canInstall: boolean;
  /** True when the app is already installed (display-mode: standalone). */
  isInstalled: boolean;
  /** True when running in a browser that supports the install flow. SSR-safe. */
  isSupported: boolean;
};

const INITIAL: State = {
  canInstall: false,
  isInstalled: false,
  isSupported: false,
};

/**
 * Listens for the browser's `beforeinstallprompt` event so we can show an
 * install banner at a moment of our choosing. Also tracks the
 * `appinstalled` event and the `display-mode: standalone` media query so
 * the UI can hide the prompt once the app is installed.
 *
 * SSR-safe: returns INITIAL on the server; real values populate on mount.
 */
export function useBeforeInstallPrompt() {
  const [state, setState] = useState<State>(INITIAL);
  // Hold the deferred event in a ref-like value (state, not exposed) so the
  // `prompt()` callback can read it after the initial render.
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standaloneMq = window.matchMedia('(display-mode: standalone)');
    const updateInstalled = () => {
      setState((s) => ({ ...s, isInstalled: standaloneMq.matches }));
    };
    updateInstalled();
    // `addEventListener` is the modern API; older Safari falls back to addListener.
    if (standaloneMq.addEventListener) {
      standaloneMq.addEventListener('change', updateInstalled);
    } else {
      standaloneMq.addListener(updateInstalled);
    }

    const onBeforeInstall = (e: Event) => {
      // Prevent Chrome 67+ from showing the auto mini-infobar.
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setState((s) => ({ ...s, canInstall: true, isSupported: true }));
    };
    const onAppInstalled = () => {
      setState((s) => ({ ...s, canInstall: false, isInstalled: true }));
      setDeferred(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      if (standaloneMq.removeEventListener) {
        standaloneMq.removeEventListener('change', updateInstalled);
      } else {
        standaloneMq.removeListener(updateInstalled);
      }
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, []);

  const prompt = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    // After prompt(), most browsers will not re-fire beforeinstallprompt
    // in the same session, so clear the state regardless of the outcome.
    setDeferred(null);
    setState((s) => ({ ...s, canInstall: false }));
  }, [deferred]);

  return { ...state, prompt };
}
