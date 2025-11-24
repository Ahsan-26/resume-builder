import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale, type Locale} from '@/i18n/locales';

// Type guard so TS stops panicking
function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export default getRequestConfig(async ({locale}) => {
  const rawLocale = locale ?? defaultLocale;

  // Validate + narrow locale type
  const activeLocale = isLocale(rawLocale) ? rawLocale : defaultLocale;

  const messages = (await import(`../../messages/${activeLocale}.json`)).default;

  return {
    locale: activeLocale,
    messages
  };
});
