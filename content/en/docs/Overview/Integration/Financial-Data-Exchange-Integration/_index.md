---
title: "Financial Data Exchange (FDX) end to end journey"
linkTitle: "Financial Data Exchange (FDX) end to end journey"
weight: 5
date: 2023-03-15
---

This end-to-end flow provides a means to show how individual components are used in Amplify Open Banking.

The flow is summarized as follows:

* The Data Recipient (DR) obtains Consent from the Customer to access their data or make payments on their behalf at a given bank.
* The DR creates ("lodges") Consent at the target bank and redirects the Customer to the bank.
* The Customer authenticates themselves using their online banking credentials and confirms the Consent is correct.
* With Consent confirmed the Customer is redirected back to the DR who then gets an Access Token.
* The DR can then retrieve data or initiate payment on behalf of the Customer.

All APIs that provide access to data are implemented in the same manner. The consent/data access pattern relating to Account Information is therefore representative regardless of the specific resource (checking accounts, credit cards, loans, and so on).

![FDX Wrokflow](/Images/FDX-Workflow.svg)

### Steps

Step 1: Request Account Information

* This flow begins with a End User consenting to allow a DR to access account information data.

Step 2: DR initiates a POST request to Data Providers’s (DP) POST /par endpoint using the Pushed Authorization Request (PAR) method

* the authorization_details request parameter MUST contain a JSON-formatted object with two members in compliance with the RAR format specified by [RAR memo, § 2](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-rar#section-2)
    * the type parameter with value fdx_v1.0, and
    * a consentRequest parameter containing a valid ConsentRequest entity; For example:

  ```bash
  {
   "authorization_details": [
     {
       "type": "fdx_v1.0",
       "consentRequest": {
         "durationType": "ONE_TIME",
         "lookbackPeriod": 60,
         "resources": [
           {
             "resourceType": "ACCOUNT",
             "dataClusters": [
               "ACCOUNT_DETAILED",
               "TRANSACTIONS"
             ]
           }
         ]
       }
     }
   ]
  }
  ```

* DR must be authenticated with methods allowed by the FDX security profile
* If successful, DP responds with a 201 Created HTTP response code and JSON response
    * endpoint behavior and responses defined in detail by [PAR memo, § 2](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-par#section-2)
* DR uses the returned request_uri to build its subsequent request to GET /authorize
    * endpoint behavior and responses defined in detail by [PAR memo, § 4](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-par#section-4)

Step 3: User authentication, consent and authorization

* defined in detail by FDX UX Guidelines
* DP requires input and explicit authorization from authenticated EU to issue the grant
* If successful, DP issues the ConsentGrant including a unique identifier for the record, ConsentId
* If successful, DP returns a 302 Found HTTP response code, and an authorization code for DR to build its request to POST /token
* Successful token response will include the grant_id parameter containing ConsentId in addition to token response contents

Step 4: Request Data

* This is carried out by making a GET request the relevant resource.
* The unique AccountId(s) that are valid for the account-access-consent will be returned with a call to GET /accounts. This will always be the first call once an DR has a valid access token.

### Sequence diagram

![FDX End-to-end web journey sequence](/Images/FDX_Web_Journey_Sequence.svg)