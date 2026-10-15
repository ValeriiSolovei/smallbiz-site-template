import type { SiteConfigV2 } from '@/lib/types';
import PrimaryContent from '@/components/PrimaryContent';
import PageHeader from '../PageHeader';

/** The business page. The per-kind content still uses the shared components until each site's own version lands. */
export default function BusinessV2({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      <PageHeader label={site.tagline} title={site.primary.title} intro={site.primary.intro} />
      <section data-tone="base" data-space="regular">
        <div className="wrap">
          <PrimaryContent primary={site.primary} />
        </div>
      </section>
    </>
  );
}
