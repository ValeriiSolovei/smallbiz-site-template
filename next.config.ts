import fs from 'node:fs';
import path from 'node:path';
import type { NextConfig } from 'next';

const siteIds = fs
  .readdirSync(path.join(process.cwd(), 'sites'), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const site = process.env.SITE;
if (!site) throw new Error(`SITE env var is required (one of: ${siteIds.join(', ')})`);
if (!siteIds.includes(site)) throw new Error(`Unknown SITE "${site}". Use one of: ${siteIds.join(', ')}`);

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Each site loads only its own fonts: next/font preloads every font its module graph imports.
  turbopack: { resolveAlias: { '@site-fonts': `./sites/${site}/fonts.ts` } },
};

export default nextConfig;
