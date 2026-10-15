import { describe, it, expect } from 'vitest';
import { themeToCssVars, TOKEN_TO_VAR, TOKEN_TO_VAR_V2 } from '@/lib/theme';
import type { ThemeTokens, ThemeV2 } from '@/lib/types';

const theme: ThemeTokens = {
  mode: 'dark', surfaceBase: '#0e0e0e', surfaceCard: '#181818', surfaceHero: '#1c1106', borderDefault: '#2a2a2a',
  textPrimary: '#ffffff', textSecondary: '#b3b3b3', textMuted: '#8c8c8c', accent: '#ff7a1a', accentHover: '#ff9142',
  accentDim: 'rgba(255, 122, 26, 0.16)', accentGlow: 'rgba(255, 122, 26, 0.35)', accentContrast: '#111111',
  error: '#ff6b81',
};

describe('themeToCssVars', () => {
  it('maps every colour token to its CSS variable', () => {
    const vars = themeToCssVars(theme);
    expect(Object.keys(vars)).toHaveLength(13);
    expect(vars['--error']).toBe('#ff6b81');
    expect(vars['--surface-base']).toBe('#0e0e0e');
    expect(vars['--accent-contrast']).toBe('#111111');
    expect(vars['--accent-glow']).toBe('rgba(255, 122, 26, 0.35)');
  });
  it('does not emit the mode as a variable', () => {
    expect(Object.values(TOKEN_TO_VAR)).not.toContain('--mode');
    expect(themeToCssVars(theme)).not.toHaveProperty('--mode');
  });
});

describe('themeToCssVars for v2', () => {
  const v2: ThemeV2 = {
    mode: 'light', surfaceBase: '#edeff0', surfaceCard: '#d4d9dd', surfaceBrand: '#c3ccd4', surfaceInverse: '#121a24',
    borderDefault: '#a9b1b8', textPrimary: '#121a24', textSecondary: '#39424c', textMuted: '#4a535d', accent: '#ffde21',
    accentHover: '#ffe760', accentContrast: '#121a24', accentText: '#1f4a7c', error: '#a8231c',
  };
  it('maps the 13 v2 colours, with the inverse band and link colour and no glow', () => {
    const vars = themeToCssVars(v2, 'v2');
    expect(Object.keys(vars)).toHaveLength(13);
    expect(vars['--surface-inverse']).toBe('#121a24');
    expect(vars['--accent-text']).toBe('#1f4a7c');
    expect(vars).not.toHaveProperty('--accent-glow');
    expect(Object.values(TOKEN_TO_VAR_V2)).not.toContain('--mode');
  });
});
