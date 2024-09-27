---
title: "Financial Data Exchange (FDX)"
linkTitle: "Financial Data Exchange (FDX)"
weight: 3
date: 2023-03-22
---

Validate solution deployment, configuration, and conformance using Postman.

## Testing with Postman

The Amplify Open Banking solution includes Postman collections for FDX APIs.  
Each collection includes a script that simulates a sequence of API calls to verify FDX API specification compliance. For example, the Core API collection includes the sequence of user authentication, user consent, and calls to methods of Core API. Successful execution of the Postman collection validates the installation of the solution and FDX API specification compliance. Postman collections help Data Recipients (DR) to learn how to use the FDX APIs.

### Retrieve the Postman files

Retrieve the postman files.

1. Download the postman collections' file from here ![Postman Collection](/postman-collection/FDX-Demo-postman-collection.json) 
2. Download the environment file from here ![Postman Environment File](/postman-collection/FDX-Demo-postman-environment.json)

{{% alert title="Note" color="primary" %}} Postman collections also have their own documentation and you can follow these instructions within postman after importing the collection.{{% /alert %}}

### Import the collection files into Postman

Import the Postman collection files.

1. Open Postman and go to the *Collections* tab and import the *FDX-postman-collection.json* file. Each API has its own Postman collection.
  Refer to the image for steps -

   ![import postman collection](/Images/import_collection.png)

   ![import postman collection](/Images/import_collection_step2.png)

2. Similarly to import the environment file, go to the *Environments* tab in the Postman and import the *FDX-postman-environment.json* file. The environment file configurations contain parameters like solution hostnames and parameters that are used to call the APIs offered in the solution.
   Refer to the image for steps -

   ![import postman environment](/Images/import_environment.png)

3. Once imported, select the collection in the left pane, and then select the environment in the top right corner of postman.

  ![select collection and environment](/Images/import_collection_set_env.png)
### Configure Postman settings

Configure Postman for testing Open Banking APIs.

1. Click **Settings** (the cog icon) in Postman.

2. Click **General**. Ensure **Automatically follow redirects** is set to OFF and turn off **SSL certificate validation**.

3. Click **Certificates**. Ensure a TPP client certificate is installed for the target environment. If not:
    * Click **Add Certificate**.
    * Type the target host for the Authorization server (auth-server environment variable) and leave the port empty (if exposed on 443 as by default).
    * Select the certificate and private key (CRT file and KEY file respectively) to be used for MTLS connection.
    * Click **Add**.
    * Click **Add Certificate**.
    * Type the target host for the API MTLS server (api-services-mtls-url environment variable) and leave the port empty (if exposed on 443 as by default).
    * Select the certificate and private key (CRT file and KEY file respectively) to be used for MTLS connection.
    * Click **Add**.

### Test the API collection

Follow the collection flow step-by-step for each of the APIs.

Some APIs require user consent for example Core API. You must copy and paste authorize urls from postman to the browser and authorization code from the browser into the Postman collections steps for APIs.

### Examples

This section includes examples for testing the FDX Core API. At this moment it is assumed that collection and environment files are imported   and settings are updated in Postman using the steps above.

#### FDX Core API

Use Postman to test the FDX Core API. Before sending any request make sure that environment variables are updated as per your environment.

##### Start the steps in Postman to test the Core API

1. Get Access token 
   * Select Step 0.2 to generate a JWT token corresponding to the request body for consent.
   
   **Note:** This step is not part of our provided APIs. It simulates generating a JWT token containing the request body information needed for the POST /par request in the next step. The Data Recipient (DR) will implement this in their application to encrypt the consent grant request body into a JWT token. 
   
2. Select Step 1, Data Recipient (DR) initiates a POST request to Data Provider's (DP’s) POST /par endpoint using the Pushed Authorization Request (PAR) method
    * The *authorization_details* request parameter is defined in pre-request scripts and set as collection variable. Placeholders of all types of consents exist and can be used.
    * Once you get the response, go to **Visualize** tab and copy the available link. You need to use this link in the browser of your choice and complete login.

##### Complete the steps in the Browser to test the Core API

Continue testing the Core API in the Browser.

* Open the link to the login page in your browser and login with an authorized user. The login page depends on the Authorization server configuration.

* Select the bank accounts that correspond to the user consent, and confirm. The consent page depends on the Authorization server configuration.
The redirect URL of the DR client app should include `https://oauth.pstmn.io/v1/callback` and the link back to Postman with the authorization code to use for the next step.

* Copy the value of query parameter *code* from the redirected URL.

##### Complete the steps in Postman to test the Core API

Finish testing the Core API in Postman.

* Select Step 2 and paste the code in the `code` value of the request body form.
    * Click *Send* to get the access token. You should get a **200 OK** response code and the response body includes an *access_token* value.

* Once you get the *access_token* in response you are ready to call rest of the API endpoints in the collection.
* Invoke the respective core APIs to fetch accounts, transactions etc.