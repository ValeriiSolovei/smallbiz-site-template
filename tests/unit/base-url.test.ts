import { describe, it, expect } from 'vitest';
import { resolveBaseUrl } from '@/lib/base-url';

describe('resolveBaseUrl', () => {
  it('uses SITE_URL, trimmed, as an origin', () => {
    expect(resolveBaseUrl({ SITE_URL: ' https://volt-ridge-demo.pages.dev/ ' })).toBe('https://volt-ridge-demo.pages.dev');
  });
  it('falls back to localhost for local builds', () => {
    expect(resolveBaseUrl({})).toBe('http://localhost:3000');
  });
  it('treats an empty SITE_URL as unset', () => {
    expect(resolveBaseUrl({ SITE_URL: '' })).toBe('http://localhost:3000');
  });
  it('ignores Vercel variables', () => {
    expect(resolveBaseUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'demo.vercel.app' })).toBe('http://localhost:3000');
  });
  it('names SITE_URL when it has no scheme', () => {
    expect(() => resolveBaseUrl({ SITE_URL: 'volt-ridge-demo.pages.dev' })).toThrow(/SITE_URL must be an absolute http\(s\) URL/);
  });
  it('rejects non-web schemes', () => {
    expect(() => resolveBaseUrl({ SITE_URL: 'ftp://example.com' })).toThrow(/SITE_URL must be an absolute http\(s\) URL/);
  });
  it('requires SITE_URL on Cloudflare Pages builds', () => {
    expect(() => resolveBaseUrl({ CF_PAGES: '1' })).toThrow(/SITE_URL env var is required on Cloudflare Pages/);
    expect(resolveBaseUrl({ CF_PAGES: '1', SITE_URL: 'https://x.pages.dev' })).toBe('https://x.pages.dev');
  });
});
