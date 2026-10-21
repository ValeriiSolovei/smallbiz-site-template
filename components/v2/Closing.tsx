import type { SiteConfigV2 } from '@/lib/types';
import Slab from './blocks/Slab';
import Visit from './blocks/Visit';
import Plans from './blocks/Plans';
import LightGuide from './blocks/LightGuide';

/** The home page's closing block (slab, visit, price board or light guide), repeated at the end of inner pages so every page ends the same way. */
export default function Closing({ site }: { site: SiteConfigV2 }) {
  const end = site.home.findLast((b) => b.kind === 'slab' || b.kind === 'visit' || b.kind === 'plans' || b.kind === 'light');
  const p = site.primary;
  if (end?.kind === 'plans') return <Plans tone={end.tone} space={end.space} title={end.title} plans={p.kind === 'classes' ? p.plans : []} note={end.note} cta={site.cta.primary} />;
  if (end?.kind === 'light') return <LightGuide tone={end.tone} space={end.space} title={end.title} stops={site.lightGuide ?? []} note={end.note} cta={site.cta.secondary ?? site.cta.primary} />;
  if (end?.kind === 'slab') return <Slab tone={end.tone} space={end.space} label={end.label} body={end.body} phone={site.contact.phone} cta={site.cta.secondary} />;
  if (end?.kind === 'visit') return <Visit tone={end.tone} space={end.space} title={end.title} note={end.note} contact={site.contact} call={site.cta.secondary ?? site.cta.primary} />;
  return null;
}
