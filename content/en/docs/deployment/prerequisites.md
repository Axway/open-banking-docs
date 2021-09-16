---
title: "Prerequisites"
linkTitle: "Prerequisites"
weight: 1
description: Prepare the installation of the Axway Open Banking solution
---

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
* Obtain a private token for use with the Axway Docker Registry.
* Create a Kubernetes cluster that conforms to that described in the Architecture Overview guide and reflects the architecture choices described above.

Please note that all these tasks need to be completed for your installation to be successful.

## Kubernetes setup requirements

A Kubernetes 1.16+ cluster is required to deploy the Axway Open Banking Solution.

The following component are highly recommanded:

* [Nginx Ingress](https://github.com/kubernetes/ingress-nginx/tree/main/charts/ingress-nginx) controller 0.35 or above (helm chart 2.15 or above).
* [Cert-Manager](https://github.com/jetstack/cert-manager/tree/master/deploy/charts/cert-manager) for ingress certificate management.
* [External-DNS](https://github.com/bitnami/charts/tree/master/bitnami/external-dns) to synchronize ingress hosts in a DNS zone.

A more recent version of the `nginx-ingress` can impact the ingress annotations in this chart. Please review the nginx official documentation to update them
accordingly.

In case `external-dns` is not available in the cluster, a manual configuration of the ingress hosts is required in your DNS zone. Also remove the cert-manager annotation in all ingress hosts.

In case `cert-manager` is not available in the cluster, a manual creation of a secret with a certificate is required. Please use the ingress names from the
chart.

Regarding the load balancer/ingress controler, you can use NGINX or another ingress controller with the following requirements:

* Encode certificate in header X-SSL-CERT in web format
* Return http error 400 if client use a bad certificate
* Manage multiple root CA according different client certificates.
* Limit cypher spec usage to “DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384
* Compatible with request header size to 8k.
* Deny public access to ACP path /app/default/admin
