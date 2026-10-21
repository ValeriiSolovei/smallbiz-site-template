import type { HeroV2, SiteConfigV2 } from '@/lib/types';
import { renderVoice } from '@/lib/voice';
import Button from '../Button';
import Label from '../Label';

type Props = { hero: Extract<HeroV2, { variant: 'split' }>; buttonStyle: SiteConfigV2['design']['button'] };

/**
 * Half-bleed split: the text in columns 1-6, a tall black-and-white photo in 7-12 running to the right edge,
 * no overlap. On a phone the photo sits full-bleed between the headline and the lead, so it is on the first screen.
 */
export default function Split({ hero, buttonStyle }: Props) {
  return (
    <section data-tone={hero.tone} aria-labelledby="hero-title" className="split-hero">
      <div className="wrap grid-12 gap-y-8 md:gap-y-0">
        <div className="pt-10 md:col-span-6 md:row-start-1 md:pt-24">
          <Label>{hero.label}</Label>
          <h1 id="hero-title" className="h1 h-display mt-6">
            {renderVoice(hero.headline, { lines: true })}
          </h1>
        </div>
        <picture className="split-photo block md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-1">
          <source media="(max-width: 767px)" srcSet={hero.photoSmall.src} width={800} height={600} />
          <img
            src={hero.photo.src}
            alt={hero.photo.alt}
            width={1200}
            height={1500}
            fetchPriority="high"
            className="block aspect-[4/3] w-full object-cover md:aspect-auto md:h-full"
          />
        </picture>
        <div className="pb-12 md:col-span-6 md:row-start-2 md:pt-8 md:pb-24">
          <p className="lead text-fg-2">{hero.subhead}</p>
          <div className="mt-8 flex flex-col items-start gap-x-8 gap-y-3 md:flex-row md:items-center">
            <Button item={hero.cta} hero block />
            {hero.secondaryCta && <Button item={hero.secondaryCta} kind="secondary" arrow={buttonStyle !== 'tab'} />}
          </div>
        </div>
      </div>
    </section>
  );
}
