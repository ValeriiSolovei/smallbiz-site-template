import type { Photo, Space, Tone } from '@/lib/types';

/** A row of photos with caption plaques; on a phone only the first photo shows. */
export default function Strip({ tone, space, items }: { tone: Tone; space: Space; items: { photo: Photo; caption: string }[] }) {
  return (
    <section data-tone={tone} data-space={space}>
      <ul className="wrap grid md:w-full md:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.photo.src} className={`${i > 0 ? 'hidden border-l border-bg md:block' : ''}`}>
            <figure>
              <img
                src={it.photo.src}
                alt={it.photo.alt}
                width={800}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover md:aspect-square"
              />
              <figcaption className="bg-chip px-4 py-3 text-[0.9375rem] font-semibold md:px-6">{it.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
