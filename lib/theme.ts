import type { ThemeTokens } from './types';

type ColourToken = Exclude<keyof ThemeTokens, 'mode'>;

export const TOKEN_TO_VAR: Record<ColourToken, string> = {
  surfaceBase: '--surface-base',
  surfaceCard: '--surface-card',
  surfaceHero: '--surface-hero',
  borderDefault: '--border-default',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  textMuted: '--text-muted',
  accent: '--accent',
  accentHover: '--accent-hover',
  accentDim: '--accent-dim',
  accentGlow: '--accent-glow',
  accentContrast: '--accent-contrast',
  error: '--error',
};

export function themeToCssVars(theme: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [token, cssVar] of Object.entries(TOKEN_TO_VAR) as [ColourToken, string][]) vars[cssVar] = theme[token];
  return vars;
}
