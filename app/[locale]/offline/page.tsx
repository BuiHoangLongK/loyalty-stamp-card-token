import { WifiOffIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/ui/components/ui/button';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PWA' });
  return { title: t('offlineTitle') };
}

export default async function OfflinePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('PWA');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="space-y-4 max-w-md">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
          <WifiOffIcon className="size-6 text-muted-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{t('offlineTitle')}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">{t('offlineDescription')}</p>
        <form action="/" className="pt-2">
          <Button type="submit">{t('retryButton')}</Button>
        </form>
      </div>
    </main>
  );
}
