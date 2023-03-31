---
title: "OpenID Security Conformance"
linkTitle: "OpenID Security Conformance"
weight: 2
date: 2021-09-02
---

As part of the certification process, the customer´s platforms should be compliant with OpenID Foundation security tests:

* <https://openid.net/certification/instructions/>

We have three different set of tests:

* *DCR tests*: dynamic client registration
* *FAPI Advanced test*: Financial-grade API
* *FAPI-CIBA-ID1*: Authorization server test

This section describes the setup tests that are necessary to configure the environment to run the security tests.

## Conformance test suite

Use one of the following ways to run the tests:

* On the Open ID platform <https://www.certification.openid.net>. You must have an account to login.
* On your local test platform that you can deploy by following these instructions: <https://gitlab.com/openid/conformance-suite/-/wikis/Developers/Build-&-Run>.

Then, you should be able to create and run new test plans.

![Conformance Suite : Create Plan](/Images/conformance-suite/create-plan.png)

## Dynamic Client Registration Test

The Dynamic Client Registration test validates the TPP creation on the Authorization Server by the Central Directory request.

### Getting Central Directory information

It is important to run the test to get the following information from the [Central Directory Sandbox](https://web.sandbox.directory.openbankingbrasil.org.br/):

* *Client ID*: Central Directory client ID to register.
![client-id](/Images/central_directory_brazil_clientid.png)
* *BRSEAL*: Message certificate (cert and key) used for JWKS.
![BRSEAL](/Images/central_directory_brazil_brseal.png)
* *BRCAC*: Transport certificate used for MTLS communication.
![BRCAC](/Images/central_directory_brazil_brcac.png)

{{% alert title="Note" color="primary" %}} You can find more details on [Central Directory Operation Guide](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378602/Guia+de+Opera+o+do+Diret+rio+Central) (in Portuguese).{{% /alert %}}

### Get the application declared in APIM

<!-- TODO : remove this chatper once limitation is overcome -->

{{% alert title="Note" color="primary" %}} This release has a limitation that the ClientID is not automatically created on APIM.{{% /alert %}}

On APIM there is an organization named *Testing* to support this test. And a new Application for the ClientID that is used for this test needs to be created.

1. Create a new Application on the organization named *Testing* with access to the payment API.

2. Get the Application ID. Use the API call to get all applications and find the *id* corresponding to your new application.

    ```bash
    curl --user apiadmin https://api-manager.<domain-name>/api/portal/v1.3/applications  
    ```

3. Create the OAuth Credentials for the application:

```bash
curl --location --request POST 'https://api-manager.<domain-name>/api/portal/v1.3/applications/5e321c00-5e5e-4167-a295-dc05e40c4e50/oauth' \
--user apiadmin \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "c4fodmqo889qjstf7ibg", 
    "cert": null,
    "type": "public",
    "enabled": true,
    "redirectUrls": [https://www.certification.openid.net/test/a/OB-EKS-DEV/callback"],
    "corsOrigins": ["*"],
    "applicationId": "5e321c00-5e5e-4167-a295-dc05e40c4e50"
}'
```

{{% alert title="Note" color="primary" %}} The *applicationId* appears in the URL request (POST `https://hostname:port/api/portal/v1.3/applications/$applicationId/oauth`) and the JSON data as *applicationId*. </br></br>And the *client-id* used for oauth appears in the JSON data as *id*.{{% /alert %}}

### Certificate configuration

Make sure the corresponding CAs are configured in the Amplify Open Banking solution by following each section of [Certificate Management](/docs/configuration/certificate-management).

### Create the DCR test plan

1. Create a new plan, and then select **Dynamic Client Registration Authorization server test**:
![Conformance Suite : Create Plan](/Images/conformance-suite/dcr-plan-select.png)

2. Use the JSON tab to import the [conformance-test-dcr.json](https://axway-open-banking-docs.netlify.app/sample-files/conformance-test-dcr.json) sample JSON test configuration.

3. Click the **Form** tab to customize the following:
   * *Test Information*: Include your company name and/or environment info. Decide whether you want to publish the result or not.
   * *Server*: Provide the Authorization server URL (keep /.well-known/openid-configuration).
   * *Client*: Change JWKS with RSEAL information.
   * *TLS certificates for client*:  Change certificate and key with BRCAC information.
   * *Directory*: Change client ID with the new TPP client ID to register.

## Financial-grade API (FAPI) advanced tests

This section includes the steps to complete the FAPI advanced test.

### TPP configurations

For the FAPI advanced test you need to have two registered TPPs.

Make sure you have the following information from the [Central Directory Sandbox](https://web.sandbox.directory.openbankingbrasil.org.br/) for each TPP:

* *BRSEAL*: Message certificate (cert and key) used for JWKS.
* *BRCAC*: Transport certificate used for MTLS communication.

Make sure that the two test TPPs are configured in APIM:

* Connect to the API Manager UI.
* Under Client - application, you should see an application for each TPP.
* In each application an OAuth clientId should be configured in the Authorization section.

Make sure that the two test TPPs are configured in ACP:

* Connect to ACP, and then select the Open Banking workspace.
* Under Application, you should be able to find each TPP with the same application name as in APIM with the same clientID.
* Each application should be configured with a correct Redirect URI: `https://www.certification.openid.net/test/a/<test-alias>/callback`. This test alias is the one used when creating the test plan later.
![app-details](/Images/acp-tpp-app-details.png)
* Each application should be configured with a correct client authorization method:
    * Choose **Private Key JWT** for tests with JWT.
    * Choose **TLS Client authentication** for tests with MTLS.
![app-details](/Images/acp-tpp-auth-method.png)
* Each application should be configured with correct client authorization details.
![app-details](/Images/acp-tpp-auth-identifier.png)

### Solution configuration

Make sure the corresponding CAs are configured in the Amplify Open Banking solution:

* Including the CA cert of each TPP on IngressMTLSCA entry of `values.yaml` of the APIM package. See detailed instructions in [Certificate Management - MTLS](/docs/configuration/certificate-management/mtls).
* Including the CA cert of each TPP on the ACP - Settings - Authorization tab. See detailed instructions in [Certificate Management - MTLS](/docs/configuration/certificate-management/mtls).
* Update the filters Jwt-Verify and Jwt-Sign, updating the JWKS certificate (BRCAC). See detailed instructions in [Certificate Management - JWKS](/docs/configuration/certificate-management/jwks).

### Create the FAPI advanced test plan

1. Create a new plan, and then select **FAPI Authorization server test**:
![Conformance Suite : Create Plan](/Images/conformance-suite/fapi-plan-select.png)

2. Use the JSON tab to import the [conformance-test-fapi.json](https://axway-open-banking-docs.netlify.app/sample-files/conformance-test-fapi.json) sample JSON test configuration.

3. Click the **Form** tab to customize the following:
   * *Test Information*: Include your company name and/or environment info. The alias should be the same as in the apps Redirect URI. Decide whether you want to publish the result or not.
   * *Server*: Provide the Authorization server URL (keep /.well-known/openid-configuration).
   * *Client*: Set the OAuth client Id and JWKS with RSEAL information of TPP1.
   * *TLS certificates for client*: Change the certificate and key with BRCAC information of TPP1.
   * *Second client*: Set the OAuth client Id and JWKS with RSEAL information of TPP2.
   * *Second client TLS certificates*:  Change the certificate and key with BRCAC information of TPP2.
   * *Resource*: Update the URL with the domain names and update the organization id.