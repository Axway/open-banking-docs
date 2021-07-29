---
title: ACP Endpoints
linkTitle: Authorization Control Plane (ACP) Endpoints
description: Summary of ACP endpoints used in Brazil market
weight: 4
date: 2021-07-29
---

{{% pageinfo %}}
This page is will be updated on the next release of ACP to incorporate all endpoints for Open Banking Brazil.
{{% /pageinfo %}}





| #   | Method/Path | Description | Usage |
| --- | ----------- | ----------- | ----- |
| 1 | POST ​/{tid}​/{aid}​/open-banking​/v3.1​/aisp​/account-access-consents | Create account access consent | Accounts and Transactions API - Create account access consents method - routeToConsent policy utilize kps parameter consentEndpoint |
| 2 | POST /{tid}/{aid}/open-banking/v3.1/aisp/account-access-consents/introspect | Introspect openbanking account access consent. | Account and Transactions API - Inbound Security "OAuth External (Main)" - Token Information Policy - to validate the access token (obtained after authorization) |
| 3 | POST ​/api​/system​/{tid}​/open-banking​/account-access-consent​/{login}​/accept | Accept account access consent | Submit the consent authorization - Policy name : "Redirect to CE - consent confirmation" |
| 4 | POST /api​/system​/{tid}​/logins​/{login}​/accept | Accept login request | Submit the successful login - Policy name : "Redirect to CE - login confirmation" |
| 5 | POST /api​/system​/{tid}​/gateways​/introspect | Introspect access token endpoint as a gateway | Account and Transactions API - Inbound Security "OAuth External (Consent)" - Token Information Policy - to validate the access token (obtained using client credentials flow) |
| 6 | POST ​/api​/admin​/{tid}​/clients | Create new OAuth client	| API Portal - Organization registration. Policy name : createOauthApp_AuthorizationServer |