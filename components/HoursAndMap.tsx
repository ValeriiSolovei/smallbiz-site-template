import type { SiteConfig } from '@/lib/types';
import { osmEmbedUrl } from '@/lib/map';
import { telHref } from '@/lib/phone';

export default function HoursAndMap({ contact }: { contact: SiteConfig['contact'] }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border-default bg-surface-card p-6">
        <h2 className="text-lg font-semibold">Hours</h2>
        <ul className="mt-3 space-y-2 text-text-secondary">
          {contact.hours.map((h) => (
            <li key={h.days} className="flex justify-between gap-4">
              <span className="text-text-primary">{h.days}</span>
              <span>{h.time}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={telHref(contact.phone)} className="rounded-xl bg-accent px-4 py-2 font-semibold text-accent-contrast hover:bg-accent-hover">
            Call {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="rounded-xl border border-border-default px-4 py-2 font-semibold hover:border-accent">
            Email us
          </a>
        </div>
        <p className="mt-4 text-sm text-text-muted">{contact.addressLine}</p>
      </div>
      <iframe
        title={`Map: ${contact.addressLine}`}
        src={osmEmbedUrl(contact.mapBbox)}
        loading="lazy"
        className="h-72 w-full rounded-2xl border border-border-default"
      />
    </div>
  );
}
