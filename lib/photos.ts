import type { Photo, PhotoEntry } from './types';

export function photoSet(site: string, entries: PhotoEntry[]): (file: string) => Photo {
  return (file) => {
    const entry = entries.find((p) => p.file === file);
    if (!entry) throw new Error(`${site}: photos.json has no entry for "${file}"`);
    return { src: `/${site}/${file}`, alt: entry.alt };
  };
}
