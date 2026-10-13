import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCredits } from './credits.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const exists = (p) => fs.access(p).then(() => true, () => false);
const siteDirs = (await fs.readdir(path.join(root, 'sites'), { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
const only = process.argv.slice(2);
const bySite = {};

for (const site of siteDirs) {
  const listPath = path.join(root, 'sites', site, 'photos.json');
  let list;
  try {
    list = JSON.parse(await fs.readFile(listPath, 'utf8'));
  } catch {
    continue;
  }
  bySite[site] = list;
  if (only.length && !only.includes(site)) continue;
  await fs.mkdir(path.join(root, 'public', site), { recursive: true });
  for (const p of list) {
    const dest = path.join(root, 'public', site, p.file);
    if (await exists(dest)) continue;
    // Sized at download because static export has no image optimizer: large for hero/team, smaller for grids.
    const width = /^(hero|team)\./.test(p.file) ? 1200 : 800;
    const res = await fetch(`https://unsplash.com/photos/${p.unsplashId}/download?force=true&w=${width}`, { redirect: 'follow' });
    const type = res.headers.get('content-type') ?? '';
    if (!res.ok || !type.startsWith('image/')) throw new Error(`${site}/${p.file}: download of ${p.unsplashId} failed (${res.status} ${type})`);
    await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`saved public/${site}/${p.file}`);
  }
}

await fs.writeFile(path.join(root, 'CREDITS.md'), buildCredits(bySite));
console.log(`CREDITS.md updated for: ${Object.keys(bySite).join(', ') || '(none)'}`);
