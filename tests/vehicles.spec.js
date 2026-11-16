// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('VARMA CAR TRAVELS - Fleet & Vehicles Verification', () => {
  const EXPECTED_VEHICLES = [
    { name: 'Maruti Suzuki Dzire', seating: '4 + 1 Seater' },
    { name: 'Toyota Etios', seating: '4 + 1 Seater' },
    { name: 'Maruti Suzuki Ertiga', seating: '6 + 1 Seater' },
    { name: 'Kia Carens', seating: '6 + 1 Seater' },
    { name: 'Toyota Innova', seating: '7 + 1 Seater' },
    { name: 'Toyota Innova Crysta', seating: '7 + 1 Seater' }
  ];

  test('TC04 - All 6 vehicles exist with correct seating specs', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.vehiclesSection.scrollIntoViewIfNeeded();
    await expect(home.vehicleCards).toHaveCount(6);

    for (const v of EXPECTED_VEHICLES) {
      const card = home.vehicleCards.filter({
        has: page.locator('.vehicle-card-title', { hasText: new RegExp(`^${v.name}$`) })
      });
      await expect(card).toHaveCount(1);
      await expect(card.locator('.vehicle-card-badge')).toHaveText(v.seating);
    }
  });

  test('TC05 - Fleet category filtering works smoothly', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.vehiclesSection.scrollIntoViewIfNeeded();

    // Click '4+1 Sedans'
    await page.locator('.vehicle-filters .filter-btn:has-text("Sedans")').click();
    await expect(home.vehicleCards).toHaveCount(2);

    // Click '6+1 Family MPVs'
    await page.locator('.vehicle-filters .filter-btn:has-text("Family MPVs")').click();
    await expect(home.vehicleCards).toHaveCount(2);

    // Click '7+1 Premium MUVs'
    await page.locator('.vehicle-filters .filter-btn:has-text("Premium MUVs")').click();
    await expect(home.vehicleCards).toHaveCount(2);

    // Click 'All Vehicles'
    await page.locator('.vehicle-filters .filter-btn:has-text("All Vehicles")').click();
    await expect(home.vehicleCards).toHaveCount(6);
  });

  test('TC06 - Vehicle images render properly without broken links', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.vehiclesSection.scrollIntoViewIfNeeded();

    // Wait a brief moment for images to load
    await page.waitForTimeout(600);

    const images = page.locator('.vehicle-card img');
    const count = await images.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await img.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      const isLoaded = await img.evaluate((el) => {
        const image = /** @type {HTMLImageElement} */ (el);
        return image.complete && image.naturalWidth > 0;
      });
      expect(isLoaded).toBe(true);
    }
  });

  test('TC07 - Booking modal opens pre-filled when clicking Book Now on a car', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.vehiclesSection.scrollIntoViewIfNeeded();

    const crystaCard = home.vehicleCards.filter({ hasText: 'Innova Crysta' });
    const bookBtn = crystaCard.locator('.btn-primary');
    await bookBtn.scrollIntoViewIfNeeded();
    await bookBtn.click();

    await expect(home.bookingModal).toBeVisible();
    const select = page.locator('#modalVehicle');
    await expect(select).toHaveValue(/Innova Crysta/i);

    // Close modal
    await home.closeBookingModal();
    await expect(home.bookingModal).toBeHidden();
  });
});
