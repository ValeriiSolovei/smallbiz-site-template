import type { LightStop, NavItem, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import Button from '../Button';

/**
 * The shop's signature: one long light scale with a stop for each level, and under each stop where that light is,
 * three plants that like it and how to care for them. On a phone the scale runs down the left edge. The page ends here.
 */
export default function LightGuide({ tone, space, title, stops, note, cta }: { tone: Tone; space: Space; title: Voice; stops: LightStop[]; note: string; cta: NavItem }) {
  return (
    <Section tone={tone} space={space} title={title}>
      <ol className="light-guide">
        {stops.map((s) => (
          <li key={s.light} className="light-stop">
            <h3 className="text-[1.75rem] leading-tight">{s.name}</h3>
            <p className="mt-2 text-fg-2">{s.where}</p>
            <ul className="mt-5 space-y-2">
              {s.plants.map((p) => (
                <li key={p.latin}>
                  <span className="voice">{p.latin}</span>
                  <span className="text-fg-2"> · {p.common}</span>
                </li>
              ))}
            </ul>
            <p className="text-small mt-5">{s.care}</p>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex flex-col items-start gap-x-8 gap-y-4 md:flex-row md:items-center">
        <Button item={cta} block />
        <p className="text-fg-2">{note}</p>
      </div>
    </Section>
  );
}
