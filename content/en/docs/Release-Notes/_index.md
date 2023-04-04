---
title: "Release Notes"
linkTitle: "Release Notes"
weight: 20
---

Amplify Open Banking updates are cumulative, comprising new features and changes delivered in previous updates unless specifically indicated otherwise in the Release notes.

## Release v3.1.0
Release notes for Amplify Open Banking v3.1.0. In this update, we have added support for Financial Data Exchange (FDX) APIs. These new APIs will allow customers in North America to deploy the Amplify Open Banking solution.

Axway API Gateway is upgraded to the  "Nov 2022 release(7.7-20221130)"  in the FDX deployment.

In addition, we have made a significant update and restructuring of our documentation to reflect these changes.

### Upgrade existing deployment

Follow the [upgrade instructions](/docs/deployment/upgrade) to apply this update.

### New features and enhancements

The following new features and enhancements are available in this update.

#### Support for FDX APIs

We have added support for FDX APIs Core, Moneymovement & Tax. For the full list of FDX API endpoints supported, see [FDX API List](/docs/reference/fdx/#list-of-fdx-apis-included-in-amplify-open-banking). 

#### Addition of Amplify Marketplace

Developer Portal is now replaced with Marketplace for Open Banking. Open Banking APIs can be published in Amplify Marketplace.

#### Updates and Enhancements for Open Finance Brazil

This release includes the following updates and features to keep support of Open Finance Brazil specs:
* Upgrade of Axway API Gateway and Manager to February 2023 - including new security enhancements and features - APIM Release notes - (https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_relnotes/20230228_apimgr_relnotes/index.html).
* Update of Amplify Open Banking Authorization and Consent Management components to ACP v2.11.0-2 (https://cloudentity.com/developers/deployment-and-operations/release-notes/rsnotes-2.11.0/ )
* Update for Open Finance Brazil phase 4a APIs specs considering the new endpoints (capitalization v1.0.0-rc2.0, acquiring-services v1.0.0,Insurance 1.0.0-rc1.0,Investiment v1.0.0, exchange v1.0.0,pension v1.0.0-rc1.0 ) (https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17367790/Dados+Abertos).
* Mock backend APIs for Open Finance Brazil phase 2 v2 are updated to support the functional tests.
* Consent flow is updated to fix a bug of consent request date due to timezone configuration.

### Known Issues

The following are known issues for this update.

#### External clients are not created in API Manager applications

External Client is not configured in the applications created during the installation of `open-banking-fdx-apim-config` helm chart. Use API Manager to add the external client configuration in existing applications.