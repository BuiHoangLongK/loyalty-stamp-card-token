import { cn } from '@/ui/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      // The project's `--muted` token (210 40% 98% in light mode) is too close
      // to `--background` (0 0% 100%) for `bg-muted` to be visible as a
      // skeleton placeholder. Use Tailwind's built-in `bg-gray-300` (a
      // light-medium gray) with `!important` to ensure it overrides any
      // project-token utilities that might bleed through. The `!` prefix
      // keeps the placeholder consistent regardless of which page or layout
      // wraps the skeleton.
      className={cn('animate-pulse rounded-md !bg-gray-300', className)}
      {...props}
    />
  );
}

export { Skeleton };
