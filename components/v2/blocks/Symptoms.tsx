import type { NavItem, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import Button from '../Button';

/** A checklist of signs that it is time to call, then one plain sentence and the call action. */
export default function Symptoms({ tone, space, title, items, note, cta }: { tone: Tone; space: Space; title: Voice; items: string[]; note?: string; cta: NavItem }) {
  return (
    <Section tone={tone} space={space} title={title}>
      <ul className="grid border-t border-rule md:grid-cols-2 md:gap-x-12">
        {items.map((s) => (
          <li key={s} className="flex min-h-16 items-center gap-4 border-b border-rule py-3 text-[1.25rem] font-medium">
            <span aria-hidden="true" className="h-2 w-2 flex-none bg-mark" />
            {s}
          </li>
        ))}
      </ul>
      {note && <p className="lead mt-8">{note}</p>}
      <div className="mt-8">
        <Button item={cta} block />
      </div>
    </Section>
  );
}
