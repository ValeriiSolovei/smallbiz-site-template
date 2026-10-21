import type { NavItem, Plan, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import Button from '../Button';

/**
 * The price board: three columns split by hairlines on the dark band. The featured plan is a chalk panel
 * with an accent bar on top. On a phone the plans are rows split by hairlines. The page ends here.
 */
export default function Plans({ tone, space, title, plans, note, cta }: { tone: Tone; space: Space; title: Voice; plans: Plan[]; note: string; cta: NavItem }) {
  return (
    <Section tone={tone} space={space} title={title}>
      <ul className="grid border-b border-rule md:grid-cols-3 md:border-b-0">
        {plans.map((p) => (
          <li
            key={p.name}
            data-tone={p.featured ? 'base' : undefined}
            className={`border-t border-rule py-8 md:border-t-0 md:px-8 ${p.featured ? 'plan-featured px-6' : 'md:[&:not(:first-child)]:border-l'}`}
          >
            <h3 className="h-display text-[1.375rem] font-bold">{p.name}</h3>
            <p className="mt-3">
              <span className="numeral h-display font-extrabold">{p.price}</span>
              <span className="text-small ml-2 text-fg-2">{p.period}</span>
            </p>
            <ul className="mt-5 space-y-1">
              {p.features.map((f) => (
                <li key={f}>— {f}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="text-small mt-8 text-fg-2">{note}</p>
      <div className="mt-6">
        <Button item={cta} block />
      </div>
    </Section>
  );
}
