---
title: "Authorization Server"
linkTitle: "Authorization Server"
weight: 6
date: 2024-09-10
---

In this section, you’ll find the necessary configuration settings for the Authorization Server, which is a critical component of the Open Banking solution. Proper configuration of the Authorization Server ensures secure and compliant access to APIs, enabling robust authentication and authorization processes. This guide will walk you through the key configuration steps and parameters required to align the Authorization Server with the overall solution architecture.

## IdP Configuration

Integrating an Identity Provider (IdP) is essential for managing user authentication within the Open Banking solution. This section outlines the steps required to configure and integrate the IdP with the Authorization Server, enabling seamless and secure authentication processes. By connecting the Authorization Server to your chosen IdP, you can leverage existing user directories, enforce authentication policies, and streamline the overall login experience for users.

Following steps outlines the details of how to configure your identity provider.

1. Login to Authorization Server.
2. Click on “Identity providers” section in the left side bar and select “OpenId Connect v1.0”.
   ![Identity providers](/Images/AS-IdPs.png) 

3. Create a new Alias and provide a valid discovery endpoint, this is the “well-known” url of the external IdP provider. Also provide the client_id and client_secret of the external IdP.
   ![Select OpenID Connect](/Images/AS-Configure-IdP.png)

4. Save the configuration by clicking on *Add*.
5. Open the newly created IdP again.
6. Move to mappers tab and here we need to create a userId mapper in the IdP. Select “User Session Note Mapper”. Make sure you are using the correct claim in userId mapper.
   ![Create user mapper](/Images/AS-IdP-User-Mapper.png)
7. External IdP Integration is complete now.

## Client Policies Update 
Following steps need to be followed to update the client policies - 

1. Click on Realm settings  on the left menu, after selecting the desired realm.
2. Open "Client Policies" section
   ![Client Policies](/Images/client-policies.png)

3. Select "ob-issuer-verification"  from the policies section
4. Now click on "ob-issuer" in the executers section 
5. Now update the issuer url to the authorize endpoint, this endpoint should be available in tenant environment. (Shared Dataplane for Design and Check)
   ![OB Issuer](/Images/ob-issuer.png)

6. Policy Issuer update is completed!

## Token Mapper configuration

Following steps need to be followed to update the token mapper -
1. Select the "Client scopes" after selecting the desired customer realm
![Client Scopes](/Images/client-scopes.png)

2. Search for "fdx-resource" mapper in the search box.
3. Click on the mappers, now open the "Mappers" section 
![FDX Resurce ](/Images/fdx-resource.png)

4. Open the "Openbanking Issuer Mapper", update the issuer claim with the authorize endpoint we will be using for Design and Check mode, present in the customer tenant.
![Issuer Mapper ](/Images/mapper.png)
 
5. Save the mapper, Token mapper Issuer update is completed.

## Authentication Configuration 

Authentication is the area where you can configure and manage different credential types, authentication flows, screens, and actions during log in, registration, and other Keycloak workflows.
1. We have to create the post-login flow in addition to the buil-in flows that are already there. 
2. Click on the Authenticators section on the left menu, after selecting the desired realm.
3. Add **"post-login-flow"** - This specifies the actions to be needed after the authentication of the user is done successfully
   ![Post login flow](/Images/post-login-flow.png)

4. Configure the **END USER UPDATE** authenticator - When the user is successfully authenticated, Keycloak stores the id_token claims in the user session attribute. This is configured in the END USER UPDATE authenticator. Following configurations need to be set for END USER UPDATE
| Configuration                | Required | Default Value | Description                                                                                                                                    |
| ---------------------------- | -------- |---------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Internal Resource Update Host | true     | null          | This is the host url for resource update API, End-User Update SPI will use this host URI to update end-user information in the cosnet resource |
| Internal Client Id           | true     | internal      | The internal Client Id to be used for fetching auth token using client-credentials flow.                                                       |
| Auth Server Host             | true     | null          | This is Auth-Token host, Using this host, End-User Update SPI will fetch the internal token with required scope.                               |
| User Id claim                | true     | sub           | This is claim value in which userId is present from the IDP.                                                                                   |          
| Openbanking Realm Name       | true     | null          | Openbanking realm name to fetch internal tokens                                                                                                |

   Refer to the below image:

   ![END USER UPDATE ](/Images/end-user-update.png)

5. Configure the **CONSENT GRANT REDIRECT** authenticator - This is configured to redirect the user to the consent grant application of the bank.
| Configuration                  | Required | Default Value | Description                                                                                                                            |
|--------------------------------| -------- |---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Internal Resource Update Host  | true     | null          | This is host url for resource update API. The Consent Grant Redirect Update SPI will use this host uri to update account information   |
| Internal Client Id             | true     | internal      | Internal Client Id, to fetch auth token using client-credentials flow.                                                                 |
| Auth Server Host               | true     | null          | This is Auth-Token host, Using this host, End-User Update SPI will fetch the internal token with required scope.                       |
| User Id claim                  | true     | sub           | This is claim value in which userId is present from the IDP.                                                                           |
| Consent Grant Uri              | true     | null          | Provide externally hosted consent grant url                                                                                            |
| Action Token Expiration Period | true     | 300           | This period will determine the maximum allowed time (in seconds) for external consent application                                      |      
| Issuer url                     | true     | null          | This issuer url will be set in the authorization code jwt response                                                                     |

   Refer to the image below:

   ![CONSENT GRANT REDIRECT](/Images/consent-grant-redirect.png)

**Note:** Above authenticators should be in the same sequence and the sequence cannot be changed.

## Update Identity providers Configuration 

The identity providers configuration created previously also needs to be updated with the Post login flow as mentioned in the image below.

![IDP WITH POST LOGIN](/Images/post-login-identity-provider.png)