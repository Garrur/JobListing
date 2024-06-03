const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

// Configure AWS SDK v3
const dynamoDB = new DynamoDBClient({ region: "ap-southeast-1" });

// DynamoDB table name
const TABLE_NAME = "NoDeskJobs";

// Store job details in DynamoDB with deduplication
async function storeInDynamoDB(jobs) {
  const deduplicatedJobs = Array.from(
    new Set(jobs.map((job) => job.descriptionUrl))
  ).map((url) => jobs.find((job) => job.descriptionUrl === url));

  for (const job of deduplicatedJobs) {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        company: { S: job.company || "N/A" },
        title: { S: job.title || "N/A" },
        descriptionUrl: { S: job.descriptionUrl },
        location: { S: job.location || "N/A" },
        description: { S: job.detailedDescription || "N/A" },
        companyWebsite: { S: job.companyWebsite || "N/A" },
        companyLogoUrl: { S: job.companyLogoUrl || "N/A" },
        companyDescription: { S: job.companyDescription || "N/A" }
      },
    };

    try {
      const command = new PutItemCommand(params);
      await dynamoDB.send(command);
      console.log(`Stored job: ${job.title} at ${job.company}`);
    } catch (error) {
      console.error(
        `Error storing job: ${job.title} at ${job.company}`,
        error
      );
    }
  }
}

module.exports = storeInDynamoDB;
