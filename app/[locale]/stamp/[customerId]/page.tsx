import { setRequestLocale } from 'next-intl/server';
import { StampCustomer } from '@/ui/components/stamp/stamp-customer';

export default async function CustomerStampPage({
  params,
}: {
  params: Promise<{ locale: string; customerId: string }>;
}) {
  const { locale, customerId } = await params;
  setRequestLocale(locale);
  return <StampCustomer customerId={customerId} />;
}
