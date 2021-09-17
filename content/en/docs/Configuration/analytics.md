---
title: "Analytics"
linkTitle: "Analytics"
description: Configure and customize the Analytics for Axway Open Banking
weight: 6
date: 2021-09-02
---

Axway Open Banking Analytics is based on :

* ElasticSearch + Logstash + Kibana (ELK) stack for the Dashboard, reports and data collection and processing
* Axway API Builder for the Metrics API.

All generic features of this two products are documented in the [Axway API Builder documentation](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder.html) and [Elastic Stack and Product Documentation](https://www.elastic.co/guide/index.html) 

## Admin interface

The admin interface is available on `https://kibana.<domain-name>`
You can login with the administrator account using user and password provided in `open-banking-analytics\values.yaml`

```yaml
elastic:
   user: "elastic"
   password: "**********"
```

From this interface, you can administer the complete ELK stack : dashboards, searches, logs, security, etc.
![apim-policy-studio-certificates](/Images/analytics-homepage.png)

## Dashboard design

You can customize and add dahsboard from the admin interface.
Select the menu Kibana > Dashboard and see the list of existing dashboards:

![apim-policy-studio-certificates](/Images/analytics-dashboards-list.png)

Click on the title to view them. Click on the edit button to customize them.
You can also add your own dashboards.

## Troubleshooting

Refer to [Troubleshooting > Analytics](/docs/validation/troubleshooting#analytics)