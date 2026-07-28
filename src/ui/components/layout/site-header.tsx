'use client';

import { Stamp } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ThemeToggle } from '@/ui/components/shared/theme-toggle';
import { AccountChip } from './account-chip';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600">
            <Stamp className="h-4 w-4 text-white" />
          </div>
          <span className="font-sans text-xl font-bold text-violet-600">StampChain</span>
        </Link>
        <nav className="ml-6 hidden items-center gap-6 text-sm md:flex">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Merchant Dashboard
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-xs text-muted-foreground md:block">
            Stamps{' '}
            <span className="rounded-full bg-violet-100 px-2 py-0.5 font-medium text-violet-700">
              AUTH_CLAWBACK
            </span>
          </span>
          <ThemeToggle />
          <AccountChip />
        </div>
      </div>
    </header>
  );
}
