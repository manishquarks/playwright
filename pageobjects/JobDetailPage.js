class JobDetailPage {
    constructor(page) {
        this.page = page;
        this.jobTitle = page.locator('.pageTitle');
        this.jobExperience = page.locator('.jopOpenExperience span > label').first();
        this.jobLocation = page.locator('.jopOpenExperience span:nth-child(2) > label');
    }

    // Get the job title
    async getJobTitle() {
        return await this.jobTitle.textContent();
    }

    // Get the job experience required
    async getJobExperience() {
        return await this.jobExperience.textContent();
    }

    // Get the job location
    async getJobLocation() {
        return await this.jobLocation.textContent();
    }
}

module.exports = JobDetailPage;