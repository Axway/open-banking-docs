---
title: "Release Notes"
linkTitle: "Release Notes"
weight: 20
---

Amplify Open Banking updates are cumulative, comprising new features and changes delivered in previous updates unless specifically indicated otherwise in the Release notes.

## Upgrade existing deployment

Follow the [upgrade instructions](/docs/deployment/upgrade) to apply this update.

## Release v3.2.0

In this update we have upgraded FDX APIs to v5.2.1 and also added support for Consent, Customer and Recipient Registration v5.2.1 APIs.

In addition, we have added Phase4b APIs for Open Banking Brazil.

This update also includes migration to YAML Entity Store from existing XML based API Gateway configuration.

### New features and enhancements for v3.2.0

The following new features and enhancements are available in this update.

#### Upgrade of FDX APIs to v5.2.1

* Core and Tax APIs are upgraded to v5.2.1
* Consent, Customer and Recipient Registration APIs are added in this release. For updated FDX API list, see [FDX API List](/docs/reference/fdx/#list-of-fdx-apis-included-in-amplify-open-banking).

#### Open Finance Brazil updates

* Consent v2.2 beta1 support
* Phase 4B APIs support
* Payment Initiation V3 support
* Phase2 v2.0.1 and 2.1.0 APIs update

#### API Management changes

* API Gateway is upgraded to "May 2023 release(7.7-20230530)". For API Gateway release notes, see [API Gateway and API Manager 7.7 May 2023 Release Notes](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_relnotes/20230530_apimgr_relnotes/index.html).
* Migrated the API Gateway configuration from XML based FED to YAML Entity Store. For more information on YAML Entity store, see [YAML configuration](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_yamles/index.html).
* Added merge dir capabilities and Entity Store externalization. For more details on this topic, see [FDX API Management Configuration](/docs/deployment/installation/api-management/fdx-apim) for FDX and [Open Finance Brazil API Management Configuration](/docs/deployment/installation/api-management/obb-apim/) for Open Finance Brazil deployments.
* Some improvements to the Helm chart for the deployment of API Gateway, discovery and traceability agents.

API Gateway changes specific to Open Finance Brazil deployments:

* Removed dependancy from envSettings.props file moving to environment variables.
* Filebeat for backwards compatibility
    * Upgraded from version 7.9 to 8.10.4

API Manager changes specific to Open Finance Brazil deployments:

* Upgrade to the latest apimcli image 1.14.2
* Removed built in configuration files and adding them as customizable configmaps
* Removed deprecated APIs
* Removed KPS import as post-install step
* Introduced APIM Settings configurable via values.yaml

Added a new module KPS-Config for Open Finance Brazil deployments:

* Must be executed after APIM full instalation

#### Cloudentity Updates

This release includes the Cloudentity v2.19.0-1. This new version includes:

* initial support for Open Finance Consent Renewal specification new endpoints:
    * GET /open-banking/consents/v2/consents/{consentID}/extends
    * POST /open-banking/consents/v2/consents/{consentID}/extends
* Please note that for FDX deployments, Cloudentity v2.15.1-1 must be used.

For more information on Cloudentity changes, see [Cloudentity Release Notes](https://cloudentity.com/developers/deployment-and-operations/release-notes/).

## Release v3.1.0

Release notes for Amplify Open Banking v3.1.0. In this update, we have added support for Financial Data Exchange (FDX) APIs. These new APIs will allow customers in North America to deploy the Amplify Open Banking solution.

Axway API Gateway is upgraded to the  "Nov 2022 release(7.7-20221130)"  in the FDX deployment.

In addition, we have made a significant update and restructuring of our documentation to reflect these changes.

### New features and enhancements for v3.1.0

The following new features and enhancements are available in this update.

#### Support for FDX APIs

We have added support for FDX APIs Core, Moneymovement & Tax. For the full list of FDX API endpoints supported, see [FDX API List](/docs/reference/fdx/#list-of-fdx-apis-included-in-amplify-open-banking).

#### Addition of Amplify Marketplace

Developer Portal is now replaced with Marketplace for Open Banking. Open Banking APIs can be published in Amplify Marketplace.

#### Updates and Enhancements for Open Finance Brazil

This release includes the following updates and features to keep support of Open Finance Brazil specs:

* Upgrade of Axway API Gateway and Manager to February 2023 - including new security enhancements and features - [APIM Release Notes](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_relnotes/20230228_apimgr_relnotes/index.html).
* Update of Amplify Open Banking Authorization and Consent Management components to Cloudentity v2.11.0-2 - [Release Notes](https://cloudentity.com/developers/deployment-and-operations/release-notes/rsnotes-2.11.0/ )
* Update for Open Finance Brazil phase 4a APIs specs considering the new endpoints (capitalization v1.0.0-rc2.0, acquiring-services v1.0.0,Insurance 1.0.0-rc1.0,Investment v1.0.0, exchange v1.0.0,pension v1.0.0-rc1.0 ) - [Open Data](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17367790/Dados+Abertos).
* Mock backend APIs for Open Finance Brazil phase 2 v2 are updated to support the functional tests.
* Consent flow is updated to fix a bug of consent request date due to timezone configuration.

### Known Issues for v3.1.0

The following are known issues for this update.

#### External clients are not created in API Manager applications

External Client is not configured in the applications created during the installation of `open-banking-fdx-apim-config` helm chart. Use API Manager to add the external client configuration in existing applications.
