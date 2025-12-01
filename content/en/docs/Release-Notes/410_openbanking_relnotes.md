---
title: "Open Banking 4.1.0 Release Notes"
linkTitle: "Open Banking 4.1.0"
weight: 12
date: 2025-11-28
---

This update contains several new features and enhancements.

## Consent Management update

* A new endpoint is added in Consent Management API (Participant Resource Admin API) to revoke all consents for a given user.
* Consent Management now allows you to add account nickname in consent data. This functionality is provided by External Resource Authentication API.
* Resource owner information is now available in Consent Admin Dashboard, consent details page.

## Authorization Server update

* The Authorization Server now supports JWE token issued by Identity Provider. JWE token is decrypted by Authorization Server and token claims are made available to consent grant app via signature info object in consent.
