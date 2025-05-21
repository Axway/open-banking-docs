---
title: "Open Banking 4.0.1 Release Notes"
linkTitle: "Open Banking 4.0.1"
weight: 12
date: 2025-05-21
---

This update contains several new features, enhancements, and performance improvements.

## Consent Management updates

* A new feature has been added to store the **signature token**.  
  When a user initiates a request from the consent grant app to fetch resource authentication details via the External Resource Authentication API, the response now includes the signature information. This supports secure and traceable consent transactions.

* Added support to store the **`termsAndConditionVersion`** in the consent metadata via consent grant app.  
  This ensures accurate version tracking of the terms and conditions accepted during the consent process.

* **Authorization timestamp** has been added to the consent admin dashboard.  
  This provides administrators with improved visibility into the timing of consent authorizations.

* Timestamps have been **re-arranged in the consent admin dashboard** to improve the user interface and readability.

## Performance updates

* **All services have been optimized** to enhance performance and system responsiveness.

* **FDX Core API flows** have been further optimized to improve processing speed and efficiency.

* Additional **integration cleanups and flow optimizations** were implemented to streamline system operations.
