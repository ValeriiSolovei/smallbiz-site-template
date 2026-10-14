import { test, expect } from '@playwright/test';
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
  await mobile.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about\/$/);
  await expect(mobile).toBeHidden();
});

test(`${site.id}: phone-width menu closes with Escape and when going Back`, async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const mobile = page.getByRole('navigation', { name: 'Mobile' });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await mobile.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about\/$/);

  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(mobile).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(mobile).toBeHidden();
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();

  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(mobile).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(mobile).toBeHidden();
});

test(`${site.id}: unknown URL shows the site's 404 page`, async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found');
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
