import type { Metadata } from 'next';
import { getSite } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import PrimaryContent from '@/components/PrimaryContent';
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
  const site = getSite();
  if (site.system === 'v2') return <BusinessV2 site={site} />;
  return (
    <>
      <PageHeader eyebrow={site.name} title={site.primary.title} intro={site.primary.intro} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <PrimaryContent primary={site.primary} />
      </section>
    </>
  );
}
