import type { ReactNode } from 'react';

/** A name and a value joined by a dotted leader, like a printed menu or an hours card. */
export default function LeaderRow({ name, value, className = '' }: { name: ReactNode; value: ReactNode; className?: string }) {
  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span>{name}</span>
      <span aria-hidden="true" className="min-w-6 flex-1 -translate-y-[0.3em] border-b border-dotted border-rule" />
      <span className="tabular flex-none font-semibold">{value}</span>
    </div>
  );
}
