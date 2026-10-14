// Runs after `next build` (see the "build" script): a static export copies all of public/,
// so remove the other demos' photo folders and the duplicate 404 pages Next also exports
// (/404/ and /_not-found/ would otherwise answer 200). out/404.html stays.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
const site = process.env.SITE;
const siteIds = fs
  .readdirSync(path.join(root, 'sites'), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (!site || !siteIds.includes(site)) {
  console.error(`prune-out: SITE must be one of ${siteIds.join(', ')}, got "${site ?? ''}"`);
  process.exit(1);
}

const remove = [...siteIds.filter((id) => id !== site), '404', '_not-found'];
for (const name of remove) fs.rmSync(path.join(out, name), { recursive: true, force: true });
console.log(`prune-out: removed out/{${remove.join(',')}}`);
