import { Skeleton } from '@/ui/components/ui/skeleton';

export function SkeletonDetail({ className }: { className?: string }) {
  return (
    <div
      data-testid="skeleton-detail"
      className={`mx-auto max-w-md space-y-3 px-4 py-12 text-center ${className ?? ''}`}
    >
      <Skeleton className="mx-auto h-3 w-32" />
      <Skeleton className="mx-auto h-8 w-48" />
      <Skeleton className="mx-auto h-4 w-64" />
      <div className="flex justify-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}
