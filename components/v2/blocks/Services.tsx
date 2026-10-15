import type { Card, NavItem, PrimaryPage, Space, Tone, Voice } from '@/lib/types';
import IndexRows, { type IndexRow } from '../IndexRows';
import Section from '../Section';
import Button from '../Button';

type Props = { tone: Tone; space: Space; title: Voice; label?: string; count: number; primary: PrimaryPage; highlights: Card[]; cta: NavItem; afterCross?: boolean };

/** Side layout: heading and the call action on the left, the first few services as index rows on the right. */
export default function Services({ tone, space, title, label, count, primary, highlights, cta, afterCross }: Props) {
  const rows: IndexRow[] =
    primary.kind === 'services'
      ? primary.services.slice(0, count).map((s) => ({ title: s.name, body: s.description, meta: s.time, sub: s.tags?.join(' ~ ') }))
      : highlights.slice(0, count).map((h) => ({ title: h.title, body: h.body }));
  return (
    <Section tone={tone} space={space} title={title} label={label ? { n: '01', text: label } : undefined} layout="side" afterCross={afterCross}>
      <IndexRows rows={rows} />
      <div className="mt-8 flex flex-col items-start gap-x-8 gap-y-3 md:flex-row md:items-center">
        <Button item={cta} block />
        <Button item={{ label: `All ${primary.title.toLowerCase()}`, href: `/${primary.slug}/` }} kind="secondary" />
      </div>
    </Section>
  );
}
