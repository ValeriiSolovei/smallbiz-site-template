import type { PrimaryPage } from '@/lib/types';
import MenuList from './MenuList';
import ServiceList from './ServiceList';
import Schedule from './Schedule';
import PricingTable from './PricingTable';
import TrainerGrid from './TrainerGrid';
import ProductGrid from './ProductGrid';

export default function PrimaryContent({ primary }: { primary: PrimaryPage }) {
  switch (primary.kind) {
    case 'menu':
      return <MenuList sections={primary.sections} />;
    case 'services':
      return <ServiceList services={primary.services} areas={primary.areas} />;
    case 'classes':
      return (
        <div className="space-y-16">
          <Schedule schedule={primary.schedule} />
          <PricingTable plans={primary.plans} />
          <TrainerGrid trainers={primary.trainers} />
        </div>
      );
    case 'products':
      return <ProductGrid products={primary.products} />;
  }
}
