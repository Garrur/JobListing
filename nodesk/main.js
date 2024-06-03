const scrapeNoDeskJobs = require('./scripts/scrapeJobs');
const scrapeJobDetails = require('./scripts/scrapeJobDetails');
const storeInDynamoDB = require('./scripts/storeToDynamoDB');

async function main() {
    try {
      const jobs = await scrapeNoDeskJobs();
      console.log("Jobs After Initial Scraping:", jobs); // Log jobs after initial scraping
  
      for (let job of jobs) {
        const jobDetails = await scrapeJobDetails(job.descriptionUrl);
        job.description = jobDetails.description || "N/A";
        job.companyWebsite = jobDetails.companyWebsite || "N/A";
        job.companyLogoUrl = jobDetails.companyLogoUrl || "N/A";
        job.companyDescription = jobDetails.companyDescription || "N/A";
      }
  
      console.log("Jobs After Fetching Details:", jobs); // Log jobs after fetching details
      await storeInDynamoDB(jobs);
    } catch (error) {
      console.error('Error in main execution:', error);
    }
  }
  
  main();