import type { Metadata } from 'next';
import { getSite } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import HoursAndMap from '@/components/HoursAndMap';
import ContactV2 from '@/components/v2/pages/Contact';

export function generateMetadata(): Metadata {
  return { title: 'Contact' };
}

export default function ContactPage() {
  const site = getSite();
  if (site.system === 'v2') return <ContactV2 site={site} />;
  return (
    <>
      <PageHeader eyebrow="Contact" title={site.form.title} intro={site.form.intro} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <ContactForm form={site.form} />
        <HoursAndMap contact={site.contact} />
      </section>
    </>
  );
}
