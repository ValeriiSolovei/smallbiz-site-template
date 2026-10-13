import Link from 'next/link';
import type { SiteConfig } from '@/lib/types';

export default function CtaBand({ band }: { band: SiteConfig['ctaBand'] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="glow flex flex-col items-start justify-between gap-6 rounded-2xl border border-border-default bg-surface-card p-8 md:flex-row md:items-center md:p-12">
        <div>
          <h2 className="text-2xl font-bold">{band.headline}</h2>
          <p className="mt-2 text-text-secondary">{band.body}</p>
        </div>
        <Link href={band.cta.href} className="rounded-xl bg-accent px-6 py-3 font-semibold text-accent-contrast hover:bg-accent-hover">
          {band.cta.label}
        </Link>
      </div>
    </section>
  );
}
