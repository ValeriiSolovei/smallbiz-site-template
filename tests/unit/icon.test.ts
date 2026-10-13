import { describe, it, expect } from 'vitest';
import { siteIconDataUri } from '@/lib/icon';
import { sites } from '@/sites';

const decode = (uri: string) => decodeURIComponent(uri.slice('data:image/svg+xml,'.length));

describe('siteIconDataUri', () => {
  it('builds an SVG data URI in the site accent colour with the first letter', () => {
    const uri = siteIconDataUri(sites.trades);
    expect(uri.startsWith('data:image/svg+xml,')).toBe(true);
    const svg = decode(uri);
    expect(svg).toContain(`fill="${sites.trades.theme.accent}"`);
    expect(svg).toContain(`fill="${sites.trades.theme.accentContrast}"`);
    expect(svg).toMatch(/>V<\/text>/);
  });
  it('escapes a first character that would break the SVG', () => {
    expect(decode(siteIconDataUri({ ...sites.cafe, name: '&Co' }))).toContain('>&amp;</text>');
  });
});
