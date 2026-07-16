'use client';

import { ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Button } from '@/ui/components/ui/button';
import { Card, CardContent } from '@/ui/components/ui/card';
import { useRequireSession } from '@/ui/hooks/useRequireSession';

// Routes that are part of the sign-in flow itself. The gate's CTA links to
// `/connect`, so the gate would otherwise trap users on that page (the CTA
// would link to the same URL and the actual sign-in UI would never render).
// Conversely, an *already-authenticated* user landing on `/connect` is
// redirected to `/dashboard` (see the effect below) so a second Freighter
// sign-in can't replace the active session with a different wallet.
const PASSTHROUGH_PREFIXES = ['/connect'];

export function RequireAuth({ children }: { children: ReactNode }) {
  const t = useTranslations('Auth');
  const state = useRequireSession();
  const pathname = usePathname();
  const router = useRouter();

  // Block re-auth on the sign-in route. We only redirect once the session
  // resolves to `authenticated` (not during `loading`) so the connect page
  // can render its own skeleton for users who are genuinely not signed in.
  // `router.replace` (not `push`) keeps the back button from bouncing the
  // user back to `/connect` after the redirect.
  useEffect(() => {
    if (state.status !== 'authenticated') return;
    if (!PASSTHROUGH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
      return;
    }
    router.replace('/dashboard');
  }, [state.status, pathname, router]);

  // Sign-in flow is always reachable. Render the page's own UI directly so
  // the user sees provider options (Freighter etc.), not the gate's CTA.
  if (PASSTHROUGH_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return <>{children}</>;
  }

  if (state.status === 'loading') {
    // During loading, render children (the page itself) so the page can show its
    // own shape-specific skeleton (e.g. invoices table, dark balance card) instead
    // of a generic placeholder. When the session resolves to unauthenticated, the
    // gate's CTA replaces everything below.
    return <>{children}</>;
  }

  if (state.status === 'unauthenticated') {
    return (
      <div
        data-testid="require-auth-cta"
        className="mx-auto flex max-w-md flex-col items-center px-4 py-16"
      >
        <Card className="w-full">
          <CardContent className="space-y-4 p-10 text-center">
            <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground" />
            <div className="space-y-1">
              <h2 className="text-xl font-light text-foreground">{t('gate.title')}</h2>
              <p className="text-sm text-muted-foreground">{t('gate.subtitle')}</p>
            </div>
            <div className="flex justify-center pt-2">
              <Button asChild className="rounded-full" size="lg">
                <Link href="/connect">{t('gate.connect')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
