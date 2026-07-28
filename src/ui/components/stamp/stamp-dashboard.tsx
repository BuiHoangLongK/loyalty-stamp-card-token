'use client';

import { Plus, ShieldCheck, Users } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/ui/components/ui/button';
import { apiGet, apiPost } from '@/ui/lib/api';
import { DEMO_CUSTOMERS, DEMO_MERCHANT, DEMO_STATS } from './demo-data';
import { MainnetRedeemAction } from './mainnet-redeem-action';
import type { Customer, Merchant, MerchantStats } from './types';

export function StampDashboard() {
  const [merchant, setMerchant] = useState<Merchant | null>(DEMO_MERCHANT);
  const [customers, setCustomers] = useState<Customer[]>(DEMO_CUSTOMERS);
  const [stats, setStats] = useState<MerchantStats | null>(DEMO_STATS);
  const [isDemo, setIsDemo] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    const merchants = await apiGet<Merchant[]>('/api/stamps/merchants');
    const m = merchants[0];
    if (!m) return;
    setMerchant(m);
    const [cs, st] = await Promise.all([
      apiGet<Customer[]>(`/api/stamps/merchants/${m.id}/customers`),
      apiGet<MerchantStats>(`/api/stamps/merchants/${m.id}/stats`),
    ]);
    setCustomers(cs);
    setStats(st);
    setIsDemo(false);
  }, []);

  useEffect(() => {
    load().catch(() => setIsDemo(true));
  }, [load]);

  const issue = async (customerId: string) => {
    if (!merchant) return;
    setBusy(customerId);
    try {
      if (customerId.startsWith('demo-')) {
        setCustomers((current) =>
          current.map((customer) => {
            if (customer.id !== customerId) return customer;
            return {
              ...customer,
              stampCount: Math.min(customer.stampCount + 1, total),
            };
          }),
        );
        setStats((current) =>
          current ? { ...current, totalStampsIssued: current.totalStampsIssued + 1 } : current,
        );
        toast.success('Demo stamp added — ready for the next walkthrough step');
        return;
      }
      await apiPost(`/api/stamps/customers/${customerId}/issue`, { merchantId: merchant.id });
      toast.success('Stamp issued on-chain (mint to trustline)');
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Issue failed');
    } finally {
      setBusy(null);
    }
  };

  const redeem = async (customerId: string) => {
    if (!merchant) return;
    setBusy(customerId);
    try {
      if (customerId.startsWith('demo-')) {
        setCustomers((current) =>
          current.map((customer) =>
            customer.id === customerId
              ? {
                  ...customer,
                  stampCount: 0,
                  totalRedeemed: customer.totalRedeemed + total,
                }
              : customer,
          ),
        );
        setStats((current) =>
          current
            ? {
                ...current,
                readyToRedeem: Math.max(0, current.readyToRedeem - 1),
                totalRedemptions: current.totalRedemptions + 1,
              }
            : current,
        );
        toast.success('Demo reward redeemed — stamps clawed back locally');
        return;
      }
      await apiPost(`/api/stamps/customers/${customerId}/redeem`, { merchantId: merchant.id });
      toast.success('Reward redeemed via AUTH_CLAWBACK — stamps clawed back');
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Redeem failed');
    } finally {
      setBusy(null);
    }
  };

  const total = merchant?.stampsToReward ?? 10;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <h1 className="font-sans text-3xl font-extrabold text-foreground">Merchant Dashboard</h1>
        <p className="font-body text-muted-foreground">
          {merchant?.name ?? "Hoa's Coffee — Hanoi"} · issue stamps and redeem rewards on Stellar
        </p>
        {isDemo ? (
          <p className="mt-2 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
            Demo preview · no wallet or database required
          </p>
        ) : null}
      </header>

      <MainnetRedeemAction />

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <StatCard label="Customers" value={stats?.totalCustomers ?? 0} icon={Users} />
        <StatCard
          label="Ready to redeem"
          value={stats?.readyToRedeem ?? 0}
          icon={ShieldCheck}
          highlight
        />
        <StatCard label="Stamps issued" value={stats?.totalStampsIssued ?? 0} icon={Plus} />
        <StatCard label="Redemptions" value={stats?.totalRedemptions ?? 0} icon={ShieldCheck} />
      </div>

      {/* Customer list */}
      <div
        data-testid="customer-list"
        className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm"
      >
        <table className="min-w-[680px] w-full text-sm">
          <thead className="bg-violet-50 text-left font-sans text-xs uppercase tracking-wide text-violet-700">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Stamps</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((c) => {
              const ready = c.stampCount >= total;
              return (
                <tr key={c.id} data-testid="customer-row">
                  <td className="px-4 py-3">
                    <p className="font-sans font-semibold text-foreground">{c.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {c.stellarAddress.slice(0, 12)}…
                    </p>
                  </td>
                  <td className="px-4 py-3 font-sans font-bold text-violet-700">
                    {c.stampCount}/{total}
                  </td>
                  <td className="px-4 py-3">
                    {ready ? (
                      <span className="rounded-full bg-violet-600 px-2.5 py-1 text-xs font-semibold text-white">
                        Ready
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-muted-foreground">
                        Collecting
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={busy === c.id || c.stampCount >= total}
                        onClick={() => issue(c.id)}
                      >
                        + Stamp
                      </Button>
                      <Button
                        size="sm"
                        data-testid="clawback-btn"
                        className="bg-violet-600 hover:bg-violet-700"
                        disabled={busy === c.id || !ready}
                        onClick={() => redeem(c.id)}
                      >
                        Redeem (clawback)
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: number;
  icon: typeof Users;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight ? 'border-violet-300 bg-violet-50' : 'border-border bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-body text-xs text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-violet-500" />
      </div>
      <p className="mt-1 font-sans text-2xl font-extrabold text-foreground">{value}</p>
    </div>
  );
}
