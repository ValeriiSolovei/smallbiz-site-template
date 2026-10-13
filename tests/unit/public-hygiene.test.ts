import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';

// SHA-256 of lowercase words and word pairs that must never appear in this public repo
// (other projects, private contact details, local machine names). Stored as hashes so
// this file does not publish the very words it guards against.
const GUARDED = new Set([
  'ab0b997fff4722f5305694fcc2991fcb945b83e4f6f551e9975ce7d9395db04a',
  'eff293e2fbc562584dc6eb393e35e02a7721cffb89e08c01c87ed0809ce777e6',
  '1e3f8b591853ecf889f9d7941d01a77034f357744b5f6b2e36ebd8dbfcd5bcbe',
  'acaec326c292fad2f3cfdce627c8ccd0748f18284666a940c149e5e8efb6f848',
  'b7f5dee1313c443ae74fa4f7499f81c611e4fa4aa1c86aef81b89722ecd821e6',
  'e7de0aad1d3a06be76e820f532d591917ab21080403e24926349c37bd2d3bc11',
  '86f519b62f871bd19ae32b24c5c308c9f880fff8225e7b4f6dacf1125b8644ce',
  '33cd8916347d25767df0e00578cf5ce28f578fc3cfd2cb8c5d88df1219d643fa',
  '871dbf284cf28e5af346ec73771b03a9a9edc708f4712623887b13b573f6734f',
  'fa5179bbb874bf325f79c90bfd536ad15f95de4e9c04bcedaa36564b85ccd00f',
  '9b79de40ff283b6ec3c32261990342c0f3795037125f02af401211eee8f985ad',
  '5152101d81d9bc905fa500f9affc7b3159d3b9900f1ac13d38ef16a7ca0aee71',
  'b7280384d165ee0a28fcb03b429b4891543aadabf2645d38ab80d8175c306c56',
  'cb8689619bad91d58e16aa46b96784926360bd186e7dc738822fab2973043a0d',
  'c6218d4db8d43ca0027bf789cd36dcc54d9ceceb81e33365cf46d82c529cee9a',
]);

const sha256 = (s: string) => createHash('sha256').update(s).digest('hex');

function guardedHits(text: string, guarded: Set<string> = GUARDED): string[] {
  const words = text.toLowerCase().match(/[a-z0-9](?:[a-z0-9._+-]*[a-z0-9])?/g) ?? [];
  const candidates = [...words, ...words.slice(1).map((w, i) => `${words[i]} ${w}`)];
  return candidates.filter((w) => guarded.has(sha256(w)));
}

const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
  .split('\0')
  .filter((f) => f && !/\.(jpe?g|png|webp|ico)$/i.test(f) && f !== 'package-lock.json' && fs.existsSync(f));

describe('public repo hygiene', () => {
  it('finds guarded words and word pairs, ignoring case', () => {
    const sample = new Set([sha256('pineapple'), sha256('upside down')]);
    expect(guardedHits('A Pineapple cake', sample)).toEqual(['pineapple']);
    expect(guardedHits('baked upside down', sample)).toEqual(['upside down']);
    expect(guardedHits('a plain sentence about plants', sample)).toEqual([]);
  });
  it('no tracked file contains a guarded word', () => {
    const hits = tracked.flatMap((f) => (guardedHits(fs.readFileSync(f, 'utf8')).length ? [f] : []));
    expect(hits).toEqual([]);
  });
});
