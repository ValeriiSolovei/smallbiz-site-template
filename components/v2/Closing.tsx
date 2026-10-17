import type { SiteConfigV2 } from '@/lib/types';
import Slab from './blocks/Slab';
import Visit from './blocks/Visit';

/** The home page's closing block (the slab, or the café's visit block), repeated at the end of inner pages so every page ends the same way. */
export default function Closing({ site }: { site: SiteConfigV2 }) {
  const end = site.home.findLast((b) => b.kind === 'slab' || b.kind === 'visit');
  if (end?.kind === 'slab') return <Slab tone={end.tone} space={end.space} label={end.label} body={end.body} phone={site.contact.phone} cta={site.cta.secondary} />;
  if (end?.kind === 'visit') return <Visit tone={end.tone} space={end.space} title={end.title} note={end.note} contact={site.contact} call={site.cta.secondary ?? site.cta.primary} />;
  return null;
}
