import { describe, it, expect } from 'vitest';
import { blendOver, contrastRatio, hexToRgb, luminance } from '@/lib/contrast';

describe('contrast', () => {
  it('parses hex colours', () => {
    expect(hexToRgb('#ff7a1a')).toEqual([255, 122, 26]);
    expect(hexToRgb('#FFFFFF')).toEqual([255, 255, 255]);
  });
  it('rejects non-hex input', () => {
    expect(() => hexToRgb('rgba(0,0,0,0.5)')).toThrow(/Expected #rrggbb/);
    expect(() => hexToRgb('#fff')).toThrow(/Expected #rrggbb/);
  });
  it('computes luminance at the extremes', () => {
    expect(luminance('#000000')).toBe(0);
    expect(luminance('#ffffff')).toBeCloseTo(1, 5);
  });
  it('black on white is 21:1 and is symmetric', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 5);
  });
  it('a colour against itself is 1:1', () => {
    expect(contrastRatio('#6b3f26', '#6b3f26')).toBeCloseTo(1, 5);
  });
});

describe('blendOver', () => {
  it('blends a translucent colour over a solid background', () => {
    expect(blendOver('rgba(0, 0, 0, 0.5)', '#ffffff')).toBe('#808080');
    expect(blendOver('rgba(255, 122, 26, 0.16)', '#181818')).toBe('#3d2818');
  });
  it('returns an opaque hex colour unchanged', () => {
    expect(blendOver('#ff7a1a', '#181818')).toBe('#ff7a1a');
  });
  it('rejects colours it cannot read', () => {
    expect(() => blendOver('hsl(0 0% 0%)', '#ffffff')).toThrow(/Expected #rrggbb or rgba/);
  });
  it('handles fully transparent and fully opaque rgba', () => {
    expect(blendOver('rgba(255, 0, 0, 0)', '#123456')).toBe('#123456');
    expect(blendOver('rgba(255, 0, 0, 1)', '#123456')).toBe('#ff0000');
  });
  it('rejects out-of-range alpha or channels', () => {
    expect(() => blendOver('rgba(0, 0, 0, 1.5)', '#ffffff')).toThrow(/out of range/);
    expect(() => blendOver('rgba(300, 0, 0, 0.5)', '#ffffff')).toThrow(/out of range/);
  });
});
