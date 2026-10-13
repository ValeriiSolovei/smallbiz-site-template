import { test, expect } from '@playwright/test';
import { getSite } from '../../lib/site';

const site = getSite(process.env.SITE);

// Tasks 5–7 add '/about/', '/gallery/', `/${site.primary.slug}/` and '/contact/' here.
const ROUTES: string[] = ['/'];

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
