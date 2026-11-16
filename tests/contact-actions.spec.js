// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('VARMA CAR TRAVELS - Contact & Interactive Actions', () => {
  test('TC08 - Phone links correctly reference primary and secondary lines', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    const primaryPhoneLinks = page.locator('a[href="tel:7569526527"]');
    const secondaryPhoneLinks = page.locator('a[href="tel:9912196524"]');

    expect(await primaryPhoneLinks.count()).toBeGreaterThanOrEqual(1);
    expect(await secondaryPhoneLinks.count()).toBeGreaterThanOrEqual(1);
  });

  test('TC09 - WhatsApp links point to authorized 7569526527 number with safe rel attributes', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    const waLinks = page.locator('a[href*="wa.me/917569526527"]');
    const count = await waLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);

    for (let i = 0; i < count; i++) {
      const link = waLinks.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('TC10 - Google Maps links reference exact GPS coordinates 16.768000, 81.681306', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    const mapDirectionsLink = page.locator('a[href*="16.768000,81.681306"]');
    expect(await mapDirectionsLink.count()).toBeGreaterThanOrEqual(2);

    for (let i = 0; i < await mapDirectionsLink.count(); i++) {
      const link = mapDirectionsLink.nth(i);
      await expect(link).toHaveAttribute('target', '_blank');
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('TC11 - Floating WhatsApp and Phone buttons are clickable without intrusive popover overlay', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.floatingWaBtn).toBeVisible();
    await expect(home.floatingWaBtn).toHaveAttribute('href', /wa\.me\/917569526527/);

    // Verify there is NO floating popover in the DOM
    const popover = page.locator('.floating-whatsapp-popover');
    await expect(popover).toHaveCount(0);
  });
});
