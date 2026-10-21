import type { NavItem, Review, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import Button from '../Button';
import Stars from '../Stars';

/** Customer notes as tiles with a hard shadow, stacked in one column with clear gaps between them. */
export default function Tiles({ tone, space, title, reviews, cta }: { tone: Tone; space: Space; title: Voice; reviews: Review[]; cta: NavItem }) {
  return (
    <Section tone={tone} space={space} title={title} label={{ text: 'Sample reviews' }}>
      <div className="grid-12">
        <ul className="space-y-10 pr-2 md:col-span-7 md:col-start-2">
          {reviews.map((r) => (
            <li key={r.name} className="tile bg-chip p-7">
              <figure>
                <blockquote className="text-[1.25rem] leading-[1.5]">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-small font-medium">{r.name}</span>
                  {r.context && <span className="text-small voice text-fg-2">{r.context}</span>}
                  <Stars rating={r.rating} />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="md:col-span-7 md:col-start-2">
          <Button item={cta} block />
        </div>
      </div>
    </Section>
  );
}
