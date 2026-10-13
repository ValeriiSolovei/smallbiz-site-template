export default function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-surface-hero">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-text-secondary">{intro}</p>}
      </div>
    </section>
  );
}
