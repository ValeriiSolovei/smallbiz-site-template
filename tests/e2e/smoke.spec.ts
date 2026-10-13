import { test, expect } from '@playwright/test';
import { getSite } from '../../lib/site';

const site = getSite(process.env.SITE);

// Tasks 5–7 add '/about/', '/gallery/', `/${site.primary.slug}/` and '/contact/' here.
const ROUTES: string[] = ['/', '/about/', `/${site.primary.slug}/`, '/gallery/', '/contact/'];

for (const route of ROUTES) {
  test(`${site.id} ${route}: one h1, demo label, noindex`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.getByTestId('demo-label')).toHaveText('Demo site — fictional business, built by Valerii Solovei');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', new RegExp(`/${site.id}/hero\\.jpg$`));
  });
}

test(`${site.id}: phone-width menu opens and links work`, async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  const mobile = page.getByRole('navigation', { name: 'Mobile' });
  await expect(mobile).toBeVisible();
  await mobile.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about\/$/);
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
