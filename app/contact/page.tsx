import type { Metadata } from 'next';
import { getSite } from '@/lib/site';
import ContactV2 from '@/components/v2/pages/Contact';

export function generateMetadata(): Metadata {
  return { title: 'Contact' };
}

export default function ContactPage() {
  return <ContactV2 site={getSite()} />;
}
