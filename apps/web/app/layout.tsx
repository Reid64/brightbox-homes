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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Bright Box Homes',
    description:
      'Premium prefab expandable container homes. American Owned. Globally Sourced. US Delivered.',
    url: 'https://brightboxhomes.com',
    siteName: 'Bright Box Homes',
    images: [
      {
        url: 'https://brightboxhomes.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bright Box Homes Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright Box Homes',
    description:
      'Premium prefab expandable container homes. American Owned. Globally Sourced. US Delivered.',
    images: ['https://brightboxhomes.com/images/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="font-body bg-bb-charcoal text-bb-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
