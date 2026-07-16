import { formatAmount } from '@/ui/lib/format';
import { cn } from '@/ui/lib/utils';

export function MoneyPill({
  minor,
  asset,
  decimals = 2,
  className,
  size = 'md',
}: {
  minor: string | number;
  asset: string;
  decimals?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeClass =
    size === 'xl'
      ? 'text-4xl'
      : size === 'lg'
        ? 'text-2xl'
        : size === 'sm'
          ? 'text-sm'
          : 'text-base';
  return (
    <span
      className={cn('tnum inline-flex items-baseline gap-1.5 font-medium', sizeClass, className)}
    >
      <span>{formatAmount(minor, decimals)}</span>
      <span className="text-xs font-normal uppercase tracking-wider text-muted-foreground">
        {asset}
      </span>
    </span>
  );
}
