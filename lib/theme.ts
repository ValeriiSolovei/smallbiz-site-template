import type { ThemeV2 } from './types';

type ColourToken = Exclude<keyof ThemeV2, 'mode'>;

export const TOKEN_TO_VAR: Record<ColourToken, string> = {
  surfaceBase: '--surface-base',
  surfaceCard: '--surface-card',
  surfaceBrand: '--surface-brand',
  surfaceInverse: '--surface-inverse',
  borderDefault: '--border-default',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  textMuted: '--text-muted',
  accent: '--accent',
  accentHover: '--accent-hover',
  accentContrast: '--accent-contrast',
  accentText: '--accent-text',
  error: '--error',
};

/** The site's colours as CSS variables, set on <html>. */
export function themeToCssVars(theme: ThemeV2): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [token, cssVar] of Object.entries(TOKEN_TO_VAR)) vars[cssVar] = theme[token as ColourToken];
  return vars;
}
