'use client';

import { Check, ChevronDown, Copy, ExternalLink, Loader2, LogOut, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/components/ui/dropdown-menu';
import { Skeleton } from '@/ui/components/ui/skeleton';
import { useFreighter } from '@/ui/hooks/useFreighter';
import { useSession } from '@/ui/hooks/useSession';
import { useToast } from '@/ui/hooks/useToast';
import { truncateAddress } from '@/ui/lib/utils';

export function AccountChip() {
  const t = useTranslations('Account');
  const tNav = useTranslations('Nav');
  const tAuth = useTranslations('Auth');
  const {
    isAvailable,
    isConnected,
    loading: freighterLoading,
    connect,
    signAuthEntry,
    disconnect: disconnectFreighter,
  } = useFreighter();
  const { session, refresh, logout } = useSession();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  // While the Freighter availability check is in flight, render a skeleton
  // placeholder so the user does not see a flash of the "Install Freighter"
  // button (which is the wrong action for users who do have the extension
  // installed but the wallet has not yet reported back).
  if (freighterLoading) {
    return <Skeleton data-testid="account-chip-loading" className="h-8 w-28 rounded-full" />;
  }

  const onConnect = async () => {
    setBusy(true);
    try {
      const pk = await connect();
      if (!pk) return;
      const { txXdr } = await apiPostForm<{ txXdr: string }>('/api/auth/challenge', {
        publicKey: pk,
      });
      const signed = await signAuthEntry(txXdr);
      if (!signed) throw new Error('No signed auth entry returned');
      await apiPostForm('/api/auth/verify', { publicKey: pk, signedNonce: signed });
      await refresh();
      toast.success('Connected');
    } catch {
      toast.error(tAuth('verifyError'));
      disconnectFreighter();
    } finally {
      setBusy(false);
    }
  };

  const onDisconnect = async () => {
    await logout();
    disconnectFreighter();
  };

  const onCopy = async () => {
    if (!session.publicKey) return;
    try {
      await navigator.clipboard.writeText(session.publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast.success(t('copied'));
    } catch {
      toast.error(t('copyFailed'));
    }
  };

  if (!isAvailable) {
    return (
      <Button variant="outline" size="sm" asChild className="rounded-full">
        <a href="https://www.freighter.app/" target="_blank" rel="noreferrer">
          {tNav('installFreighter')}
        </a>
      </Button>
    );
  }

  if (!isConnected || !session.publicKey) {
    return (
      <Button
        onClick={onConnect}
        disabled={busy}
        size="sm"
        className="rounded-full"
        data-testid="account-chip-connect"
      >
        {busy ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {tNav('connecting')}
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            {tNav('connectWallet')}
          </>
        )}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full font-mono"
          data-testid="account-chip"
        >
          {truncateAddress(session.publicKey, 4, 4)}
          <ChevronDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <p className="text-xs text-muted-foreground">{t('freighterStellar')}</p>
          <p className="mt-1 break-all font-mono text-xs">{session.publicKey}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onCopy}>
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-success" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {t('copyAddress')}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://stellar.expert/explorer/testnet/account/${session.publicKey}`}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            {t('viewOnExplorer')}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <Wallet className="mr-2 h-4 w-4" />
            {t('dashboard')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={onDisconnect}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {tNav('disconnect')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

async function apiPostForm<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error?.message ?? 'Request failed');
  return json.data as T;
}
