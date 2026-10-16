import type { SiteConfigV2 } from '@/lib/types';
import { osmEmbedUrl } from '@/lib/map';
import { telHref } from '@/lib/phone';
import Button from './Button';

/** Hours with tabular times, the call button, email as a text link, then the map. */
export default function HoursAndMap({ contact, call = true }: { contact: SiteConfigV2['contact']; call?: boolean }) {
  return (
    <div>
      <h2 className="h3 h-display">Hours</h2>
      <ul className="rule-structural mt-4">
        {contact.hours.map((h) => (
          <li key={h.days} className="flex justify-between gap-4 border-b border-rule py-3 tabular">
            <span className="font-semibold">{h.days}</span>
            <span className="text-fg-2">{h.time}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col items-start gap-2">
        {call && <Button item={{ label: `Call ${contact.phone}`, href: telHref(contact.phone) }} block />}
        <Button item={{ label: contact.email, href: `mailto:${contact.email}` }} kind="secondary" arrow={false} />
      </div>
      <p className="text-small mt-2 text-fg-2">{contact.addressLine}</p>
      <iframe title={`Map: ${contact.addressLine}`} src={osmEmbedUrl(contact.mapBbox)} loading="lazy" className="mt-6 aspect-[4/3] w-full border border-rule" />
    </div>
  );
}
