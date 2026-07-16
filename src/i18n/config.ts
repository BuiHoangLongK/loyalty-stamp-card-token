// Hardcode locales to avoid env.public dependency chain
export const locales = ['en', 'vi'] as readonly string[];
export const defaultLocale = 'en';
export const localePrefix = 'as-needed' as const;
export type Locale = string;
