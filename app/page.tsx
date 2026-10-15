import { getSite } from '@/lib/site';
import HomeV1 from '@/components/HomeV1';
import HomeV2 from '@/components/v2/pages/Home';

export default function HomePage() {
  const site = getSite();
  return site.system === 'v2' ? <HomeV2 site={site} /> : <HomeV1 site={site} />;
}
