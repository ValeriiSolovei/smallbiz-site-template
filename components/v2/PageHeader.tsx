import type { Tone } from '@/lib/types';
import Label from './Label';

/** Inner-page header band: the site label, the page's H1 and an optional lead. */
export default function PageHeader({ label, title, intro, tone = 'brand' }: { label: string; title: string; intro?: string; tone?: Tone }) {
  return (
    <section data-tone={tone} data-space="tight">
      <div className="wrap">
        <Label>{label}</Label>
        <h1 className="h1 h-display mt-4 max-w-[14em]">{title}</h1>
        {intro && <p className="lead mt-6 text-fg-2">{intro}</p>}
      </div>
    </section>
  );
}
