---
title: "Onboarding"
linkTitle: "TPP onboarding"
weight: 6
date: 2021-09-02
---

How to onboard new TPPs to the solutions.

## Developer registration from Developer Portal

This section includes how developers register using the API Portal.

### Independent developer

When registering as an independent developer, you will have access to our open banking APIs, including the ability to create applications, call API methods, and monitor activity.

Here are the steps:

1. Click **Register** on the API Portal homepage.
2. Click **Independent Developer**.
3. Complete the registration form, and then click **Register**.
4. Check your email to complete your account activation.
5. Click **Activate Account** in the verification email.
6. Sign in with your username and temporary password.
7. Change your password.
8. Sign in with your new password.The API Catalog page is displayed.

### Register with an organization/Third-Party Provider (TPP) code

To speed things up, registered organizations can provide you with a special access code, enabling you to easily onboard and identify yourself as one of their developers.

Either the bank admin creates the organization from API Manager and generates a code from there, or the organization admin (for instance, the person who initially registers the organization from the portal) finds it on the Users menu in the Portal.

Either way, once the developer has this code, they can proceed to register by following these steps:

1. Click **Register** on the API Portal homepage.
2. Click **Register with Code**.
3. Complete the registration form including the Access Code, and then click **Register**.
4. Check your email to confirm your request.
5. Click **Confirm request** in the verification email.
6. A password reset email and a confirmation message is sent. Check your email again.
7. An email with a temporary password is sent. Click the **here** link, and then sign in with your username and temporary password.
8. Change your password.
9. Sign in with your new password. The API Catalog page is displayed.

### Invite another developer in your organization

The organization admin (for instance, the person who initially register the organization from the portal) can invite new developers from the Users menu in the Portal.

## Organization registration from the Developer Portal

Third-party solution providers can register an organizations using this option, providing them access to full user management capabilities and other advanced features.

1. Click **Register** on the API Portal homepage.
2. Click **Register your organization**.
3. Complete the form with the **NCA status** set to **Applied**, then and click **Register**.
4. Check your email to confirm your request.
5. Click **Confirm request** in the verification email.
6. A password reset email and a confirmation message is sent. Check your email again.
7. An email with a temporary password is sent. Click the **here** link, and then sign in with your username and temporary password.
8. Change your password.
9. Sign in with your new password. The API Catalog page is displayed.

## Dynamic client registration

New clients can use the Dynamic client registration (DCR) API to self-register. For the Brazil standard, and for each client, you need complete the following step.

### Getting Central Directory information

Each client should get the following information from [Central Directory](https://web.directory.openbankingbrasil.org.br/) or [Central Directory Sandbox](https://web.sandbox.directory.openbankingbrasil.org.br/)

* **Client ID** - Central Directory client ID to register.
![client-id](/Images/central_directory_brazil_clientid.png)
* **BRSEAL** – message certificate (cert and key) used for JWKS.
![BRSEAL](/Images/central_directory_brazil_brseal.png)
* **BRCAC** – transport certificate used for MTLS communication.
![BRCAC](/Images/central_directory_brazil_brcac.png)

<!--
### Use DCR API with Postman

Go on Developer portal and download Postman collection fro Dynamic Client Registration.
Import it in Postman.
Select 1st method and change parameter and body according to the TPP information to register.
Hit Send

TODO : update with DCR Postman collection to be published
-->

### Use DCR API with curl

Customize the following command according to the TPP information you would like to register:

```bash
curl --location --request POST    https://acp.$domainName>/default/openbanking_brasil/oauth2/register
--header 'Content-Type: application/json'  \
--cert client.crt --key client.key --cacert ca.crt \
--data-raw '{
    "grant_types": [
        "authorization_code",
        "implicit",
        "refresh_token",
        "client_credentials"
    ],
    "jwks_uri": "https://keystore.sandbox.directory.openbankingbrasil.org.br/$OrganizationId/$software_id/application.jwks",
    "token_endpoint_auth_method": "private_key_jwt",
    "response_types": [
        "code id_token"
    ],
    "redirect_uris": [
        "https://www.certification.openid.net/test/a/$test_id/callback"
    ],
    "software_statement": "$SoftwareStatement"
}'
```