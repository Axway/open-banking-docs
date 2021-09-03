---
title: "Developer Portal"
linkTitle: "Developer Portal"
description: Configure and customize the Developer Portal
weight: 2
date: 2021-09-02
---

Axway Open Banking Developer Portal is based on Axway API Portal product

Most features are documented in the [Axway API Portal documentation](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apiportal_admin/apip_overview/index.html) 

## Administror interface

The portal adminstration interface is avaible on `https://<portal-address>/administrator` 
It allows multiple admin actions:

* general configuration
* template and style customization
* documentation creation and update

## Template cutomization

A specific Joomla template is deployed for the Open Banking solution. It can bee easily customized using.
Navigate to Extension > Templates > Styles to identify the style in use. For each style, you can:

* Create a new color theme using ThemeMagic
* Select the new theme and change the company logo in Theme tab 

Do this for the 2 styles in use: Default and Homepage styles.
For more customization details, refer to [Axway API Portal documentation](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apiportal_admin/apip_overview/index.html)

## Documentation creation and update

All API and user documentation are available from `https://<portal-address>/documentation/home` on the Developer Portal

Adminitrator can add new documentation or update existing on from Joomla administrator interface.
Navigate to Content > Articles and use New or Edit button to add or update an article. Each article will appear in the Documentation page if their category is set to 'Documentation'
