import type { SiteConfigV2 } from '@/lib/types';
import Signboard from '../hero/Signboard';
import HomeBlocks from '../HomeBlocks';

export default function HomeV2({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      <Signboard site={site} />
      <HomeBlocks site={site} />
    </>
  );
}
