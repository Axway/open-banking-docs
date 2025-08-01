---
title: "Open Banking 4.0.3 Release Notes"
linkTitle: "Open Banking 4.0.3"
weight: 12
date: 2025-07-31
---

This update contains several new features, enhancements, and performance improvements.

## New Features

* **Terms and Conditions Version Display** - The consent admin dashboard now displays the terms and conditions version information.  
  This provides administrators with improved visibility into the terms and conditions version the customer authorized.

* **FDX Fraud API** - A new API endpoint is available for consumers to notify data providers of suspected fraud incidents.  
  This enhancement supports fraud prevention and compliance requirements in FDX implementations.

* **External Custom Login Redirection** - The authorization server now supports custom login page redirection.  
  This allows you to set up the authorization server to redirect customers to data provider's custom login page. This feature is particularly useful when there is no OIDC/SAML compatible Identity Provider available to connect with.