import type { Metadata } from 'next';
import { getSite } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import Gallery from '@/components/Gallery';
import GalleryV2 from '@/components/v2/pages/Gallery';

export function generateMetadata(): Metadata {
  return { title: 'Gallery' };
}

export default function GalleryPage() {
  const site = getSite();
  if (site.system === 'v2') return <GalleryV2 site={site} />;
  return (
    <>
      <PageHeader eyebrow={site.name} title="Gallery" />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Gallery photos={site.gallery} />
      </section>
    </>
  );
}
