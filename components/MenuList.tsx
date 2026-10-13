import type { MenuSection } from '@/lib/types';

export default function MenuList({ sections }: { sections: MenuSection[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {sections.map((s) => (
        <div key={s.name} className="rounded-2xl border border-border-default bg-surface-card p-6">
          <h2 className="eyebrow">{s.name}</h2>
          <ul className="mt-4 divide-y divide-border-default">
            {s.items.map((it) => (
              <li key={it.name} className="flex justify-between gap-4 py-3">
                <div>
                  <p className="font-semibold">{it.name}</p>
                  {it.description && <p className="text-sm text-text-secondary">{it.description}</p>}
                </div>
                <p className="font-semibold text-accent">{it.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
