import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

type Props = {
  children: React.ReactNode;
  params: {locale: string}
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  // Validate locale using next-intl helper
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for this locale
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Missing translation file:', error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
