export type IndexRow = { title: string; body: string; meta?: string; sub?: string; id?: string };

/** Numbered rows split by hairlines, in place of a grid of cards. */
export default function IndexRows({ rows, start = 1 }: { rows: IndexRow[]; start?: number }) {
  return (
    <ol className="rule-structural">
      {rows.map((r, i) => (
        <li key={r.title} id={r.id} className="grid gap-x-6 gap-y-2 border-b border-rule py-6 md:grid-cols-[5rem_minmax(0,1fr)]">
          <span aria-hidden="true" className="h-display text-[calc(var(--fs-numeral)*0.6)] leading-none text-fg-3">
            {String(start + i).padStart(2, '0')}
          </span>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="h3 h-display">{r.title}</h3>
              {r.meta && <span className="text-small tabular font-semibold text-fg-2">{r.meta}</span>}
            </div>
            {r.sub && <p className="mt-1 text-[0.8125rem] font-semibold tracking-[0.08em] text-fg-2 uppercase">{r.sub}</p>}
            <p className="measure mt-2 text-fg-2">{r.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
