export function formatAmount(minor: string | number, decimals = 2): string {
  const value = typeof minor === 'string' ? Number(minor) : minor;
  if (!Number.isFinite(value)) return '0';
  const major = value / 10 ** decimals;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(major);
}

export function formatAmountAsset(minor: string | number, asset: string, decimals = 2): string {
  return `${formatAmount(minor, decimals)} ${asset}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
