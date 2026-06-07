import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';

// Headings (DESIGN_LANGUAGE 3.1): Plus Jakarta Sans, bold + extra-bold hero.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  preload: true,
  variable: '--font-heading',
});

// Body (DESIGN_LANGUAGE 3.1): Inter, regular + medium.
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  preload: true,
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Bright Box Homes | American Owned. Globally Sourced. US Delivered.',
  description:
    'Premium, customizable prefab homes delivered across the United States. Expandable container homes, cabins, and capsules with a transparent 25/25/25/25 payment structure. American owned, globally sourced, US delivered.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="font-body bg-bb-white text-bb-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
