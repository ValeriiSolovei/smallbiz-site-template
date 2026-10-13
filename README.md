# Small-business site template

A configurable static website template for local businesses, built with Next.js, Tailwind CSS and TypeScript.
One codebase; each business is a single config file with its text, colour theme, photos, sections and contact form.

The four demos are **fictional businesses** created to show the template in different styles:

| Demo | Style |
|---|---|
| Volt Ridge Electric (trades) | dark, safety orange |
| Ironline Athletic Club (gym) | dark, electric lime |
| Lantern & Crumb Café (cafe) | light, espresso |
| Mossbank Plant Co. (plant shop) | light, deep teal |

## How it works

- `sites/<id>/site.config.ts` holds all content and theme tokens; `SITE=<id>` picks the site at build time.
- Theme tokens become CSS variables, and Tailwind utilities read them, so components never hard-code colours.
- Fully static export (`output: 'export'`): fast, free to host, nothing to maintain.
- Forms validate input and show a confirmation; in the demos nothing is sent.
- Demos are marked `noindex` so search engines skip them.

## Run it

```bash
npm install
SITE=cafe npm run dev          # local dev server
SITE=cafe npm run build        # static site in out/
npm test                       # unit tests + content validation for every site
SITE=cafe npm run build && SITE=cafe npm run e2e   # browser smoke tests
```

## Deploy (Cloudflare Pages)

One Pages project per site, all from this repo:

- Build command: `npm run build`, output directory: `out`
- Environment variables: `SITE` (`trades`, `gym`, `cafe` or `shop`), `SITE_URL` (the site's own address, for example `https://my-demo.pages.dev`, used for link-preview images) and `NODE_VERSION` = `24`
- The build stops with a clear message if `SITE` is missing, or if `SITE_URL` is missing on Cloudflare.

Photos are public-domain (CC0) images found through [Openverse](https://openverse.org); see `CREDITS.md`.

To add photos: `npm run find-photos -- <search words>` lists public-domain candidates, copy the ones you want into `sites/<id>/photos.json` (with your own alt text), then `npm run fetch-photos -- <id>` downloads and resizes them (resizing uses macOS `sips`).
