---
title: "Cloud Components"
linkTitle: "Cloud Components"
description: Guidance on Cloud Component Types and Terminology
weight: 1
date: 2021-06-30
---

{{% pageinfo %}}
This page is under development
{{% /pageinfo %}}

Axway Open Banking has been developed on Kubernetes with a "button-click" style deployment that allows customers to use the Kubernetes solution of their choice.

This page provides additional information for customers who are targeting a cloud-based solution and require guidance on the components required from their cloud provider of choice, including:

* A generic list of components that are required.
* The sizing information for instances that will 
* Examples of those components on Amazon Web Services (AWS).

This page does not provide:

* Recommendations on cloud providers.
* Pricing for specific cloud provider components.

This document should be read in conjunction with the [deployment guide](/docs/deployment), which provides context on the specifics of the solution and the requirements for running our solution.

## Components

### Managed Kubernetes Environments

Managed Kubernetes environments are commonly available across cloud providers. For example:

* [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks)
* [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-gb/services/kubernetes-service)
* [Google Kubernetes Engine (GKS)](https://cloud.google.com/kubernetes-engine)

Such products are very convenient for the deployment and management of Kubernetes environments and can be configured using tools such as Terraform. However, they are not an end-to-end solution in terms of cost and choice of underlying components.

Each of these products incorporate other cloud provider solution that are leveraged - and charged for - to provide a fully-functioning environment but with specific limitations.

#### Example

EKS is available as a standalone service from AWS. Using the service is [charged at an hourly rate](https://aws.amazon.com/eks/pricing/).

### Compute

The Kubernetes cluster will require provisioning with sufficient computational resources in order to function. Typically clusters are sized on the basis of total limited capacity i.e. enough to run all components with the headroom to scale.

Cloud providers offer a multitude of options based on number of cores, amount of memory and assign disk.

#### Example

In the [deployment guide](/docs/deployment) the following guidelines are provided for installation of the proof-of-concept:

* 23 virtual CPUs.
* 70 Gb memory.
* Minimum of 2 nodes (in the context of Kubernetes, a [Node](https://kubernetes.io/docs/concepts/architecture/nodes/) is a virtual or physical machine onto which Pods - and the containers therein - are placed).

AWS provides a number of [instance types](https://aws.amazon.com/ec2/instance-types/). These requirements could be fulfilled by provisioning - for example - 3 "T" nodes on EKS in the "2 x large" category e.g. `t3.2xlarge`. These nodes provide a baseline level of CPU performance that allow for "bursts" when required.

These provide 8 CPUs and 32 Gb of memory giving a total capacity of 24 CPUs and 96 Gb of memory.

> In the production deployment of the OBA additional nodes will be required in order to segregate workloads. Please refer to the [deployment guide](/docs/deployment) for more details.

### Ingress Controller

An Ingress Controller is a Kubernetes component that manages external access to the cluster.

Axway uses the [NGINX](https://github.com/kubernetes/ingress-nginx/blob/master/README.md) Ingress Controller in the proof-of-concept solution.

However, customers may wish to use a Controller that is provided by their cloud provider.

#### Example

AWS provides an [Ingress Controller](https://github.com/kubernetes-sigs/aws-load-balancer-controller#readme) that provisions an Application Load Balancer.

This component provides additional functionality in that traffic is load balanced both across instances and across availability zones, whilst still meeting the needs of the Ingress Controller from a Kubernetes perspective.

> Note that in the context of our solution the Ingress Controller must be capable of terminating mutally-authenticated TLS connections. This is why the Axway Open Banking solution implements the NGINX Ingress Controller.

### DNS Services

Open banking solutions are naturally exposed to Internet traffic and therefore require DNS services such as lookup.

#### Example

AWS provides [Route 53](https://aws.amazon.com/route53/) which autoscales to handle internet traffic.

## Considerations

When using cloud-based infrastructure there are a number of considerations to be made that cannot be built into a sizing model for Axway Open Banking, which are listed in the following sections.

### External Services

Axway Open Banking bundles a number of components that can also be provided by cloud providers as managed services external to the Kubernetes cluster.

For example, MySQL is provisioned our Helm-based deployment but this could equally be configured to reference a provider-managed instance provisioned outside of Helm.

Customers should consider their target topology, scaling requirements and database management approach in light of this and whether using a provider-managed solution like [Amazon RDS](https://aws.amazon.com/rds/) is an appropriate solution for them.

### "Reserved" Instances

"Reserved" instances are a [feature](https://aws.amazon.com/ec2/pricing/reserved-instances/) of AWS that are conceptually common across cloud providers. They provide the ability to "reserve" capacity in advance of utilisation - as opposed to paying for on-demand instances - at a significant discount.

Whilst Axway does not provide specific guidance for using reserved vs. on-demand capacity purchasing we do recommend customers investigate this approach as a means to reduce their cloud infrastructure costs.

### Availability Zones

Cloud providers provide the means to implement high availability across multiple availability zones to protect against for failure in a given geographic region. For example, AWS provides [guidance](https://aws.amazon.com/blogs/containers/amazon-eks-cluster-multi-zone-auto-scaling-groups/) on scaling across multiple availability zones under Kubernetes.

From the perspective of Axway Open Banking the sizing discussed described a single availability zone. Customers are required to replicate the infrastructure across each zone, within the constraints described.

### Elasticity

Our production solution is scaled for 1 million transactions per month (in this context "interactions" means traffic being terminated at the API Gateway and serving open banking requests).

Above 1 million transactions per month the solution has the ability to autoscale based on tolerances the organization has configured.

The default tolerance is based on utilisation i.e. at a given level of utilisation new instances will be initialized or destroyed as appropriate.

### Network Traffic

Network traffic in cloud deployment scenarios has cost implication when one considers the uplift from non-production to production environments.

For example, as a feature of running the EKS on AWS customers are charged for network ingress/egress to and from the Internet, which is charged per Gb (charges are also made for NAT Gateways, but these are charged per hour).

Customers should consider the following factors when forecasting their expenditure:

* The open banking standard APIs the customer intends to support.
* The large datasets from those APIs that are likely to serve significant amounts of data.
* Use those datasets to guide an "average" view of data transferal i.e. response payloads being transferred from the bank to the cloud provider and then from the cloud provider to the TPP. Note that a different cost profile is likely to incurred for the first of these if the connection between the bank and the cloud provider is over a VPN (for example, as described by AWS [here](https://aws.amazon.com/vpn/pricing/)).

The following expected behaviours - drawn from experiences in the UK - should also be noted:

* When sharing account information TPPs are likely to download a customers transaction history in full when they first consent to access and then retrieve incremental updates afterwards.
* For use cases that drive real-time decisions - such as checking a balance - TPPs are likely to make multiple requests per day but the data volume is likely to low.
* Consent payloads for payment initiation use cases are relatively small but likely to be transmitted frequently.
* Protocol-based traffic such as for customer authorization and token refresh are small and depending on the chosen IAM solution deployment may only incur network cost between the TPP and the cloud provider.

To summarize: the account information API is likely to result in the largest amount of traffic and if this is being supported should be focus of customers sizing estimates.

### Storage

Cloud providers have different storage types that are optimised for various workloads. Customers will have a variety of different workload needs depending on components in the OBA they adopted.

For example:

* Components such as the API Portal can utilise shared disk allocations.
* Databases that are frequently reading and writing will require dedicated disk allocations.

The options from cloud providers in this area are considerable and are not listed here. However, generally they can be categorized in 2 ways that are similar to sizing physical disk:

* General purpose: As described, for general purpose computing operations.
* Solid state drives: For frequent read/write operations.

These 2 types then sub-divide into a multitude of options based on reserved capacity, "burst" and so on. Please refer to cloud provider documentation for details.

### Scaling

Axway uses the Externally Managed Topology (EMT) approach for scaling so instances can be managed by Kubernetes.

Please read [our guide](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_containers/container_getstarted/index.html) on using EMT for further details.