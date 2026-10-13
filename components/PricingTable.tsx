import type { Plan } from '@/lib/types';

export default function PricingTable({ plans }: { plans: Plan[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Membership</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border bg-surface-card p-6 ${p.featured ? 'glow border-accent' : 'border-border-default'}`}
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-3">
              <span className="text-3xl font-bold text-accent">{p.price}</span>{' '}
              <span className="text-sm text-text-secondary">{p.period}</span>
            </p>
            <ul className="accent-list mt-5 space-y-2 text-text-secondary">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
