import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { getGaId } from '@/lib/actions';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const metadata: Metadata = {
    title: {
      template: '%s | KanaCanvas',
      default: 'KanaCanvas',
    },
    description: "Improve your Japanese handwriting with easy-to-follow stroke orders, and examples of proper handwriting. Practice in our interactive space to build confidence in your writing skills.",
  };
  const adSenseId = process.env.GOOGLE_ADSENSE;
  if (adSenseId) {
    metadata['verification'] = {
      other: {
        'google-adsense-account': adSenseId,
      }
    }
  }
  return metadata;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const gaId = await getGaId();
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
    </html>
  );
}
