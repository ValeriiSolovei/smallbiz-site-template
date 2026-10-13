import type { Review } from '@/lib/types';

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {reviews.map((r) => (
        <figure key={r.name} className="rounded-2xl border border-border-default bg-surface-card p-6">
          <blockquote className="text-text-primary">&ldquo;{r.quote}&rdquo;</blockquote>
          <figcaption className="mt-4 text-sm text-text-muted">{r.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}
