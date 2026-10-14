import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { buildCredits } from '../../scripts/credits.mjs';

describe('CREDITS.md', () => {
  it('matches every sites/*/photos.json (rerun npm run fetch-photos if this fails)', () => {
    const root = process.cwd();
    const bySite = Object.fromEntries(
      fs
        .readdirSync(path.join(root, 'sites'), { withFileTypes: true })
        .filter((d) => d.isDirectory() && fs.existsSync(path.join(root, 'sites', d.name, 'photos.json')))
        .map((d) => [d.name, JSON.parse(fs.readFileSync(path.join(root, 'sites', d.name, 'photos.json'), 'utf8'))]),
    );
    expect(fs.readFileSync(path.join(root, 'CREDITS.md'), 'utf8')).toBe(buildCredits(bySite));
  });
});
