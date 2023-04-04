---
title: "Functional Architecture"
linkTitle: "Functional Architecture"
weight: 2
date: 2021-06-22
---

The diagram below shows a high-level integration view of the Amplify Open Banking architecture.

The aim of this diagram is to provide an initial understanding of the integration between components.

![Integration Overview](/Images/Integration_Overview_0.svg)

Refer to the table for an explanation of each labeled arrow in the diagram.

|   # | Description |
| --: | ----------- |
|   1 | A Data Recipient Developer uses the Marketplace to enroll themselves or their organization. |
|   2 | The Marketplace communicates with the Discovery Agent to provision applications and associated credentials. |
|   3 | The Discovery Agent in turn registers those credentials in the Identity Management solution. |
|   4 | With the application registered the Data Recipient developer uses the Development Tools to engineer and deploy their application. A Consumer uses that application for specific purposes, but is required to provide consent to the Data Recipient App. |
|   5 | To provide Consent the Data Recipient App contacts the Identity Management service to start the OpenID Connect Hybrid Flow. Identity Management to verify the Data Recipient App credentials and return a redirection to the appropriate login screens. |
|   6 | The Data Recipient App redirects the user to Identity Management or the Bank Identity Provider depending on the deployment approach. |
|   7 | The Consumer logs in and provides confirm of consent to the Data Recipient App. |
|   8 | With Consent approved and an appropriate Authorization Code the Data Recipient obtains an Access Token and retrieves data on behalf of the Consumer. |
|   9 | The API Gateway connects with Identity Management to do the token and consent introspection |
|  10 | The API Gateway and integration applications retrieves data from the appropriate data source. This can either be from Core Banking Applications or Mock Data provided with the Amplify Open Banking solution. |
|  11 | The events are logged to the Amplify Platform for Analytics. |

The sections below expand on this through several more detailed sequence-based views. 

Note these sequence diagrams **focus largely on the happy path** and do not show specific error flows for the sake of brevity.