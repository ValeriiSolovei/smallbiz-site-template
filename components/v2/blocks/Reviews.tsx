import type { NavItem, Review, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import Button from '../Button';

function Byline({ r }: { r: Review }) {
  return (
    <figcaption className="mt-4 border-t border-rule pt-3">
      <span className="block font-semibold">{r.name}</span>
      {r.context && <span className="text-small block text-fg-2">{r.context}</span>}
    </figcaption>
  );
}

/** One large quote beside two smaller ones. Bylines keep their exact text in their own element. */
export default function Reviews({ tone, space, title, reviews, cta, n }: { tone: Tone; space: Space; title: Voice; reviews: Review[]; cta: NavItem; n?: string }) {
  const [lead, ...rest] = reviews;
  return (
    <Section tone={tone} space={space} title={title} label={{ n, text: 'Sample reviews' }}>
      <div className="grid-12">
        {lead && (
          <figure className="md:col-span-7">
            <blockquote className="text-[clamp(1.375rem,1rem+1.4vw,1.875rem)] leading-[1.35] font-medium">&ldquo;{lead.quote}&rdquo;</blockquote>
            <Byline r={lead} />
          </figure>
        )}
        <div className="space-y-8 md:col-span-4 md:col-start-9">
          {rest.map((r) => (
            <figure key={r.name}>
              <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
              <Byline r={r} />
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Button item={cta} block />
      </div>
    </Section>
  );
}
