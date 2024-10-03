---
title: "Authorization Server"
linkTitle: "Authorization Server"
weight: 6
date: 2024-09-10
---

This section describes the necessary configuration settings for the Authorization Server, which is a critical component of the Open Banking solution. Proper configuration of the Authorization Server ensures secure and compliant access to APIs, enabling robust authentication and authorization processes. This guide will walk you through the key configuration steps and parameters required to align the Authorization Server with the overall solution architecture.

## IdP configuration

Integrating an Identity Provider (IdP) is essential for managing user authentication within the Open Banking solution. This section outlines the steps required to configure and integrate the IdP with the Authorization Server, enabling seamless and secure authentication processes. By connecting the Authorization Server to your chosen IdP, you can leverage existing user directories, enforce authentication policies, and streamline the overall login experience for users.

The following steps detail how to configure your identity provider.

1. Log in to Authorization Server.
2. Select *Identity providers* on the left menu. Select **OpenId Connect v1.0** from the Add provider menu.
   ![Identity providers](/Images/AS-IdPs.png)
3. Create a new Alias and provide a valid Discovery endpoint. This is the "well-known" URL of the external IdP provider. Also provide the Client ID and Client Secret of the external IdP.
   ![Select OpenID Connect](/Images/AS-Configure-IdP.png)
4. Click **Add** to save the configuration.
5. Open the newly created IdP.
6. Open the *Mapper* tab and create a userIdMapper in the IdP. Select Mapper type **User Session Note Mapper**. Make sure you are using the correct claim in userId mapper.
   ![Create user mapper](/Images/AS-IdP-User-Mapper.png)

The external IdP integration is completed.

## Client policies update

The following steps detail how to update the client policies.

1. Select *Realm settings*  on the left menu after selecting the desired realm.
2. Open the *Client Policies* tab.
   ![Client Policies](/Images/client-policies.png)
3. Select **ob-issuer-verification** from the policies section.
4. Select **ob-issuer** Executor type.
5. Update the issuer URL to the authorize endpoint. This endpoint should be available in the tenant environment. (Shared Dataplane for Design and Check)
   ![OB Issuer](/Images/ob-issuer.png)

The policy issuer update is completed.

## Token mapper configuration

The following steps detail how to update the token mapper.

1. Select *Client scopes* on the left menu after selecting the desired customer realm.
![Client Scopes](/Images/client-scopes.png)
2. Search for "fdx-resource" mapper in the search box.
3. Click on the mappers and open the *Mappers* tab.
![FDX Resurce ](/Images/fdx-resource.png)
4. Open **Openbanking Issuer Mapper**, update the Issuer claim with the authorize endpoint that will be used for Design and Check mode, present in the customer tenant.
![Issuer Mapper ](/Images/mapper.png)
5. Save the mapper.

The token mapper issuer update is completed.

## Authentication configuration

Authentication is the area where you can configure and manage different credential types, authentication flows, screens, and actions during log in, registration, and other Keycloak workflows. 

The following steps detail how to create the post-login flow in addition to the built-in flows that are already there.

1. Select *Authentication* on the left menu after selecting the desired realm.
2. Configure the **post-login-flow** - This specifies the actions needed after the authentication of the user is done successfully.
   ![Post login flow](/Images/post-login-flow.png)

* **END USER UPDATE** authenticator - When the user is successfully authenticated, Keycloak stores the id_token claims in the user session attribute. This is configured in the END USER UPDATE authenticator. The following configurations must be set for END USER UPDATE.

| Configuration                 | Required | Default Value | Description                                                                                                                                    |
| ------------------------------|----------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Internal Resource Update Host | true     | null          | This is the host URL for resource update API. End-User Update SPI will use this host URI to update end-user information in the cosnet resource. |
| Internal Client Id            | true     | internal      | The internal client Id to fetch auth token using client-credentials flow.                                                       |
| Auth Server Host              | true     | null          | This is Auth-Token host. Using this host, End-User Update SPI will fetch the internal token with required scope.                              |
| User Id claim                 | true     | sub           | This is claim value in which userId is present from the IDP.                                                                                   |
| Openbanking Realm Name        | true     | null          | Openbanking realm name to fetch internal tokens.                                                                                                |

Refer to the following image:

![END USER UPDATE](/Images/end-user-update.png)

* **CONSENT GRANT REDIRECT** authenticator - This is configured to redirect the user to the consent grant application of the bank. The following configurations must be set for CONSENT GRANT REDIRECT.

| Configuration                  | Required | Default Value | Description                                                                                                                            |
|--------------------------------|----------|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Internal Resource Update Host  | true     | null          | This is host URL for resource update API. The Consent Grant Redirect Update SPI will use this host URI to update account information.   |
| Internal Client Id             | true     | internal      | The Internal Client Id to fetch auth token using client-credentials flow.                                                                 |
| Auth Server Host               | true     | null          | This is Auth-Token host. Using this host, End-User Update SPI will fetch the internal token with required scope.                       |
| User Id claim                  | true     | sub           | This is claim value in which userId is present from the IDP.                                                                           |
| Consent Grant Uri              | true     | null          | Provide externally hosted consent grant URL.                                                                                            |
| Action Token Expiration Period | true     | 300           | This period will determine the maximum allowed time (in seconds) for external consent application.                                      |
| Issuer url                     | true     | null          | This issuer URL will be set in the authorization code jwt response.                                                                     |

Refer to the image below:

![CONSENT GRANT REDIRECT](/Images/consent-grant-redirect.png)

{{< alert title="Note" color="primary" >}}The above authenticators should be in the same sequence. The sequence cannot be changed.{{< /alert >}}

## Update Identity providers configuration

The Identity providers configuration created previously must be updated with the Post login flow, as mentioned in the following image.

![IDP WITH POST LOGIN](/Images/post-login-identity-provider.png)
