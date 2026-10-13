import type { SiteConfig } from './types';

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

/** Favicon as a data URI: a rounded square in the site's accent colour with the business's first letter. */
export function siteIconDataUri(site: SiteConfig): string {
  const letter = (site.name.trim()[0] ?? '?').toUpperCase().replace(/[&<>"]/g, (c) => ESCAPES[c]);
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<rect width="64" height="64" rx="14" fill="${site.theme.accent}"/>` +
    `<text x="32" y="44" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" text-anchor="middle" fill="${site.theme.accentContrast}">${letter}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
