import type { Photo } from '@/lib/types';

export default function Gallery({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {photos.map((p) => (
        <img key={p.src} src={p.src} alt={p.alt} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
      ))}
    </div>
  );
}
