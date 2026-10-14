import { describe, it, expect } from 'vitest';
import { osmEmbedUrl } from '@/lib/map';
import { telHref } from '@/lib/phone';
import { photoSet } from '@/lib/photos';
import { buildNav, headerCta } from '@/lib/nav';
import type { SiteConfig } from '@/lib/types';

describe('osmEmbedUrl', () => {
  it('builds an OpenStreetMap embed URL', () => {
    expect(osmEmbedUrl([-79.345, 43.658, -79.325, 43.668])).toBe(
      'https://www.openstreetmap.org/export/embed.html?bbox=-79.345%2C43.658%2C-79.325%2C43.668&layer=mapnik',
    );
  });
  it('rejects a reversed box', () => {
    expect(() => osmEmbedUrl([-79.3, 43.6, -79.4, 43.7])).toThrow(/bbox/);
  });
});

describe('telHref', () => {
  it('adds the +1 country code to 10-digit numbers', () => {
    expect(telHref('(416) 555-0142')).toBe('tel:+14165550142');
  });
  it('keeps an existing leading 1', () => {
    expect(telHref('+1 416 555 0142')).toBe('tel:+14165550142');
  });
});

describe('photoSet', () => {
  const ph = photoSet('cafe', [
    {
      file: 'hero.jpg',
      alt: 'Window seat with a latte',
      imageUrl: 'https://cdn.example/abc.jpg',
      sourceUrl: 'https://stocksnap.io/photo/abc',
      license: 'CC0 1.0',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      creator: 'A',
    },
  ]);
  it('returns src and alt for a known file', () => {
    expect(ph('hero.jpg')).toEqual({ src: '/cafe/hero.jpg', alt: 'Window seat with a latte' });
  });
  it('throws for a file missing from photos.json', () => {
    expect(() => ph('missing.jpg')).toThrow(/cafe: photos.json has no entry for "missing.jpg"/);
  });
});

describe('buildNav', () => {
  const site = {
    primary: { kind: 'menu', slug: 'menu', title: 'Menu', intro: '', sections: [] },
    hero: { cta: { label: 'See the menu', href: '/menu/' } },
    form: { submitLabel: 'Send' },
  } as unknown as SiteConfig;
  it('lists the five pages with the business page third', () => {
    expect(buildNav(site)).toEqual([
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about/' },
      { label: 'Menu', href: '/menu/' },
      { label: 'Gallery', href: '/gallery/' },
      { label: 'Contact', href: '/contact/' },
    ]);
  });
  it('uses the hero CTA as the header button', () => {
    expect(headerCta(site)).toEqual({ label: 'See the menu', href: '/menu/' });
  });
  it("prefers the site's own header button when set", () => {
    const withCta = { ...site, headerCta: { label: 'Catering', href: '/contact/' } } as SiteConfig;
    expect(headerCta(withCta)).toEqual({ label: 'Catering', href: '/contact/' });
  });
});
