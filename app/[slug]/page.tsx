import type { Metadata } from 'next';
import { getSite } from '@/lib/site';
import BusinessV2 from '@/components/v2/pages/Business';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: getSite().primary.slug }];
}

export function generateMetadata(): Metadata {
  return { title: getSite().primary.title };
}

export default async function BusinessPage({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return <BusinessV2 site={getSite()} />;
}
