/**
 * Page Object Model for VARMA CAR TRAVELS Homepage
 */
export class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.primaryPhone = '7569526527';
    this.secondaryPhone = '9912196524';
    this.brandLogo = page.locator('.brand-logo');
    this.navMenu = page.locator('.nav-menu');
    this.mobileToggleBtn = page.locator('#mobileToggleBtn');
    this.mobileNavDrawer = page.locator('#mobileNavDrawer');
    this.mobileCloseBtn = page.locator('#mobileCloseBtn');
    this.heroSection = page.locator('#home');
    this.aboutSection = page.locator('#about');
    this.vehiclesSection = page.locator('#vehicles');
    this.servicesSection = page.locator('#services');
    this.whyUsSection = page.locator('#why-us');
    this.locationSection = page.locator('#location');
    this.contactSection = page.locator('#contact');
    this.siteFooter = page.locator('.site-footer');
    this.vehicleCards = page.locator('.vehicle-card');
    this.filterButtons = page.locator('.vehicle-filters .filter-btn');
    this.floatingWaBtn = page.locator('#floatingWaBtn');
    this.floatingCallBtn = page.locator('#floatingCallBtn');
    this.bookingModal = page.locator('#bookingModalOverlay');
    this.modalCloseBtn = page.locator('#modalCloseBtn');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async openBookingModal(vehicleName = '') {
    if (vehicleName) {
      const card = this.vehicleCards.filter({ hasText: vehicleName });
      await card.locator('.btn-primary').click();
    } else {
      await this.page.locator('.navbar .btn-primary').click();
    }
    await this.bookingModal.waitFor({ state: 'visible' });
  }

  async closeBookingModal() {
    await this.modalCloseBtn.click();
    await this.bookingModal.waitFor({ state: 'hidden' });
  }

  async getNoHorizontalScroll() {
    return await this.page.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
  }
}
