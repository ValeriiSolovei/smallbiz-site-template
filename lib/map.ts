import type { Bbox } from './types';

export function osmEmbedUrl([minLon, minLat, maxLon, maxLat]: Bbox): string {
  if (!(minLon < maxLon && minLat < maxLat)) throw new Error('bbox must be [minLon, minLat, maxLon, maxLat]');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon}%2C${minLat}%2C${maxLon}%2C${maxLat}&layer=mapnik`;
}
