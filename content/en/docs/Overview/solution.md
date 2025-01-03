---
title: "Solution overview"
linkTitle: "Solution overview"
weight: 1
date: 2021-06-22
---

Amplify Open Banking is built on top of five solution building blocks as shown below.

![Solution Building Blocks](/Images/Solution-Building-Blocks.svg)

To clarify the purpose of each building block:

* **Developer Experience** is all about **engagement**. Giving developers what they need, when they need it is critical by putting the tools in their hands that will make their applications a success. Amplify Marketplace delivers a set of features to productize APIs in a storefront where APIs are published as products that are discoverable and available for both internal and external consumption.
* The rationale for **Open Banking APIs** is twofold:
    * Your organization needs to achieve **compliance** with local standards by providing the APIs dictated by open banking regulations.
    * You want to **take advantage of demand in the market** by exposing open APIs that provide data or services that make your organization unique and therefore attractive to consumers of those services.
* **Identity and Access Control** are vital to ensuring the **security** of your APIs. This includes ensuring that access is granted to Data Recipient Apps only when a customer has given consent and that consent has been confirmed.
* Naturally the solution needs to be delivered via the appropriate **Infrastructure**. Axway's API Management solution provides the means to deliver this on robust, proven technology.
* The final piece of the puzzle is what your organization brings; namely the **Core Banking Applications** that provide capabilities that the open APIs you provide are based on.

Each building block is critical to the success of your open banking platform and each building block provides a number of features. The features are based on the capabilities that the solution delivers and are summarized as shown below.

![Solution Overview](/Images/Solution-Overview.svg)

<!-- ## Components Overview
![Components Overview](/Images/component-overview-nextgen.png) -->

## Features

The features of the solution are further clarified in the following
sections.

### Developer experience

Developer experience is about engagement and productization of APIs. A storefront experience enables closer engagement with internal and external consumers.

#### API product catalog and documentation

We provide a comprehensive, pre-built catalog of the API Products available in the solution that is tailored based on the open banking specifications used in the region.

#### Developer and organization onboarding

Developer and Organization Onboarding is the ability to seamlessly onboard a developer or their organization.

#### Usage plans and subscriptions

Subscriptions are free or paid consumption options to access certain API from resources in products to help provide business case solutions. Consumers browse products, but must subscribe, request access, and be approved before products can be consumed with an application.

#### Application and credential management

Application and Credential Management is the means by which developers can create an application against which credentials to access the open banking APIs can be registered. Credential creation includes an x.509 public certificate to facilitate Mutual Authentication as implemented in the [Financial-grade API (FAPI) standards.](https://openid.net/wg/fapi/)

#### Development tools

Development Tools are the affordances offered to developers to aid them in their task of building applications that consume your organization's APIs. These include:

* Postman collections
* Interactive API explorers

#### Subscription, application and API usage

Consumer insights provides API Consumers with secure, self-service access to actionable insights regarding their usage of the APIs from the Marketplace. Application and API usage analytics allow developers to understand the success of their applications.

#### Support

The goal of the product support contact is to give the subscriber a way to contact the product provider for any kind of assistance.
The support contact is composed of a name, email, phone number associated with office hours and alternative support methods, including: Website URL, Slack channel, or MS Teams channel.

### Open banking APIs

Open banking APIs provide the means to achieve compliance with standards while integrating with your backend applications.

#### Open data

Open data APIs provide freely available information to Data Recipient Apps. In the context of open banking this includes information on topics such as:

* Branches
* ATMs
* Agents
* Products

Amplify Open Banking provides the APIs required to be compliant with local market regulations.

#### Access to account for data

Access to Account for Data is one of the roles typically granted to Data Recipient Developers by local market regulations and open banking frameworks.

In this role Data Recipient Apps can access account data to which a customer has consented. Depending on local standards the types of information available can vary and can include:

* Payment accounts
* Savings accounts
* Loans and financing
* Taxation accounts

Amplify Open Banking provides the APIs required to be compliant with local market regulations.

#### Access to account for payments

Access to Account for Payments is one of the roles typically granted to Data Recipient Developers by local market regulations and open banking frameworks.

In this role Data Recipient Apps can initiate payment on behalf of the customer dependent on properties of the payment they have consented to. Depending on local standards the types of payment available can vary and can include:

* Single immediate payments
* Scheduled payments
* Batch payments

Amplify Open Banking provides the APIs required to be compliant with local market regulations.

#### Standards compliance

Compliance with local standards is critical when building an open banking platform, especially where organizations face regulation and possible financial penalties if they are not compliant.

Amplify Open Banking provides both the means to be compliant with current standards and support for future versions.

#### Bank use cases

Alongside the means to comply with open banking regulations and standards Amplify Open Banking also offers organizations the means to exploit their investment by supporting other use cases.

Organizations can implement these use cases using the components described in the Infrastructure section below.

### Identity and access control

Identity and access control provide security, authentication and authorization through consent and compliance with security protocols defined by standards.

#### Lodging intent

Lodging Intent is a pattern that appears in the majority of open banking standards. It is the means by which the consent that has been agreed between the customer and Data Recipient App is sent to your organization so it can be confirmed and access to the account granted. The term "intent" is used specifically because the customer has yet to authenticate themselves at the bank. Only when the customer has authenticated and "intent" has been confirmed does it become consent.

Amplify Open Banking supports intent through the implementation of APIs that meet the requirements of local standards.

#### Consent confirmation

In order for Data Recipient Apps to access the data or services to which a customer has consented that customer must confirm the consent is correct.

Amplify Open Banking provides the means to do this through a number of web components that can be configured according to your organization's needs. The components render the requested consent and allows customers to indicate that it is correct.

As consent varies according to market Amplify Open Banking will support the local requirements included aspects such as rendering of data clusters and wording appropriate to the local customer experience guidelines.

#### Financial-grade API (FAPI)

The FAPI standards provide an OpenID Connect profile for financial services APIs. This standard has become the *de facto* standard for open banking standards and is currently used in the United Kingdom, Brazil, Australia, and the Financial Data Exchange (FDX) standards.

Amplify Open Banking provides support for FAPI [Part 1 (Read Only)](https://openid.net/specs/openid-financial-api-part-1-ID2.html), [Part 2 (Advanced)](https://openid.net/specs/openid-financial-api-part-2-1_0.html) and [Client-Initiated Backchannel Authentication
(CIBA)](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html).

#### Consent revocation

The need to lodge intent and confirm consent is matched by the need to revoke consent where a customer no longer wants to share information
with a Data Recipient App.

Amplify Open Banking provides the means to revoke consent, both programmatically by an API call and through a user interface (UI).

Note that in some markets revocation is only allowed by the Data Recipient App and not directly at the bank. In such cases revocation by a UI can
be disabled dependent on your organization's position on market regulations.

### Infrastructure

The Infrastructure building block brings together Axway's product set to power the solution.

#### Amplify Integration

The Amplify Integration provides access to and protection for your APIs using Axway's industry-leading technology. Amplify Integration is a low-code or no-code integration platform that solves simple to complex enterprise integration use cases and patterns. ​Primary use cases​ are application integration, data integration, and API-fication (getting apps to talk to each other via application programming interfaces).

{{% alert title="Note" color="primary" %}} For more information on Amplify Integration refer to the [Axway Documentation Portal](https://docs.axway.com/bundle/amplify_integration/page/amplify_integration_guide.html).{{% /alert %}}

#### Consent management

Our Consent Management solution is built on top of Amplify Integration. This provides:

* The means to couple consent with the authentication, authorization, and access control to ensure that Data Recipient Applications can access only the information to which they are entitled, and nothing more.
* An administration view for your organization that allows you to search and manage your customers' consents.
* An overview for your customers that allows them to browse and revoke consents for Data Recipient Applications.

Note that in some markets Consent Management must happen at the Data Recipient App and consent dashboards are prohibited.

In such cases the customer-facing aspects of Consent Management can be disabled depending on your organization's position on market regulations.

#### Identity management

Identity Management adds the authentication, authorization, and access control required to ensure your APIs are secure, including compliance with FAPI and local security profiles.
