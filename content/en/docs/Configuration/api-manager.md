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

## Email template override

You can customize the email templates used for developer notifications in `/opt/Axway/apigateway/system/conf/apiportal/email` folder of the apimngr pod.

## Client management

Admin can use the API Manager interface to manage organization, developers and applications.
This would be required to support TPP in getting access to the API testing, to revoke some API access, etc.

## API Management

Upon solution deployment, several Open Banking APIs are deployed and publish in the catalog.
You can us the admin interface to update them:
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