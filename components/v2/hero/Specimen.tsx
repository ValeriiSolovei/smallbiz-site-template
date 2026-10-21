import type { HeroV2, SiteConfigV2 } from '@/lib/types';
import { renderVoice } from '@/lib/voice';
import Button from '../Button';
import Label from '../Label';
import LightScale from '../LightScale';

type Props = { hero: Extract<HeroV2, { variant: 'specimen' }>; buttonStyle: SiteConfigV2['design']['button'] };

/**
 * A specimen on the shelf: the headline over a colour photo that crosses into the next section, with a chip on
 * its corner naming the plant and its light. On a phone the photo follows the headline, then the chip.
 */
export default function Specimen({ hero, buttonStyle }: Props) {
  return (
    <section data-tone={hero.tone} aria-labelledby="hero-title">
      <div className="wrap grid-12 gap-y-6 pt-10 md:gap-y-8 md:pt-20">
        <div className="md:col-span-9">
          <Label>{hero.label}</Label>
          <h1 id="hero-title" className="h1 h-display mt-5">
            {renderVoice(hero.headline)}
          </h1>
        </div>
        <div className="md:order-last md:col-span-9 md:col-start-4">
          <figure className="specimen crossing-md relative">
            <picture className="-mx-[var(--gutter)] block md:mx-0">
              <source media="(max-width: 767px)" srcSet={hero.photoSmall.src} width={800} height={600} />
              <img src={hero.photo.src} alt={hero.photo.alt} width={960} height={640} fetchPriority="high" className="block aspect-[4/3] w-full object-cover md:aspect-[3/2]" />
            </picture>
            <figcaption data-tone="base" className="tile specimen-chip mt-6 inline-flex flex-col gap-2 px-5 py-4 md:absolute md:bottom-8 md:-left-12 md:mt-0">
              <span className="voice text-[1.0625rem]">{hero.chip.latin}</span>
              <LightScale light={hero.chip.light} />
            </figcaption>
          </figure>
        </div>
        <div className="pb-12 md:col-span-6 md:pb-0">
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
