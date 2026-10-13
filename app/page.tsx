import { getSite } from '@/lib/site';
import PageHeader from '@/components/PageHeader';

export default function HomePage() {
  const site = getSite();
  return <PageHeader eyebrow={site.hero.eyebrow} title={site.name} intro={site.tagline} />;
}
