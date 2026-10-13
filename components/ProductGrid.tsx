import type { Product } from '@/lib/types';
import Pill from './Pill';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div key={p.name} className="rounded-2xl border border-border-default bg-surface-card p-4 transition-colors hover:border-accent">
          <img src={p.photo.src} alt={p.photo.alt} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
          <div className="mt-4 flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="font-semibold text-accent">{p.price}</p>
          </div>
          <p className="mt-1 text-text-secondary">{p.description}</p>
          {p.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
