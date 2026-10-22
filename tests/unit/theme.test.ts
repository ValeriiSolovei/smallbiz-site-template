import { describe, it, expect } from 'vitest';
import { themeToCssVars, TOKEN_TO_VAR } from '@/lib/theme';
import type { ThemeV2 } from '@/lib/types';

const theme: ThemeV2 = {
  mode: 'light', surfaceBase: '#edeff0', surfaceCard: '#d4d9dd', surfaceBrand: '#c3ccd4', surfaceInverse: '#121a24',
  borderDefault: '#a9b1b8', textPrimary: '#121a24', textSecondary: '#39424c', textMuted: '#4a535d', accent: '#ffde21',
  accentHover: '#ffe760', accentContrast: '#121a24', accentText: '#1f4a7c', error: '#a8231c',
};

describe('themeToCssVars', () => {
  it('maps the 13 colours, with the inverse band and link colour and no glow', () => {
    const vars = themeToCssVars(theme);
    expect(Object.keys(vars)).toHaveLength(13);
    expect(vars['--surface-inverse']).toBe('#121a24');
    expect(vars['--accent-text']).toBe('#1f4a7c');
    expect(vars['--error']).toBe('#a8231c');
    expect(vars).not.toHaveProperty('--accent-glow');
  });
  it('does not emit the mode as a variable', () => {
    expect(Object.values(TOKEN_TO_VAR)).not.toContain('--mode');
    expect(themeToCssVars(theme)).not.toHaveProperty('--mode');
  });
});
