import type { SiteConfigV2 } from '@/lib/types';
import PrimaryContent from '@/components/PrimaryContent';
import PageHeader from '../PageHeader';
import Section from '../Section';
import IndexRows from '../IndexRows';
import Symptoms from '../blocks/Symptoms';
import Closing from '../Closing';

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
  const rows = p.services.map((s) => ({ id: slug(s.name), title: s.name, body: s.description, meta: s.time, sub: s.tags?.join(' ~ ') }));
  return (
    <>
      <PageHeader label={`${p.services.length} services across Toronto & the GTA`} title={p.title} intro={p.intro} />
      <Section tone="base" space="regular">
        <IndexRows rows={rows} />
      </Section>
      <section data-tone="inverse" data-space="tight">
        <div className="wrap">
          <h2 className="text-small font-semibold text-fg-2">Areas we serve</h2>
          <p className="h-display mt-4 text-[clamp(1.5rem,1rem+2vw,2.5rem)] leading-tight">{p.areas.join(' · ')}</p>
        </div>
      </section>
      {site.symptoms && site.symptoms.length > 0 && (
        <Symptoms tone="tint" space="regular" title={{ text: 'Sound familiar?' }} items={site.symptoms} cta={site.cta.primary} />
      )}
      <Closing site={site} />
    </>
  );
}
