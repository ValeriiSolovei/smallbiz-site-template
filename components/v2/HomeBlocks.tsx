import type { HomeBlock, SiteConfigV2 } from '@/lib/types';
import Strip from './blocks/Strip';
import Services from './blocks/Services';
import Symptoms from './blocks/Symptoms';
import Faq from './blocks/Faq';
import Reviews from './blocks/Reviews';
import Slab from './blocks/Slab';
import WorkOrder from './blocks/WorkOrder';

/** Numbered labels count the labelled blocks in page order (services 01, work order 02, reviews 03). */
function labelNumber(site: SiteConfigV2, block: HomeBlock): string | undefined {
  if (site.design.label !== 'numbered') return undefined;
  const labelled = site.home.filter((b) => b.kind === 'reviews' || ('label' in b && b.label && b.kind !== 'slab'));
  const i = labelled.indexOf(block);
  return i < 0 ? undefined : String(i + 1).padStart(2, '0');
}

function Block({ block, site }: { block: HomeBlock; site: SiteConfigV2 }) {
  const { tone, space } = block;
  const cta = site.cta.primary;
  switch (block.kind) {
    case 'strip':
      return <Strip tone={tone} space={space} items={block.items} />;
    case 'services':
      return <Services tone={tone} space={space} title={block.title} label={block.label} count={block.count} primary={site.primary} highlights={site.highlights} cta={cta} n={labelNumber(site, block)} />;
    case 'workorder':
      return <WorkOrder tone={tone} space={space} title={block.title} label={block.label} body={block.body} data={site.workOrder} cta={cta} n={labelNumber(site, block)} />;
    case 'symptoms':
      return <Symptoms tone={tone} space={space} title={block.title} items={site.symptoms ?? []} note={block.note} cta={cta} />;
    case 'faq':
      return <Faq tone={tone} space={space} title={block.title} items={site.faq ?? []} />;
    case 'reviews':
      return <Reviews tone={tone} space={space} title={block.title} reviews={site.reviews} cta={cta} n={labelNumber(site, block)} />;
    case 'slab':
      return <Slab tone={tone} space={space} label={block.label} body={block.body} phone={site.contact.phone} cta={site.cta.secondary} />;
  }
}

/** Renders the site's home block list in order. */
export default function HomeBlocks({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      {site.home.map((block, i) => (
        <Block key={`${block.kind}-${i}`} block={block} site={site} />
      ))}
    </>
  );
}
