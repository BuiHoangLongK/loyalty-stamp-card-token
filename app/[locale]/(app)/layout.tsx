import type { ReactNode } from 'react';
import { SiteFooter } from '@/ui/components/layout/site-footer';
import { SiteHeader } from '@/ui/components/layout/site-header';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
