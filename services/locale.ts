'use server';

import { defaultLocale, Locale, locales } from '@/i18n/config';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { cookies, headers } from 'next/headers';

const COOKIE_NAME = 'NEXT_LOCALE';


export async function getUserLocale() {
  // Priority 1: Use value from a cookie
  let locale = (await cookies()).get(COOKIE_NAME)?.value;

  // Priority 2: Use value from the `Accept-Language` header
  if (!locale) {
    const languages = new Negotiator({
      headers: {
        'accept-language': (await headers()).get('accept-language') || undefined,
      },
    }).languages();
    try {
      locale = match(languages, locales, defaultLocale);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Invalid language
    }
  }

  // Priority 3: Use the default locale
  if (!locale) {
    locale = defaultLocale;
  }

  return locale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
