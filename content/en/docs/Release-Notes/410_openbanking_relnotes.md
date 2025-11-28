---
title: "Open Banking 4.1.0 Release Notes"
linkTitle: "Open Banking 4.1.0"
weight: 12
date: 2025-11-28
---

This update contains several new features and enhancements.

## Consent management update

* A new endpoint is added in consent management API (Participant Resource Admin API) to revoke all consents for a given user. 
* Consent management now allow you to add account nickname in consnet data. This functionality is provided by External Resource Authentication API.
* Resouce owner information is now available in consent admin dashboard, consent details page.

## Authorization Server update

* The authorization server now supports JWE token issued by Identity Provider. JWE token is decrypted by authorization server and token claims are made available to consent grant app via signature info object in consent.
