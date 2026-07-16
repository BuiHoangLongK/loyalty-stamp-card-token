import { Lock } from 'lucide-react';
import { cn } from '@/ui/lib/utils';

export function BrandMark({
  className,
  label = 'KomitSave',
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn('flex items-center gap-2 font-bold', className)}>
      <span className="grid h-7 w-7 place-items-center rounded-md bg-blue-600 text-white">
        <Lock className="h-4 w-4" />
      </span>
      <span className="text-lg text-blue-600 tracking-tight">{label}</span>
    </div>
  );
}
