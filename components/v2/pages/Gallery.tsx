import type { SiteConfigV2 } from '@/lib/types';
import PageHeader from '../PageHeader';

/** Contact-sheet gallery: square photos with a 4 px gap, 2 columns on a phone and 3 from 768 px. */
export default function GalleryV2({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      <PageHeader label={`${site.gallery.length} photos`} title="Gallery" />
      <section data-tone="base" data-space="regular">
        <div className="wrap grid grid-cols-2 gap-1 md:grid-cols-3">
          {site.gallery.map((p) => (
            <img key={p.src} src={p.src} alt={p.alt} width={800} height={800} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
          ))}
        </div>
      </section>
    </>
  );
}
