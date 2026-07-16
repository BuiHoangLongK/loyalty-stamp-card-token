import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const TRUNCATE_PREFIX = 6;
const TRUNCATE_SUFFIX = 4;

export function truncateAddress(
  address: string,
  prefix = TRUNCATE_PREFIX,
  suffix = TRUNCATE_SUFFIX,
): string {
  if (address.length <= prefix + suffix + 1) return address;
  return `${address.slice(0, prefix)}…${address.slice(-suffix)}`;
}
