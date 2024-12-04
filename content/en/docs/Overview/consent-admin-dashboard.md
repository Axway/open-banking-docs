---
title: "Consent Admin Dashboard"
linkTitle: "Consent Admin Dashboard"
weight: 11
date: 2024-11-06
---

The Consent Admin Dashboard allows banks' back-office users to view and/or manage the consents of the customers initiated through the open banking channel. Features and options available within this application depend on the back-office user access level, which can be one of two types:

* **View Access**: Allows the user to view data only.
* **Admin Access**: Enables the user to view and modify data.

## Dashboard Overview

The dashboard displays all consent-related data in a table format, supporting features such as filtering and search. Users can filter the data by Status, Consent Type, and Owner, and perform a search by Consent ID at the top of the table.
![alt text](/Images/consent-admin/image-1.png)

## Features and Options

### Filter Options

* Users can filter the table data based on Status, Consent Type, and Owner.
* Multiple filters can be applied simultaneously.
* A **Reset** button is provided to restore filters to their default settings.
  ![alt text](/Images/consent-admin/image-2.png)

### Export Data

* The dashboard allows users to export selected consent data by selecting specific rows using checkboxes, and then generating the export files of the chosen data.
  ![alt text](/Images/consent-admin/image-3.png)

### Search by Consent ID

* Users can perform searches by entering unique Consent IDs, which narrow down the results to specific consent items.
  ![alt text](/Images/consent-admin/image-4.png)

### Modifying Consent Status

* Users with Admin Access can modify the status of certain consents. By clicking on the ellipsis icon (three dots) in each row, a menu with possible status actions is presented:
    * For "On Hold" status, users can change them to **Revoked**, **Active**.
    * For "Active" status, users can change them to **Revoked**, **On Hold**.
      ![alt text](/Images/consent-admin/image-5.png)
    * "Initiated," "Revoked," "Expired," or "Consumed" consent statuses can not be edited.
      ![alt text](/Images/consent-admin/image-6.png)

### Viewing Consent Details

* Users can view detailed consent information by clicking on rows in the table or selecting the **View** option from the ellipsis menu.
* The details page shows comprehensive information that may not be visible in the table view and allows users with appropriate access to change eligible statuses where applicable.

This Details page provides a comprehensive view and control panel for managing consent data based on user access levels.
![alt text](/Images/consent-admin/image-7.png)
