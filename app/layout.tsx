import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { getSite } from '@/lib/site';
import { themeToCssVars } from '@/lib/theme';
import { siteIconDataUri } from '@/lib/icon';
import { resolveBaseUrl } from '@/lib/base-url';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export function generateMetadata(): Metadata {
  const site = getSite();
  return {
    metadataBase: new URL(resolveBaseUrl()),
    title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.hero.subhead,
    robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
    icons: { icon: siteIconDataUri(site) },
    openGraph: {
      type: 'website',
      locale: 'en_CA',
      siteName: site.name,
      title: site.name,
      description: site.hero.subhead,
      images: [{ url: site.hero.photo.src, alt: site.hero.photo.alt }],
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const site = getSite();
  return (
    <html lang="en-CA" data-scroll-behavior="smooth" className={`${inter.variable} ${site.theme.mode}`} style={themeToCssVars(site.theme) as CSSProperties}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header site={site} />
        <main className="flex-1">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
