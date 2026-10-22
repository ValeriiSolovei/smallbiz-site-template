import type { Metadata, Viewport } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { fontClasses } from '@site-fonts';
import './globals.css';
import { getSite } from '@/lib/site';
import { themeToCssVars } from '@/lib/theme';
import { designDataAttrs, typeToCssVars } from '@/lib/typography';
import { siteIconDataUri } from '@/lib/icon';
import { resolveBaseUrl } from '@/lib/base-url';
import { buildNav, headerCta } from '@/lib/nav';
import HeaderBarV2 from '@/components/v2/HeaderBar';
import UtilityBar from '@/components/v2/UtilityBar';
import FooterV2 from '@/components/v2/Footer';
import CallBar from '@/components/v2/CallBar';

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

// The page runs under the phone's safe areas (the call bar pads itself with env()).
export function generateViewport(): Viewport {
  return { viewportFit: 'cover' };
}

const skipLink =
  'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-contrast';

export default function RootLayout({ children }: { children: ReactNode }) {
  const site = getSite();
  const style = { ...themeToCssVars(site.theme), ...typeToCssVars(site.design.type) } as CSSProperties;
  const nav = buildNav(site);
  return (
    <html lang="en-CA" data-scroll-behavior="smooth" data-system="v2" {...designDataAttrs(site.design)} className={`${fontClasses} ${site.theme.mode}`} style={style}>
      <body data-tone="base" className="flex min-h-screen flex-col font-body">
        <a href="#main" className={skipLink}>
          Skip to content
        </a>
        {site.utilityBar && <UtilityBar left={site.utilityBar.left} right={site.utilityBar.right} phone={site.contact.phone} />}
        <HeaderBarV2 wordmark={site.wordmark} nav={nav} cta={headerCta(site)} />
        <main id="main" tabIndex={-1} className="flex-1 scroll-mt-24 focus:outline-none">
          {children}
        </main>
        <FooterV2 site={site} nav={nav} />
        <CallBar primary={site.callBar.primary} secondary={site.callBar.secondary} />
      </body>
    </html>
  );
}
