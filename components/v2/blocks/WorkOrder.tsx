import type { Card, NavItem, Space, Tone, Voice, WorkOrder as WorkOrderData } from '@/lib/types';
import Section, { SectionHead } from '../Section';
import IndexRows from '../IndexRows';
import Button from '../Button';

function Tick({ filled }: { filled?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid h-5 w-5 flex-none place-items-center border-2 border-fg ${filled ? 'bg-fg text-bg' : 'text-fg'}`}
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
        <path d="M3 8.5l3 3 7-7" />
      </svg>
    </span>
  );
}

/** The sample work order: one filled-in paper sheet with the checks, the written price and the sign-off. */
function Sheet({ data }: { data: WorkOrderData }) {
  return (
    <figure aria-label="Sample work order" data-tone="base" className="border-2 border-fg p-5 md:p-9">
      <div data-tone="accent" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3">
        <p className="h-display text-[1.75rem] leading-none">Work order</p>
        <p className="font-display text-[1.125rem] leading-none font-semibold">{data.number}</p>
      </div>
      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {data.fields.map((f) => (
          <div key={f.label} className="border-b border-fg pb-2">
            <dt className="text-small font-semibold text-fg-2">{f.label}</dt>
            <dd className="mt-1 text-[1.125rem] leading-snug">{f.value}</dd>
          </div>
        ))}
      </dl>
      <h3 className="h-display mt-8 text-[1.375rem] leading-none">{data.checkedTitle}</h3>
      <ol className="mt-3">
        {data.checked.map((c, i) => (
          <li key={c} className="flex items-center gap-4 border-b border-rule py-2.5">
            <span aria-hidden="true" className="h-display w-7 text-[1.25rem] leading-none text-fg-3">
              {String(i + 1).padStart(2, '0')}
            </span>
            <Tick />
            <span>{c}</span>
          </li>
        ))}
      </ol>
      <div className="mt-8 grid gap-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="border-2 border-fg p-4">
          <p className="text-small font-semibold text-fg-2">{data.price.label}</p>
          <p className="h-display mt-1 text-[2.5rem] leading-none tabular">{data.price.amount}</p>
          <p className="text-small mt-2 text-fg-2">{data.price.note}</p>
        </div>
        <ul className="flex flex-col justify-center gap-3 border border-fg p-4">
          {data.permits.map((p) => (
            <li key={p.label} className="flex items-center gap-3">
              <Tick filled />
              <span>
                <span className="font-semibold">{p.label}</span> · {p.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-8 text-[1.0625rem] font-semibold">{data.signoff}</p>
      <div className="mt-8 grid grid-cols-2 gap-8">
        {data.signatures.map((s) => (
          <p key={s} className="text-small border-t border-fg pt-2 text-fg-2">
            {s}
          </p>
        ))}
      </div>
    </figure>
  );
}

type Props = { tone: Tone; space: Space; title: Voice; label?: string; body: string; highlights: Card[]; data?: WorkOrderData; cta: NavItem; n?: string };

/** Signature block: why the price holds on the left, the filled-in sheet on the right. */
export default function WorkOrder({ tone, space, title, label, body, highlights, data, cta, n }: Props) {
  return (
    <Section tone={tone} space={space}>
      <div className="grid-12 items-start">
        <div className="md:col-span-5">
          <SectionHead label={label ? { n, text: label } : undefined} title={title} />
          <p className="lead mt-6 text-fg-2">{body}</p>
          <div className="mt-8">
            <IndexRows rows={highlights} compact />
          </div>
          <div className="mt-8 hidden md:block">
            <Button item={cta} />
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          {data && <Sheet data={data} />}
          <div className="mt-8 md:hidden">
            <Button item={cta} block />
          </div>
        </div>
      </div>
    </Section>
  );
}
