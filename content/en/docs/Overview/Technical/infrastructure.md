---
title: "Infrastructure View"
linkTitle: "Infrastructure"
weight: 2
date: 2021-06-30
description: An Infrastructure View of Axway Open Banking
---

The diagram below shows an outline infrastructure view of Axway Open Banking.

![Infrastructure View](/Images/Infrastructure_View.jpg)

Axway recommends the following:

* The solution should be deployed across multiple availability zones.
* While the majority of cloud providers offer 3 availability zones the majority of customers deploy across 2 zones. This is generally considered sufficient for customer needs.
* At a minimum there should be a node per zone, but it is recommended to implement more than one. Machines should be evenly distributed across zones.

 Refer to [Deployment - Prerequisites](/docs/deployment/prerequisites) for more details.
