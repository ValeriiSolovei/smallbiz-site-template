import type { NavItem, Review, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import Button from '../Button';
import Stars from '../Stars';

/**
 * One review as a job ticket: a dark header strip with the job and the stars, then the quote and who said it.
 * Each ticket is its own bordered slip, so on a phone it is obvious where one review ends and the next begins.
 */
function Ticket({ r, lead = false }: { r: Review; lead?: boolean }) {
  return (
    <figure data-tone="base" className="border-2 border-[var(--fg)] shadow-[5px_5px_0_var(--fg)]">
      <div data-tone="inverse" className="flex items-center justify-between gap-3 px-4 py-2.5 md:px-5">
        <span className="text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">{(r.context ?? 'Sample review').replace(/ · /g, ' ·\u00a0')}</span>
        <Stars rating={r.rating} size={lead ? 18 : 16} className="text-[var(--accent)]" />
      </div>
      <div className="px-4 py-5 md:px-6 md:py-6">
        <blockquote className={lead ? 'text-[clamp(1.25rem,1rem+1.1vw,1.75rem)] leading-[1.35] font-medium' : 'leading-[1.55]'}>
          &ldquo;{r.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-4 font-semibold">{r.name}</figcaption>
      </div>
    </figure>
  );
}

/** A large ticket beside two smaller ones on wide screens; stacked tickets with clear gaps on phones. */
export default function Reviews({ tone, space, title, reviews, cta, n }: { tone: Tone; space: Space; title: Voice; reviews: Review[]; cta: NavItem; n?: string }) {
  const [lead, ...rest] = reviews;
  return (
    <Section tone={tone} space={space} title={title} label={{ n, text: 'Sample reviews' }}>
      <div className="grid-12 items-start md:grid-rows-[auto_1fr]">
        {lead && (
          <div className="md:col-span-7">
            <Ticket r={lead} lead />
          </div>
        )}
        <div className="space-y-8 md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1">
          {rest.map((r) => (
            <Ticket key={r.name} r={r} />
          ))}
        </div>
        <div className="md:col-span-7 md:row-start-2">
          <Button item={cta} block />
        </div>
      </div>
    </Section>
  );
}
