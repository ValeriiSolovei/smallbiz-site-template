import type { NavItem, Space, Tone, Trainer, Voice } from '@/lib/types';
import Section, { SectionHead } from '../Section';
import Button from '../Button';

/** The heading and a hairline list in columns 1-4; staggered black-and-white portraits in 5-12. */
export default function Coaches({ tone, space, title, points, trainers, cta }: { tone: Tone; space: Space; title: Voice; points: string[]; trainers: Trainer[]; cta: NavItem }) {
  return (
    <Section tone={tone} space={space}>
      <div className="grid-12 items-start">
        <div className="md:col-span-4">
          <SectionHead title={title} />
          <ul className="mt-8 border-b border-rule">
            {points.map((p) => (
              <li key={p} className="border-t border-rule py-3 font-semibold">
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button item={cta} block />
          </div>
        </div>
        <ul className="coaches grid gap-8 md:col-span-8 md:grid-cols-3 md:gap-6">
          {trainers.map((t) => (
            <li key={t.name}>
              <img src={t.photo.src} alt={t.photo.alt} width={800} height={1000} loading="lazy" decoding="async" className="mono aspect-[4/5] w-full object-cover" />
              <p className="h-display mt-4 text-2xl font-bold">{t.name}</p>
              <p className="text-small text-fg-2">{t.specialty}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
