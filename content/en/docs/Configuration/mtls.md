---
title: "MTLS"
linkTitle: "MTLS"
description: MTLS configuration
weight: 4
date: 2021-09-02
---

## Context

Mutual authentication is required for most of API developed for Open Banking.

According to the Open Banking Specification, the MTLS is required for both components : Cloud Entity and the API Gateway Listener. Here is a diagram that explains how it's working.

### API Gateway MTLS

The reference architecture uses an ingress controller to support the MTLS capabilities.

Others possibilities are :

* Use a component in front of the Kubernetes cluster to support the MTLS termination. In this condition, Axway recommands to have a component nearest the Kubernetes cluster.

* Replace the nginx ingress controller by another that supports the required features.

Features required are :

* Encode certificate in header X-SSL-CERT in web format
* Return http error 400 if customer use a bad TPP
* Manage multiple root CA according different TTP certs.
* Limit cypher spec usage to “DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384

Note: Usage of the MTLS Listener embedded on the API-gateway configuration would require each customer to build their own docker images, as the container maturity level doesn't allow us to externalize certificates.

### Cloud Entity MTLS

Cloud Entity supports the MTLS and the root CA must be added in the component.

Note : The target architecture is that API-Gateway must route the request to ACP. So ACP won't be accessible directly.

## Test MTLS solution

### Prerequisites

* An openssl tool available.
* An ACP deployed on Kubernetes.
* An APIM component deployed on Kubernetes.
* Nginx Ingress Controller deployed on Kubernetes.

### Create the root CA certificates

First, some certificates must exist to generates multiples

```bash
openssl genrsa -out ca1.key 2048openssl req -new -x509 -days 3650 -key ca1.key -subj "/C=BR/ST=São Paulo/L=São Paulo/O=Axway/CN=Axway Root CA" -out ca1.crtopenssl genrsa -out ca2.key 2048openssl req -new -x509 -days 3650 -key ca2.key -subj "/C=BR/ST=São Paulo/L=São Paulo/O=Axway/CN=Axway Root CA" -out ca2.crt
```

### Create certificates

Each certificate must have one key and signed with a root CA previously created. A configuration is available below as example.

[tpp1.cnf](tpp1.cnf)
[tpp2.cnf](tpp2.cnf)

Download and paste those files.

```bash
openssl req -new -newkey rsa:2048 -nodes -out tpp1.csr -keyout tpp1.key -config ./tpp1.cnfopenssl x509 -req -days 3650 -in tpp1.csr -CA ca1.crt -CAkey ca1.key -CAcreateserial -out tpp1.crtopenssl req -new -newkey rsa:2048 -nodes -out tpp2.csr -keyout tpp2.key -config ./tpp2.cnfopenssl x509 -req -days 3650 -in tpp1.csr -CA ca2.crt -CAkey ca2.key -CAcreateserial -out tpp2.crt
```

Note : Need to check if the cert configuration is enough compared to a real TPP cert.

### Deploy root CA certificates on the OB platform

#### ACP

Connect to the Cloud Entity admin page on https://acp.<yourdomainname>/app/default/admin/

* Select workspace openbanking_brasil,
* Click on settings on the left panel,
* Click on Authorization on the main frame,
* Scroll down to "Trusted client certificates",
* Past the content of ca1.crt and ca2.crt in the text box.

#### APIM

The certificate is managed by nginx. It requires that all root CA used for signing client certificates must be in a secret.

The secret name is apitraffic-mtls-rootca in the namespace open-banking-apim

First, concatenate all root CA and encode it in base64.

```bash
cat ca1.crt ca2.crt > ca.crtcat ca.crt | base64
```

Edit the values.yaml file of the helm chart open-banking-apim

Paste the encoded string on .apitraffic.mtlsRootCa.

For first installation, use the helm install command otherwise use helm upgrade command.

#### NGINX

For upgrade only , nginx needs to be restarted wit a rollout restart command to apply the new root CA.

```bash
kubectl get deployment -n <nginx namespace> kubectl rollout restart deployment <nginx deployment name>  -n <nginx namespace>
```

Check that all nginx pods are restarted with the age column using the following command :

```bash
kubectl get pods -n <nginx namespace>
```
