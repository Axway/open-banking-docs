---
title: "Functional tests with Postman"
linkTitle: "Testing with Postman"
description: Use postman to test all Open Banking APIs are working as expected
weight: 1
date: 2021-09-02
---

Axway Open Banking solution comes with Postman collections for most Open Banking APIs that enables solution testing and validation.

Admins or TPP Developer can test and validate their access to APIs by using Postman. Having these tests successfull helps to make sur all components of the solution is correctly integrated to the bank system.

## Retrieve the postman files

First they should retrieve the "Postman Collection" and "Postman Environment"

1. Go to the API Portal and click the "Explore APIs" button
2. Browse to the API you'd like to test and click the "Learn More" button
3. Click both the "Postman Collection" and "Postman Environment" links to download the Collection and Environment files

## Import collection into Postman

Import the 2 files together into postman. Note that Postman collections are different for each API while environment file is unique by environment.

Once imported, you can select the collection in the left pane, and select the environment in the top right corner of postman.

Update the environment details, with  client-id and the private key corresponding to the TPP client certificate.

## Postman Settings

Use the cog button to open Settings:

* Choose the General tab. Ensure the "Automatically follow redirects" is set to OFF also turn off SSL certificate validation:
* Choose the Certificates tab. Ensure a TPP client certificate is installed for the target environment. If not click "Add Certificate": (crt and key files seen in the screen shot are available in the open banking team's channel ) 
* Enter the target host and port and upload the public and private keys (CRT file and KEY file respectively) and click ADD

## Test

Simply follow the collection step-by-step flow that is different for each API.
Some API would require to get a consent (account, credit card, payment, ) before actually using the API main methods. this would required to copy/paste some value between your browser and postman and details in the API collection method description

## Examples

### Accounts API

Connect to Develop Portal and find Accounts API in the API Catalog.

![accounts-api-catalog](/Images/accounts-api-catalog.png)

Click on the API to see details. Download the Postman collection and environment files from here.

![accounts-api-postman-file-download](/Images/accounts-api-postman-file-download.png)

Note that the environment file is the same for all API from this Developer Portal.

Open Postman and import the Postman files :

* just the collection if you already have the environment file from another API
* both the collection and the environment file if you didn't import the environment file from another API

![accounts-api-postman-file-import](/Images/accounts-api-postman-file-import.png)

Select Step 0 and click _Send_. Make sure you get a "200 OK" return code. This step is required only once by environment. This will set a global variable that is useful for next steps.

![accounts-api-postman-step0](/Images/accounts-api-postman-step0.png)

Select Step 1 and mouse-over on `{{client-id}}` variable in the request body to make sure the current value is correct. If not, change it from the environement details (Use the _Eye_ icon on th top left corner and _Edit_ button) 

Click _Send_ to get Client Credentials Grant for accounts. Make sure you get a "200 OK" return code and the response body includes an _access\_token_

![accounts-api-postman-step1](/Images/accounts-api-postman-step1.png)

Select Step 2 and check the request body corresponds to the permissions you need. 

Click _Send_ to create the consent request. Make sure you get a "201 Created" return code and the response body includes a _consentId_

![accounts-api-postman-step2](/Images/accounts-api-postman-step2.png)

The Step 3 about signing the payload with the client private key. In real life, this step would be done on the client side only. 

Mouse-over on `{{jwe-server}}` variable in the request URL to make sure the current value is match a existing JWE-generator service. If not, you can change the variable from the environement details (Use the _Eye_ icon on th top left corner and _Edit_ button).

>*Warning*: in this step the private key will be sent to the signing service. Please only use test/development keys.

Click _Send_ to create the consent request. Make sure you get a "201 Created" return code and the response body includes a _consentId_

Alternatively, you can skip this step and directly set the `{{jwe_request}}` variable with the signed payload required for Step 4.

![accounts-api-postman-step3](/Images/accounts-api-postman-step3.png)

Select Step 4 and mouse-over on `{{jwe_request}}` variable in the request body to make sure the current value is set.

Click _Send_ to create the consent request. Make sure you get a "302 Found" return code and the link to the consent login page.

![accounts-api-postman-step4](/Images/accounts-api-postman-step4.png)

Open the link in your browser and login with a authorized user. The login page depends on your Authorization server configuration.

![accounts-api-postman-step4-login](/Images/accounts-api-postman-step4-login.png)

Select the user's bank accounts that you consent to share with the TPP client app, and confirm. The consent page depends on your Authorization server configuration.

![accounts-api-postman-step4-consent](/Images/accounts-api-postman-step4-consent.png)

The redirect URL of the TPP client app should include `https://oauth.pstmn.io/v1/callback` so that you get a link back to Postman with the authorization code to use for the next step. Copy this code from the redirected URL.

![accounts-api-postman-step4-copy-code](/Images/accounts-api-postman-step4-copy-code.png)

Select Step 5 and on past the code in the `code` value of the request body form.

Click _Send_ to create the account access token. Make sure you get a "200 OK" return code and the response body includes an _access\_token_

![accounts-api-postman-step5](/Images/accounts-api-postman-step5.png)

Select "GET accounts" method if you want to test getting all consented accounts.

Click _Send_ to get the accounts. Make sure you get a "200 OK" return code and the response body includes the list of consented accounts.

![accounts-api-postman-get-all](/Images/accounts-api-postman-get-all.png)

Select "GET account by AccountId" method if you want to test getting a specific account. Mouse-over on `{{accountId}}` variable in the request URL to make sure the current value match the account you'd like to retrieve.

Click _Send_ to get the account. Make sure you get a "200 OK" return code and the response body includes the details of the requested account.

![accounts-api-postman-get-account](/Images/accounts-api-postman-get-account.png)

Select "GET balances by AccountId" method if you want to test getting balances of a specific account. Mouse-over on `{{accountId}}` variable in the request URL to make sure the current value match the account you'd like to retrieve.

Click _Send_ to get the account balances. Make sure you get a "200 OK" return code and the response body includes the balances of the requested account.

![accounts-api-postman-get-balance](/Images/accounts-api-postman-get-balance.png)

Select "GET overdraft limits by AccountId" method if you want to test getting overdraft limits of a specific account. Mouse-over on `{{accountId}}` variable in the request URL to make sure the current value match the account you'd like to retrieve.

Click _Send_ to get the account overdraft limits. Make sure you get a "200 OK" return code and the response body includes the overdraft limits of the requested account.

![accounts-api-postman-get-overdraft-limits](/Images/accounts-api-postman--overdraft-limits.png)

Select "GET transactions by AccountId" method if you want to test getting the transactions list of a specific account. Mouse-over on `{{accountId}}` variable in the request URL to make sure the current value match the account you'd like to retrieve.

Click _Send_ to get the account transactions. Make sure you get a "200 OK" return code and the response body includes the transactions list of the requested account.

![accounts-api-postman-get-transactions](/Images/accounts-api-postman-get-transactions.png)

