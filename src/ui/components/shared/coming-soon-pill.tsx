import { cn } from '@/ui/lib/utils';

export function ComingSoonPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-primary-subdued px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-deep ring-1 ring-inset ring-primary/15',
        className,
      )}
    >
      Coming soon
    </span>
  );
}
