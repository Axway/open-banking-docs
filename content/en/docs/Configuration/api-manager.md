---
title: "API Manager configuration"
linkTitle: "API Manager"
weight: 2
date: 2021-09-02
---

Configure the Open Banking API Manager settings, clients and APIS, as well as the email templates. 

Axway Open Banking API Manager is based on the Axway API Manager product.Most features are documented in the [Axway API Manager documentation](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/index.html).

<!-- ## Settings

{{% alert title="Note" color="primary" %}}
This page is under development
{{% /alert %}} -->

## Email templates override

Emails are sent to API developers when they register, activate their account, or change their password.

![Welcome email](/Images/welcome-email.png)

You can customize the email templates used for developer notifications in the  `/opt/Axway/apigateway/system/conf/apiportal/email` folder of the apimngr pod.

## API Management

Upon solution deployment, several Open Banking APIs are deployed and published in the catalog.
You can use the admin interface to update the APIs.

![open banking apis](/Images/api-manager-apis.png)

These frontend API changes can be done directly on the published API.

* API logo
* API summary
* API documentation

You must unpublish the API before applying these frontend API changes.

* API name
* API tags
* API inbound configuration
* API outbound configuration
* API security configuration

Refer to the details in the [Axway API Manager documentation](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_virtualize_web/index.html) to manage API details.

## Client management

An administrator can use the API Manager interface to manage organizations, developers, and applications.

![client apps](/Images/api-manager-client-apps.png)

API Manager can be used to support the third-party provider (TPP) in changing their app status, getting access to specific APIs, to revoke some API access, and so on.

![client apps apis access](/Images/api-manager-client-apps-apis.png)

API Manager can be used to support TPP to check their OAuth configuration such as the client ID or redirect URLs.

![client apps auth](/Images/api-manager-client-apps-auth.png)
