import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { fontClasses } from '@site-fonts';
import './globals.css';
import { getSite } from '@/lib/site';
import { themeToCssVars } from '@/lib/theme';
import { siteIconDataUri } from '@/lib/icon';
import { resolveBaseUrl } from '@/lib/base-url';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    <html lang="en-CA" data-scroll-behavior="smooth" className={`${fontClasses} ${site.theme.mode}`} style={themeToCssVars(site.theme) as CSSProperties}>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <Header site={site} />
        <main id="main" tabIndex={-1} className="flex-1 scroll-mt-24 focus:outline-none">
          {children}
        </main>
        <Footer site={site} />
      </body>
    </html>
  );
}
