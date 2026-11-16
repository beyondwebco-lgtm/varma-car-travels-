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

  test('TC11 - Floating WhatsApp and Phone quick support dialogs open smoothly with primary and secondary lines', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await expect(home.floatingWaBtn).toBeVisible();

    // 1. Click WhatsApp floating button to open WhatsApp Quick Support
    await home.floatingWaBtn.click({ force: true });
    const waCard = page.locator('.floating-wa-card');
    await expect(waCard).toBeVisible();
    await expect(waCard).toContainText('WhatsApp Quick Support');
    await expect(waCard).toContainText('7569526527');
    await expect(waCard).toContainText('9912196524');

    // Verify WhatsApp links inside the card
    const waLinks = waCard.locator('a[href*="wa.me/91"]');
    expect(await waLinks.count()).toBe(2);
    await expect(waLinks.nth(0)).toHaveAttribute('href', /wa\.me\/917569526527/);
    await expect(waLinks.nth(1)).toHaveAttribute('href', /wa\.me\/919912196524/);

    // 2. Click close button on WhatsApp card
    await waCard.locator('.quick-card-close').click({ force: true });
    await expect(waCard).not.toHaveClass(/open/);

    // 3. For mobile/tablet where floating call button is visible, test Call Quick Support
    if (await home.floatingCallBtn.isVisible()) {
      await home.floatingCallBtn.click({ force: true });
      const callCard = page.locator('.floating-call-card');
      await expect(callCard).toBeVisible();
      await expect(callCard).toContainText('24/7 Telephone Helpline');
      await expect(callCard).toContainText('7569526527');
      await expect(callCard).toContainText('9912196524');

      // Verify phone links inside call card
      const callLinks = callCard.locator('a[href*="tel:"]');
      expect(await callLinks.count()).toBe(2);
      await expect(callLinks.nth(0)).toHaveAttribute('href', 'tel:7569526527');
      await expect(callLinks.nth(1)).toHaveAttribute('href', 'tel:9912196524');

      // Click backdrop to close
      await page.locator('.floating-backdrop').click({ force: true });
      await expect(callCard).not.toHaveClass(/open/);
    }
  });
});
