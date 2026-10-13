import { describe, it, expect } from 'vitest';
import { buildCredits } from '../../scripts/credits.mjs';

const entry = (file: string, creator: string, id: string) => ({
  file,
  alt: 'Example photo',
  imageUrl: `https://cdn.example/${id}.jpg`,
  sourceUrl: `https://stocksnap.io/photo/${id}`,
  license: 'CC0 1.0',
  licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
  creator,
});

describe('buildCredits', () => {
  const md = buildCredits({
    trades: [entry('hero.jpg', 'Jo Lee', 'XYZ123')],
    cafe: [entry('hero.jpg', 'Sam Roy', 'ABC987')],
  });
  it('starts with the public-domain note', () => {
    expect(md.startsWith('# Photo credits')).toBe(true);
    expect(md).toContain('public domain');
    expect(md).toContain('https://openverse.org');
  });
  it('links each photo to its source and licence', () => {
    expect(md).toContain(
      '| public/trades/hero.jpg | [source](https://stocksnap.io/photo/XYZ123) | Jo Lee | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |',
    );
  });
  it('sorts sites alphabetically', () => {
    expect(md.indexOf('## cafe')).toBeLessThan(md.indexOf('## trades'));
  });
  it('keeps the table intact when a creator name contains a pipe or line break', () => {
    const odd = buildCredits({ shop: [entry('hero.jpg', 'Studio | Lab\nToronto', 'Q1')] });
    expect(odd).toContain('| Studio \\| Lab Toronto |');
  });
  it('shows Unknown when the creator is missing', () => {
    const anon = buildCredits({ shop: [entry('hero.jpg', '', 'Q2')] });
    expect(anon).toContain('| Unknown |');
  });
});
