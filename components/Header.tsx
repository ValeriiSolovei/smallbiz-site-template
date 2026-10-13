import type { SiteConfig } from '@/lib/types';
import { buildNav, headerCta } from '@/lib/nav';
import HeaderBar from './HeaderBar';

export default function Header({ site }: { site: SiteConfig }) {
  return <HeaderBar name={site.name} nav={buildNav(site)} cta={headerCta(site)} />;
}
