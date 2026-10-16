import type { SiteConfigV2 } from '@/lib/types';
import PageHeader from '../PageHeader';
import HoursAndMap from '../HoursAndMap';
import ContactForm from '../ContactForm';

/** The call bar is hidden here (the keyboard needs the room), so the call action sits in the header instead. */
export default function ContactV2({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      <PageHeader tone="inverse" label="Free written quotes across Toronto" title={site.form.title} intro={site.form.intro} action={site.cta.primary} />
      <section data-tone="tint" data-space="regular">
        <div className="wrap grid-12 items-start">
          <div className="md:col-span-7">
            <ContactForm form={site.form} />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <HoursAndMap contact={site.contact} call={false} />
          </div>
        </div>
      </section>
    </>
  );
}
