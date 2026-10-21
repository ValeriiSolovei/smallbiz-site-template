import type { NavItem, Review, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import Button from '../Button';
import Stars from '../Stars';

/** Two big quotes in the light display weight, the second set further right and lower: an offset wall, not cards. */
export default function Wall({ tone, space, title, reviews, cta }: { tone: Tone; space: Space; title: Voice; reviews: Review[]; cta: NavItem }) {
  return (
    <Section tone={tone} space={space} title={title} label={{ text: 'Sample reviews' }}>
      <ul className="grid-12">
        {reviews.map((r, i) => (
          <li key={r.name} className={i % 2 ? 'md:col-span-7 md:col-start-6 md:mt-16' : 'md:col-span-7'}>
            <figure>
              <blockquote className="wall-quote h-display">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="text-small font-semibold">{r.name}</span>
                <Stars rating={r.rating} />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <Button item={cta} block />
      </div>
    </Section>
  );
}
