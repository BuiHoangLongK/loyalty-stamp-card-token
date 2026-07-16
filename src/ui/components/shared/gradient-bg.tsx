import { cn } from '@/ui/lib/utils';

type Variant = 'hero' | 'banner';

export function GradientBg({
  variant = 'hero',
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 -z-10 overflow-hidden',
        variant === 'hero' ? 'h-[55vh] min-h-[420px]' : 'h-40',
        className,
      )}
    >
      <div className="absolute inset-0 gradient-mesh" />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />
    </div>
  );
}
