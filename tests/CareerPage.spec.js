import { test, expect } from '@playwright/test';
import { devConfig } from '../config/dev-config';
const HomePage = require('../pageobjects/HomePage');
const CareerPage = require('../pageobjects/CareerPage');
const JobDetailPage = require('../pageobjects/JobDetailPage');
const HeaderPage = require('../pageobjects/HeaderPage');

test('Navigate through the career section and menuhover and accept cookies', async ({ page }) => {
    // console.log(HomePage,'dddd',page)
    const homePage = new HomePage(page);
    const headerPage = new HeaderPage(page);
    const careerPage = new CareerPage(page);
    const jobDetailPage = new JobDetailPage(page);

    //Open the website
    await page.goto(devConfig.baseUrl);

    //check header menu hover
    await headerPage.checkAllMegaMenus();

    //Accept cookies if the button is visible
    await homePage.acceptCookies();

    //Go to the career page
    await homePage.goToCareerPage();

    // Scroll down the career page
    await careerPage.scrollPage();

    // Select Bangalore location
    await careerPage.selectLocationBangalore();

    // Search jobs
    await careerPage.searchJobs();

    // Wait until the loader disappears after selecting location
    await careerPage.waitForLoaderToDisappear();

    // Get the first job title,experience,location and validate it
    const JobTitleOnCareersPage = await careerPage.getJobTitle();
    const JobExperienceOnCareersPage = await careerPage.getJobExperience();
    const jobLocationOnCareersPage = await careerPage.getJobLocation();

    // Click on the first job option
    await careerPage.clickFirstJob();

    // get the job title,experience, and location after redirection
    const JobTitleInsideJobDetailsPage = await jobDetailPage.getJobTitle();
    const JobExperienceInsideJobDetailsPage = await jobDetailPage.getJobExperience();
    const JobLocationInsideJobDetailsPage = await jobDetailPage.getJobLocation();
    

    // Validate that the job title,experience,location matches before and after redirection
    expect(JobTitleInsideJobDetailsPage).toContain(JobTitleOnCareersPage);
    expect(JobExperienceInsideJobDetailsPage.toLowerCase()).toContain(JobExperienceOnCareersPage.toLowerCase());
    expect(JobLocationInsideJobDetailsPage).toContain(jobLocationOnCareersPage);

    await page.waitForTimeout(2000);
});