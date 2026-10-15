import type { Design, TypeSpec } from './types';

/** CSS variables for a site's display type, set on <html> for v2 sites. */
export function typeToCssVars(type: TypeSpec): Record<string, string> {
  const vars: Record<string, string> = {
    '--display-weight': String(type.displayWeight),
    '--display-tracking': type.tracking,
    '--display-leading': String(type.leading),
    '--h1-size': type.h1Size,
  };
  if (type.h1Weight !== undefined) vars['--h1-weight'] = String(type.h1Weight);
  if (type.voiceWeight !== undefined) vars['--voice-weight'] = String(type.voiceWeight);
  return vars;
}

/** Per-site switches as data attributes on <html>; the v2 CSS selects on these. */
export function designDataAttrs(design: Design): Record<`data-${string}`, string> {
  return {
    'data-rhythm': design.rhythm,
    'data-label': design.label,
    'data-button': design.button,
    'data-rule': String(design.rule),
    'data-shadow': design.shadow,
    'data-case': design.type.case,
    'data-voice': design.type.voice,
  };
}
