'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/ui/components/ui/button';
import { apiGet, apiPost } from '@/ui/lib/api';
import { DEMO_MERCHANT, getDemoCustomer, getDemoCustomerEvents } from './demo-data';
import { StampCardVisual } from './stamp-card-visual';
import type { Customer, Merchant, StampEvent } from './types';

export function StampCustomer({ customerId }: { customerId: string }) {
  const demoCustomer = getDemoCustomer(customerId);
  const [customer, setCustomer] = useState<Customer | null>(demoCustomer ?? null);
  const [merchant, setMerchant] = useState<Merchant | null>(demoCustomer ? DEMO_MERCHANT : null);
  const [events, setEvents] = useState<StampEvent[]>(
    demoCustomer ? getDemoCustomerEvents(customerId) : [],
  );
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (demoCustomer) {
      setCustomer(demoCustomer);
      setMerchant(DEMO_MERCHANT);
      setEvents(getDemoCustomerEvents(customerId));
      return;
    }
    const c = await apiGet<Customer>(`/api/stamps/customers/${customerId}`);
    setCustomer(c);
    const [m, evs] = await Promise.all([
      apiGet<Merchant>(`/api/stamps/merchants/${c.merchantId}`),
      apiGet<StampEvent[]>(`/api/stamps/customers/${customerId}/events`),
    ]);
    setMerchant(m);
    setEvents(evs);
  }, [customerId, demoCustomer]);

  useEffect(() => {
    load().catch(() => toast.error('Customer not found'));
  }, [load]);

  const total = merchant?.stampsToReward ?? 10;
  const ready = (customer?.stampCount ?? 0) >= total;

  const redeem = async () => {
    if (!merchant || !customer) return;
    setBusy(true);
    try {
      if (customer.id.startsWith('demo-')) {
        setCustomer({
          ...customer,
          stampCount: 0,
          totalRedeemed: customer.totalRedeemed + total,
        });
        toast.success('Demo reward redeemed — stamps clawed back locally.');
        return;
      }
      await apiPost(`/api/stamps/customers/${customer.id}/redeem`, { merchantId: merchant.id });
      toast.success('Reward redeemed! Stamps clawed back on Stellar.');
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Redeem failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 font-sans text-sm text-violet-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <h1 className="font-sans text-3xl font-extrabold text-foreground">
        {customer?.name ?? 'Customer'}
      </h1>
      <p className="font-body text-muted-foreground">
        {merchant?.name ?? "Hoa's Coffee"} · {merchant?.rewardDescription ?? 'Free reward'}
      </p>

      <div className="mt-6">
        <StampCardVisual count={customer?.stampCount ?? 0} total={total} />
      </div>

      {ready ? (
        <Button
          data-testid="redeem-btn"
          className="mt-6 w-full bg-violet-600 py-6 text-base hover:bg-violet-700"
          disabled={busy}
          onClick={redeem}
        >
          🎁 Redeem free reward (AUTH_CLAWBACK)
        </Button>
      ) : (
        <p className="mt-6 rounded-xl bg-violet-50 px-4 py-3 text-center font-body text-sm text-violet-700">
          Collect {total - (customer?.stampCount ?? 0)} more stamp
          {total - (customer?.stampCount ?? 0) === 1 ? '' : 's'} to unlock your reward.
        </p>
      )}

      {/* Transaction history */}
      <div className="mt-8">
        <h2 className="mb-3 font-sans text-lg font-bold text-foreground">Stamp history</h2>
        <ul data-testid="tx-history" className="space-y-2">
          {events.length === 0 ? (
            <li className="font-body text-sm text-muted-foreground">No stamp activity yet.</li>
          ) : (
            events.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3 text-sm"
              >
                <span className="font-sans font-medium capitalize text-violet-700">
                  {e.eventType === 'clawback' ? 'Reward redeemed' : 'Stamp issued'}
                </span>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${e.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-muted-foreground hover:text-violet-600 hover:underline"
                >
                  {e.txHash.slice(0, 12)}…
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
