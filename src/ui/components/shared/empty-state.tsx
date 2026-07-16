import type { ReactNode } from 'react';

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card/40 p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="text-sm text-muted-foreground max-w-md">{description}</p> : null}
      {action}
    </div>
  );
}
