'use client';

import { Coffee } from 'lucide-react';

/**
 * Renders a punch-card style grid of stamp slots. Filled slots use violet-600;
 * empty slots are dashed outlines. The card "completes" when count >= total.
 */
export function StampCardVisual({
  count,
  total,
  testId = 'stamp-card',
}: {
  count: number;
  total: number;
  testId?: string;
}) {
  const filled = Math.min(count, total);
  const complete = count >= total;

  return (
    <div
      data-testid={testId}
      className={`rounded-3xl border-2 p-6 shadow-sm transition-colors ${
        complete ? 'border-violet-600 bg-violet-50' : 'border-violet-200 bg-white'
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-sans text-sm font-semibold uppercase tracking-wide text-violet-700">
          Loyalty Card
        </span>
        <span className="rounded-full bg-violet-600 px-3 py-1 font-sans text-sm font-bold text-white">
          {filled}/{total}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {Array.from({ length: total }).map((_, i) => {
          const isFilled = i < filled;
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed slot grid
              key={i}
              data-testid={isFilled ? 'stamp-filled' : 'stamp-empty'}
              className={`flex aspect-square items-center justify-center rounded-full border-2 transition-all ${
                isFilled
                  ? 'border-violet-600 bg-violet-600 text-white shadow'
                  : 'border-dashed border-violet-300 bg-violet-50/40 text-violet-200'
              }`}
            >
              <Coffee className="h-5 w-5" />
            </div>
          );
        })}
      </div>
      {complete ? (
        <p className="mt-4 text-center font-sans text-sm font-bold text-violet-700">
          🎉 Reward unlocked — ready to redeem!
        </p>
      ) : (
        <p className="mt-4 text-center font-body text-sm text-muted-foreground">
          {total - filled} more stamp{total - filled === 1 ? '' : 's'} until your free reward
        </p>
      )}
    </div>
  );
}
