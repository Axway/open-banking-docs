---
title: "Onboarding"
linkTitle: "TPP onboarding"
description: How to onboard new TPPs to the solutions
weight: 6
date: 2021-09-02
---

## Developer registration from Developer Portal

### Independant developer

When registering as an independent developer, you will have access to our open banking APIs, including the ability to create applications, call API methods and monitor activity.

Here are the steps:

* Click on the Register button at the homepage
* Click the "Independent Developer" button
* Fill in the registration form and click the Register button
* Go and check your email 
* Click "Activate Account" link in verification email
* Sign-in with username and temporary password
* Change password
* Log back in with new password 
* API Catalog page is displayed
### Register with a organization/TPP code

In order to speed things up, registered organizations can provide you with a special access code, enabling you to easily onboard and identify yourself as one of their developers.

Either the bank admin creates the organization from the API Manager UI and generates a code from there, or the organization admin (for instance, the person who initialy register the organization fromthe portal) finds it on users menu in the Portal.

Either way, once the developer has this code, he/she can proceed to registration by follwoing these steps

* Click on the Register button at the API Portal homepage
* Click the "Register with Code" button
* Fill in the registration form including the Access Code and click the Register button:
* Go and check your email...
* Click the "Confirm request" link in the verification email
* Following the link will prompt a password reset email and a confirmation message. Go and * ck your email again...
* A new email is sent that provides a temporary password. Click on the "here" link
* Sign-in with username and temporary password
* Change password
* Log back in with new password
* API Catalog page is displayed

### Invite another developer in your organization

The organization admin (for instance, the person who initialy register the organization fromthe portal) can invite directly new developers from the Users menu in Portal.

## Organization registration from Developer Portal

Third-party solution providers can register as organizations using this option, providing them access to full user management capabilities and other advanced features.

* Click on the Register button at the API Portal homepage
* Click the "Register your organization" button
* Fill in form with the "NCA status" set to "Applied" and click Register button
* Go and check your email...
* Click the "Confirm request" link in the verification email
* Following the link will prompt a password reset email and a confirmation message. Go and * ck your email again...
* A new email is sent that provides a temporary password. Click on the "here" link
* Sign-in with username and temporary password
* Change password
* Log back in with new password
* API Catalog page is displayed



## Dynamic client registration

New client can directly use the Dynamic client registration (DCR) API to self-register.
For Brazil standard, and for each client, you need go through the following step

### Getting Central Directory information

Each client should get the following information from [Central Directory](https://web.directory.openbankingbrasil.org.br/)

* Client ID : Central Directory client ID to register 
![client-id](/Images/central_directory_brazil_clientid.png)
* BRSEAL – message certificate (cert and key) – used for JWKS .
![BRSEAL](/Images/central_directory_brazil_brseal.png)
* BRCAC – transport certificate – used for MTLS comunication
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

Customize the following command according to the TPP information you'd like to register:

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