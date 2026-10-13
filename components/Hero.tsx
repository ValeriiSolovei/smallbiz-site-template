import Link from 'next/link';
import type { SiteConfig } from '@/lib/types';

export default function Hero({ hero }: { hero: SiteConfig['hero'] }) {
  return (
    <section className="relative overflow-hidden bg-surface-hero">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">{hero.headline}</h1>
          <p className="mt-5 max-w-xl text-lg text-text-secondary">{hero.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={hero.cta.href} className="glow rounded-xl bg-accent px-6 py-3 font-semibold text-accent-contrast hover:bg-accent-hover">
              {hero.cta.label}
            </Link>
            {hero.secondaryCta && (
              <a href={hero.secondaryCta.href} className="rounded-xl border border-border-default px-6 py-3 font-semibold hover:border-accent">
                {hero.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
        <img src={hero.photo.src} alt={hero.photo.alt} fetchPriority="high" className="glow aspect-[4/3] w-full rounded-2xl object-cover" />
      </div>
    </section>
  );
}
