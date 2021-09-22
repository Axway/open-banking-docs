---
title: "Prerequisites"
linkTitle: "Prerequisites"
weight: 1
description: Prepare the installation of the Axway Open Banking solution
---

Axway Open Banking has been developed on Kubernetes with a "button-click" style deployment that allows customers to use the Kubernetes solution of their choice.

Preparing a Kubernetes cluster with the appropriate services and settings is required prior to the solution installation 

## General prerequisites

Prior to installation you will need to perform the following tasks:

* Read and understand the Architecture Overview guide.
* Make choices that are described in the Architecture Overview guide including:
    * Choice of Kubernetes provider (cloud, on-premise, etc).
    * Components that will be supported (Demo Applications, mock backend services, etc).
    * Approach to database deployment (inside Kubernetes vs. externalized services).
    * Components that reflect choice of deployment model (certificate manager, load balancer/Ingress Controller, etc). 
* Install the following command line tools:
    * Helm.
    * Kubectl.
* Obtain from Axway team a token to pull helm charts and docker images from with the Axway Registry.
* Create a Kubernetes cluster that conforms to that described in the Architecture Overview guide and reflects the architecture choices described above.

Please note that all these tasks need to be completed for your installation to be successful.

## Kubernetes setup requirements

A Kubernetes 1.16+ cluster is required to deploy the Axway Open Banking Solution.

### Resources

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

### Subnets

A complete architecture requires a minimum of 3 subnets:

* Bastion: Required for operators to connect from a Bastion host (although this can be substituted for an alternative solution). Access to pods on all required ports must be allowed. A subnet mask of /32 is considered sufficient.
* Kubernetes: The design of this subnet can vary based on a number of conditions:
    * This subnet must have access to both the customer backend services and the database subnet.
    * If CNI is activated, enough IP address must be allocated for nodes and the maximum number of pods in the platform. Axway Open Banking generates between 100 and 120 objects that consume an IP address.
    * A subnet mask /24 is therefore recommended to support scaling, upgrade and others tools for production.
* Database: For databases provided inside the Kubernetes cluster. A subnet mask of /29 is recommended.

Each subnet must be protected by a firewall implemented at Layer 4 of the OSI model with open routes kept to a bare minium. 

### Kubernetes components

The following components are highly recommanded.

#### Ingress controller

In order to control all external traffic, an Ingress controller is required.
It is recommanded to use [Nginx Ingress](https://github.com/kubernetes/ingress-nginx/tree/main/charts/ingress-nginx) controller, as it would be used as a reverse proxy and manage the MTLS and TLS termination, and load-balancing when required.

Select the appropriate version that is compatible with you cluster, and that is minimum 0.35. The ingress annotations of our helm chart have been written for the 0.35 version. A more recent version of the `nginx-ingress` may impact these  annotations. Please review the nginx official documentation to update them accordingly.

You can use NGINX or another ingress controller with the following requirements:

* Encode certificate in header X-SSL-CERT in web format
* Return http error 400 if client use a bad certificate
* Manage multiple root CA according different client certificates.
* Limit cypher spec usage to “DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384
* Compatible with request header size to 8k.
* Deny public access to ACP path /app/default/admin

#### Certificate Manager

In order to manage easily certificates that are used in the Axway Open Banking Solution, we recommand to use [Cert-Manager](https://github.com/jetstack/cert-manager/tree/master/deploy/charts/cert-manager).

If you have specific certificates you want use during installation, you can avoid using _cert-manager_ but you will have to do more configuration during deployment.

In case _cert-manager_ is not available in the cluster, a manual creation of secret with certificates would be required. Please use the ingress names from the chart.

#### DNS

It is also highly recommanded to use [External-DNS](https://github.com/bitnami/charts/tree/master/bitnami/external-dns) to synchronize ingress hosts in a DNS zone.

In case `external-dns` is not available in the cluster, a manual configuration of the ingress hosts is required in your DNS zone. Also remove the cert-manager annotation in all ingress hosts.

## Cloud deployment recommandations

This section provides additional information for customers who are targeting a cloud-based solution and require guidance on the components required from their cloud provider of choice, including:

* A generic list of components that are required.
* The sizing information for instances that will
* Examples of those components on Amazon Web Services (AWS).

This section does not provide:

* Recommendations on cloud providers.
* Pricing for specific cloud provider components.

General requirements listed previously still apply.

### Required services

#### Managed Kubernetes Environment

Managed Kubernetes environments are commonly available across cloud providers. For example:

* [Amazon Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks)
* [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-gb/services/kubernetes-service)
* [Google Kubernetes Engine (GKS)](https://cloud.google.com/kubernetes-engine)

Such products are very convenient for the deployment and management of Kubernetes environments and can be configured using tools such as Terraform. However, they are not an end-to-end solution in terms of cost and choice of underlying components.

Each of these products incorporate other cloud provider solution that are leveraged - and charged for - to provide a fully-functioning environment but with specific limitations.

##### Example

EKS is available as a standalone service from AWS. Using the service is [charged at an hourly rate](https://aws.amazon.com/eks/pricing/).

#### Compute

The Kubernetes cluster will require provisioning with sufficient computational resources in order to function. Typically clusters are sized on the basis of total limited capacity i.e. enough to run all components with the headroom to scale.

Cloud providers offer a multitude of options based on number of cores, amount of memory and assign disk.

*Example:*

In the [resources](#resources) the following guidelines is required:

* 23 virtual CPUs.
* 70 Gb memory.
* Minimum of 2 nodes (in the context of Kubernetes, a [Node](https://kubernetes.io/docs/concepts/architecture/nodes/) is a virtual or physical machine onto which Pods - and the containers therein - are placed).

AWS provides a number of [instance types](https://aws.amazon.com/ec2/instance-types/). These requirements could be fulfilled by provisioning - for example - 3 "T" nodes on EKS in the "2 x large" category e.g. `t3.2xlarge`. These nodes provide a baseline level of CPU performance that allow for "bursts" when required.

These provide 8 CPUs and 32 Gb of memory giving a total capacity of 24 CPUs and 96 Gb of memory.

> In the production deployment of the Axway Open Banking additional nodes will be required in order to segregate workloads.

#### Ingress Controller

An Ingress Controller is a Kubernetes component that manages external access to the cluster.

Axway recommands the use the [NGINX](https://github.com/kubernetes/ingress-nginx/blob/master/README.md) Ingress Controller for all cloud providers.

However, customers may wish to use a Controller that is provided by their cloud provider.

*Example:*

AWS provides an [Ingress Controller](https://github.com/kubernetes-sigs/aws-load-balancer-controller#readme) that provisions an Application Load Balancer.

This component provides additional functionality in that traffic is load balanced both across instances and across availability zones, whilst still meeting the needs of the Ingress Controller from a Kubernetes perspective.

> Note that in the context of our solution the Ingress Controller must be capable of terminating mutally-authenticated TLS connections. This is why the Axway Open Banking solution implements the NGINX Ingress Controller.

#### DNS Services

Open banking solution needs to be exposed to Internet traffic and therefore require DNS services such as lookup.

*Example:*

AWS provides [Route 53](https://aws.amazon.com/route53/) which autoscales to handle internet traffic.

### Cloud Considerations

When using cloud-based infrastructure there are a number of considerations to be made that cannot be built into a sizing model for Axway Open Banking, which are listed in the following sections.

#### External Services

Axway Open Banking bundles a number of components that can also be provided by cloud providers as managed services external to the Kubernetes cluster.

For example, MySQL is provisioned our Helm-based deployment but this could equally be configured to reference a provider-managed instance provisioned outside of Helm.

Customers should consider their target topology, scaling requirements and database management approach in light of this and whether using a provider-managed solution like [Amazon RDS](https://aws.amazon.com/rds/) is an appropriate solution for them.

#### "Reserved" Instances

"Reserved" instances are a [feature](https://aws.amazon.com/ec2/pricing/reserved-instances/) of AWS that are conceptually common across cloud providers. They provide the ability to "reserve" capacity in advance of utilisation - as opposed to paying for on-demand instances - at a significant discount.

Whilst Axway does not provide specific guidance for using reserved vs. on-demand capacity purchasing we do recommend customers investigate this approach as a means to reduce their cloud infrastructure costs.

#### Availability Zones

Cloud providers provide the means to implement high availability across multiple availability zones to protect against for failure in a given geographic region. For example, AWS provides [guidance](https://aws.amazon.com/blogs/containers/amazon-eks-cluster-multi-zone-auto-scaling-groups/) on scaling across multiple availability zones under Kubernetes.

From the perspective of Axway Open Banking the sizing discussed described a single availability zone. Customers are required to replicate the infrastructure across each zone, within the constraints described.

#### Elasticity

Our production solution is scaled for 1 million transactions per month (in this context "interactions" means traffic being terminated at the API Gateway and serving open banking requests).

Above 1 million transactions per month the solution has the ability to autoscale based on tolerances the organization has configured.

The default tolerance is based on utilisation i.e. at a given level of utilisation new instances will be initialized or destroyed as appropriate.

#### Network Traffic

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

#### Storage

Cloud providers have different storage types that are optimised for various workloads. Customers will have a variety of different workload needs depending on components of Axway Open Banking they adopted.

For example:

* Components such as the API Portal can utilise shared disk allocations.
* Databases that are frequently reading and writing will require dedicated disk allocations.

The options from cloud providers in this area are considerable and are not listed here. However, generally they can be categorized in 2 ways that are similar to sizing physical disk:

* General purpose: As described, for general purpose computing operations.
* Solid state drives: For frequent read/write operations.

These 2 types then sub-divide into a multitude of options based on reserved capacity, "burst" and so on. Please refer to cloud provider documentation for details.

#### Scaling

Axway uses the Externally Managed Topology (EMT) approach for scaling so instances can be managed by Kubernetes.

Please read [our guide](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_containers/container_getstarted/index.html) on using EMT for further details.