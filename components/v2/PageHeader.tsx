import type { NavItem, Tone } from '@/lib/types';
import Label from './Label';
import Button from './Button';

/** Inner-page header band: the site label, the page's H1 and an optional lead. */
export default function PageHeader({ label, title, intro, tone = 'brand', action }: { label: string; title: string; intro?: string; tone?: Tone; action?: NavItem }) {
  return (
    <section data-tone={tone} data-space="tight">
      <div className="wrap">
        <Label>{label}</Label>
        <h1 className="h1 h-display mt-4 max-w-[14em]">{title}</h1>
        {intro && <p className="lead mt-6 text-fg-2">{intro}</p>}
        {action && (
          <div className="mt-8">
            <Button item={action} hero block />
          </div>
        )}
      </div>
    </section>
  );
}
