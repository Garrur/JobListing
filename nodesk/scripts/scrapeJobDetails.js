const puppeteer = require("puppeteer");

async function scrapeJobDetails(url) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      userDataDir: "../tmp",
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const jobDetails = await page.$("div.center-l.mw14-l.pb10.pt8.pv13-ns");

    if (!jobDetails) {
      console.log(`No job details found for URL: ${url}`);
      return {};
    }

    const details = {}; // Object to store detailed job information

    // Description
    const desc = await jobDetails.$("h3");
    if (desc) {
      details.description = await page.evaluate((el) => el.textContent, desc);
    }

    // Company Website
    const urlElement = await jobDetails.$('h4 > a');
    if (urlElement) {
      details.companyWebsite = await page.evaluate((el) => el.href, urlElement);
    }

    // Company Logo URL
    const logo = await jobDetails.$('header > div > img');
    if (logo) {
      details.companyLogoUrl = await page.evaluate((el) => el.src, logo);
    }

    // Company Description
    const companyDescription = await jobDetails.$('div.grey-800');
    if (companyDescription) {
      details.companyDescription = await page.evaluate((el) => el.textContent, companyDescription);
    }

    //console.log("Scraped details:", details); // Log scraped details
    return details; // Return detailed job information
  } catch (error) {
    console.error(`Error scraping job details from URL: ${url}`, error);
    return {};
  } finally {
    if (browser) {
      await browser.close(); // Close the browser
    }
    
  }
}

module.exports = scrapeJobDetails;
