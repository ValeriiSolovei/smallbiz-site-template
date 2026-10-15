import type { Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';

/** Questions as native <details> rows; no script needed. */
export default function Faq({ tone, space, title, items }: { tone: Tone; space: Space; title: Voice; items: { q: string; a: string }[] }) {
  return (
    <Section tone={tone} space={space} title={title} layout="side" className="faq">
      <div className="rule-structural">
        {items.map((f) => (
          <details key={f.q} className="border-b border-rule">
            <summary className="flex min-h-[72px] items-center justify-between gap-6 py-4 text-[1.25rem] font-semibold">
              {f.q}
              <span aria-hidden="true" className="plus" />
            </summary>
            <p className="measure pb-6 text-fg-2">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
