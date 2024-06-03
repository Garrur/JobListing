const puppeteer = require("puppeteer");

async function scrapeNoDeskJobs() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    userDataDir: "../tmp",
  });
  const page = await browser.newPage();
  await page.goto("https://nodesk.co/remote-jobs/");

  // Wait for the job listings to load
  await page.waitForSelector("div.dt-s.dt-ns.w-100.pa3.pv4.pa5-l.bt.b--indigo-100.bg-indigo-050, div.dt-s.dt-ns.w-100.pa3.pv4.pa5-l.bt.b--indigo-050.bg-white");

  const jobsHandles = await page.$$("div.dt-s.dt-ns.w-100.pa3.pv4.pa5-l.bt.b--indigo-100.bg-indigo-050, div.dt-s.dt-ns.w-100.pa3.pv4.pa5-l.bt.b--indigo-050.bg-white");

  const jobs = []; // Array to store job information

  for (const jobsHandle of jobsHandles) {
    const job = {}; // Object to store job details

    // Company
    const company = await jobsHandle.$("h3");
    if (company) {
      job.company = await page.evaluate((el) => el.textContent, company);
    }

    // Title and URL
    const titleElement = await jobsHandle.$("h2 > a");
    if (titleElement) {
      job.title = await page.evaluate((el) => el.textContent, titleElement);
      job.descriptionUrl = await page.evaluate((el) => el.href, titleElement);
    }

    // Location
    const location = await jobsHandle.$('h5 > a');
    if (location) {
      job.location = await page.evaluate((el) => el.textContent, location);
    }

    jobs.push(job);
  }

  await browser.close(); // Close the browser
  return jobs; // Return the list of jobs
}

module.exports = scrapeNoDeskJobs;
