export type IndexRow = { title: string; body: string; meta?: string; sub?: string; id?: string };

/** Numbered rows split by hairlines, in place of a grid of cards. `compact` for rows inside a narrow column. */
export default function IndexRows({ rows, start = 1, compact }: { rows: IndexRow[]; start?: number; compact?: boolean }) {
  return (
    <ol className="rule-structural">
      {rows.map((r, i) => (
        <li
          key={r.title}
          id={r.id}
          className={`grid gap-x-6 gap-y-2 border-b border-rule ${compact ? 'grid-cols-[2.5rem_minmax(0,1fr)] py-4' : 'py-6 md:grid-cols-[5rem_minmax(0,1fr)]'}`}
        >
          <span
            aria-hidden="true"
            className={`h-display leading-none text-fg-3 ${compact ? 'text-[1.5rem]' : 'text-[calc(var(--fs-numeral)*0.6)]'}`}
          >
            {String(start + i).padStart(2, '0')}
          </span>
          <div>
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <h3 className={`h-display ${compact ? 'text-[1.375rem] leading-none' : 'h3'}`}>{r.title}</h3>
              {r.meta && <span className="text-small tabular flex-none font-semibold text-fg-2">{r.meta}</span>}
            </div>
            {r.sub && <p className="mt-2 text-[0.8125rem] font-semibold tracking-[0.08em] text-fg-2 uppercase">{r.sub}</p>}
            <p className={`measure text-fg-2 ${compact ? 'mt-1' : 'mt-2'}`}>{r.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
