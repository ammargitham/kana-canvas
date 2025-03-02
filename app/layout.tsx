import Header from '@/components/header';
import { getGaId } from '@/lib/actions';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KanaCanvas",
  description: "Improve your Japanese handwriting with helpful tips, easy-to-follow stroke orders, and examples of proper handwriting. Practice in our interactive space to build confidence in your writing skills.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = await getGaId();
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Header />
        <div>
          {children}
        </div>
      </body>
      {/* Google Analytics */}
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
