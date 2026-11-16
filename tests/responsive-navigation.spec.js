// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('VARMA CAR TRAVELS - Responsive Navigation & Layout Audit', () => {
  const VIEWPORTS = [
    { width: 320, height: 600, label: 'Mobile Extra Small (320px)' },
    { width: 375, height: 667, label: 'Mobile iPhone SE (375px)' },
    { width: 414, height: 896, label: 'Mobile iPhone XR (414px)' },
    { width: 768, height: 1024, label: 'Tablet Portrait (768px)' },
    { width: 1024, height: 768, label: 'Tablet Landscape (1024px)' },
    { width: 1440, height: 900, label: 'Laptop Desktop (1440px)' },
    { width: 1920, height: 1080, label: 'Large Screen (1920px)' }
  ];

  for (const vp of VIEWPORTS) {
    test(`TC12 - Layout has no horizontal overflow on ${vp.label}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(400);

      const hasNoOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= window.innerWidth;
      });

      expect(hasNoOverflow).toBe(true);
    });
  }

  test('TC13 - Mobile navigation drawer opens, closes, and navigates seamlessly', async ({ page }) => {
    // Set to mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    const home = new HomePage(page);
    await home.goto();

    await expect(home.mobileToggleBtn).toBeVisible();

    // Open mobile menu
    await home.mobileToggleBtn.click();
    await expect(home.mobileNavDrawer).toHaveClass(/active/);

    // Click a link in mobile menu
    const aboutLink = home.mobileNavDrawer.locator('a[href="#about"]');
    await aboutLink.click();

    // Drawer should auto-close
    await expect(home.mobileNavDrawer).not.toHaveClass(/active/);
  });
});
