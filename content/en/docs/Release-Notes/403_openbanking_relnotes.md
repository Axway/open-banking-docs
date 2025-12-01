---
title: "Open Banking 4.0.3 Release Notes"
linkTitle: "Open Banking 4.0.3"
weight: 12
date: 2025-07-31
---

This update contains several new features and enhancements.

## Consent Management update

* The Consent Admin Dashboard now displays the **terms and conditions version** information.  
  This provides administrators with improved visibility into the terms and conditions version the customer authorized.

## API update

* A new **FDX Fraud API** endpoint is available for consumers to notify data providers of suspected fraud incidents.  
  This supports fraud prevention and compliance requirements in FDX implementations.

## Authorization Server update

* The Authorization Server now supports **external custom login page redirection**.  
  This allows you to set up the Authorization Server to redirect customers to data provider's custom login page. This feature is particularly useful when there is no OIDC/SAML compatible Identity Provider available to connect with.
