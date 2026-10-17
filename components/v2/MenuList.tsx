import type { MenuSection } from '@/lib/types';
import LeaderRow from './LeaderRow';

/** Menu sections as a printed card: name, dotted leader, price; two columns split by a hairline from 768 px. */
export default function MenuList({ sections }: { sections: MenuSection[] }) {
  return (
    <div className="grid gap-y-12 md:grid-cols-2">
      {sections.map((s, i) => (
        <section key={s.name} className={i % 2 ? 'md:border-l md:border-rule md:pl-10' : 'md:pr-10'}>
          <h3 className="h-display text-[calc(var(--fs-h3)*1.2)]">{s.name}</h3>
          <ul className="mt-6 space-y-5">
            {s.items.map((it) => (
              <li key={it.name}>
                <LeaderRow name={<span className="text-[1.125rem] font-medium">{it.name}</span>} value={it.price} />
                {it.description && <p className="text-small mt-1 text-fg-2">{it.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
