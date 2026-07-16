import { cn } from '@/ui/lib/utils';

export type InvoiceStatus = 'pending' | 'paid' | 'settling' | 'settled' | 'failed' | 'expired';

export type WithdrawalStatus =
  | 'quoted'
  | 'submitted'
  | 'processing'
  | 'completed'
  | 'refunded'
  | 'expired'
  | 'failed';

const STATUS_STYLES: Record<string, { bg: string; fg: string; ring: string }> = {
  pending: { bg: 'bg-orange-600', fg: 'text-white', ring: 'ring-orange-700' },
  paid: { bg: 'bg-blue-600', fg: 'text-white', ring: 'ring-blue-700' },
  settling: { bg: 'bg-orange-600', fg: 'text-white', ring: 'ring-orange-700' },
  settled: { bg: 'bg-green-700', fg: 'text-white', ring: 'ring-green-800' },
  failed: { bg: 'bg-red-600', fg: 'text-white', ring: 'ring-red-700' },
  expired: { bg: 'bg-gray-500', fg: 'text-white', ring: 'ring-gray-600' },
  quoted: { bg: 'bg-blue-600', fg: 'text-white', ring: 'ring-blue-700' },
  submitted: { bg: 'bg-orange-600', fg: 'text-white', ring: 'ring-orange-700' },
  processing: { bg: 'bg-orange-600', fg: 'text-white', ring: 'ring-orange-700' },
  completed: { bg: 'bg-green-700', fg: 'text-white', ring: 'ring-green-800' },
  refunded: { bg: 'bg-red-600', fg: 'text-white', ring: 'ring-red-700' },
};

export function StatusBadge({
  status,
  className,
}: {
  status: InvoiceStatus | WithdrawalStatus | string;
  className?: string;
}) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ring-inset',
        style.bg,
        style.fg,
        style.ring,
        className,
      )}
    >
      {status}
    </span>
  );
}
