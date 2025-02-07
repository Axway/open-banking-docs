---
title: "Functional Architecture"
linkTitle: "Functional Architecture"
weight: 2
date: 2021-06-22
---

The diagram below shows a high-level integration view of the Amplify Open Banking architecture.

The aim of this diagram is to provide an initial understanding of the integration between components.

![Integration Overview](/Images/Integration-Overview.svg)

Refer to the table for an explanation of each labeled arrow in the diagram.

|   # | Description |
| --: | ----------- |
|   1 | A Data Recipient Developer uses the Marketplace to enroll themselves or their organization. |
|   2 | The Marketplace communicates with the Discovery Agent to provision applications and associated credentials. |
|   3 | The Discovery Agent in turn registers those credentials in the Authorization Server. |
|   4 | With the application registered, the Data Recipient Developer engineer deploys their application. A Consumer uses that application for specific purposes but is required to provide consent to the Data Recipient App. |
|   5 | To provide Consent, the Data Recipient App contacts the Authorization Server to start the OpenID Connect Hybrid Flow. Authorization Server verifies the Data Recipient App credentials and returns a redirection to the appropriate login screens. |
|   6 | The Data Recipient App redirects the user to the Bank Identity Provider. |
|   7 | The Consumer completes the login. |
|   8 | The consumer provides the confirmation of consent. |
|   9 | With Consent approved and an appropriate Authorization Code, the Data Recipient obtains an Access Token and retrieves data on behalf of the Consumer. |
|   10 | The API Gateway connects with the Authorization Server to do the token introspection. |
|   11 | The API Gateway retrieves data from the appropriate data source via Bank Connectors. This can be from Core Banking Applications. |
|   12 | The events are logged to the Amplify Platform for Analytics. |
|   13 | To provide Analytics to consumers, Marketplace connects with Amplify Platform and fetches events. |

The sections below expand on this through several more detailed sequence-based views.

{{% alert title="Note" color="primary" %}} These sequence diagrams **focus largely on the happy path** and do not show specific error flows for the sake of brevity.{{% /alert %}}
