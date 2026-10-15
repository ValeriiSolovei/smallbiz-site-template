import Link from 'next/link';
import type { NavItem, SiteConfigV2 } from '@/lib/types';
import { DEMO_LABEL } from '@/lib/constants';
import { telHref } from '@/lib/phone';

/** Info-bar footer: area, contact, hours and one fact, split by hairlines; then the nav and the demo notice. */
export default function Footer({ site, nav }: { site: SiteConfigV2; nav: NavItem[] }) {
  const head = 'text-small font-semibold text-fg-2';
  return (
    <footer data-tone={site.design.footerTone}>
      <div className="wrap grid border-b border-rule md:grid-cols-4">
        <div className="border-rule py-8 md:border-r md:pr-6">
          <p className={head}>Service area</p>
          <p className="mt-2">{site.contact.addressLine}</p>
        </div>
        <div className="border-t border-rule py-8 md:border-t-0 md:border-r md:px-6">
          <p className={head}>Phone and email</p>
          <a href={telHref(site.contact.phone)} className="link-action mt-1">
            {site.contact.phone}
          </a>
          <br />
          <a href={`mailto:${site.contact.email}`} className="link-action">
            {site.contact.email}
          </a>
        </div>
        <div className="border-t border-rule py-8 md:border-t-0 md:border-r md:px-6">
          <p className={head}>Hours</p>
          <ul className="mt-2 space-y-1">
            {site.contact.hours.map((h) => (
              <li key={h.days} className="tabular">
                <span className="font-semibold">{h.days}</span> {h.time}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-rule py-8 md:border-t-0 md:pl-6">
          <p className={head}>{site.name}</p>
          <p className="mt-2">{site.tagline}</p>
        </div>
      </div>
      <nav aria-label="Footer" className="wrap flex flex-wrap gap-x-6 py-4">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center">
            {item.label}
          </Link>
        ))}
      </nav>
      <p data-testid="demo-label" className="wrap border-t border-rule py-4 text-center">
        {DEMO_LABEL}
      </p>
    </footer>
  );
}
