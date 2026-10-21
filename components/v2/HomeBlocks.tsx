import type { HomeBlock, SiteConfigV2 } from '@/lib/types';
import Strip from './blocks/Strip';
import Services from './blocks/Services';
import Symptoms from './blocks/Symptoms';
import Faq from './blocks/Faq';
import Reviews from './blocks/Reviews';
import Slab from './blocks/Slab';
import WorkOrder from './blocks/WorkOrder';
import Menu from './blocks/Menu';
import Room from './blocks/Room';
import Overheard from './blocks/Overheard';
import Visit from './blocks/Visit';
import WeekBoard from './blocks/WeekBoard';
import Coaches from './blocks/Coaches';
import Wall from './blocks/Wall';
import Plans from './blocks/Plans';
import Products from './blocks/Products';
import Tiles from './blocks/Tiles';
import LightGuide from './blocks/LightGuide';

/** Numbered labels count the labelled blocks in page order (services 01, work order 02, reviews 03). */
function labelNumber(site: SiteConfigV2, block: HomeBlock): string | undefined {
  if (site.design.label !== 'numbered') return undefined;
  const labelled = site.home.filter((b) => b.kind === 'reviews' || ('label' in b && b.label && b.kind !== 'slab'));
  const i = labelled.indexOf(block);
  return i < 0 ? undefined : String(i + 1).padStart(2, '0');
}

function Block({ block, site, afterCross }: { block: HomeBlock; site: SiteConfigV2; afterCross: boolean }) {
  const { tone, space } = block;
  const cta = site.cta.primary;
  const p = site.primary;
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
      if (block.variant === 'overheard') return <Overheard tone={tone} space={space} title={block.title} reviews={site.reviews} />;
      if (block.variant === 'wall') return <Wall tone={tone} space={space} title={block.title} reviews={site.reviews} cta={cta} />;
      if (block.variant === 'tiles') return <Tiles tone={tone} space={space} title={block.title} reviews={site.reviews} cta={cta} />;
      return <Reviews tone={tone} space={space} title={block.title} reviews={site.reviews} cta={cta} n={labelNumber(site, block)} />;
    case 'slab':
      return <Slab tone={tone} space={space} label={block.label} body={block.body} phone={site.contact.phone} cta={site.cta.secondary} />;
    case 'menu':
      return <Menu tone={tone} space={space} title={block.title} sections={site.primary.kind === 'menu' ? site.primary.sections.slice(0, block.sections) : []} cta={cta} />;
    case 'room':
      return <Room tone={tone} space={space} title={block.title} story={block.story} points={block.points} photos={block.photos} cta={cta} />;
    case 'visit':
      return <Visit tone={tone} space={space} title={block.title} note={block.note} contact={site.contact} call={site.cta.secondary ?? cta} />;
    case 'week':
      return <WeekBoard tone={tone} space={space} title={block.title} schedule={p.kind === 'classes' ? p.schedule : []} more={block.more} cta={cta} />;
    case 'coaches':
      return <Coaches tone={tone} space={space} title={block.title} points={block.points} trainers={p.kind === 'classes' ? p.trainers : []} cta={cta} />;
    case 'plans':
      return <Plans tone={tone} space={space} title={block.title} plans={p.kind === 'classes' ? p.plans : []} note={block.note} cta={cta} />;
    case 'products':
      return <Products tone={tone} space={space} title={block.title} products={p.kind === 'products' ? p.products.slice(0, block.count) : []} cta={cta} afterCross={afterCross} />;
    case 'light':
      return <LightGuide tone={tone} space={space} title={block.title} stops={site.lightGuide ?? []} note={block.note} cta={site.cta.secondary ?? cta} />;
  }
}

/** Renders the site's home block list in order. */
export default function HomeBlocks({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      {site.home.map((block, i) => (
        // The specimen hero's photo crosses into the first block.
        <Block key={`${block.kind}-${i}`} block={block} site={site} afterCross={i === 0 && site.hero.variant === 'specimen'} />
      ))}
    </>
  );
}
