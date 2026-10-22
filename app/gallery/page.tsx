import type { Metadata } from 'next';
import { getSite } from '@/lib/site';
import GalleryV2 from '@/components/v2/pages/Gallery';

export function generateMetadata(): Metadata {
  return { title: 'Gallery' };
}

export default function GalleryPage() {
  return <GalleryV2 site={getSite()} />;
}
