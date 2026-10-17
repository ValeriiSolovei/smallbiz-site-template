import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { buildCredits } from './credits.mjs';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exists = (p) => fs.access(p).then(() => true, () => false);
const siteDirs = (await fs.readdir(path.join(root, 'sites'), { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
// Usage: npm run fetch-photos -- [--force] [site ...]
// Existing files are kept unless --force is given (needed after changing an entry in photos.json).
const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter((a) => a !== '--force');
const unknown = only.filter((id) => !siteDirs.includes(id));
if (unknown.length) {
  console.error(`Unknown site: ${unknown.join(', ')}. Use one of: ${siteDirs.join(', ')}`);
  process.exit(1);
}
const bySite = {};

// Sized at download because static export has no image optimizer: large for hero/team, smaller for grids.
const widthFor = (file) => (/^(hero|team)\./.test(file) ? 1200 : 800);

// Optional per-photo steps before resizing, set in photos.json:
// "crop": [x, y, width, height] in source pixels, "mono": true to bake in black and white,
// "width" to override the size above, and "maxBytes" for a tighter file budget (a phone-first hero)
// (a smaller file than a CSS filter, and link previews match the page).
const GRAY_PROFILE = '/System/Library/ColorSync/Profiles/Generic Gray Gamma 2.2 Profile.icc';
async function prepare(file, entry) {
  if (!entry.crop && !entry.mono) return;
  // sips cannot write every format it reads (WebP), so work on a lossless copy.
  await run('sips', ['-s', 'format', 'png', file]);
  if (entry.crop) {
    const [x, y, w, h] = entry.crop;
    await run('sips', ['--cropToHeightWidth', String(h), String(w), '--cropOffset', String(y), String(x), file]);
  }
  if (entry.mono) await run('sips', ['--matchTo', GRAY_PROFILE, file]);
}

// macOS `sips`: re-encode as JPEG and shrink to `width` when wider (never upscales).
// Busy photos (leaves, crowds) stay heavy at 78%, so step the quality down until the file fits the budget.
const BYTE_BUDGET = 160_000;
async function toJpeg(src, dest, width, budget = BYTE_BUDGET) {
  const { stdout } = await run('sips', ['-g', 'pixelWidth', src]);
  const current = Number(/pixelWidth: (\d+)/.exec(stdout)?.[1] ?? 0);
  const resize = current > width ? ['--resampleWidth', String(width)] : [];
  for (const quality of ['78', 'normal', 'low']) {
    await run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', quality, ...resize, src, '--out', dest]);
    if ((await fs.stat(dest)).size <= budget) return;
  }
  console.warn(`warning: ${path.relative(root, dest)} is still over ${budget} bytes; consider another photo`);
}

for (const site of siteDirs) {
  const listPath = path.join(root, 'sites', site, 'photos.json');
  if (!(await exists(listPath))) continue;
  const list = JSON.parse(await fs.readFile(listPath, 'utf8'));
  bySite[site] = list;
  if (only.length && !only.includes(site)) continue;
  await fs.mkdir(path.join(root, 'public', site), { recursive: true });
  for (const p of list) {
    const dest = path.join(root, 'public', site, p.file);
    if (!force && (await exists(dest))) {
      console.log(`skipped public/${site}/${p.file} (exists; --force re-downloads)`);
      continue;
    }
    const res = await fetch(p.imageUrl, { redirect: 'follow', headers: { 'user-agent': 'smallbiz-site-template/0.1 (personal project)' } });
    const type = res.headers.get('content-type') ?? '';
    if (!res.ok || !type.startsWith('image/')) throw new Error(`${site}/${p.file}: download failed (${res.status} ${type}) from ${p.imageUrl}`);
    const tmp = `${dest}.download`;
    await fs.writeFile(tmp, Buffer.from(await res.arrayBuffer()));
    try {
      await prepare(tmp, p);
      await toJpeg(tmp, dest, p.width ?? widthFor(p.file), p.maxBytes);
    } finally {
      await fs.rm(tmp, { force: true });
    }
    console.log(`saved public/${site}/${p.file}`);
  }
}

await fs.writeFile(path.join(root, 'CREDITS.md'), buildCredits(bySite));
console.log(`CREDITS.md updated for: ${Object.keys(bySite).join(', ') || '(none)'}`);
