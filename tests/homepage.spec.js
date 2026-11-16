// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('VARMA CAR TRAVELS - Homepage & Core Health', () => {
  test('TC01 - Page loads with 200 OK and no console errors', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const home = new HomePage(page);
    const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);

    // Allow hydration
    await page.waitForTimeout(500);

    // Verify zero console errors
    expect(consoleErrors).toEqual([]);
  });

  test('TC02 - Page title, Meta tags, and SEO structure are correct', async ({ page }) => {
    await page.goto('/');
    
    // Page Title
    await expect(page).toHaveTitle(/VARMA CAR TRAVELS/i);
    
    // Meta Description
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute('content', /VARMA CAR TRAVELS/i);

    // Canonical link
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /https:\/\/varmacartravels\.com\/?/);

    // OpenGraph Title & Image
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /VARMA CAR TRAVELS/i);

    // Schema.org Structured Data
    const schemaScript = page.locator('script[type="application/ld+json"]');
    await expect(schemaScript).toHaveCount(1);
    const schemaText = await schemaScript.textContent();
    const schemaJson = JSON.parse(schemaText || '{}');
    expect(schemaJson['@type']).toBe('AutoRental');
    expect(schemaJson.name).toBe('VARMA CAR TRAVELS');
    expect(schemaJson.telephone).toContain('+917569526527');
    expect(schemaJson.geo.latitude).toBe(16.768);
    expect(schemaJson.geo.longitude).toBe(81.681306);
  });

  test('TC03 - All 8 core sections exist in the DOM', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.heroSection).toBeVisible();
    await expect(home.aboutSection).toBeAttached();
    await expect(home.vehiclesSection).toBeAttached();
    await expect(home.servicesSection).toBeAttached();
    await expect(home.whyUsSection).toBeAttached();
    await expect(home.locationSection).toBeAttached();
    await expect(home.contactSection).toBeAttached();
    await expect(home.siteFooter).toBeAttached();
  });
});
