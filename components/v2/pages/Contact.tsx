import type { SiteConfigV2 } from '@/lib/types';
import PageHeader from '../PageHeader';
import HoursAndMap from '../HoursAndMap';
import ContactForm from '../ContactForm';

export default function ContactV2({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      <PageHeader label="Free written quotes across the GTA" title={site.form.title} intro={site.form.intro} />
      <section data-tone="tint" data-space="regular">
        <div className="wrap grid-12 items-start">
          <div className="md:col-span-7">
            <ContactForm form={site.form} />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <HoursAndMap contact={site.contact} />
            {site.credentials && <p className="text-small mt-6 font-semibold">{site.credentials}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
