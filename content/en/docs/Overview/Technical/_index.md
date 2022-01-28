---
title: "Technical Architecture"
linkTitle: "Technical"
weight: 3
date: 2021-06-30
description: A Technical View of Axway Open Banking
---

Axway Open Banking is designed with flexibility in mind. It therefore has been engineered with as few constraints as possible in terms of deployment approach.

Customers can choose to install the solution either on-premise or in the cloud because the solution is built according a vanilla Kubernetes. This allows customers to make a choice about their target Kubernetes distribution and additional components.

{{% alert title="Note" color="primary" %}} There are required features and security constraints that customers must adhere to. For example, some ingress controllers cannot meet our requirements.{{% /alert %}}

## Considerations

The following should be noted when reading the Technical Architecture pages:

* This describes a standard deployment that is the starting point for all installations on a customer's infrastructure.
* The architecture described is production ready and designed to be highly-available.
* This architecture can be adapted based on customer requirements, for example:
    * Replacing the nginx ingress controller with an alternative
    * Using their choice of monitoring tools
* Customers will make their own choice of database-hosting based on what best suits their requirements. For additional information refer to [Google's considerations for databases on Kubernetes](https://cloud.google.com/blog/products/databases/to-run-or-not-to-run-a-database-on-kubernetes-what-to-consider).