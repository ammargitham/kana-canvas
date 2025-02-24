import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.svg';
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KanaCanvas",
  description: "Improve your Japanese handwriting with helpful tips, easy-to-follow stroke orders, and examples of proper handwriting. Practice in our interactive space to build confidence in your writing skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        <nav className="p-4">
          <div className="container mx-auto flex">
            <Link href="/" className="font-bold pr-2">
              <Image src={logo} alt="KanaCanvas" height={24} />
            </Link>
            <div className="space-x-4 flex-1 flex justify-end">
              <Link href="/hiragana" className="text-blue-500 hover:text-blue-600">
                Hiragana
              </Link>
              <Link href="/katakana" className="text-blue-500 hover:text-blue-600">
                Katakana
              </Link>
            </div>
          </div>
        </nav>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
