import type { Card, NavItem, PrimaryPage, Space, Tone, Voice } from '@/lib/types';
import IndexRows, { type IndexRow } from '../IndexRows';
import Section from '../Section';
import Button from '../Button';

const NUMBER_WORDS = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

type Props = { tone: Tone; space: Space; title: Voice; label?: string; count: number; primary: PrimaryPage; highlights: Card[]; cta: NavItem; afterCross?: boolean; n?: string };

/** Side layout: heading and the call action on the left, the first few services as index rows on the right. */
export default function Services({ tone, space, title, label, count, primary, highlights, cta, afterCross, n }: Props) {
  const total = primary.kind === 'services' ? NUMBER_WORDS[primary.services.length] : undefined;
  const rows: IndexRow[] =
    primary.kind === 'services'
      ? primary.services.slice(0, count).map((s) => ({ title: s.name, body: s.description, meta: s.time, sub: s.tags?.join(' · ') }))
      : highlights.slice(0, count).map((h) => ({ title: h.title, body: h.body }));
  return (
    <Section
      tone={tone}
      space={space}
      title={title}
      label={label ? { n, text: label } : undefined}
      layout="side"
      afterCross={afterCross}
      aside={
        <div className="flex flex-col items-start gap-3">
          <Button item={cta} block />
          <Button item={{ label: total ? `All ${total} ${primary.title.toLowerCase()}` : `All ${primary.title.toLowerCase()}`, href: `/${primary.slug}/` }} kind="secondary" />
        </div>
      }
    >
      <IndexRows rows={rows} />
    </Section>
  );
}
