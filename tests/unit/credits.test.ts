import { describe, it, expect } from 'vitest';
import { buildCredits } from '../../scripts/credits.mjs';

describe('buildCredits', () => {
  const md = buildCredits({
    trades: [{ file: 'hero.jpg', unsplashId: 'XyZ123', alt: 'Panel', photographer: 'Jo Lee', photographerUrl: 'https://unsplash.com/@jolee' }],
    cafe: [{ file: 'hero.jpg', unsplashId: 'Abc987', alt: 'Latte', photographer: 'Sam Roy', photographerUrl: 'https://unsplash.com/@samroy' }],
  });
  it('starts with the licence line', () => {
    expect(md.startsWith('# Photo credits')).toBe(true);
    expect(md).toContain('https://unsplash.com/license');
  });
  it('links each photo and photographer', () => {
    expect(md).toContain('| public/trades/hero.jpg | [XyZ123](https://unsplash.com/photos/XyZ123) | [Jo Lee](https://unsplash.com/@jolee) |');
  });
  it('sorts sites alphabetically', () => {
    expect(md.indexOf('## cafe')).toBeLessThan(md.indexOf('## trades'));
  });
});
