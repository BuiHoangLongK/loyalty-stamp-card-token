import type { ReactNode } from 'react';
import { cn } from '@/ui/lib/utils';

type Variant = 'default' | 'cream' | 'dark';

export function SectionCard({
  children,
  variant = 'default',
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const variantClass =
    variant === 'dark'
      ? 'bg-brand-dark text-primary-foreground ring-brand-dark'
      : variant === 'cream'
        ? 'bg-canvas-cream text-ink ring-canvas-cream/60'
        : 'bg-card text-card-foreground ring-border';
  return (
    <div className={cn('rounded-xl p-6 ring-1 shadow-sm md:p-8', variantClass, className)}>
      {children}
    </div>
  );
}
