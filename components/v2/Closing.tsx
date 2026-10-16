import type { SiteConfigV2 } from '@/lib/types';
import Slab from './blocks/Slab';

/** The home page's closing slab, repeated at the end of inner pages so every page ends the same way. */
export default function Closing({ site }: { site: SiteConfigV2 }) {
  const slab = site.home.find((b) => b.kind === 'slab');
  if (!slab || slab.kind !== 'slab') return null;
  return <Slab tone={slab.tone} space={slab.space} label={slab.label} body={slab.body} phone={site.contact.phone} cta={site.cta.secondary} />;
}
