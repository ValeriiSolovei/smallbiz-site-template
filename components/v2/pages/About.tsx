import type { SiteConfigV2 } from '@/lib/types';
import { toneFor } from '@/lib/rhythm';
import PageHeader from '../PageHeader';
import Section from '../Section';
import IndexRows from '../IndexRows';
import Button from '../Button';
import Closing from '../Closing';

export default function AboutV2({ site }: { site: SiteConfigV2 }) {
  const { about } = site;
  return (
    <>
      <PageHeader tone={toneFor(site.design, 'brand')} label={about.label} title={about.headline} />
      <Section tone="base" space="regular">
        <div className="grid-12 items-start">
          <div className="space-y-5 md:col-span-6">
            {about.story.map((p) => (
              <p key={p} className="lead text-fg-2">
                {p}
              </p>
            ))}
            <div className="pt-4">
              <Button item={site.cta.primary} block />
            </div>
          </div>
          <img
            src={about.photo.src}
            alt={about.photo.alt}
            width={960}
            height={639}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full object-cover md:col-span-5 md:col-start-8"
          />
        </div>
      </Section>
      <Section tone={toneFor(site.design, 'tint')} space="tight" title={{ text: 'How we work' }} layout="side" aside={<Button item={site.cta.secondary ?? site.cta.primary} block />}>
        <IndexRows rows={about.values} />
      </Section>
      <Closing site={site} />
    </>
  );
}
