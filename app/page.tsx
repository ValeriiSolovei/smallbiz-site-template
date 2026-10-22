import { getSite } from '@/lib/site';
import HomeV2 from '@/components/v2/pages/Home';

export default function HomePage() {
  return <HomeV2 site={getSite()} />;
}
