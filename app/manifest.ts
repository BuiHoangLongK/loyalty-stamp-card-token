import type { MetadataRoute } from 'next';

/**
 * Web App Manifest.
 *
 * Single, locale-agnostic manifest. The Web App Manifest spec uses one
 * manifest per origin; the in-page UI localizes the experience on first
 * load via `next-intl`. The brand string is kept in English to match the
 * installed app name shown on the home screen across all locales.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PayHub — Universal Merchant Payment Hub',
    short_name: 'PayHub',
    description: 'Accept crypto on any chain. Get paid in USDC on Stellar.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    lang: 'en',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
