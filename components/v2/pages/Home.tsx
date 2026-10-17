import type { SiteConfigV2 } from '@/lib/types';
import Signboard from '../hero/Signboard';
import PhotoBlock from '../hero/PhotoBlock';
import HomeBlocks from '../HomeBlocks';

export default function HomeV2({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      {site.hero.variant === 'photo-block' ? <PhotoBlock hero={site.hero} hours={site.contact.hours} /> : <Signboard site={site} />}
      <HomeBlocks site={site} />
    </>
  );
}
