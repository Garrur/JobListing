# NoDesk Job Scraper

This project is a web scraper for the NoDesk website to extract job listings, detailed job descriptions, and company information. The extracted data is printed in JSON format to the console and can be stored in a DynamoDB database.

## Prerequisites

- Node.js installed on your system. You can download it from [Node.js](https://nodejs.org/).
- AWS SDK v3 for JavaScript installed.
- Puppeteer installed for web scraping.

## Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Garrur/JobListing
    cd nodesk
    ```

2. **Install dependencies**:
    ```sh
    cd nodesk
    ```
    ```sh
    npm install
    ```
    ```sh
    node main.js
    ```
    

3. **AWS CLI**:

    **Step 1**: Install the AWS CLI
    
    If you haven't already installed the AWS CLI, you can do so by following      
    these instructions:

    For Windows:

    1.Download the MSI installer from the AWS CLI download page.
    
    2.Run the downloaded MSI installer. 

    **Step 2**:
      Configure the AWS CLI with your credentials by running:


        aws configure


      Enter the required information when prompted:

        $ aws configure
          AWS Access Key ID [None]: YOUR_ACCESS_KEY_ID
          AWS Secret Access Key [None]: YOUR_SECRET_ACCESS_KEY
          Default region name [None]: us-west-2
          Default output format [None]: json
        
         

        

4. **Create DynamoDB Table**:
    Ensure you have a DynamoDB table created. You can create a table named `NoDeskJobs` using the AWS Management Console or AWS CLI.

    Example AWS CLI command:
    
    ```sh
    aws dynamodb create-table --table-name NoDeskJobs --attribute-definitions AttributeName=descriptionUrl,AttributeType=S --key-schema AttributeName=descriptionUrl,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
    ```

## Files

- **main.js**: Orchestrates the scraping and storage processes.
- **scrapeJobs.js**: Scrapes job listings from the NoDesk homepage.
- **scrapeJobDetails.js**: Scrapes detailed job descriptions and company information.
- **storeToDynamoDB.js**: Stores the scraped data in DynamoDB.

## Usage

To run the scraper, use the following command:

```sh
node main.js
