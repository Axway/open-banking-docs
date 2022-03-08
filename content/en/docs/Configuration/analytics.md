---
title: "Analytics"
linkTitle: "Analytics"
weight: 5
date: 2021-09-02
---

Configure and customize the Analytics for Axway Open Banking.

Axway Open Banking Analytics is based on:

* **ELK** (ElasticSearch + Logstash + Kibana ) stack for the Dashboards, reports, and data collection and processing.
    * logstash: listening to api calls events (coming from filebeat), pushes data to elastic.
    * elasticsearch: data storage for the api calls.
    * kibana: configuation of visualizations and dashboards.
* Axway **API Builder** for the Metrics API: Exposing APIs to query data from elasticsearch.
* a nodeJs **webserver** to expose both dashboard and reports from a customizable web interface.

Refer to the [Axway API Builder documentation](https://docs.axway.com/bundle/api-builder/page/docs/index.html) and [Elastic Stack and Product Documentation](https://www.elastic.co/guide/index.html) for details on these product's generic features.

## Admin interface

The admin interface is available on `https://kibana.<domain-name>`
You can login with the administrator account using user and password provided in `open-banking-analytics/values.yaml`

```yaml
elastic:
   user: "elastic"
   password: "**********"
```

From the Kibana interface, you can administer the complete ELK stack including dashboards, searches, logs, security, and so on.

![apim-policy-studio-certificates](/Images/analytics-homepage.png)

## Dashboard design

You can customize and add dashboards from the admin interface.
Select the menu Kibana - Dashboard to see the list of existing dashboards.

![apim-policy-studio-certificates](/Images/analytics-dashboards-list.png)

You can do the following from the admin interface:

* Click the title to view a dashboard.
* Click the edit button to customize a dashboard.
* Click **Create Dashboard** to create a new dashboard.

## Troubleshooting

Refer to [Troubleshooting > Analytics](/docs/validation/troubleshooting#analytics)