import type { NavItem, Photo, Space, Tone, Voice } from '@/lib/types';
import Section, { SectionHead } from '../Section';
import Button from '../Button';

function Snapshot({ photo, className = '' }: { photo: Photo; className?: string }) {
  return (
    <figure className={`border-8 border-b-[28px] border-fg bg-fg ${className}`}>
      <img src={photo.src} alt={photo.alt} width={800} height={533} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
    </figure>
  );
}

/** The story with a drop cap beside two tilted black-and-white snapshots of the room (one on a phone). */
export default function Room({ tone, space, title, story, points, photos, cta }: { tone: Tone; space: Space; title: Voice; story: string[]; points: string[]; photos: [Photo, Photo]; cta: NavItem }) {
  return (
    <Section tone={tone} space={space}>
      <div className="grid-12 items-center">
        <div className="md:col-span-6">
          <SectionHead title={title} />
          <div className="measure mt-8 space-y-4">
            {story.map((p, i) => (
              <p key={p} className={i === 0 ? 'drop-cap' : ''}>
                {p}
              </p>
            ))}
          </div>
          <ul className="mt-6 space-y-1 font-medium">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="mt-8">
            <Button item={cta} block />
          </div>
        </div>
        <div data-tone="brand" className="px-6 py-10 md:col-span-6 md:col-start-7 md:px-10 md:py-14">
          <div className="flex items-start">
            <Snapshot photo={photos[0]} className="w-full -rotate-2 md:w-[60%] md:-rotate-[4deg]" />
            <Snapshot photo={photos[1]} className="mt-16 -ml-[20%] hidden w-[60%] rotate-[3deg] md:block" />
          </div>
        </div>
      </div>
    </Section>
  );
}
