---
title: "Integration architecture"
linkTitle: "Integration"
weight: 2
date: 2021-06-22
---

The diagram below shows a high-level integration view of the Amplify Open Banking architecture.

The aim of these diagram is to provide an initial understanding of the integration between components.

### Open Finance Brazil

![Integration Overview OBB](/Images/Integration_Overview_OBB.png)

Refer to the table for an explanation of each labeled arrow in the diagram.

|   # | Description |
| --: | ----------- |
|   1 | A Data Recipient Developer uses the Marketplace to enroll themselves or their organization. |
|   2 | The Marketplace communicates with the Discovery Agent to provision applications and associated credentials. |
|   3 | The Discovery Agent in turn registers those credentials in the Identity Management solution. |
|   4 | With the application registered the Data Recipient developer uses the Development Tools to engineer and deploy their application. A Consumer uses that application for specific purposes, but is required to provide consent to the Data Recipient App. |
|   5 | To provide Consent the Data Recipient App contacts the API Gateway to start the OpenID Connect Hybrid Flow. |
|   6 | The API Gateway will communicate with Identity Management to verify the Data Recipient App credentials and return a redirection to the appropriate login screens. |
|   7 | The Data Recipient App redirects the user to Identity Management or the Bank Identity Provider depending on the deployment approach. |
|   8 | The Consumer log ins and provides confirm consent to the Data Recipient App. |
|   9 | With Consent approved and an appropriate Authorization Code the Data Recipient obtains an Access Token and retrieves data on behalf of the Consumer. |
|  10 | The API Gateway and integration applications retrieves data from the appropriate data source. This can either be from Core Banking Applications or Mock Data provided with the Amplify Open Banking solution. |
|  11 | The events are logged to the Analytics component to allow deeper understanding of interactions with the platform. |

### Financial Data Exchange (FDX)

![Integration Overview FDX](/Images/Integration_Overview_FDX.png)

Refer to the table for an explanation of each labeled arrow in the diagram.

|   # | Description |
| --: | ----------- |
|   1 | A Data Recipient Developer uses the Marketplace to enroll themselves or their organization. |
|   2 | The Marketplace communicates with the API Gateway to provision applications and associated credentials. |
|   3 | The API Gateway in turn registers those credentials in the Identity Management solution. |
|   4 | With the application registered the Data Recipient developer uses the Development Tools to engineer and deploy their application. A Consumer uses that application for specific purposes, but is required to provide consent to the Data Recipient App. |
|   5 | To provide Consent the Data Recipient App contacts the API Gateway to start the OpenID Connect Hybrid Flow. |
|   6 | The API Gateway will communicate with Identity Management to verify the Data Recipient App credentials and return a redirection to the appropriate login screens. |
|   7 | The Data Recipient App redirects the user to Identity Management or the Bank Identity Provider depending on the deployment approach. |
|   8 | The Consumer log ins and provides confirm consent to the Data Recipient App. |
|   9 | With Consent approved and an appropriate Authorization Code the Data Recipient obtains an Access Token and retrieves data on behalf of the Consumer. |
|  10 | The API Gateway and integration applications retrieves data from the appropriate data source. This can either be from Core Banking Applications or Mock Data provided with the Amplify Open Banking solution. |
|  11 | The events are logged to the Analytics component to allow deeper understanding of interactions with the platform. |

The sections below expand on this through several more detailed sequence-based views. 

Note these sequence diagrams **focus largely on the happy path** and do not show specific error flows for the sake of brevity.

**TO DO - add link to OBB & FDX specific subsections**