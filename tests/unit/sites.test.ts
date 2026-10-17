import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { sites } from '@/sites';
import { getSite, getSiteId } from '@/lib/site';
import { blendOver, contrastRatio, withAlpha } from '@/lib/contrast';
import { osmEmbedUrl } from '@/lib/map';
import { headerCta } from '@/lib/nav';
import { HONEYPOT_FIELD } from '@/lib/constants';
import { spaceProblems, toneProblems, toneSequence } from '@/lib/rhythm';
import { assertVoice, sentences } from '@/lib/voice';
import type { Photo, PhotoEntry, SiteConfig, SiteConfigV1, SiteConfigV2, Voice } from '@/lib/types';
import fixtureV2 from './fixtures/site-v2';

const root = process.cwd();

function collectPhotos(site: SiteConfig): Photo[] {
  const photos = [site.hero.photo, site.about.photo, ...site.gallery];
  if (site.primary.kind === 'classes') photos.push(...site.primary.trainers.map((t) => t.photo));
  if (site.primary.kind === 'products') photos.push(...site.primary.products.map((p) => p.photo));
  if (site.system === 'v2') for (const b of site.home) if (b.kind === 'strip') photos.push(...b.items.map((it) => it.photo));
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
  it('points the header button at the contact page', () => {
    expect(headerCta(site).href).toBe('/contact/');
  });
  it('is hidden from search engines', () => {
    expect(site.indexable).toBe(false);
  });
  it('never uses the reserved red #cc2222', () => {
    expect(JSON.stringify(site.theme).toLowerCase()).not.toContain('#cc2222');
  });
  if (site.system !== 'v2') {
    it('keeps every text colour readable (WCAG AA 4.5:1) on base and card', () => {
      const t = (site as SiteConfigV1).theme;
      for (const fg of [t.textPrimary, t.textSecondary, t.textMuted, t.accent]) {
        expect(contrastRatio(fg, t.surfaceBase), `${fg} on base`).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(fg, t.surfaceCard), `${fg} on card`).toBeGreaterThanOrEqual(4.5);
      }
    });
    it('keeps button text readable on the accent colour, including on hover', () => {
      expect(contrastRatio((site as SiteConfigV1).theme.accentContrast, (site as SiteConfigV1).theme.accent)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio((site as SiteConfigV1).theme.accentContrast, (site as SiteConfigV1).theme.accentHover), 'hover').toBeGreaterThanOrEqual(4.5);
    });
    it('keeps pill text readable on the tinted pill background', () => {
      const t = (site as SiteConfigV1).theme;
      for (const bg of [t.surfaceBase, t.surfaceCard]) {
        expect(contrastRatio(t.accent, blendOver(t.accentDim, bg)), `accent on accentDim over ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
    });
    it('has a readable error colour that differs from the accent', () => {
      const t = (site as SiteConfigV1).theme;
      expect(contrastRatio(t.error, t.surfaceBase), 'error on base').toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(t.error, t.surfaceCard), 'error on card').toBeGreaterThanOrEqual(4.5);
      expect(t.error.toLowerCase()).not.toBe(t.accent.toLowerCase());
    });
    it('keeps hero text readable on the hero background', () => {
      const t = (site as SiteConfigV1).theme;
      for (const fg of [t.textPrimary, t.textSecondary, t.accent]) {
        expect(contrastRatio(fg, t.surfaceHero), `${fg} on hero`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }
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
    expect(site.highlights.length).toBeGreaterThanOrEqual(2);
    expect(site.highlights.length).toBeLessThanOrEqual(4);
    expect(site.gallery.length).toBeGreaterThanOrEqual(6);
    expect(['about', 'gallery', 'contact']).not.toContain(site.primary.slug);
  });
  it('has a sane form', () => {
    const names = site.form.fields.map((f) => f.name);
    expect(new Set(names).size).toBe(names.length);
    expect(names).not.toContain(HONEYPOT_FIELD);
    expect(site.form.fields.some((f) => (f.type === 'email' || f.type === 'tel') && f.required)).toBe(true);
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
  it('declares the fonts its system expects in sites/<id>/fonts.ts', () => {
    const src = fs.readFileSync(path.join(root, 'sites', id, 'fonts.ts'), 'utf8');
    const loaders = site.system === 'v2' ? [site.design.fonts.h1, site.design.fonts.body] : ['Inter'];
    for (const family of loaders) expect(src, family).toContain(`${family.replace(/ /g, '_')}(`);
    if (site.system !== 'v2') expect(src).toContain("variable: '--font-inter'");
    else expect(src).toContain('--ff-display');
  });
  it('has every photo on disk with real alt text', () => {
    for (const p of collectPhotos(site)) {
      expect(p.src.startsWith(`/${id}/`), p.src).toBe(true);
      expect(fs.existsSync(path.join(root, 'public', p.src)), `missing ${p.src}`).toBe(true);
      expect(p.alt.trim().length, `alt for ${p.src}`).toBeGreaterThan(8);
    }
  });
});

// ---- v2 design system: these rules run on the fixture now and on every site once it moves to v2 ----

const v2Sites: [string, SiteConfigV2][] = [
  ['fixture', fixtureV2],
  ...entries.filter((e): e is [string, SiteConfigV2] => e[1].system === 'v2'),
];

function blockTitles(site: SiteConfigV2): Voice[] {
  const titles: Voice[] = [site.hero.headline];
  for (const b of site.home) if ('title' in b) titles.push(b.title);
  return titles;
}

for (const [name, site] of v2Sites) describe(`v2 site "${name}"`, () => {
  const t = site.theme;
  const grounds = { base: t.surfaceBase, card: t.surfaceCard, brand: t.surfaceBrand };
  it('has 13 colours, all #rrggbb', () => {
    const { mode, ...colours } = t;
    expect(['light', 'dark']).toContain(mode);
    expect(Object.keys(colours)).toHaveLength(13);
    for (const [k, v] of Object.entries(colours)) expect(v, k).toMatch(/^#[0-9a-f]{6}$/i);
  });
  it('keeps text and links readable (4.5:1) on base, card and brand', () => {
    for (const fg of [t.textPrimary, t.textSecondary, t.textMuted, t.accentText]) {
      for (const [g, bg] of Object.entries(grounds)) expect(contrastRatio(fg, bg), `${fg} on ${g}`).toBeGreaterThanOrEqual(4.5);
    }
  });
  it('keeps button text readable on the accent, including on hover', () => {
    expect(contrastRatio(t.accentContrast, t.accent)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(t.accentContrast, t.accentHover), 'hover').toBeGreaterThanOrEqual(4.5);
  });
  it('keeps text readable on the inverse band, including the secondary mix', () => {
    expect(contrastRatio(t.surfaceBase, t.surfaceInverse)).toBeGreaterThanOrEqual(4.5);
    const secondary = blendOver(withAlpha(t.surfaceBase, 0.76), t.surfaceInverse);
    expect(contrastRatio(secondary, t.surfaceInverse), 'secondary').toBeGreaterThanOrEqual(4.5);
  });
  it('uses the accent only where it reads', () => {
    if (t.mode === 'light') expect(contrastRatio(t.accent, t.surfaceInverse), 'accent on inverse').toBeGreaterThanOrEqual(4.5);
    else for (const [g, bg] of Object.entries(grounds)) expect(contrastRatio(t.accent, bg), `accent fill on ${g}`).toBeGreaterThanOrEqual(3);
  });
  it('has a readable error colour that differs from the accent', () => {
    expect(contrastRatio(t.error, t.surfaceBase), 'error on base').toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(t.error, t.surfaceCard), 'error on card').toBeGreaterThanOrEqual(4.5);
    expect(t.error.toLowerCase()).not.toBe(t.accent.toLowerCase());
  });
  it('follows the tone rhythm down the home page', () => {
    expect(toneProblems(toneSequence(site), t, site.design.rhythm)).toEqual([]);
  });
  it('varies section padding on the home page', () => {
    expect(spaceProblems(site.home.map((b) => b.space))).toEqual([]);
  });
  it('keeps every second voice inside its heading', () => {
    for (const v of blockTitles(site)) expect(() => assertVoice(v), v.text).not.toThrow();
  });
  it('has the content every home block needs', () => {
    for (const b of site.home) {
      if (b.kind === 'strip') expect(b.items.length, 'strip').toBeGreaterThanOrEqual(1);
      if (b.kind === 'faq') expect(site.faq?.length ?? 0, 'faq').toBeGreaterThanOrEqual(4);
      if (b.kind === 'symptoms') expect(site.symptoms?.length ?? 0, 'symptoms').toBeGreaterThanOrEqual(4);
      if (b.kind === 'services') expect(b.count, 'services count').toBeGreaterThanOrEqual(1);
      if (b.kind === 'menu') expect(site.primary.kind, 'a menu block needs a menu page').toBe('menu');
    }
    // The photo-block hero styles its three lines one by one (heavy, light, italic voice).
    if (site.hero.variant === 'photo-block') expect(sentences(site.hero.headline.text), 'photo-block headline').toHaveLength(3);
    expect(site.home.some((b) => b.kind === 'reviews'), 'a reviews block').toBe(true);
  });
  it('puts a call action in the call bar', () => {
    expect([site.callBar.primary, site.callBar.secondary].some((c) => c?.href.startsWith('tel:'))).toBe(true);
  });
  it('points the header button at the contact page', () => {
    expect(headerCta(site).href).toBe('/contact/');
  });
  it('labels every review as a sample', () => {
    for (const r of site.reviews) expect(r.name.toLowerCase()).toContain('sample');
  });
  it('has every photo on disk with real alt text', () => {
    for (const p of collectPhotos(site)) {
      expect(fs.existsSync(path.join(root, 'public', p.src)), `missing ${p.src}`).toBe(true);
      expect(p.alt.trim().length, `alt for ${p.src}`).toBeGreaterThan(8);
    }
  });
});

describe('tone rhythm rules', () => {
  const t = fixtureV2.theme;
  it('rejects two neighbouring sections with the same tone', () => {
    expect(toneProblems(['inverse', 'base', 'base', 'accent'], t, 'alternate')).toContain('sections 1 and 2 are both "base"');
  });
  it('rejects three sections in a row without a band', () => {
    expect(toneProblems(['base', 'tint', 'base'], t, 'alternate')).toEqual(['sections 0-2 have no inverse, brand or accent band']);
  });
  it('rejects neighbouring light grounds closer than 1.2:1', () => {
    const flat = { ...t, surfaceBrand: '#d0d5d9' };
    expect(toneProblems(['tint', 'brand', 'inverse'], flat, 'alternate')[0]).toMatch(/"tint" next to "brand" is only 1\.\d\d:1/);
  });
  it('keeps a single-ground page on base after the hero', () => {
    expect(toneProblems(['brand', 'base', 'base', 'base'], t, 'single')).toEqual([]);
    expect(toneProblems(['brand', 'base', 'tint'], t, 'single')).toHaveLength(1);
  });
  it('accepts the fixture page', () => {
    expect(toneProblems(toneSequence(fixtureV2), t, 'alternate')).toEqual([]);
  });
  it('checks section padding steps', () => {
    expect(spaceProblems(['tight', 'regular', 'loose'])).toEqual([]);
    expect(spaceProblems(['tight', 'tight', 'tight', 'regular', 'loose'])).toEqual(['sections 0-2 all use "tight"']);
    expect(spaceProblems(['loose', 'regular', 'loose', 'tight'])).toEqual(['2 "loose" sections (exactly one allowed)']);
  });
});
