---
title: "Infrastructure View"
linkTitle: "Infrastructure"
weight: 1
date: 2021-06-30
description: An Infrastructure View of Axway Open Banking
---

The diagram below shows the an outline infrastructure view of Axway Open Banking.

![Infrastructure View](/Images/Infrastructure_View.jpg)

Axway recommends the following:

* The solution should be deployed across multiple availability zones.
* Whilst the majority of cloud providers offer 3 availability zones the majority of customers deploy across 2 zones. This is generally considered sufficient for customer needs.
* At a minimum there should be a node per zone, but it is recommended to implement more than one. Machines should be evenly distributed across zones.

### Kubernetes Configuration

#### Resources

Each node in the Kubernetes environment requires:

* 23 virtual CPUs.
* 70 Gb RAM.

Axway also recommends the use of Node Groups. These allow operators to group resource based on the node type based on characteristics such as machine resource, capabilities or the type of virtual machine. Taking this approach can reduce costs, increase performance and allow specific type of machines to be managed discretely.

The Kubernetes configuration must include three Node Groups:

* Application: Hosts all Axway Open Banking components:
  * Some components will have an Horizontal Pod Autoscaler to support the peak load (Axway recommends configuring a node autoscaler).
  * Most components - particularly API Gateway - require low latency.
* Transversal: Hosts non-application components such as monitoring tools and infrastructure components such as the Certificate Manager and external DNS. This group can be configured without a node autoscaler.
* Database: Hosts all stateful applications.

An affinity node is used on each component to deploy them on the appropriate nodes.

In cases where a customer deploys all their database within the Kubernetes cluster Axway recommands dedicating Cassandra pods to nodes on a one-to-one basis.

> The configuration of master nodes is out-of-scope of this page.

#### Subnets

A complete architecture requires a minimum of 3 subnets:

* Bastion: Required for operators to connect from a Baston host (although this can be substituted for an alternative solution). Access to pods on all required ports must be allowed. A subnet mask of /32 is considered sufficient.
* Kubernetes: The design of this subnet can vary based on a number of conditions:
  * This subnet must have access to both the customer backend services and the database subnet.
  * If CNI is activated, enough IP address must be allocated for nodes and the maximum number of pods in the platform. Axway Open Banking generates between 100 and 120 objects that consume an IP address.
  * A subnet mask /24 is therefore recommended to support scaling, upgrade and others tools for production.
* Database: For databases provided inside the Kubernetes cluster. A subnet mask of /29 is recommended.

Each subnet must be protected by a firewall implemented at Layer 4 of the OSI model with open routes kept to a bare minium. The recommended rules are as follows:

{{% pageinfo %}}
This section is under development
{{% /pageinfo %}}