import type { SiteConfigV2 } from '@/lib/types';
import PrimaryContent from '@/components/PrimaryContent';
import PageHeader from '../PageHeader';
import Section from '../Section';
import IndexRows from '../IndexRows';
import Symptoms from '../blocks/Symptoms';
import Closing from '../Closing';
import Button from '../Button';
import Joined from '../Joined';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** The business page. Services get their v2 layout; other kinds use the shared components until their site moves over. */
export default function BusinessV2({ site }: { site: SiteConfigV2 }) {
  const p = site.primary;
  if (p.kind !== 'services') {
    return (
      <>
        <PageHeader label={site.tagline} title={p.title} intro={p.intro} />
        <section data-tone="base" data-space="regular">
          <div className="wrap">
            <PrimaryContent primary={p} />
          </div>
        </section>
      </>
    );
  }
  const rows = p.services.map((s) => ({ id: slug(s.name), title: s.name, body: s.description, meta: s.time, sub: s.tags?.join(' · ') }));
  return (
    <>
      <PageHeader label={`${p.services.length} services across Toronto & the GTA`} title={p.title} intro={p.intro} />
      <Section tone="base" space="regular">
        <div className="max-w-[940px]">
          <IndexRows rows={rows} />
          <div className="mt-10">
            <Button item={site.cta.primary} block />
          </div>
        </div>
      </Section>
      <section data-tone="inverse" data-space="tight">
        <div className="wrap">
          <h2 className="sr-only">Areas we serve</h2>
          <p className="h-display text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-tight">
            <Joined items={p.areas} />
          </p>
        </div>
      </section>
      {site.symptoms && site.symptoms.length > 0 && (
        <Symptoms tone="tint" space="regular" title={{ text: 'Sound familiar?' }} items={site.symptoms} cta={site.cta.primary} />
      )}
      <Closing site={site} />
    </>
  );
}
