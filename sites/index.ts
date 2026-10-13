import type { SiteConfig } from '@/lib/types';
import trades from './trades/site.config';
import gym from './gym/site.config';
import cafe from './cafe/site.config';

export const sites: Record<string, SiteConfig> = { trades, gym, cafe };
