/** Square chip on the tone's chip fill. Never in the accent colour. */
export default function Chip({ children }: { children: string }) {
  return <span className="inline-flex min-h-9 items-center bg-chip px-3.5 py-2 text-sm leading-tight font-medium text-fg">{children}</span>;
}
