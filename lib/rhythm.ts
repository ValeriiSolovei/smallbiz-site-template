import { contrastRatio } from './contrast';
import type { SiteConfigV2, Space, ThemeV2, Tone } from './types';

const BANDS: Tone[] = ['inverse', 'brand', 'accent'];
const LIGHT_TONES: Tone[] = ['base', 'tint', 'brand'];

export function toneColour(theme: ThemeV2, tone: Tone): string {
  switch (tone) {
    case 'base':
      return theme.surfaceBase;
    case 'tint':
      return theme.surfaceCard;
    case 'brand':
      return theme.surfaceBrand;
    case 'inverse':
      return theme.surfaceInverse;
    case 'accent':
      return theme.accent;
  }
}

/** Hero, every home block, then the footer: the order the tones appear down the home page. */
export function toneSequence(site: Pick<SiteConfigV2, 'hero' | 'home' | 'design'>): Tone[] {
  return [site.hero.tone, ...site.home.map((b) => b.tone), site.design.footerTone];
}

/** Every broken tone rule, as readable messages. An empty list means the page passes. */
export function toneProblems(tones: Tone[], theme: ThemeV2, rhythm: 'alternate' | 'single'): string[] {
  const problems: string[] = [];
  if (rhythm === 'single') {
    tones.slice(1).forEach((t, i) => {
      if (t !== 'base') problems.push(`section ${i + 1} is "${t}"; a single-ground page uses "base" after the hero`);
    });
    return problems;
  }
  for (let i = 1; i < tones.length; i++) {
    const [a, b] = [tones[i - 1], tones[i]];
    if (a === b) problems.push(`sections ${i - 1} and ${i} are both "${a}"`);
    else if (LIGHT_TONES.includes(a) && LIGHT_TONES.includes(b)) {
      const ratio = contrastRatio(toneColour(theme, a), toneColour(theme, b));
      if (ratio < 1.2) problems.push(`"${a}" next to "${b}" is only ${ratio.toFixed(2)}:1 (needs 1.2:1)`);
    }
  }
  for (let i = 0; i + 3 <= tones.length; i++) {
    if (!tones.slice(i, i + 3).some((t) => BANDS.includes(t))) {
      problems.push(`sections ${i}-${i + 2} have no inverse, brand or accent band`);
    }
  }
  return problems;
}

/** Section padding rules: all three steps used, exactly one loose, never three in a row alike. */
export function spaceProblems(spaces: Space[]): string[] {
  const problems: string[] = [];
  for (const s of ['tight', 'regular', 'loose'] as Space[]) if (!spaces.includes(s)) problems.push(`no "${s}" section`);
  const loose = spaces.filter((s) => s === 'loose').length;
  if (loose > 1) problems.push(`${loose} "loose" sections (exactly one allowed)`);
  for (let i = 2; i < spaces.length; i++) {
    if (spaces[i] === spaces[i - 1] && spaces[i] === spaces[i - 2]) problems.push(`sections ${i - 2}-${i} all use "${spaces[i]}"`);
  }
  return problems;
}
