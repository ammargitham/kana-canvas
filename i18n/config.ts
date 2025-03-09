export const locales = ['en', 'ja'] as const;
export const localeLabels = ['English', '日本語'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
