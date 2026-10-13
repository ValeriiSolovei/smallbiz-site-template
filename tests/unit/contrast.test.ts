import { describe, it, expect } from 'vitest';
import { contrastRatio, hexToRgb, luminance } from '@/lib/contrast';

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
