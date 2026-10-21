import type { Product } from '@/lib/types';
import LightScale from './LightScale';

/** One product on the shelf: a square colour photo with a hard shadow, the name, the Latin name, the price and its light. */
export default function ProductTile({ product: p }: { product: Product }) {
  return (
    <li>
      <img src={p.photo.src} alt={p.photo.alt} width={800} height={800} loading="lazy" decoding="async" className="tile aspect-square w-full object-cover" />
      <div className="mt-5 flex items-baseline justify-between gap-3">
        <h3 className="text-[1.375rem] leading-tight">{p.name}</h3>
        <p className="tabular flex-none">{p.price}</p>
      </div>
      {p.latin && <p className="voice text-[1.0625rem] text-fg-2">{p.latin}</p>}
      {p.light && <LightScale light={p.light} className="mt-3" />}
    </li>
  );
}
