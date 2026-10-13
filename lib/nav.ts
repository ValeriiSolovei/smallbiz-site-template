import type { NavItem, SiteConfig } from './types';

export function buildNav(site: SiteConfig): NavItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about/' },
    { label: site.primary.title, href: `/${site.primary.slug}/` },
    { label: 'Gallery', href: '/gallery/' },
    { label: 'Contact', href: '/contact/' },
  ];
}

export function headerCta(site: SiteConfig): NavItem {
  return site.hero.cta;
}
