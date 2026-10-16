import type { SiteConfigV2 } from '@/lib/types';
import PageHeader from '../PageHeader';
import Section from '../Section';
import IndexRows from '../IndexRows';
import Button from '../Button';
import Closing from '../Closing';

export default function AboutV2({ site }: { site: SiteConfigV2 }) {
  const { about } = site;
  return (
    <>
      <PageHeader label={about.label} title={about.headline} />
      <Section tone="base" space="regular">
        <div className="grid-12 items-start">
          <div className="space-y-5 md:col-span-6">
            {about.story.map((p) => (
              <p key={p} className="lead text-fg-2">
                {p}
              </p>
            ))}
            {site.credentials && <p className="text-small font-semibold">{site.credentials}</p>}
          </div>
          <img
            src={about.photo.src}
            alt={about.photo.alt}
            width={630}
            height={840}
            loading="lazy"
            decoding="async"
            className="aspect-[3/4] w-full object-cover md:col-span-5 md:col-start-8"
          />
        </div>
      </Section>
      <Section tone="tint" space="tight" title={{ text: 'How we work' }} layout="side" aside={<Button item={site.cta.primary} block />}>
        <IndexRows rows={about.values} />
      </Section>
      <Closing site={site} />
    </>
  );
}
