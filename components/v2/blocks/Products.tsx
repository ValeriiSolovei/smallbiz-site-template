import type { NavItem, Product, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import Button from '../Button';
import ProductTile from '../ProductTile';

/** A few products as hard-shadow tiles, under the hero photo that crosses into this band. */
export default function Products({ tone, space, title, products, cta, afterCross }: { tone: Tone; space: Space; title: Voice; products: Product[]; cta: NavItem; afterCross?: boolean }) {
  return (
    <Section tone={tone} space={space} title={title} afterCross={afterCross}>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 pr-2 md:grid-cols-4 md:gap-x-8">
        {products.map((p) => (
          <ProductTile key={p.name} product={p} />
        ))}
      </ul>
      <div className="mt-12">
        <Button item={cta} block />
      </div>
    </Section>
  );
}
