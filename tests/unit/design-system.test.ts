import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function filesUnder(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? filesUnder(p) : /\.(tsx?|css)$/.test(d.name) ? [p] : [];
  });
}

// v2 components draw colour through role utilities (text-fg, bg-btn, border-rule, ...), which follow the
// tone in scope. Raw-token utilities would ignore the tone, and some v1 tokens do not exist in v2 themes.
const RAW_TOKEN = /\b(?:bg|text|ring|border|fill|stroke|outline|decoration)-(?:accent|surface-|text-(?:primary|secondary|muted)|border-default)/;

describe('v2 components', () => {
  const files = filesUnder(path.join(root, 'components', 'v2'));
  it('exist', () => {
    expect(files.length).toBeGreaterThan(0);
  });
  it('use role utilities only, never raw colour tokens', () => {
    const hits = files.flatMap((f) =>
      fs
        .readFileSync(f, 'utf8')
        .split('\n')
        .flatMap((line, i) => (RAW_TOKEN.test(line) ? [`${path.relative(root, f)}:${i + 1}`] : [])),
    );
    expect(hits).toEqual([]);
  });
  it('use no blur, glow or large rounded corners', () => {
    const banned = /\b(?:glow|backdrop-blur|rounded-(?:xl|2xl|3xl))\b/;
    const hits = files.filter((f) => banned.test(fs.readFileSync(f, 'utf8'))).map((f) => path.relative(root, f));
    expect(hits).toEqual([]);
  });
  it('never name the call bar with a word another nav uses', () => {
    const src = fs.readFileSync(path.join(root, 'components', 'v2', 'CallBar.tsx'), 'utf8');
    const name = /aria-label="([^"]+)"/.exec(src)?.[1] ?? '';
    expect(name).toBe('Quick actions');
  });
});

/** Splits a selector list at its top-level commas (not the ones inside :is() or :not()). */
function selectorParts(list: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = '';
  for (const ch of list) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(cur.trim());
      cur = '';
    } else cur += ch;
  }
  return [...parts, cur.trim()];
}

describe('global CSS', () => {
  const css = fs.readFileSync(path.join(root, 'app', 'globals.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const v2Start = css.indexOf('@layer components {');
  it('scopes every v2 rule under html[data-system="v2"]', () => {
    expect(v2Start).toBeGreaterThan(0);
    const v2 = css.slice(v2Start + '@layer components {'.length);
    const selectors = [...v2.matchAll(/(^|[}{])\s*([^{}@/][^{}]*?)\s*\{/g)].map((m) => m[2].trim()).filter((s) => !s.startsWith('@'));
    expect(selectors.length).toBeGreaterThan(40);
    for (const sel of selectors) for (const part of selectorParts(sel)) expect(part.trim(), sel).toMatch(/^html\[data-system="v2"\]/);
  });
  it('keeps the skip link on tokens both systems define', () => {
    const layout = fs.readFileSync(path.join(root, 'app', 'layout.tsx'), 'utf8');
    expect(layout).toContain('focus:bg-accent');
    expect(layout).toContain('focus:text-accent-contrast');
  });
});
