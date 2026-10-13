type Env = Record<string, string | undefined>;

/**
 * Absolute base for Open Graph image URLs. SITE_URL wins. It is required on Cloudflare Pages builds
 * (CF_PAGES=1): a localhost fallback there would ship link previews that point at the build machine.
 */
export function resolveBaseUrl(env: Env = process.env): string {
  const raw = env.SITE_URL?.trim();
  if (raw) {
    const message = `SITE_URL must be an absolute http(s) URL like https://my-demo.pages.dev, got "${raw}"`;
    let url: URL;
    try {
      url = new URL(raw);
    } catch {
      throw new Error(message);
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error(message);
    return url.origin;
  }
  if (env.CF_PAGES) {
    throw new Error('SITE_URL env var is required on Cloudflare Pages builds (for example https://my-demo.pages.dev) so link previews show the hero photo');
  }
  return 'http://localhost:3000';
}
