import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
      <p className="mt-4 text-text-secondary">That page does not exist.</p>
      <Link href="/" className="mt-8 inline-block rounded-xl bg-accent px-6 py-3 font-semibold text-accent-contrast">
        Back to home
      </Link>
    </section>
  );
}
