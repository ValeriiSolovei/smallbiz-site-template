export function hexToRgb(hex: string): [number, number, number] {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) throw new Error(`Expected #rrggbb, got "${hex}"`);
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** The solid colour you see when `colour` (#rrggbb or rgba(r, g, b, a)) is painted over the solid `base`. */
export function blendOver(colour: string, base: string): string {
  if (/^#[0-9a-f]{6}$/i.test(colour.trim())) return colour.trim().toLowerCase();
  const m = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/i.exec(colour.trim());
  if (!m) throw new Error(`Expected #rrggbb or rgba(r, g, b, a), got "${colour}"`);
  const alpha = Number(m[4]);
  const channels = [1, 2, 3].map((i) => Number(m[i]));
  if (!(alpha >= 0 && alpha <= 1) || channels.some((c) => c > 255)) throw new Error(`Colour out of range: "${colour}"`);
  const under = hexToRgb(base);
  return `#${channels
    .map((c, i) => Math.round(c * alpha + under[i] * (1 - alpha)))
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('')}`;
}
