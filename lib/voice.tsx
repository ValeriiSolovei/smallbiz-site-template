import type { ReactNode } from 'react';
import type { Voice } from './types';

/** Checks that the second voice is part of the text; throws with the offending text otherwise. */
export function assertVoice(v: Voice): void {
  if (v.voice !== undefined && (!v.voice || !v.text.includes(v.voice))) {
    throw new Error(`Voice "${v.voice ?? ''}" is not part of "${v.text}"`);
  }
}

function withVoice(text: string, voice: string | undefined, key: string): ReactNode {
  if (!voice) return text;
  const at = text.indexOf(voice);
  if (at < 0) return text;
  return [text.slice(0, at), <em key={key}>{voice}</em>, text.slice(at + voice.length)];
}

/** Splits text into sentences, so each one can sit on its own line. */
export function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

/**
 * Renders a heading with its second voice wrapped in <em>. With `lines`, each sentence becomes
 * a `.line` block, so the line count does not depend on which font has loaded.
 */
export function renderVoice(v: Voice, opts: { lines?: boolean } = {}): ReactNode {
  assertVoice(v);
  if (!opts.lines) return withVoice(v.text, v.voice, 'voice');
  let used = false;
  return sentences(v.text).map((s, i) => {
    const voice = !used && v.voice && s.includes(v.voice) ? v.voice : undefined;
    if (voice) used = true;
    return (
      <span key={i} className="line">
        {withVoice(s, voice, `voice-${i}`)}
      </span>
    );
  });
}
