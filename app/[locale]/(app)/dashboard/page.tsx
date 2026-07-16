import { setRequestLocale } from 'next-intl/server';
import { StampDashboard } from '@/ui/components/stamp/stamp-dashboard';

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StampDashboard />;
}
