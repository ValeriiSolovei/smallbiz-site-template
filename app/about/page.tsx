import type { Metadata } from 'next';
import { getSite } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import Section from '@/components/Section';
import CardGrid from '@/components/CardGrid';
import CtaBand from '@/components/CtaBand';
import AboutV2 from '@/components/v2/pages/About';

export function generateMetadata(): Metadata {
  return { title: 'About' };
}

export default function AboutPage() {
  const site = getSite();
  if (site.system === 'v2') return <AboutV2 site={site} />;
  const { about } = site;
  return (
    <>
      <PageHeader eyebrow={about.eyebrow} title={about.headline} />
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-16 md:grid-cols-2">
        <div className="space-y-4 text-lg text-text-secondary">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <img src={about.photo.src} alt={about.photo.alt} className="glow aspect-[4/3] w-full rounded-2xl object-cover" />
      </section>
      <Section eyebrow="What we value" title="How we work">
        <CardGrid items={about.values} />
      </Section>
      <CtaBand band={site.ctaBand} />
    </>
  );
}
