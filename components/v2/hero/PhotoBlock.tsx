import type { HeroV2, SiteConfigV2 } from '@/lib/types';
import { sentences } from '@/lib/voice';
import Button from '../Button';
import Label from '../Label';

type Props = { hero: Extract<HeroV2, { variant: 'photo-block' }>; hours: SiteConfigV2['contact']['hours'] };

/**
 * A full-width photo with a colour block under it. The block holds the H1, one sentence per line
 * (heavy, light, then the italic voice), and today's hours beside it. No text sits on the photo.
 */
export default function PhotoBlock({ hero, hours }: Props) {
  const lines = sentences(hero.headline.text);
  return (
    <section aria-labelledby="hero-title">
      <picture>
        <source media="(max-width: 767px)" srcSet={hero.photoSmall.src} width={800} height={600} />
        <img
          src={hero.photo.src}
          alt={hero.photo.alt}
          width={1920}
          height={1279}
          fetchPriority="high"
          className="block aspect-[4/3] w-full object-cover md:aspect-video md:max-h-[58vh]"
        />
      </picture>
      <div data-tone={hero.tone} className="py-12 md:min-h-[360px] md:py-16">
        <div className="wrap grid-12 items-start">
          <h1 id="hero-title" className="h1 hero-lockup md:col-span-8">
            {lines.map((line, i) => (
              <span key={line} className="line">
                {line.replace(/\.$/, '')}
                {/* Screen readers hear three sentences; the full stops stay out of the design. */}
                {i < lines.length - 1 && <span className="sr-only">. </span>}
              </span>
            ))}
          </h1>
          <div className="md:col-span-4 md:col-start-9">
            <Label>{hero.label}</Label>
            <dl className="mt-4 space-y-1 text-[1.0625rem] font-medium">
              {hours.map((h) => (
                <div key={h.days} className="tabular flex justify-between gap-6">
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3">{hero.place}</p>
            <div className="mt-6">
              <Button item={hero.cta} hero block />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
