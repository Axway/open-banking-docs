---
title: "Integration Architecture"
linkTitle: "Integration"
weight: 2
date: 2021-06-22
description: Overview of Integration Architecture
---

The diagram below shows an high-level integration view of the OBA architecture.

The aim of this diagram is to provide an initial understanding of the integration between components.

![Integration Overview](/Images/Integration_Overview.png)

To explain each labeled arrow in the diagram.

|   # | Description |
| --: | ----------- |
|   1 | A Third-Party Developer will use the API Portal to enrol themselves or their organization. |
|   2 | The API Portal communicates with the API Gateway to provision applications and associated credentials. |
|   3 | The API Gateway in turn registers those credentials in the Identity Management solution. |
|   4 | With the application registered and having made use of the Development Tools the Third-Party developer can engineer and deploy their application. A Consumer will use that application for specific purposes, but will be required to provide consent to  the Third-Party App. |
|   5 | To provide Consent the Third-Party App will contact the API Gateway to kick-off OpenID Connect Hybrid Flow. |
|   6 | The API Gateway will communicate with Identity Management to verify the Third-Party App credentials and return a redirection to the appropriate login screens. |
|   7 | The Third-Party App will redirect the user and - depending on the deployment approach - redirect the user to Identity Management or to the Bank Identity Provider. |
|   8 | The Consumer will login and provide confirm consent to the Third-Party App. |
|   9 | With Consent approved and an appropriate Authorization Code the Third-Party can obtain an Access Token and retrieve data on behalf of the Consumer. |
|  10 | The API Gateway and applications developed using API Builder will then retrieve data from the appropriate data source. This can either be from Core Banking Applications or Mock Data provided with the OBA. |
|  11 | The events will be logged to the Analytics component to allow deeper understanding of interactions with the platform. |

The sections below expand on this through several more detailed sequence-based view.

Note these sequence diagrams **focus largely on the happy path** and do not show specific error flows for the sake of brevity.