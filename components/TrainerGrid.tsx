import type { Trainer } from '@/lib/types';

export default function TrainerGrid({ trainers }: { trainers: Trainer[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Coaches</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {trainers.map((t) => (
          <div key={t.name} className="rounded-2xl border border-border-default bg-surface-card p-4">
            <img src={t.photo.src} alt={t.photo.alt} loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover" />
            <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
            <p className="text-text-secondary">{t.specialty}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
