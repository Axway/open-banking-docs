---
title: "API Manager configuration"
linkTitle: "API Manager"
description: Configure the Open Banking API Manager settings, clients and APIS, as well as the email templates.
weight: 2
date: 2021-09-02
---

Axway Open Banking API Manager is based on Axway API Manager product

Most features are documented in the [Axway API Manager documentation](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/index.html) 

<!-- ## Settings

{{% pageinfo %}}
This page is under development
{{% /pageinfo %}} -->

## Email templates override

Emails are sent to API developpers when they register, activate their account, or change password.
![Welcome email](/Images/welcome-email.png)
You can customize the email templates used for developer notifications in `/opt/Axway/apigateway/system/conf/apiportal/email` folder of the apimngr pod.

## API Management

Upon solution deployment, several Open Banking APIs are deployed and publish in the catalog.
You can us the admin interface to update them:

![open banking apis](/Images/api-manager-apis.png)

These frontend API changes can be done directly on published API:

* change API logo
* change API summary
* change API documentation

These Frontend API changes can be done only by unpublishing the API first:

* change API name
* change API tags
* change API inbound configuration
* change API outbound configuration
* change API security configuration

See here how to manage APIs details in [Axway API Manager documentation](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_virtualize_web/index.html)

## Client management

Admin can use the API Manager interface to manage organization, developers and applications.

![client apps](/Images/api-manager-client-apps.png)

This is can be used to support TPP in changing their app status, getting access to specic APIs, to revoke some API access, etc.

![client apps apis access](/Images/api-manager-client-apps-apis.png)

This is can be used to support TPP in check their OAuth confguration such as the client ID or the redirect URLs.

![client apps auth](/Images/api-manager-client-apps-auth.png)
