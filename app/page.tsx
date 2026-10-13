import { getSite } from '@/lib/site';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import CardGrid from '@/components/CardGrid';
import Reviews from '@/components/Reviews';
import CtaBand from '@/components/CtaBand';

export default function HomePage() {
  const site = getSite();
  return (
    <>
      <Hero hero={site.hero} />
      <Section eyebrow="At a glance" title={site.tagline}>
        <CardGrid items={site.highlights} />
      </Section>
      <Section eyebrow="Why us" title={site.whyUs.title}>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <ul className="accent-list space-y-3 text-lg text-text-secondary">
            {site.whyUs.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <img src={site.about.photo.src} alt={site.about.photo.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
        </div>
      </Section>
      <Section eyebrow="Sample reviews" title="What customers say">
        <Reviews reviews={site.reviews} />
      </Section>
      <CtaBand band={site.ctaBand} />
    </>
  );
}
