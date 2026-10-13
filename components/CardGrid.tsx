import type { Card } from '@/lib/types';

export default function CardGrid({ items }: { items: Card[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((it) => (
        <div key={it.title} className="rounded-2xl border border-border-default bg-surface-card p-6 transition-colors hover:border-accent">
          <h3 className="text-lg font-semibold">{it.title}</h3>
          <p className="mt-2 text-text-secondary">{it.body}</p>
        </div>
      ))}
    </div>
  );
}
