import type { ReactNode } from 'react';

export default function Section({ eyebrow, title, children }: { eyebrow?: string; title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold tracking-tight">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
