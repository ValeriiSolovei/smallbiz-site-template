import type { NavItem, SiteConfigV2, Space, Tone, Voice } from '@/lib/types';
import { telHref } from '@/lib/phone';
import Section from '../Section';
import LeaderRow from '../LeaderRow';
import Button from '../Button';

/** Hours on dotted leaders, the address, the phone and one call action: where the page ends. */
export default function Visit({ tone, space, title, note, contact, call }: { tone: Tone; space: Space; title: Voice; note: string; contact: SiteConfigV2['contact']; call: NavItem }) {
  return (
    <Section tone={tone} space={space} title={title}>
      <div className="grid-12 items-start">
        <div className="space-y-2 md:col-span-5">
          {contact.hours.map((h) => (
            <LeaderRow key={h.days} name={h.days} value={h.time} />
          ))}
        </div>
        <div className="md:col-span-5 md:col-start-7">
          <p>{contact.addressLine}</p>
          <a href={telHref(contact.phone)} className="link-action">
            {contact.phone}
          </a>
          <p className="mt-4 text-fg-2">{note}</p>
          <div className="mt-8">
            <Button item={call} block />
          </div>
        </div>
      </div>
    </Section>
  );
}
