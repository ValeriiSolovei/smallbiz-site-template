import type { SiteConfig } from '@/lib/types';
import { DEMO_LABEL } from '@/lib/constants';
import { telHref } from '@/lib/phone';

export default function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-border-default bg-surface-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-text-secondary md:grid-cols-3">
        <div>
          <p className="font-semibold text-text-primary">{site.name}</p>
          <p className="mt-2">{site.tagline}</p>
        </div>
        <div>
          <p className="font-semibold text-text-primary">Contact</p>
          <p className="mt-2">
            <a href={telHref(site.contact.phone)} className="hover:text-accent">{site.contact.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.contact.email}`} className="hover:text-accent">{site.contact.email}</a>
          </p>
          <p className="mt-2">{site.contact.addressLine}</p>
        </div>
        <div>
          <p className="font-semibold text-text-primary">Hours</p>
          <ul className="mt-2 space-y-1">
            {site.contact.hours.map((h) => (
              <li key={h.days}>
                <span className="text-text-primary">{h.days}</span> · {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p data-testid="demo-label" className="border-t border-border-default px-4 py-4 text-center text-xs text-text-muted">
        {DEMO_LABEL}
      </p>
    </footer>
  );
}
