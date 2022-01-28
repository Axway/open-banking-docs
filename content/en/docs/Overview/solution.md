---
title: "Solution Architecture"
linkTitle: "Solution"
weight: 1
date: 2021-06-22
description: Overview of Solution Architecture
---

Axway Open Banking is built on five solution building blocks as shown below.

![Solution Building Blocks](/Images/Solution_Building_Blocks.png)

To clarify the purpose of each building block:

* **Developer Experience** is all about **engagement**. Giving developers what they need, when they need it is critical by putting the tools in their hands that will make their applications a success.
* The rationale for **Open Banking APIs** is twofold:
    * Your organization needs to achieve **compliance** with local standards by providing the APIs dictated by open banking regulations.
    * You want to **take advantage of demand in the market** by exposing open APIs that provide data or services that make your organization unique and therefore attractive to consumers of those services.
* Clearly **Identity and Access Control** are vital to ensuring the **security** of your APIs. This includes ensuring that access is granted to Third-Party Apps only when a customer has given due consent and that consent has been confirmed.
* Naturally the solution needs to be delivered by appropriate **Infrastructure**. Axway's API Management solution provides the means to deliver this on robust, proven technology.
* The final piece of the puzzle is what your organization brings, namely the **Core Banking Applications** that provide capabilities that the open APIs you provide are based on.

Each building block is critical to the success of your open banking platform and each building block provides a number of features. The features are based on the capabilities that the solution delivers and are summarized as shown below.

![Solution Overview](/Images/Solution_Overview.png)

## Features

The features of the solution are further clarified in the following
sections.

### Developer Experience

Developer Experience is about engagement with the customers who will make use of your APIs, namely your developer community. 

To accommodate their needs and ensure a quality experience is delivered a number of features are implemented.

#### API Catalog and documentation

We provide a comprehensive, pre-built catalog of the APIs available in the solution that is tailored based on the certification of the developer (that is independent developer versus entity) regulated by the National Competent Authority (NCA).

#### Demo Applications

Our Demo Applications are web-based and provide a realistic view of the types of applications that Third-Party developers might use.

For example, an account aggregator demo is provided that demonstrates a personal financial management (PFM) tool.

#### Developer and Organization Onboarding

Developer and Organization Onboarding is the ability to seamlessly onboard a developer or their organization.

#### Application and Credential Management

Application and Credential Management is the means by which developers can create an application against which credentials to access the open banking APIs can be registered. API registration includes an x.509 public certificate to facilitate Mutual Authentication as implemented in the [Financial-grade API (FAPI) standards.](https://openid.net/wg/fapi/)

#### Development Tools

Development Tools are the affordances offered to developers to aid them in their task of building applications that consume your organization's APIs. These include:

* Postman collections
* Software Development Kits (SDK)
* Interactive API explorers

#### Application and API Usage

Application and API usage analytics allow developers to understand the success of their applications.

#### Service Desk and Collaboration

Service desk and collaboration are the means to collect reviews, publish blogs, and interact with your developer community in a meaningful way.

### Open Banking APIs

Open banking APIs provide the means to achieve compliance with standards while integrating with your backend applications.

#### Open Data

Open data APIs provide freely available information to Third-Party Apps. In the context of open banking this includes information on topics such as:

* Branches
* ATMs
* Agents
* Products

Axway Open Banking provides the APIs required to be compliant with local market regulations.

#### Access to Account for Data

Access to Account for Data is one of the roles typically granted to Third-Party Developers by local market regulations and open banking frameworks. For example, in the EU this role is termed the Account
Information Servicing Provider (AISP).

In this role Third-Party Apps can access account data to which a customer has consented. Depending on local standards the types of information available can vary and can include:

* Payment accounts
* Savings accounts
* Loans and financing
* Taxation accounts

Axway Open Banking provides the APIs required to be compliant with local market regulations.

#### Access to Account for Payments

Access to Account for Payments is one of the roles typically granted to Third-Party Developers by local market regulations and open banking frameworks. For example, in the EU this role is termed the Payment Initiation Servicing Provider (PISP).

In this role Third-Party Apps can initiate payment on behalf of the customer dependent on properties of the payment they have consented to. Depending on local standards the types of payment available can vary and can include:

* Single immediate payments
* Scheduled payments
* Batch payments

Axway Open Banking provides the APIs required to be compliant with local market regulations.

#### Standards Compliance

Compliance with local standards is critical when building an open banking platform, especially where organizations face regulation and possible financial penalties if they are not compliant.

Axway Open Banking provides both the means to be compliant with current standards and support for future versions.

#### Bank Use Cases

Alongside the means to comply with open banking regulations and standards Axway Open Banking also offers organizations the means to exploit their investment by supporting other use cases.

Organizations can implement these use cases using the components described in the Infrastructure section below.

### Identity and Access Control

Identity and access control provide security, authentication and authorization through consent and compliance with security protocols defined by standards.

#### Lodging Intent

Lodging Intent is a pattern that appears in the majority of open banking standards. It is the means by which the consent that has been agreed between the customer and Third-Party App is sent to your organization so it can be confirmed and access to account granted. The term "intent" is used specifically because the customer has yet to authenticate themselves at the bank. Only when the customer has authenticated and "intent" has been confirmed does it become consent.

Axway Open Banking supports this through the implementation of APIs that meet the requirements of local standards.

#### Consent Confirmation

In order for Third-Party Apps to access the data or services to which a customer has consented that customer must confirm the consent is correct.

Axway Open Banking provides the means to do this through a number of web components that can be configured according to your organization's needs. The components render the requested consent and allows customers to indicate that it is correct.

As consent varies according to market Axway Open Banking will support the local requirements included aspects such as rendering of data clusters and wording appropriate to the local customer experience guidelines.

#### FAPI

The FAPI standards provide an OpenID Connect profile for financial services APIs. This standard has become the *de facto* standard for open banking standards and is currently used in the United Kingdom, Brazil, Australia, and the Financial Data Exchange (FDX) standards.

Axway Open Banking provides support for FAPI [Part 1 (Read Only)](https://openid.net/specs/openid-financial-api-part-1-ID2.html), [Part 2 (Advanced)](https://openid.net/specs/openid-financial-api-part-2-1_0.html) and [Client-Initiated Backchannel Authentication
(CIBA)](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html).

#### Consent Revocation

The need to lodge intent and confirm consent is matched by the need to
revoke consent where a customer no longer wants to share information
with a Third-Party App.

Axway Open Banking provides the means to revoke consent, both programatically by
an API call and through an user interface (UI).

Note that in some markets revocation is only allowed by the Third-Party
App and not directly at the bank. In such cases revocation by a UI can
be disabled dependent on your organization's position on market
regulations.

### Infrastructure

The Infrastructure building block brings together Axway's
product set to power the solution.

{{% alert title="Note" color="primary" %}} For more information on any of these products please refer to the [Axway Documentation Portal](https://docs.axway.com/).{{% /alert %}}

#### API Portal

The portal delivers the Developer Experience. Axway Open Banking provides a custom template that can applied to an existing Portal instance or installed from scratch.

#### API Gateway

The API Gateway provides access to and protection for your APIs using Axway's industry leading technology.

#### API Builder

To integrate with your backend the solution uses API Builder. This technology allows an application to be created that can map between the API specification defined by the standards and your existing sources of data.

On installation these applications will be mapped to our mock backend and will need to be reconfigured appropriately.

#### Consent Management

Our Consent Management solution is delivered using the [Cloudentity Open Banking Kit](https://cloudentity.com/open-banking/). This provides:

* The means to couple consent with the authentication, authorization and access control to ensure that Third-Party Applications can access only the information to which they are entitled, and nothing more.
* An overview for your customers that allows them to browse and revoke consents for Third-Party Applications.
* An administration view for your organization that allows you to search and manage your customers' consents.

Note that in some markets Consent Management must happen at the Third-Party App and consent dashboards are prohibited.

In such cases the customer-facing aspects of Consent Management can be disabled dependent on your organization's position on market regulations.

#### Identity Management

Identity Management adds the authentication, authorization and access control required to ensure your APIs are secure, including compliance with FAPI and local security profiles.

The Cloudentity Open Banking Kit provides the default capability, but this can be swapped out for your existing Identity and Access Management solution.

#### Analytics

A detailed view of developer interaction and API usage is vital to your success as an open banking platform.

Axway Open Banking provides detailed analytics through an ELK (Elasticsearch, Kibana and Logstash) implementation. This also powers the Metrics API, one of the mandatory APIs for organizations implementing Phase 1 of the Brazil Open Banking standards.

Customers are free to use their own analytics solutions and plug-in to the log streams provided by the solution.

#### Utilities

Utilities describes the features of the solution that are developed specifically to help with the open banking solution. Utilities include:

* *Demo Applications*: This incorporates both front- and backend applications that serve the Demo Application experience in the API Portal.
* *Mock Backends*: The solution provides mock backends for all the regulatory APIs. The Mock Backend applications are implemented using API Builder and MySQL.

Customers can use these components as they see fit and can swap them out for existing functionality or use source data they may have.