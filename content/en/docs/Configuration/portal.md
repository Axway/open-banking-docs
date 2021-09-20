---
title: "Developer Portal"
linkTitle: "Developer Portal"
description: Configure and customize the Developer Portal
weight: 3
date: 2021-09-02
---

Axway Open Banking Developer Portal is based on Axway API Portal product

Most features are documented in the [Axway API Portal documentation](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apiportal_admin/apip_overview/index.html) 

## Administror interface

The portal adminstration interface is available on `https://developer-portal.<domain-name>/administrator`
It allows multiple admin actions:

* general configuration
* template and style customization
* documentation creation and update

## Template customization

A specific Joomla template is deployed for the Open Banking solution. It can bee easily customized using.
Navigate to Extension > Templates > Styles to identify the style in use. For each style, you can:

* Create a new color and font theme using ThemeMagic
![thememagic](/Images/developer-portal-thememagic.png)

* Select the new theme and change the company name and logo in Theme tab
![thememagic](/Images/developer-portal-style-edit.png)

Do this for the 2 styles in use: _Default_ and _Homepage_ styles.

For more customization details, refer to [Customize API Portal look and feel](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apiportal_admin/customize_getting_started/index.html)

## Menu customization

The menu and navigation has been optimized for the best developer experience in Open Banking context.

However you can customize the menu : item order, title, access, language, etc.

Navigate to Menu > Main Menu
![thememagic](/Images/developer-portal-menu-edit.png)
From here, you can :

* reorder menu items (drag and drop lines)
* edit existing menu (simply click on the title)
    * You can edit _API Catalog_ to change Swagger options, SDK download options, tags filters, try-it access, etc.
    * You can edit _Applications_ to change create/delete options, credential access, scope access and tags filters
* create new menu items (click the _New_ button)
  
## Documentation creation and update

All API and user documentation are available from `https://developer-portal.<domain-name>/documentation/home` on the Developer Portal

Adminitrator can add new documentation or update existing on from Joomla administrator interface.

Navigate to Content > Articles and use New or Edit button to add or update an article. Each article will appear in the Documentation page if their category is set to 'Documentation'

## Troubleshooting

Refer to [Troubleshooting > API Portal](/docs/validation/troubleshooting#portal-errors)