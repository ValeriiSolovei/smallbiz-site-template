import type { SystemId, ThemeV1, ThemeV2 } from './types';

type ColourTokenV1 = Exclude<keyof ThemeV1, 'mode'>;
type ColourTokenV2 = Exclude<keyof ThemeV2, 'mode'>;

export const TOKEN_TO_VAR_V1: Record<ColourTokenV1, string> = {
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
export const TOKEN_TO_VAR = TOKEN_TO_VAR_V1;

export const TOKEN_TO_VAR_V2: Record<ColourTokenV2, string> = {
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

export function themeToCssVars(theme: ThemeV1, system?: 'v1'): Record<string, string>;
export function themeToCssVars(theme: ThemeV2, system: 'v2'): Record<string, string>;
export function themeToCssVars(theme: ThemeV1 | ThemeV2, system: SystemId = 'v1'): Record<string, string> {
  const map: Record<string, string> = system === 'v2' ? TOKEN_TO_VAR_V2 : TOKEN_TO_VAR_V1;
  const values = theme as unknown as Record<string, string>;
  const vars: Record<string, string> = {};
  for (const [token, cssVar] of Object.entries(map)) vars[cssVar] = values[token];
  return vars;
}
