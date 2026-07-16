import { Link } from '@/i18n/routing';
import { Button } from '@/ui/components/ui/button';

export default function LocaleNotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-4 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-muted-foreground">This page does not exist.</p>
        <Button asChild>
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </main>
  );
}
