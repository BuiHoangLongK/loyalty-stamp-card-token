'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/ui/components/ui/button';
import { truncateAddress } from '@/ui/lib/utils';

export function AddressBadge({ publicKey }: { publicKey: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-muted/40 px-2 py-1 font-mono text-xs">
      <span title={publicKey}>{truncateAddress(publicKey)}</span>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onCopy} aria-label="Copy">
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </Button>
    </div>
  );
}
