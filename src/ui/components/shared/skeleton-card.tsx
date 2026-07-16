import { Card, CardContent } from '@/ui/components/ui/card';
import { Skeleton } from '@/ui/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <Card data-testid="skeleton-card">
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-3 w-40" />
      </CardContent>
    </Card>
  );
}
