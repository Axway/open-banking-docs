---
title: "Release Notes"
linkTitle: "Release Notes"
weight: 20
---

Amplify Open Banking updates are cumulative, comprising new features and changes delivered in previous updates unless specifically indicated otherwise in the Release notes.

## Release v3.1.0
Release notes for Amplify Open Banking v3.1.0. In this update, we have added support for Financial Data Exchange (FDX) APIs. These new APIs will allow customers in North America to deploy the Amplify Open Banking solution.

We have also updated underlying API Gateway solution to the latest version.

In addition, we have made a significant update and restructuring of our documentation to reflect these changes.

### Upgrade existing deployment

Follow the [upgrade instructions](/docs/deployment/upgrade) to apply this update.

### New features and enhancements

The following new features and enhancements are available in this update.

#### Support for FDX APIs

We have added support for FDX APIs Core, Moneymovement & Tax. For the full list of FDX API endpoints supported, see [FDX API List](/docs/reference/fdx/#list-of-fdx-apis-included-in-amplify-open-banking). 

#### Updates and Enhancements for Open Finance Brazil

This release includes the following updates and features to keep support of Open Finance Brazil specs:
* Upgrade of Axway API Manager February 2023 - including new security enhancements and features - APIM Release notes - (https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_relnotes/20230228_apimgr_relnotes/index.html).
* Update of Axway Openbanking Authorization and Consent Management components to ACP v2.11.0-2 (https://cloudentity.com/developers/deployment-and-operations/release-notes/rsnotes-2.11.0/ )
* Update for OBB phase 4a APIs specs considering the new endpoints (capitalization v1.0.0-rc2.0, acquiring-services v1.0.0,Insurance 1.0.0-rc1.0,Investiment v1.0.0, exchange v1.0.0,pension v1.0.0-rc1.0 ) (https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17367790/Dados+Abertos).
* Update on mock backend apis for OBB phase 2 v2 APIs to support the functional tests.
* Update on consent flow to fix a bug of consent request date due to timezone configuration.

### Important Changes

It is important, especially when upgrading from an earlier version, to be aware of the following changes in the behavior or operation of the product in this update, which may impact your current installation.

#### Developer Portal

This new release does not include the Developer Portal component. 


### Known Issues

The following are known issues for this update.

#### External clients are not created in API Mamanger applications

During installation of `open-banking-fdx-apim-config` helm chart, some applciaitons are created but in these applications external client is not configured. We are working on the fix of this functionality, to be released in a future update of Amplify Open Banking. As a workaround you need to log in to API Manager and add the external client configuration in existing applications.