import type { SiteConfigV2 } from '@/lib/types';
import { toneFor } from '@/lib/rhythm';
import PageHeader from '../PageHeader';
import Button from '../Button';
import Closing from '../Closing';
import Joined from '../Joined';

/** Three photos a row from edge to edge; one column with gaps on a phone. */
function Strip({ site }: { site: SiteConfigV2 }) {
  return (
    <section data-tone="base" data-space="regular">
      <ul className="grid gap-4 px-[var(--gutter)] md:grid-cols-3 md:gap-0 md:px-0">
        {site.gallery.map((p) => (
          <li key={p.src}>
            <img src={p.src} alt={p.alt} width={800} height={533} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Mosaic: the first photo spans two rows and columns, everything in black and white. */
function Mosaic({ site }: { site: SiteConfigV2 }) {
  return (
    <ul className="grid grid-cols-2 gap-1 md:grid-cols-3">
      {site.gallery.map((p, i) => (
        <li key={p.src} className={i === 0 ? 'col-span-2 md:row-span-2' : ''}>
          <img src={p.src} alt={p.alt} width={800} height={800} loading="lazy" decoding="async" className="mono aspect-square h-full w-full object-cover" />
        </li>
      ))}
    </ul>
  );
}

/** Shelf: square colour photos as tiles with a hard shadow and wide gaps. */
function Shelf({ site }: { site: SiteConfigV2 }) {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-8 pr-2 md:grid-cols-3 md:gap-8">
      {site.gallery.map((p) => (
        <li key={p.src}>
          <img src={p.src} alt={p.alt} width={800} height={800} loading="lazy" decoding="async" className="tile aspect-square w-full object-cover" />
        </li>
      ))}
    </ul>
  );
}

/** Contact-sheet gallery: square photos with caption plaques, 2 columns on a phone and 3 from 768 px. */
export default function GalleryV2({ site }: { site: SiteConfigV2 }) {
  const header = <PageHeader tone={toneFor(site.design, 'brand')} label={`${site.gallery.length} photos`} title="Gallery" />;
  if (site.design.gallery === 'strip') {
    return (
      <>
        {header}
        <Strip site={site} />
        <Closing site={site} />
      </>
    );
  }
  return (
    <>
      {header}
      <section data-tone="base" data-space="regular">
        <div className="wrap">
          {site.design.gallery === 'mosaic' && <Mosaic site={site} />}
          {site.design.gallery === 'shelf' && <Shelf site={site} />}
          {(site.design.gallery ?? 'contact') === 'contact' && (
          <ul className="grid grid-cols-2 gap-1 md:grid-cols-3">
            {site.gallery.map((p) => (
              <li key={p.src}>
                <figure>
                  <img src={p.src} alt={p.alt} width={800} height={800} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
                  {p.caption && (
                    <figcaption className="bg-chip px-3 py-2.5 text-[0.9375rem] font-semibold md:px-5">
                      <Joined items={p.caption.split(' · ')} />
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
          )}
          <div className="mt-10">
            <Button item={site.cta.primary} block />
          </div>
        </div>
      </section>
      <Closing site={site} />
    </>
  );
}
