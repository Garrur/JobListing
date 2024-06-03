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
## Files

- **main.js**: Orchestrates the scraping and storage processes.
- **scrapeJobs.js**: Scrapes job listings from the NoDesk homepage.
- **scrapeJobDetails.js**: Scrapes detailed job descriptions and company information.
- **storeToDynamoDB.js**: Stores the scraped data in DynamoDB.

## Usage

To run the scraper, use the following command:

```sh
node main.js
```
# Puppeteer and AWS SDK Usage Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installing Puppeteer and AWS SDK](#installing-puppeteer-and-aws-sdk)
4. [Using Puppeteer](#using-puppeteer)
5. [Using AWS SDK](#using-aws-sdk)
6. [Example Code](#example-code)
7. [Resources](#resources)

## Introduction
This guide provides instructions on how to install Puppeteer and the AWS SDK in a Node.js project and gives examples of using both libraries.

## Prerequisites
- Node.js installed on your machine

## Installing Puppeteer and AWS SDK

### Using npm:

```bash
npm install puppeteer aws-sdk
```
    
# DynamoDB Usage Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Setting Up AWS Account and IAM User](#setting-up-aws-account-and-iam-user)
4. [Installing and Configuring AWS CLI](#installing-and-configuring-aws-cli)
5. [Creating a DynamoDB Table](#creating-a-dynamodb-table)
6. [Searching DynamoDB](#searching-dynamodb)
7. [Example AWS CLI Commands](#example-aws-cli-commands)
8. [Resources](#resources)

## Introduction
This guide provides step-by-step instructions on how to set up an AWS account, create a DynamoDB table, and search the table using the AWS CLI.

## Prerequisites
- An AWS account
- AWS CLI installed on your machine
- Basic knowledge of DynamoDB and AWS CLI

## Setting Up AWS Account and IAM User

### Step 1: Create an AWS Account
1. Go to [AWS Management Console](https://aws.amazon.com/).
2. Click on "Create an AWS Account".
3. Follow the instructions to complete the account setup.

### Step 2: Create an IAM User
1. Sign in to the AWS Management Console.
2. Go to the [IAM Console](https://console.aws.amazon.com/iam/).
3. Click on "Users" in the left-hand menu.
4. Click "Add user".
5. Enter a username and select "Programmatic access".
6. Attach the necessary policies (e.g., "AmazonDynamoDBFullAccess").
7. Complete the setup and download the credentials (.csv file).


## AWS IAM User Setup Guide

## Step 1: Create an IAM User and Generate Access Keys

### Sign in to the AWS Management Console
- Go to the [AWS Management Console](https://aws.amazon.com/console/) and sign in with your credentials.

### Navigate to the IAM Console
- In the AWS Management Console, search for "IAM" (Identity and Access Management) in the search bar.
- Click on the IAM service.

### Create a New IAM User
1. In the IAM console, click on "Users" in the left-hand menu.
2. Click on the "Add user" button.
3. Enter a username for the new user.
4. Under "Select AWS access type", check the box for "Programmatic access" to create an access key for the user.
5. Click "Next: Permissions".

### Set Permissions
- You can attach existing policies directly, add the user to a group with the necessary policies, or copy permissions from an existing user.
- For simplicity, you can attach the "AdministratorAccess" policy if you have administrative rights and are just setting this up for yourself. However, for better security practices, you should follow the principle of least privilege.

### Review and Create User
1. Click "Next: Tags" to optionally add tags to the user.
2. Click "Next: Review" to review the settings.
3. Click "Create user".

### Download Credentials
- Once the user is created, you will see an option to download the `.csv` file containing the AWS Access Key ID and Secret Access Key.
- Save this file in a secure location as the Secret Access Key will not be shown again.

## Important Note
- Keep the `.csv` file containing the credentials in a secure place. The Secret Access Key is only displayed once, and it cannot be retrieved later if lost.


## Installing and Configuring AWS CLI
    
   **Step 1.** If you haven't already installed the AWS CLI, you can do so by following      
    these instructions:

    For Windows:

    1.Download the MSI installer from the [AWS CLI](https://aws.amazon.com/cli/) download page.
    
    2.Run the downloaded MSI installer. 



  **Step 2**:
      Configure the AWS CLI with your credentials by running:

    
      aws configure
  

   Enter the required information when prompted:

        $ aws configure
          AWS Access Key ID [None]: YOUR_ACCESS_KEY_ID
          AWS Secret Access Key [None]: YOUR_SECRET_ACCESS_KEY
          Default region name [None]: ap-southeast-1
          Default output format [None]: json
        
         

        

4. **Create DynamoDB Table**:
    Ensure you have a DynamoDB table created. You can create a table named `NoDeskJobs` using the AWS Management Console or AWS CLI.

    Example AWS CLI command:
    
    ```sh
    aws dynamodb create-table --table-name NoDeskJobs --attribute-definitions AttributeName=descriptionUrl,AttributeType=S --key-schema AttributeName=descriptionUrl,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
    ```


