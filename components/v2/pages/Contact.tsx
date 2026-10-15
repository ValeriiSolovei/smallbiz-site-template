import type { SiteConfigV2 } from '@/lib/types';
import ContactForm from '@/components/ContactForm';
import PageHeader from '../PageHeader';
import HoursAndMap from '../HoursAndMap';

/** Contact page. The form is the shared component (ids, aria and focus logic stay identical). */
export default function ContactV2({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      <PageHeader label="Contact" title={site.form.title} intro={site.form.intro} />
      <section data-tone="tint" data-space="regular">
        <div className="wrap grid-12">
          <div className="md:col-span-7">
            <ContactForm form={site.form} />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <HoursAndMap contact={site.contact} />
          </div>
        </div>
      </section>
    </>
  );
}
