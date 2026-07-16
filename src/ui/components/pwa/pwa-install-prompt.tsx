'use client';

import { DownloadIcon, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '@/ui/components/ui/button';
import { useBeforeInstallPrompt } from '@/ui/hooks/useBeforeInstallPrompt';

const DISMISS_KEY = 'pwa-install-dismissed';

/**
 * A dismissible, bottom-right banner that surfaces when the browser fires
 * `beforeinstallprompt`. Hides itself when the user has already installed
 * the app (display-mode: standalone) or has dismissed the prompt earlier
 * in the session.
 */
export function PwaInstallPrompt() {
  const { canInstall, isInstalled, prompt } = useBeforeInstallPrompt();
  const t = useTranslations('PWA');
  // SSR-safe: only read sessionStorage on mount.
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === '1');
  }, []);

  if (isInstalled || dismissed || !canInstall) return null;

  const handleInstall = async () => {
    await prompt();
  };

  const handleDismiss = () => {
    window.sessionStorage.setItem(DISMISS_KEY, '1');
    setDismissed(true);
  };

  return (
    <div
      role="dialog"
      aria-label={t('installTitle')}
      className="fixed inset-x-0 bottom-4 z-50 mx-auto flex max-w-sm items-start gap-3 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg sm:left-auto sm:right-4"
    >
      <DownloadIcon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
      <div className="flex-1 space-y-2">
        <p className="text-sm font-semibold leading-tight">{t('installTitle')}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{t('installDescription')}</p>
        <div className="flex items-center gap-2 pt-1">
          <Button size="sm" onClick={handleInstall}>
            {t('installButton')}
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDismiss}>
            {t('dismissButton')}
          </Button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={t('dismissButton')}
        className="text-muted-foreground hover:text-foreground"
      >
        <XIcon className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
