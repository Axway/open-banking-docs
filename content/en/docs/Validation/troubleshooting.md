---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
description: Find useful logs, enable debug options, connect to UIs to help you identify any error cause.
weight: 5
date: 2021-09-02
---

## Debug API traffic

{{% pageinfo %}}
This page is under development
{{% /pageinfo %}}


![api-gateway-manager-debug](/Images/api-gateway-manager-debug.png)
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-list.png)
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-execution-path.png)
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-requests.png)
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-trace.png)

## Policy list

{{% pageinfo %}}
This page is under development
{{% /pageinfo %}}

## API Gateway error trace

{{% pageinfo %}}
This page is under development
{{% /pageinfo %}}


![api-gateway-manager-debug](/Images/api-gateway-manager-trace.png)

## ACP logs

{{% pageinfo %}}
This page is under development
{{% /pageinfo %}}

## Portal errors

{{% pageinfo %}}
This page is under development
{{% /pageinfo %}}

![developer-portal-config-debug](/Images/developer-portal-config-debug.png)
![developer-portal-config-debug](/Images/developer-portal-config-error-reporting.png)

## Analytics search

Analytics dashbaord, reports, and metrics API should reflect every Open Banking API calls.

If you need to check correct Analytics integration, run couple API call tests and use Kibana interface to search for the corresponding events.

* Click on Kibana > Discover
* Optionnaly use filters , like app (name of the client app) or service (name of the API)
* Select the corresponding timerange
![analytics-search](/Images/analytics-search.png)
