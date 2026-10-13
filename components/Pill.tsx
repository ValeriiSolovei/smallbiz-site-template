import type { ReactNode } from 'react';

export default function Pill({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded-full bg-accent-dim px-3 py-1 text-xs font-medium text-accent">{children}</span>;
}
