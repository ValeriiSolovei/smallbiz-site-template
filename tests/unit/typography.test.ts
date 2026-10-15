import { describe, it, expect } from 'vitest';
import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { designDataAttrs, typeToCssVars } from '@/lib/typography';
import { assertVoice, renderVoice, sentences } from '@/lib/voice';
import fixtureV2 from './fixtures/site-v2';

describe('typeToCssVars', () => {
  it('emits the display variables', () => {
    expect(typeToCssVars({ case: 'uppercase', displayWeight: 800, tracking: '0.01em', leading: 0.9, h1Size: 'clamp(3rem, 7vw, 7rem)', voice: 'none' })).toEqual({
      '--display-weight': '800',
      '--display-tracking': '0.01em',
      '--display-leading': '0.9',
      '--h1-size': 'clamp(3rem, 7vw, 7rem)',
    });
  });
  it('adds the h1 and voice weights only when set', () => {
    const vars = typeToCssVars({ case: 'none', displayWeight: 300, h1Weight: 300, tracking: '-0.025em', leading: 1.04, h1Size: '4rem', voice: 'italic', voiceWeight: 300 });
    expect(vars['--h1-weight']).toBe('300');
    expect(vars['--voice-weight']).toBe('300');
  });
  it('turns the per-site switches into data attributes', () => {
    expect(designDataAttrs(fixtureV2.design)).toEqual({
      'data-rhythm': 'alternate',
      'data-label': 'numbered',
      'data-button': 'plate',
      'data-rule': '2',
      'data-shadow': 'none',
      'data-case': 'uppercase',
      'data-voice': 'none',
    });
  });
});

describe('renderVoice', () => {
  const html = (n: ReturnType<typeof renderVoice>) => renderToStaticMarkup(createElement(Fragment, null, n));
  it('wraps the second voice in <em>', () => {
    expect(html(renderVoice({ text: 'Plants for low light', voice: 'low light' }))).toBe('Plants for <em>low light</em>');
  });
  it('puts each sentence on its own line', () => {
    expect(sentences('Electricians. On site this week.')).toEqual(['Electricians.', 'On site this week.']);
    expect(html(renderVoice({ text: 'Electricians. On site this week.', voice: 'this week' }, { lines: true }))).toBe(
      '<span class="line">Electricians.</span><span class="line">On site <em>this week</em>.</span>',
    );
  });
  it('throws when the voice is not in the text', () => {
    expect(() => assertVoice({ text: 'Fresh bread daily', voice: 'pastry' })).toThrow(/Voice "pastry" is not part of/);
    expect(() => renderVoice({ text: 'Fresh bread daily', voice: '' })).toThrow();
    expect(() => assertVoice({ text: 'Fresh bread daily' })).not.toThrow();
  });
});
