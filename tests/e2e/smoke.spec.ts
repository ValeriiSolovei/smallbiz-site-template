import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { getSite } from '../../lib/site';

const site = getSite(process.env.SITE);

const ROUTES: string[] = ['/', '/about/', `/${site.primary.slug}/`, '/gallery/', '/contact/'];

for (const route of ROUTES) {
  test(`${site.id} ${route}: one h1, demo label, noindex`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByTestId('demo-label')).toHaveText('Demo site — fictional business, built by Valerii Solovei');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', new RegExp(`/${site.id}/hero\\.jpg$`));
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', /^data:image\/svg\+xml,/);
  });
}

test(`${site.id}: phone-width menu opens and links work`, async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.locator('#mobile-menu')).toBeAttached();
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const mobile = page.getByRole('navigation', { name: 'Mobile' });
  await expect(mobile).toBeVisible();
  await mobile.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(mobile).toBeHidden();
});

test(`${site.id}: phone-width menu closes with Escape and when going Back`, async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const mobile = page.getByRole('navigation', { name: 'Mobile' });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await mobile.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/);

  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(mobile).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(mobile).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();

  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(mobile).toBeVisible();
  await page.goBack();
  expect(new URL(page.url()).pathname).toBe('/');
  await expect(mobile).toBeHidden();
  await page.goForward();
  expect(new URL(page.url()).pathname).toBe('/about/');
  await expect(mobile).toBeHidden();
});

test(`${site.id}: phone-width menu stays closed when coming back to the page it was opened on`, async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  const box = await toggle.boundingBox();
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  await toggle.click();
  await page.locator('main a[href^="/"]').first().click();
  await expect(page).not.toHaveURL(/localhost:3000\/$/);
  await page.goBack();
  expect(new URL(page.url()).pathname).toBe('/');
  await expect(page.getByRole('navigation', { name: 'Mobile' })).toBeHidden();
});

test(`${site.id}: unknown URL shows the site's 404 page`, async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
  await expect(page).toHaveTitle(/^Page not found \| /);
});

test(`${site.id}: home shows sample reviews and every image has alt text`, async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Sample reviews', { exact: true })).toBeVisible();
  for (const name of site.reviews.map((r) => r.name)) await expect(page.getByText(name, { exact: true })).toBeVisible();
  await page.goto('/gallery/');
  const imgs = page.locator('main img');
  await expect(imgs).toHaveCount(site.gallery.length);
  for (const img of await imgs.all()) expect((await img.getAttribute('alt'))?.length ?? 0).toBeGreaterThan(8);
});

test(`${site.id}: business page shows its content`, async ({ page }) => {
  await page.goto(`/${site.primary.slug}/`);
  const p = site.primary;
  const first =
    p.kind === 'menu' ? p.sections[0].items[0].name
    : p.kind === 'services' ? p.services[0].name
    : p.kind === 'classes' ? p.plans[0].name
    : p.products[0].name;
  await expect(page.getByText(first, { exact: true }).first()).toBeVisible();
});

test(`${site.id}: contact form validates, then confirms without sending`, async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (r) => {
    if (r.method() === 'POST') requests.push(r.url());
  });
  await page.goto('/contact/');
  const submit = page.getByRole('button', { name: site.form.submitLabel });
  await submit.click();
  await expect(page.getByText('This field is required.').first()).toBeVisible();
  for (const f of site.form.fields) {
    const input = page.locator(`#field-${f.name}`);
    if (f.type === 'select') await input.selectOption(f.options![0]);
    else if (f.type === 'email') await input.fill('test+demo@example.com');
    else if (f.type === 'tel') await input.fill('(416) 555-0199');
    else await input.fill('Testing the demo form');
  }
  await submit.click();
  await expect(page.getByRole('status')).toContainText('Thanks');
  expect(requests).toEqual([]);
});

test(`${site.id}: home page logs no browser errors`, async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(errors).toEqual([]);
});

test(`${site.id}: footer links are big enough to tap on a phone`, async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const links = page.locator('footer a');
  await expect(links).not.toHaveCount(0);
  for (const link of await links.all()) {
    const box = await link.boundingBox();
    expect(box?.height ?? 0, await link.innerText()).toBeGreaterThanOrEqual(24);
  }
});

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
};

test(`${site.id}: contact form guides keyboard and screen-reader users`, async ({ page }) => {
  await page.goto('/contact/');
  const required = site.form.fields.filter((f) => f.required);
  for (const f of required) await expect(page.locator(`#field-${f.name}`)).toHaveAttribute('aria-required', 'true');

  const submit = page.getByRole('button', { name: site.form.submitLabel });
  await submit.click();
  const first = page.locator(`#field-${required[0].name}`);
  await expect(first).toBeFocused();
  await expect(first).toHaveAttribute('aria-invalid', 'true');
  expect(await first.evaluate((el) => getComputedStyle(el).boxShadow)).not.toBe('none');
  const error = page.locator(`#field-${required[0].name}-error`);
  await expect(error).toHaveCSS('color', rgb(site.theme.error));

  await first.fill(required[0].type === 'email' ? 'test@example.com' : 'Alex');
  await expect(error).toHaveCount(0);

  for (const f of site.form.fields) {
    const input = page.locator(`#field-${f.name}`);
    if (f.type === 'select') await input.selectOption(f.options![0]);
    else if (f.type === 'email') await input.fill('test+demo@example.com');
    else if (f.type === 'tel') await input.fill('(416) 555-0199');
    else await input.fill('Testing the demo form');
  }
  await submit.click();
  await expect(page.getByRole('status')).toBeFocused();
});

test(`${site.id}: smooth scrolling respects reduced motion and stays off during page changes`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await expect(page.locator('html')).toHaveAttribute('data-scroll-behavior', 'smooth');
});

test(`${site.id}: weekly schedule fits a phone screen`, async ({ page }) => {
  test.skip(site.primary.kind !== 'classes', 'only sites with a class schedule');
  if (site.primary.kind !== 'classes') return;
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`/${site.primary.slug}/`);
  const schedule = page.locator('div:has(> h2:text-is("Weekly schedule"))');
  await expect(schedule).toBeVisible();
  const spilling = await schedule.evaluate((el) => {
    const vw = document.documentElement.clientWidth;
    return [...el.querySelectorAll('*')].filter((n) => {
      const r = n.getBoundingClientRect();
      return r.width > 0 && r.right > vw + 0.5;
    }).length;
  });
  expect(spilling).toBe(0);
  for (const c of site.primary.schedule.flatMap((d) => d.classes)) {
    await expect(schedule.getByText(`with ${c.coach}`).first()).toBeVisible();
  }
});

test(`${site.id}: keyboard users can skip straight to the content`, async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  expect((await skip.boundingBox())?.width ?? 0).toBeGreaterThan(40);
  await expect(skip).toHaveAttribute('href', '#main');
  await page.keyboard.press('Enter');
  await expect(page.locator('main#main')).toBeFocused();
});

test(`${site.id}: ships only its own photos and no stray copies of the 404 page`, async ({ request }) => {
  for (const other of ['trades', 'gym', 'cafe', 'shop'].filter((id) => id !== site.id)) {
    expect((await request.get(`/${other}/hero.jpg`)).status(), other).toBe(404);
  }
  expect((await request.get(`/${site.id}/hero.jpg`)).status()).toBe(200);
  for (const p of ['/404/', '/_not-found/']) expect((await request.get(p)).status(), p).toBe(404);
});

// ---- Fonts (every site) and the v2 guards (v2 sites only) ----

const unquote = (family: string) => family.replace(/["']/g, '').trim();
const fonts = site.design.fonts;

test(`${site.id}: h1 and body use the site's own fonts`, async ({ page }) => {
  await page.goto('/');
  const h1 = unquote(await page.locator('h1').evaluate((el) => getComputedStyle(el).fontFamily));
  const body = unquote(await page.evaluate(() => getComputedStyle(document.body).fontFamily));
  expect(h1.startsWith(fonts.h1), h1).toBe(true);
  expect(body.startsWith(fonts.body), body).toBe(true);
});

// next/font writes every unicode-range subset to the media folder; only the preloaded ones (*.p.*) load up front.
const FONT_BUDGET_KB: Record<string, number> = { trades: 120, gym: 120, cafe: 140, shop: 100 };

test(`${site.id}: preloads few, small font files`, async ({ page }) => {
  const media = path.join(process.cwd(), 'out', '_next', 'static', 'media');
  const preloaded = fs.readdirSync(media).filter((f) => /\.p\.[^.]+\.woff2$/.test(f));
  const kb = preloaded.reduce((sum, f) => sum + fs.statSync(path.join(media, f)).size, 0) / 1024;
  expect(preloaded.length).toBeLessThanOrEqual(3);
  expect(kb, `${kb.toFixed(1)} KB`).toBeLessThanOrEqual(FONT_BUDGET_KB[site.id]);
  await page.goto('/');
  const links = await page.locator('link[rel="preload"][as="font"]').evaluateAll((els) => els.map((e) => (e as HTMLLinkElement).href));
  expect(links.map((l) => l.split('/').pop()).sort()).toEqual(preloaded.sort());
});

test.describe('v2 guards', () => {
  test(`${site.id}: each sample review shows its stars with a readable label`, async ({ page }) => {
    await page.goto('/');
    const stars = page.getByRole('img', { name: /^Rated [1-5] out of 5$/ });
    await expect(stars).toHaveCount(site.reviews.length);
    await expect(stars.first()).toBeVisible();
  });

  for (const route of ROUTES) {
    test(`${site.id} ${route}: nothing spills past the right edge at 375 px`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(route);
      const spilling = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        return [...document.querySelectorAll('body *')]
          .filter((n) => {
            const r = n.getBoundingClientRect();
            return r.width > 0 && r.right > vw + 0.5;
          })
          .map((n) => `${n.tagName.toLowerCase()}.${(n as HTMLElement).className}`.slice(0, 80));
      });
      expect(spilling).toEqual([]);
    });
  }

  test(`${site.id}: no text below 13 px on the home page`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('body *')]
        .filter((el) => !el.closest('.sr-only') && [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()))
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 13)
        .map((el) => `${el.tagName.toLowerCase()}: ${el.textContent?.trim().slice(0, 40)}`),
    );
    expect(small).toEqual([]);
  });

  test(`${site.id}: every visible link and button is at least 44 px tall on a phone`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const targets = page.locator('header a, header button, main a:not(p a), main button, footer a, nav[aria-label="Quick actions"] a');
    let checked = 0;
    for (const el of await targets.all()) {
      const box = await el.boundingBox();
      if (!(await el.isVisible()) || !box) continue;
      checked++;
      expect(box.height, await el.innerText()).toBeGreaterThanOrEqual(44);
    }
    expect(checked).toBeGreaterThan(3);
  });

  test(`${site.id}: the call bar shows on phones only, and not on the contact page`, async ({ page }) => {
    const bar = page.getByRole('navigation', { name: 'Quick actions' });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(bar).toBeVisible();
    await expect(bar.locator('a[href^="tel:"]')).toHaveCount(1);
    const box = await bar.boundingBox();
    expect(Math.round((box?.y ?? 0) + (box?.height ?? 0))).toBe(812);
    // Space for the bar is reserved from the first paint: at the very bottom, the demo notice sits above the bar.
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    const label = await page.getByTestId('demo-label').boundingBox();
    expect((label?.y ?? 0) + (label?.height ?? 0)).toBeLessThanOrEqual(812 - (box?.height ?? 0) + 0.5);
    await page.goto('/contact/');
    await expect(bar).toHaveCount(0);
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(bar).toBeHidden();
  });

  test(`${site.id}: the call bar never hides the focused element`, async ({ page }) => {
    // Instant scrolling, so the position is final when it is measured.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const last = page.locator('main a, main button, main summary').last();
    await last.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    await expect(last).toBeFocused();
    const box = await last.boundingBox();
    expect((box?.y ?? 0) + (box?.height ?? 0)).toBeLessThanOrEqual(812 - 64);
  });
});
