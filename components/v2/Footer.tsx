import Link from 'next/link';
import type { NavItem, SiteConfigV2 } from '@/lib/types';
import { DEMO_LABEL } from '@/lib/constants';
import { telHref } from '@/lib/phone';
import Wordmark from './Wordmark';

function FooterNav({ nav }: { nav: NavItem[] }) {
  return (
    <nav aria-label="Footer" className="wrap flex flex-wrap gap-x-6 py-4">
      {nav.map((item) => (
        <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function DemoNotice() {
  return (
    <p data-testid="demo-label" className="wrap border-t border-rule py-4 text-center">
      {DEMO_LABEL}
    </p>
  );
}

/** One-line footer for a single-ground site: a hairline, the wordmark, the address and hours; then the nav. */
function LineFooter({ site, nav }: { site: SiteConfigV2; nav: NavItem[] }) {
  const hours = site.contact.hours.map((h) => `${h.days} ${h.time}`).join(' · ');
  return (
    <footer data-tone={site.design.footerTone}>
      <div className="wrap border-t border-rule pt-10 pb-6">
        <Wordmark wordmark={site.wordmark} />
        <p className="tabular mt-4 text-fg-2">
          {site.contact.addressLine} · {hours}
        </p>
      </div>
      <FooterNav nav={nav} />
      <DemoNotice />
    </footer>
  );
}

/** Info-bar footer: area, contact, hours and one fact, split by hairlines; then the nav and the demo notice. */
export default function Footer({ site, nav }: { site: SiteConfigV2; nav: NavItem[] }) {
  if (site.design.footer === 'line') return <LineFooter site={site} nav={nav} />;
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
          <p className="mt-2">{site.credentials ?? site.tagline}</p>
        </div>
      </div>
      <FooterNav nav={nav} />
      <DemoNotice />
    </footer>
  );
}
