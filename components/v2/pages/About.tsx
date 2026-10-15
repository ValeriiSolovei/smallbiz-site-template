import type { SiteConfigV2 } from '@/lib/types';
import PageHeader from '../PageHeader';
import Section from '../Section';
import IndexRows from '../IndexRows';
import Button from '../Button';

export default function AboutV2({ site }: { site: SiteConfigV2 }) {
  const { about } = site;
  return (
    <>
      <PageHeader label={about.label} title={about.headline} />
      <Section tone="base" space="regular">
        <div className="grid-12">
          <div className="measure space-y-4 text-fg-2 md:col-span-6">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <img src={about.photo.src} alt={about.photo.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover md:col-span-5 md:col-start-8" />
        </div>
      </Section>
      <Section tone="tint" space="tight" title={{ text: 'How we work' }} layout="side">
        <IndexRows rows={about.values} />
        <div className="mt-8">
          <Button item={site.cta.primary} block />
        </div>
      </Section>
    </>
  );
}
