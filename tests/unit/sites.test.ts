import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { sites } from '@/sites';
import { getSite, getSiteId } from '@/lib/site';
import { blendOver, contrastRatio } from '@/lib/contrast';
import { osmEmbedUrl } from '@/lib/map';
import { HONEYPOT_FIELD } from '@/lib/constants';
import type { Photo, PhotoEntry, SiteConfig } from '@/lib/types';

const root = process.cwd();

function collectPhotos(site: SiteConfig): Photo[] {
  const photos = [site.hero.photo, site.about.photo, ...site.gallery];
  if (site.primary.kind === 'classes') photos.push(...site.primary.trainers.map((t) => t.photo));
  if (site.primary.kind === 'products') photos.push(...site.primary.products.map((p) => p.photo));
  return photos;
}

describe('getSiteId', () => {
  it('fails loudly when SITE is missing', () => {
    expect(() => getSiteId('')).toThrow(/SITE env var is required/);
  });
  it('fails loudly on an unknown SITE and lists valid ids', () => {
    expect(() => getSiteId('bakery')).toThrow(/Unknown SITE "bakery"\. Use one of:/);
  });
});

const entries = Object.entries(sites);

describe('registry', () => {
  it('has exactly the four planned sites', () => {
    expect(Object.keys(sites).sort()).toEqual(['cafe', 'gym', 'shop', 'trades']);
  });
});

for (const [id, site] of entries) describe(`site "${id}"`, () => {
  it('is registered under its own id and loads via getSite', () => {
    expect(site.id).toBe(id);
    expect(getSite(id)).toBe(site);
  });
  it('is hidden from search engines', () => {
    expect(site.indexable).toBe(false);
  });
  it('never uses the reserved red #cc2222', () => {
    expect(JSON.stringify(site.theme).toLowerCase()).not.toContain('#cc2222');
  });
  it('keeps every text colour readable (WCAG AA 4.5:1) on base and card', () => {
    const t = site.theme;
    for (const fg of [t.textPrimary, t.textSecondary, t.textMuted, t.accent]) {
      expect(contrastRatio(fg, t.surfaceBase), `${fg} on base`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(fg, t.surfaceCard), `${fg} on card`).toBeGreaterThanOrEqual(4.5);
    }
  });
  it('keeps button text readable on the accent colour, including on hover', () => {
    expect(contrastRatio(site.theme.accentContrast, site.theme.accent)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(site.theme.accentContrast, site.theme.accentHover), 'hover').toBeGreaterThanOrEqual(4.5);
  });
  it('keeps pill text readable on the tinted pill background', () => {
    const t = site.theme;
    for (const bg of [t.surfaceBase, t.surfaceCard]) {
      expect(contrastRatio(t.accent, blendOver(t.accentDim, bg)), `accent on accentDim over ${bg}`).toBeGreaterThanOrEqual(4.5);
    }
  });
  it('has a readable error colour that differs from the accent', () => {
    const t = site.theme;
    expect(contrastRatio(t.error, t.surfaceBase), 'error on base').toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(t.error, t.surfaceCard), 'error on card').toBeGreaterThanOrEqual(4.5);
    expect(t.error.toLowerCase()).not.toBe(t.accent.toLowerCase());
  });
  it('keeps hero text readable on the hero background', () => {
    const t = site.theme;
    for (const fg of [t.textPrimary, t.textSecondary, t.accent]) {
      expect(contrastRatio(fg, t.surfaceHero), `${fg} on hero`).toBeGreaterThanOrEqual(4.5);
    }
  });
  it('uses fictional contact details', () => {
    expect(site.contact.phone).toMatch(/^\(\d{3}\) 555-01\d{2}$/);
    expect(site.contact.email).toMatch(/@[a-z0-9-]+\.example$/);
    expect(() => osmEmbedUrl(site.contact.mapBbox)).not.toThrow();
  });
  it('labels every review as a sample', () => {
    expect(site.reviews.length).toBeGreaterThanOrEqual(2);
    for (const r of site.reviews) expect(r.name.toLowerCase()).toContain('sample');
  });
  it('has the required content blocks', () => {
    expect(site.highlights).toHaveLength(3);
    expect(site.gallery.length).toBeGreaterThanOrEqual(6);
    expect(['about', 'gallery', 'contact']).not.toContain(site.primary.slug);
  });
  it('has a sane form', () => {
    const names = site.form.fields.map((f) => f.name);
    expect(new Set(names).size).toBe(names.length);
    expect(names).not.toContain(HONEYPOT_FIELD);
    expect(site.form.fields.some((f) => f.type === 'email' && f.required)).toBe(true);
    for (const f of site.form.fields) if (f.type === 'select') expect(f.options?.length ?? 0).toBeGreaterThan(1);
  });
  it('uses only public-domain photos (no attribution needed on the page)', () => {
    const entries = JSON.parse(fs.readFileSync(path.join(root, 'sites', id, 'photos.json'), 'utf8')) as PhotoEntry[];
    for (const e of entries) {
      expect(e.license, e.file).toMatch(/^(CC0 1\.0|Public Domain Mark 1\.0)$/);
      expect(e.licenseUrl, e.file).toMatch(/^https:\/\/creativecommons\.org\/publicdomain\//);
      expect(e.sourceUrl, e.file).toMatch(/^https:\/\//);
    }
  });
  it('has every photo on disk with real alt text', () => {
    for (const p of collectPhotos(site)) {
      expect(p.src.startsWith(`/${id}/`), p.src).toBe(true);
      expect(fs.existsSync(path.join(root, 'public', p.src)), `missing ${p.src}`).toBe(true);
      expect(p.alt.trim().length, `alt for ${p.src}`).toBeGreaterThan(8);
    }
  });
});
