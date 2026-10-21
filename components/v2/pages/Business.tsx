import type { SiteConfigV2 } from '@/lib/types';
import PageHeader from '../PageHeader';
import Section from '../Section';
import IndexRows from '../IndexRows';
import Symptoms from '../blocks/Symptoms';
import Closing from '../Closing';
import Button from '../Button';
import Joined from '../Joined';
import MenuList from '../MenuList';
import { toneFor } from '@/lib/rhythm';
import WeekDays from '../WeekDays';
import ProductTile from '../ProductTile';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** The business page: services, menu, classes or products, each in its v2 layout. */
export default function BusinessV2({ site }: { site: SiteConfigV2 }) {
  const p = site.primary;
  if (p.kind === 'menu') {
    return (
      <>
        <PageHeader tone={toneFor(site.design, 'brand')} label={site.tagline} title={p.title} intro={p.intro} />
        <Section tone="base" space="regular">
          <div data-tone="inverse" className="px-6 py-10 md:px-12 md:py-14">
            <MenuList sections={p.sections} />
          </div>
        </Section>
        <Closing site={site} />
      </>
    );
  }
  if (p.kind === 'classes') {
    return (
      <>
        <PageHeader tone={toneFor(site.design, 'tint')} label={site.tagline} title={p.title} intro={p.intro} />
        <Section tone="base" space="regular">
          <div>
            <h2 className="h2 h-display">Weekly schedule</h2>
            <div className="mt-8">
              <WeekDays schedule={p.schedule} />
            </div>
          </div>
        </Section>
        <Section tone="tint" space="tight" title={{ text: 'Coaches' }}>
          <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
            {p.trainers.map((t) => (
              <li key={t.name}>
                <img src={t.photo.src} alt={t.photo.alt} width={800} height={1000} loading="lazy" decoding="async" className="mono aspect-[4/5] w-full object-cover" />
                <p className="h-display mt-4 text-2xl font-bold">{t.name}</p>
                <p className="text-small text-fg-2">{t.specialty}</p>
              </li>
            ))}
          </ul>
        </Section>
        <Closing site={site} />
      </>
    );
  }
  if (p.kind === 'products') {
    return (
      <>
        <PageHeader tone={toneFor(site.design, 'tint')} label={site.tagline} title={p.title} intro={p.intro} />
        <Section tone="base" space="regular">
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 pr-2 md:grid-cols-3 md:gap-x-8">
            {p.products.map((product) => (
              <ProductTile key={product.name} product={product} />
            ))}
          </ul>
          <div className="mt-12">
            <Button item={site.cta.primary} block />
          </div>
        </Section>
        <Closing site={site} />
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
