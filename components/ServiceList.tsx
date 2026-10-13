import type { Service } from '@/lib/types';
import Pill from './Pill';

export default function ServiceList({ services, areas }: { services: Service[]; areas: string[] }) {
  return (
    <div className="space-y-14">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.name} className="rounded-2xl border border-border-default bg-surface-card p-6 transition-colors hover:border-accent">
            <h2 className="text-lg font-semibold">{s.name}</h2>
            <p className="mt-2 text-text-secondary">{s.description}</p>
            {s.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold">Areas we serve</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {areas.map((a) => (
            <Pill key={a}>{a}</Pill>
          ))}
        </div>
      </div>
    </div>
  );
}
