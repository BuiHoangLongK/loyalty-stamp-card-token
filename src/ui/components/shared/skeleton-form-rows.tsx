import { Card, CardContent } from '@/ui/components/ui/card';
import { Skeleton } from '@/ui/components/ui/skeleton';

export function SkeletonFormRows({
  rows = 4,
  withButton = true,
}: {
  rows?: number;
  withButton?: boolean;
}) {
  return (
    <Card data-testid="skeleton-form-rows">
      <CardContent className="space-y-4 p-6">
        {Array.from({ length: rows }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows are pure placeholders, fixed order
          <div key={i} className="space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
        {withButton ? <Skeleton className="h-10 w-full rounded-full" /> : null}
      </CardContent>
    </Card>
  );
}
