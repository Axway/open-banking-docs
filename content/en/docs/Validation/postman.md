---
title: "Functional tests with Postman"
linkTitle: "Testing with Postman"
weight: 1
date: 2021-09-02
---

The Axway Open Banking solution includes Postman collections for Open Banking APIs. The Postman collections are available for download through the Developer Portal.

Each collection includes a script that simulates a sequence of API calls to verify Open Banking API specification compliance. For example, the Accounts or Payments collections includes the sequence of user authentication, user consent, and calls to methods of Accounts API or the Payments API. Successful execution of the Postman collection validates the installation of the solution and Open Banking API specification compliance. Postman collections help Third-Party Providers (TPP) to learn how to use the APIs.

## Retrieve the Postman files

Retrieve the postman files.

1. Go to the API Portal and click **Explore APIs** to access the API Catalog.
2. Browse to the API you would like to test, and then click **Learn More**.
3. Click the **Postman Collection** and **Postman Environment** links to download the Collection and Environment files.

## Import the collection files into Postman

Import the Postman collection files.

1. Import the collection files into Postman. Each API has its own Postman collection. The environment file is unique for the solution environment. The environment file configurations contain parameters like solution hostnames and parameters that are used to call the APIs offered in the solution.
![payment-api-postman-file-import](/Images/postman-import.png)

2. Once imported, select the collection in the left pane, and then select the environment in the top right corner of postman.

3. Update the environment details, with _client-id_ and the _private-key_ corresponding to the TPP client certificate for message encrytion. The private key has a signature usage, it is used to sign messages and JWT.
![payment-api-postman-environment](/Images/postman-environment.png)

4. For the Payment API, modify the following parameters that correspond to the solution environment installation:
   * _organizationId_: The Account Service Payment Service Provider (ASPSP). This identifier corresponds to the bank's identifier in the central bank's registry.
   * _date_: Date the payment consent is valid for the payment initiation.
   * _cnp_: CNPJ (Brazilian National Registry of Legal Entities) of the payment initiator (the entity or the person who initiates the payment).

## Configure Postman settings

Configure Postman for testing Open Banking APIs.

1. Click **Settings** (the cog icon) in Postman.

2. Click **General**. Ensure **Automatically follow redirects** is set to OFF and turn off **SSL certificate validation**.
![payment-api-postman-settings](/Images/postman-settings1.png)

3. Click **Certificates**. Ensure a TPP client certificate is installed for the target environment. If not:
    * Click **Add Certificate**.
    * Type the target host for the Authorization server and leave the port empty (if exposed on 443 as by default).
    * Select the certificate and private key (CRT file and KEY file respectively) to be used for MTLS connection.
    * Click **Add**.
    * Click **Add Certificate**.
    * Type the target host for the API MTLS server and leave the port empty (if exposed on 443 as by default).
    * Select the certificate and private key (CRT file and KEY file respectively) to be used for MTLS connection.
    * Click **Add**.

![payment-api-postman-settings](/Images/postman-settings2.png)

## Test the API collection

Follow the collection flow step-by-step for each of the APIs.

Some APIs require user consent (account, credit card, payment, and so on). You must copy and paste the consent data or urls from the browser into the Postman collections steps for APIs that require consent.

## Examples

This section includes examples for testing the Accounts and Payment APIs.

### Accounts API

Use Postman to test the Accounts API.

#### Download the Postman files for the Accounts API

Download the Postman files.

1. Connect to the Developer Portal and find the _Accounts_ API in the API Catalog.
![accounts-api-catalog](/Images/accounts-api-catalog.png)

2. Click the API to see details. In the Overview section, download the Postman collection and environment files from **Download Postman files**.
![accounts-api-postman-file-download](/Images/accounts-api-postman-file-download.png)
The environment file is the same for all APIs.

3. Open Postman and import the Postman files:
   * The collection file if the environment file is imported from another API.
   * Both the collection and the environment files if the environment file is not yet imported from another API.
![accounts-api-postman-file-import](/Images/accounts-api-postman-file-import.png)

#### Start the steps in Postman to test the Accounts API

Start testing the Accounts API in Postman.

1. Select Step 0, and then click _Send_ to get a "200 OK" response code. This step is required only once for the environment. This sets a global variable that is useful for next steps in the sequence.
![accounts-api-postman-step0](/Images/accounts-api-postman-step0.png)

2. Select Step 1 and mouse-over on the `{{client-id}}` variable in the request body to make sure the current value is correct. If not, change it from the environment details (Use the _Eye_ icon on th top left corner and _Edit_ button).

3. Click _Send_ to get the Client Credentials Grant for accounts to get a "200 OK" response code and the response body with the _access\_token_.
![accounts-api-postman-step1](/Images/accounts-api-postman-step1.png)

4. Select Step 2 and check the request body corresponds to the required permissions.

5. Click _Send_ to create the consent request to get "201 Created" response code and the response body with _consentId_.
![accounts-api-postman-step2](/Images/accounts-api-postman-step2.png)
The Step 3 is about signing the payload with the client private key. In real life, this step would be done on the client side only.

6. Mouse-over on the `{{jwe-server}}` variable in the request URL to check if the current value matches an existing JWE-generator service.
{{% alert title="Warning" color="warning" %}} In this step the private key is sent to the signing service. Please use test/development keys only.{{% /alert %}}

7. Click _Send_ to create the consent request to get "201 Created" as response code and the response body includes a _consentId_ value.
Alternatively, skip this step and directly set the `{{jwe_request}}` variable with the signed payload required for Step 4.
![accounts-api-postman-step3](/Images/accounts-api-postman-step3.png)

8. Select Step 4 and mouse-over on the `{{jwe_request}}` variable in the request body to verify the current value is set.

9. Click _Send_ to create the consent request to get a "302 Found" response code and the link to the consent login page.
![accounts-api-postman-step4](/Images/accounts-api-postman-step4.png)

#### Complete the steps in the UI to test the Accounts API

Continue testing the Accounts API in the UI.

1. Open the link to the consent login page in your browser and login with an authorized user. The login page depends on the Authorization server configuration.
![accounts-api-postman-step4-login](/Images/accounts-api-postman-step4-login.png)

2. Select the bank accounts that correspond to the user consent, and confirm. The consent page depends on the Authorization server configuration.
![accounts-api-postman-step4-consent](/Images/accounts-api-postman-step4-consent.png)
The redirect URL of the TPP client app should include `https://oauth.pstmn.io/v1/callback` and the link back to Postman with the authorization code to use for the next step.

3. Copy this code from the redirected URL.
![accounts-api-postman-step4-copy-code](/Images/accounts-api-postman-step4-copy-code.png)

#### Complete the steps in Postman to test the Accounts API

Finish testing the Accounts API in Postman.

1. Select Step 5 and paste the code in the `code` value of the request body form.

2. Click _Send_ to create the account access token to get a "200 OK" response code and the response body includes an _access\_token_ value.
![accounts-api-postman-step5](/Images/accounts-api-postman-step5.png)

3. Select the "GET accounts" method to verify access to all accounts with user consents.

4. Click _Send_ to get the accounts to get a "200 OK" response code and the response body includes the list of accounts with user consent.
![accounts-api-postman-get-all](/Images/accounts-api-postman-get-all.png)

5. Select the "GET account by accountId" method to verify access to a specific account. Mouse-over on the `{{accountId}}` variable in the request URL to make sure the current value matches the account information.

6. Click _Send_ to get the account to get a "200 OK" response code and the response body includes the details of the requested account.
![accounts-api-postman-get-account](/Images/accounts-api-postman-get-account.png)

7. Select "GET balances by accountId" method to test the access to balances of a specific account. Mouse-over on the `{{accountId}}` variable in the request URL to make sure the current value matches the account information.

8. Click _Send_ to get the account balances. Make sure you get a "200 OK" return code and the response body includes the balances of the requested account.
![accounts-api-postman-get-balance](/Images/accounts-api-postman-get-balance.png)

9. Select the "GET overdraft limits by AccountId" method to test access overdraft limits of a specific account. Mouse-over on the `{{accountId}}` variable in the request URL to verify if the current value matches the account information.

10. Click _Send_ to get the account overdraft limits. Make sure you get a "200 OK" return code and the response body includes the overdraft limits of the requested account.
![accounts-api-postman-get-overdraft-limits](/Images/accounts-api-postman-get-overdraft-limits.png)

11. Select the "GET transactions by accountId" method to verify the transactions list of a specific account. Mouse-over on the `{{accountId}}` variable in the request URL to verify if the current value matches the account information.

12. Click _Send_ to get the account transactions to get a "200 OK" response code and the response body includes the transactions list of the requested account.
![accounts-api-postman-get-transactions](/Images/accounts-api-postman-get-transactions.png)

### Payment API

Use Postman to test the Payment API.

#### Download the Postman files for the Payment API

Download the Postman files.

1. Connect to the Develop Portal and find _Payment_ API in the API Catalog.
![payment-api-catalog](/Images/payment-api-catalog.png)

2. Click on the API to see details. Download the Postman collection and environment files from here.
![payment-api-postman-file-download](/Images/payment-api-postman-file-download.png)
{{% alert title="Note" color="primary" %}} The environment file is the same for all APIs from this Developer Portal.{{% /alert %}}

3. Open Postman and import the Postman files:
   * The collection file if the environment file is imported from another API.
   * Both the collection and the environment file if the environment file is imported from another API.
![payment-api-postman-file-import](/Images/payment-api-postman-file-import.png)

#### Start the steps in Postman to test the Payment API

Start testing the Payment API in Postman.

1. Select Step 0 and click _Send_. Make sure you get a "200 OK" return code. This step is required only once by environment. This will set a global variable that is useful for next steps.
![payment-api-postman-step0](/Images/payment-api-postman-step0.png)

2. Select Step 1 and mouse-over on the `{{client-id}}` variable in the request body to make sure the current value is correct. If not, change it from the environement details (Use the _Eye_ icon on th top left corner and _Edit_ button).

3. Click _Send_ to get Client Credentials Grant for payments. Make sure you get a "200 OK" return code and the response body includes an _access\_token_.
![payment-api-postman-step1](/Images/payment-api-postman-step1.png)

4. Select Step 2 and check the request body payload that is built is the _Pre-request Script_ tab corresponds to the payment consent you need.

5. Click _Send_ to create the consent request. Make sure you get a "201 Created" return code. The response body should be a "application/jwt" content type.
![payment-api-postman-step2](/Images/payment-api-postman-step2.png)
You can easily decode the response body by using JWT libraries or the online decoder available on <https://jwt.io/>
Make sure it includes a _consentId_, the payment details and the status "AWAITING_AUTHORIZATION".
![payment-api-postman-step1](/Images/payment-api-postman-step2-decoded.png)

6. The Step 3 is about signing the payload with the client private key. In real life, this step would be done on the client side only.

7. Mouse-over on the `{{jwe-server}}` variable in the request URL to make sure the current value is match a existing JWE-generator service. If not, you can change the variable from the environement details (Use the _Eye_ icon on th top left corner and _Edit_ button).
{{% alert title="Warning" color="warning" %}} In this step the private key will be sent to the signing service. Please only use test/development keys.{{% /alert %}}

8. Click _Send_ to create the consent request. Make sure you get a "201 Created" return code and the response body includes a _consentId_.</br></br>
Alternatively, you can skip this step and directly set the `{{jwe_request}}` variable with the signed payload required for Step 4.
![payment-api-postman-step3](/Images/payment-api-postman-step3.png)

9. Select Step 4 and mouse-over on the `{{jwe_request}}` variable in the request body to make sure the current value is set.

10. Click _Send_ to create the consent request. Make sure you get a "302 Found" return code and the link to the consent login page.
![payment-api-postman-step4](/Images/payment-api-postman-step4.png)

#### Complete the steps in the UI to test the Payment API

Continue testing the Payment API in the UI.

1. Open the link in your browser and login with an authorized user. The login page depends on your Authorization server configuration.
![payment-api-postman-step4-login](/Images/payment-api-postman-step4-login.png)

2. Select the bank account to be used for the payment and the payment method.
![payment-api-postman-step4-consent](/Images/payment-api-postman-step4-consent1.png)
{{% alert title="Note" color="primary" %}} Thee consent page design depends on your Authorization server configuration.{{% /alert %}}

3. Confirm the consent for the payment.
![payment-api-postman-step4-consent](/Images/payment-api-postman-step4-consent2.png)
The redirect URL of the TPP client app should include `https://oauth.pstmn.io/v1/callback` so that you get a link back to Postman with the authorization code to use for the next step. Copy this code from the redirected URL.
![payment-api-postman-step4-callback](/Images/payment-api-postman-step4-callback.png)

#### Complete the steps in Postman to test the Payment API

Finish testing the Accounts API in Postman.

1. Select Step 5 and paste the code in the `code` value of the request body form.

2. Click _Send_ to create the account access token. Make sure you get a "200 OK" return code and the response body includes an _access\_token_.
![payment-api-postman-step5](/Images/payment-api-postman-step5.png)

3. Select Step 6  and check the request body payload that is built is the _Pre-request Script_ tab corresponds to the payment you need.

4. Click _Send_ to post the payment. Make sure you get a "201 Created" return code and  the response body should be a "application/jwt" content type. You can decode it as previously to check the payment status is no more awaiting for authorization.
![payment-api-postman-step6](/Images/payment-api-postman-step6.png)

5. Select Step 7 if you want to test getting the payment details again. Mouse-over on the `{{paymentId}}` variable in the request URL to make sure the current value match the payment you have just posted.

6. Click _Send_ to get the payment. Make sure you get a "200 OK" return code and the response body should be a "application/jwt" content type, that you can decode as previously to check the payment details.
![payment-api-postman-step7](/Images/payment-api-postman-step7.png)

7. Select Step 8 if you want to test getting the consent details again. Mouse-over on the `{{paymentConsentId}}` variable in the request URL to make sure the current value matches the consent you posted initially.

8. Click _Send_ to get the consent. Make sure you get a "200 OK" return code and the response body should be a "application/jwt" content type, that you can decode as previously to check the consent details.
![payment-api-postman-step8](/Images/payment-api-postman-step8.png)
