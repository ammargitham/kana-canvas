import GoogleAdSense from '@/components/google-adsense';
import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { getAdSenseId, getGaId } from '@/lib/actions';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | KanaCanvas',
    default: 'KanaCanvas',
  },
  description: "Improve your Japanese handwriting with easy-to-follow stroke orders, and examples of proper handwriting. Practice in our interactive space to build confidence in your writing skills.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const gaId = await getGaId();
  const adSenseId = await getAdSenseId();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <Header />
            <div>
              {children}
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
      {/* Google Analytics */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {/* Google AdSense */}
      {adSenseId && <GoogleAdSense pId={adSenseId} />}
    </html>
  );
}
