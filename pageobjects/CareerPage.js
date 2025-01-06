class CareerPage {
  constructor(page) {
      this.page = page;
      this.exploreJobsButton = page.locator('a:has-text("Explore Jobs")');
      this.locationDropdown = page.locator('#locationDropdown');
      this.serachButton = page.locator('.serachButton');
      this.loader = page.locator('.loader');
      this.jobDetail = page.locator('.flip-card .viewDetails a');
      this.jobTitle = page.locator('.titleDetail h4');
      this.jobExperience = page.locator('.jopOpenExperience span:first-child label');
      this.jonLocation = page.locator('.jopOpenExperience span:last-child label')
  }

  async exploreJobs() {
      await this.exploreJobsButton.click();
  }

  async scrollPage() {
      await this.page.mouse.wheel(0, 500);
      await this.page.waitForLoadState('networkidle');
  }
  async selectLocationBangalore() {
      await this.locationDropdown.selectOption({ label: 'Bengaluru, India' });
      await this.page.waitForLoadState('networkidle');
  }

  async searchJobs() {
      await this.serachButton.click();
  }
  async waitForLoaderToDisappear() {
      await this.loader.waitFor({ state: 'hidden' });
  }
      
  async getFirstJobTitle() {
    return await this.jobTitle.first().innerText();
  }
  async getFirstJobExperience(){
    return await this.jobExperience.first().textContent();
  }
  async getFirstJobLocation(){
    return await this.jonLocation.first().textContent();
  }
      
    // Click on the first job in the search results
    async clickFirstJob() {
        await this.jobDetail.first().click();
    }
}

module.exports = CareerPage;