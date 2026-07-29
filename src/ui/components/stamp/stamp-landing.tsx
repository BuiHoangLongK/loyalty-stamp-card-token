'use client';

import { Coffee, QrCode, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { QrImage } from '@/ui/components/shared/qr-image';
import { Button } from '@/ui/components/ui/button';
import { apiGet } from '@/ui/lib/api';
import { DEMO_CUSTOMERS, DEMO_EVENTS, DEMO_MERCHANT } from './demo-data';
import { StampCardVisual } from './stamp-card-visual';
import type { Customer, Merchant, StampEvent } from './types';

const FEATURE_BADGES = [
  { label: 'AUTH_CLAWBACK_ENABLED', icon: ShieldCheck },
  { label: 'SEP-7 pay URI', icon: QrCode },
  { label: 'CAP-33 sponsored', icon: Zap },
];

export function StampLanding() {
  const [merchant, setMerchant] = useState<Merchant | null>(DEMO_MERCHANT);
  const [customers, setCustomers] = useState<Customer[]>(DEMO_CUSTOMERS);
  const [events, setEvents] = useState<StampEvent[]>(DEMO_EVENTS);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const merchants = await apiGet<Merchant[]>('/api/stamps/merchants');
        const m = merchants[0];
        if (!m || cancelled) return;
        setMerchant(m);
        const [cs, evs] = await Promise.all([
          apiGet<Customer[]>(`/api/stamps/merchants/${m.id}/customers`),
          fetchStream(m.id),
        ]);
        if (cancelled) return;
        setCustomers(cs);
        setEvents(evs);
      } catch {
        // The UI starts with the local demo fixture, so a missing database does
        // not interrupt the landing-page walkthrough.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = customers[0];
  const stampsToReward = merchant?.stampsToReward ?? 10;
  const sep7Uri = merchant
    ? `web+stellar:pay?destination=${merchant.assetIssuer}&asset_code=${merchant.assetCode}&amount=1`
    : 'web+stellar:pay?destination=GCOFFEEHOA&asset_code=COFFEE&amount=1';

  return (
    <div
      data-testid="two-panel-layout"
      className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2 lg:gap-12"
    >
      {/* LEFT PANEL — brand + stamp card */}
      <section className="flex flex-col justify-center">
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 font-sans text-sm font-semibold text-violet-700">
          <Sparkles className="h-4 w-4" /> Tokenized loyalty on Stellar
        </div>
        <h1 className="font-sans text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
          Stamp cards that <span className="text-violet-600">can&apos;t be faked</span>.
        </h1>
        <p className="mt-4 max-w-xl font-body text-lg text-muted-foreground">
          StampChain turns every coffee into a Stellar token. Customers collect {stampsToReward}{' '}
          stamps, then the merchant claws back the full card for a free reward — all on-chain, no
          paper, no fraud.
        </p>

        <div className="mt-8 max-w-md">
          <StampCardVisual count={featured?.stampCount ?? 8} total={stampsToReward} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {FEATURE_BADGES.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-white px-3 py-2 font-mono text-xs font-medium text-violet-700"
            >
              <Icon className="h-4 w-4" /> {label}
            </span>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <Button asChild className="bg-violet-600 hover:bg-violet-700">
            <Link href="/dashboard">Open Merchant Dashboard</Link>
          </Button>
          {featured ? (
            <Button asChild variant="outline">
              <Link href={`/stamp/${featured.id}`}>View a customer card</Link>
            </Button>
          ) : null}
        </div>
      </section>

      {/* RIGHT PANEL — merchant + QR + live feed */}
      <section data-testid="qr-section" className="flex flex-col gap-6">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-violet-600 to-violet-800 p-8 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Coffee className="h-6 w-6" />
            </div>
            <div>
              <p className="font-sans text-xl font-bold">
                {merchant?.name ?? "Hoa's Coffee — Hanoi"}
              </p>
              <p className="font-body text-sm text-violet-100">
                Đặng Thị Hoa · chủ quán cà phê · Hà Nội
              </p>
            </div>
          </div>
          <p className="mt-5 font-body text-violet-50">
            Reward:{' '}
            <span className="font-semibold">
              {merchant?.rewardDescription ?? 'Free Iced Latte (trị giá ₫45,000)'}
            </span>
          </p>
          <div className="mt-3 flex gap-3 font-mono text-xs text-violet-100">
            <span>Asset: {merchant?.assetCode ?? 'COFFEE'}</span>
            <span>·</span>
            <span>Stellar Testnet</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-white p-8 shadow-sm">
          <p className="font-sans text-sm font-semibold text-violet-700">
            Scan to collect a stamp (SEP-7)
          </p>
          <div className="rounded-2xl border-4 border-violet-100 p-2">
            <QrImage value={sep7Uri} size={200} />
          </div>
          <p className="break-all text-center font-mono text-[10px] text-muted-foreground">
            {sep7Uri.slice(0, 64)}…
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
          <p className="mb-3 font-sans text-sm font-semibold text-foreground">
            Recent stamp events
          </p>
          <ul data-testid="event-feed" className="space-y-2">
            {events.length === 0 ? (
              <li className="font-body text-sm text-muted-foreground">No events yet.</li>
            ) : (
              events.slice(0, 5).map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between rounded-lg bg-violet-50 px-3 py-2 text-sm"
                >
                  <span className="font-sans font-medium capitalize text-violet-700">
                    {e.eventType}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {e.txHash.slice(0, 10)}…
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

async function fetchStream(merchantId: string): Promise<StampEvent[]> {
  try {
    const res = await fetch(`/api/stamps/events/stream?merchantId=${merchantId}`);
    const text = await res.text();
    const line = text.split('\n\n').find((l) => l.startsWith('data: '));
    if (!line) return [];
    const json = JSON.parse(line.replace('data: ', ''));
    return (json.events as StampEvent[]) ?? [];
  } catch {
    return [];
  }
}
