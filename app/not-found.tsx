import type { Metadata } from 'next';
import NotFoundV2 from '@/components/v2/pages/NotFound';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return <NotFoundV2 />;
}
