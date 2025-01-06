class HomePage {
  constructor(page) {
      this.page = page;
      this.acceptCookiesButton = page.locator('button:has-text("Accept")');
      this.careerLink = page.locator('li.nav-item:nth-child(5) .nav-link');
  }

  async acceptCookies() {
      await this.acceptCookiesButton.click();
      await this.page.waitForLoadState('networkidle');
      console.log('Cookies accepted!');
  }

  async goToCareerPage() {
      await this.careerLink.click();
  }
}

module.exports = HomePage;