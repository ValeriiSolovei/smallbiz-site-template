import type { Review, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import Stars from '../Stars';

/** Short quotes in the italic voice, every other one indented, split by hairlines. */
export default function Overheard({ tone, space, title, reviews }: { tone: Tone; space: Space; title: Voice; reviews: Review[] }) {
  return (
    <Section tone={tone} space={space} title={title} label={{ text: 'Sample reviews' }}>
      <ul className="grid-12 gap-y-0">
        {reviews.map((r, i) => (
          <li key={r.name} className={`border-rule py-8 md:col-span-9 ${i > 0 ? 'border-t' : ''} ${i % 2 ? 'md:col-start-3' : 'md:col-start-1'}`}>
            <figure>
              <blockquote className="overheard">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="byline">{r.name}</span>
                {r.context && <span className="text-small text-fg-2">{r.context}</span>}
                <Stars rating={r.rating} className="text-mark" />
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
