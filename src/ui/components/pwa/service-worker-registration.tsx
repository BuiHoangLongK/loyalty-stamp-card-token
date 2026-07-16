'use client';

import { useEffect } from 'react';

/**
 * Registers `/sw.js` once on mount. In development, the service worker is
 * skipped to avoid interfering with Turbopack HMR. The registration is
 * intentionally not unregistered on unmount: the SW must persist across
 * client-side navigations to do its job.
 */
export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    // Defer registration so it does not block first paint.
    const handle = window.setTimeout(() => {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
        // Surface to the console; do not throw — the app must still work.
        // eslint-disable-next-line no-console
        console.error('[pwa] service worker registration failed', err);
      });
    }, 0);

    return () => window.clearTimeout(handle);
  }, []);

  return null;
}
