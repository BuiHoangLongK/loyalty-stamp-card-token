import { setRequestLocale } from 'next-intl/server';
import { StampLanding } from '@/ui/components/stamp/stamp-landing';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StampLanding />;
}
