import { sites } from '@/sites';
import type { SiteConfig } from './types';

export function getSiteId(value: string | undefined = process.env.SITE): string {
  const ids = Object.keys(sites);
  if (!value) throw new Error(`SITE env var is required (one of: ${ids.join(', ')})`);
  if (!ids.includes(value)) throw new Error(`Unknown SITE "${value}". Use one of: ${ids.join(', ')}`);
  return value;
}

export function getSite(value?: string): SiteConfig {
  return sites[getSiteId(value)];
}
