---
title: "Functional tests with Postman"
linkTitle: "Testing with Postman"
description: Use Postman to test all Open Banking APIs are working as expected
weight: 1
date: 2021-09-02
---

Axway Open Banking solution comes with Postman collections for most Open Banking APIs that enables solution testing and validation.

Admins or TPP Developer can test and validate their access to APIs by using Postman. Having these tests successfull helps to make sur all components of the solution is correctly integrated to the bank system.

## Retrieve the Postman files

First they should retrieve the "Postman Collection" and "Postman Environment"

1. Go to the API Portal and click the "Explore APIs" button to access the API Catalog
2. Browse to the API you'd like to test and click the "Learn More" button
3. Click both the "Postman Collection" and "Postman Environment" links to download the Collection and Environment files

## Import collection into Postman

Import the 2 files together into Postman. Note that Postman collections are different for each API while environment file is unique by environment. You might import several API collections together with the environment file.

![payment-api-postman-file-import](/Images/postman-import.png)

Once imported, you can select the collection in the left pane, and select the environment in the top right corner of postman.

Update the environment details, with _client-id_ and the _private-key_ corresponding to the TPP client certificate for message encrytion. The private key has a signature usage, it will be used to sign messages and JWT.

![payment-api-postman-environment](/Images/postman-environment.png)

## Postman Settings

Use the cog button to open Settings:

* Choose the General tab. Ensure the "Automatically follow redirects" is set to OFF also turn off SSL certificate validation

![payment-api-postman-settings](/Images/postman-settings1.png)

* Choose the Certificates tab. Ensure a TPP client certificate is installed for the target environment. If not:
    * Click "Add Certificate"
    * Enter the target host for the Authorization server , leave port empty (if exposed on 443 as by default)
    * Select the certificate and private key (CRT file and KEY file respectively) to be used for MTLS connection
    * Click "Add"
    * Click "Add Certificate" again
    * Enter the target host for the API MTLS server , leave port empty (if exposed on 443 as by default)
    * Select the certificate and private key (CRT file and KEY file respectively) to be used for MTLS connection
    * Click "Add"

![payment-api-postman-settings](/Images/postman-settings2.png)

## Test the API collection

Simply follow the collection step-by-step flow that is different for each API. Details may be provided in the API collection method description.

Some API would require to get a consent (account, credit card, payment, etc.) before actually using the API main methods. This would required to copy/paste some values between your browser and postman.

## Examples

### Accounts API

Connect to Develop Portal and find _Accounts_ API in the API Catalog.

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

The Step 3 is about signing the payload with the client private key. In real life, this step would be done on the client side only.

Mouse-over on `{{jwe-server}}` variable in the request URL to make sure the current value is match a existing JWE-generator service. If not, you can change the variable from the environement details (Use the _Eye_ icon on th top left corner and _Edit_ button).

> **Warning**: in this step the private key will be sent to the signing service. Please only use test/development keys.

Click _Send_ to create the consent request. Make sure you get a "201 Created" return code and the response body includes a _consentId_

Alternatively, you can skip this step and directly set the `{{jwe_request}}` variable with the signed payload required for Step 4.

![accounts-api-postman-step3](/Images/accounts-api-postman-step3.png)

Select Step 4 and mouse-over on `{{jwe_request}}` variable in the request body to make sure the current value is set.

Click _Send_ to create the consent request. Make sure you get a "302 Found" return code and the link to the consent login page.

![accounts-api-postman-step4](/Images/accounts-api-postman-step4.png)

Open the link in your browser and login with an authorized user. The login page depends on your Authorization server configuration.

![accounts-api-postman-step4-login](/Images/accounts-api-postman-step4-login.png)

Select the bank accounts that the user would consent to share with the TPP client app, and confirm. The consent page depends on your Authorization server configuration.

![accounts-api-postman-step4-consent](/Images/accounts-api-postman-step4-consent.png)

The redirect URL of the TPP client app should include `https://oauth.pstmn.io/v1/callback` so that you get a link back to Postman with the authorization code to use for the next step. Copy this code from the redirected URL.

![accounts-api-postman-step4-copy-code](/Images/accounts-api-postman-step4-copy-code.png)

Select Step 5 and paste the code in the `code` value of the request body form.

Click _Send_ to create the account access token. Make sure you get a "200 OK" return code and the response body includes an _access\_token_

![accounts-api-postman-step5](/Images/accounts-api-postman-step5.png)

Select "GET accounts" method if you want to test getting all consented accounts.

Click _Send_ to get the accounts. Make sure you get a "200 OK" return code and the response body includes the list of consented accounts.

![accounts-api-postman-get-all](/Images/accounts-api-postman-get-all.png)

Select "GET account by accountId" method if you want to test getting a specific account. Mouse-over on `{{accountId}}` variable in the request URL to make sure the current value match the account you'd like to retrieve.

Click _Send_ to get the account. Make sure you get a "200 OK" return code and the response body includes the details of the requested account.

![accounts-api-postman-get-account](/Images/accounts-api-postman-get-account.png)

Select "GET balances by accountId" method if you want to test getting balances of a specific account. Mouse-over on `{{accountId}}` variable in the request URL to make sure the current value match the account you'd like to retrieve.

Click _Send_ to get the account balances. Make sure you get a "200 OK" return code and the response body includes the balances of the requested account.

![accounts-api-postman-get-balance](/Images/accounts-api-postman-get-balance.png)

Select "GET overdraft limits by AccountId" method if you want to test getting overdraft limits of a specific account. Mouse-over on `{{accountId}}` variable in the request URL to make sure the current value match the account you'd like to retrieve.

Click _Send_ to get the account overdraft limits. Make sure you get a "200 OK" return code and the response body includes the overdraft limits of the requested account.

![accounts-api-postman-get-overdraft-limits](/Images/accounts-api-postman-get-overdraft-limits.png)

Select "GET transactions by accountId" method if you want to test getting the transactions list of a specific account. Mouse-over on `{{accountId}}` variable in the request URL to make sure the current value match the account you'd like to retrieve.

Click _Send_ to get the account transactions. Make sure you get a "200 OK" return code and the response body includes the transactions list of the requested account.

![accounts-api-postman-get-transactions](/Images/accounts-api-postman-get-transactions.png)

### Payment API

Connect to Develop Portal and find _Payment_ API in the API Catalog.

![payment-api-catalog](/Images/payment-api-catalog.png)

Click on the API to see details. Download the Postman collection and environment files from here.

![payment-api-postman-file-download](/Images/payment-api-postman-file-download.png)

Note that the environment file is the same for all API from this Developer Portal.

Open Postman and import the Postman files :

* just the collection if you already have the environment file from another API
* both the collection and the environment file if you didn't import the environment file from another API

![payment-api-postman-file-import](/Images/payment-api-postman-file-import.png)

Select Step 0 and click _Send_. Make sure you get a "200 OK" return code. This step is required only once by environment. This will set a global variable that is useful for next steps.

![payment-api-postman-step0](/Images/payment-api-postman-step0.png)

Select Step 1 and mouse-over on `{{client-id}}` variable in the request body to make sure the current value is correct. If not, change it from the environement details (Use the _Eye_ icon on th top left corner and _Edit_ button)

Click _Send_ to get Client Credentials Grant for payments. Make sure you get a "200 OK" return code and the response body includes an _access\_token_

![payment-api-postman-step1](/Images/payment-api-postman-step1.png)

Select Step 2 and check the request body payload that is built is the _Pre-request Script_ tab corresponds to the payment consent you need.
Update the "iss" field with your organization id (your ASPSP - Account Service Payment Service Provider).

Click _Send_ to create the consent request. Make sure you get a "201 Created" return code. The response body should be a "application/jwt" content type.

![payment-api-postman-step2](/Images/payment-api-postman-step2.png)

You can easily decode the response body by using JWT libraries or the online decoder available on <https://jwt.io/>
Make sure it includes a _consentId_, the payment details and the status "AWAITING_AUTHORIZATION"

![payment-api-postman-step1](/Images/payment-api-postman-step2-decoded.png)

The Step 3 is about signing the payload with the client private key. In real life, this step would be done on the client side only.

Mouse-over on `{{jwe-server}}` variable in the request URL to make sure the current value is match a existing JWE-generator service. If not, you can change the variable from the environement details (Use the _Eye_ icon on th top left corner and _Edit_ button).

> **Warning**: in this step the private key will be sent to the signing service. Please only use test/development keys.

Click _Send_ to create the consent request. Make sure you get a "201 Created" return code and the response body includes a _consentId_

Alternatively, you can skip this step and directly set the `{{jwe_request}}` variable with the signed payload required for Step 4.

![payment-api-postman-step3](/Images/payment-api-postman-step3.png)

Select Step 4 and mouse-over on `{{jwe_request}}` variable in the request body to make sure the current value is set.

Click _Send_ to create the consent request. Make sure you get a "302 Found" return code and the link to the consent login page.

![payment-api-postman-step4](/Images/payment-api-postman-step4.png)

Open the link in your browser and login with an authorized user. The login page depends on your Authorization server configuration.

![payment-api-postman-step4-login](/Images/payment-api-postman-step4-login.png)

First, select the bank account to be used for the payment and the payment method.

![payment-api-postman-step4-consent](/Images/payment-api-postman-step4-consent1.png)

Note that he consent page design depends on your Authorization server configuration.

Then, confirm the consent for the payment.

![payment-api-postman-step4-consent](/Images/payment-api-postman-step4-consent2.png)

The redirect URL of the TPP client app should include `https://oauth.pstmn.io/v1/callback` so that you get a link back to Postman with the authorization code to use for the next step. Copy this code from the redirected URL.

![payment-api-postman-step4-callback](/Images/payment-api-postman-step4-callback.png)

Select Step 5 and paste the code in the `code` value of the request body form.

Click _Send_ to create the account access token. Make sure you get a "200 OK" return code and the response body includes an _access\_token_

![payment-api-postman-step5](/Images/payment-api-postman-step5.png)

Select Step 6  and check the request body payload that is built is the _Pre-request Script_ tab corresponds to the payment you need.
Update the "iss" field with your organization id (your ASPSP - Account Service Payment Service Provider).

Click _Send_ to post the payment. Make sure you get a "201 Created" return code and  the response body should be a "application/jwt" content type. You can decode it as previously to check the payment status is no more awaiting for authorization.

![payment-api-postman-step6](/Images/payment-api-postman-step6.png)

Select Step 7 if you want to test getting the payment details again. Mouse-over on `{{paymentId}}` variable in the request URL to make sure the current value match the payment you've just posted.

Click _Send_ to get the payment. Make sure you get a "200 OK" return code and the response body should be a "application/jwt" content type, that you can decode as previously to check the payment details.

![payment-api-postman-step7](/Images/payment-api-postman-step7.png)

Select Step 8 if you want to test getting the consent details again. Mouse-over on `{{paymentConsentId}}` variable in the request URL to make sure the current value match the consent you've posted initialy.

Click _Send_ to get the consent. Make sure you get a "200 OK" return code and the response body should be a "application/jwt" content type, that you can decode as previously to check the consent details.

![payment-api-postman-step8](/Images/payment-api-postman-step8.png)
