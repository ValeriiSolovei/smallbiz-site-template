import type { Metadata } from 'next';
import { getSite } from '@/lib/site';
import AboutV2 from '@/components/v2/pages/About';

export function generateMetadata(): Metadata {
  return { title: 'About' };
}

export default function AboutPage() {
  return <AboutV2 site={getSite()} />;
}
