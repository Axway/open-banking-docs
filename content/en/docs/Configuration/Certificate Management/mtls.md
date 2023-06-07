---
title: "MTLS configuration"
linkTitle: "MTLS"
weight: 2
date: 2021-09-02
---

How to change and test the certificate configurations required for Mutual Authentication.

## Context

Mutual authentication is required for most APIs developed for Open Banking.

According to the Open Banking Specification, Mutual Transport Layer Security (MTLS) client connections are required for the Cloudentity and API Gateway Listener components. See the diagram for details on MTLS setup.
![MTLS diagram](/Images/MTLS.svg)

See more about the Certificate Verification with MTLS in Open Banking context in [Mutual Authentication and Certificate Verification](/docs/overview/integration/mutual-auth).

### API Gateway MTLS

The reference architecture uses an ingress controller to support the MTLS capabilities.

Others possibilities are:

* Use a component in front of the Kubernetes cluster to support the MTLS termination. In this condition, Axway recommends to have a component nearest the Kubernetes cluster.

* Replace the nginx ingress controller by another ingress controller that supports the required features.

Refer to the required features of the ingress controller in [Deployment - Prerequisites](/docs/deployment/prerequisites).

{{% alert title="Note" color="primary" %}} Usage of the MTLS Listener embedded on the API-gateway configuration would require each customer to build their own Docker images, as the container maturity level does not allow us to externalize certificates.{{% /alert %}}

### Cloudentity MTLS

Cloudentity supports the MTLS and the root CA must be added in the component.

## Setup the solution for MTLS with test certificates

This section includes the prerequisites and tasks to setup the solution for MTLS.

### Prerequisites

* An openssl tool available.
* An ACP deployed on Kubernetes.
* An APIM component deployed on Kubernetes.
* Nginx Ingress Controller deployed on Kubernetes.

### Create the root CA certificates

First, some certificates must exist to generates multiples

```bash
openssl genrsa -out ca1.key 2048openssl req -new -x509 -days 3650 -key ca1.key -subj "/C=BR/ST=São Paulo/L=São Paulo/O=Axway/CN=Axway Root CA" -out ca1.crtopenssl genrsa -out ca2.key 2048openssl req -new -x509 -days 3650 -key ca2.key -subj "/C=BR/ST=São Paulo/L=São Paulo/O=Axway/CN=Axway Root CA" -out ca2.crt
```

### Create Client Certificates

The Data Recipient or Third-Party Provider (TPP) Applications need the client certificate for MTLS. In this section there are sample instructions to generate certificates for testing purposes.

Each certificate must have one key that is signed with a previously created root certificate authority. These configuration files below are provided as examples.

| tpp1.cnf |
| ----------- |

```properties
[req]
default_bits = 2048
default_md = sha256
encrypt_key = yes
prompt = no
string_mask = utf8only
distinguished_name = client_distinguished_name
req_extensions = req_cert_extensions
 
[client_distinguished_name]
businessCategory = Third Party Provider 1
jurisdictionCountryName = BR
serialNumber = 18505934000140
countryName = BR
organizationName = AXWAY
stateOrProvinceName = SP
localityName = São Paulo
organizationalUnitName = 00000000-0000-0000-0000-000000000002
UID = 00000000-0000-0000-0000-000000000002
commonName = tpp1.demo.axway.com
 
[req_cert_extensions]
basicConstraints = CA:FALSE
subjectAltName = @alt_name
keyUsage = critical,digitalSignature,keyEncipherment
extendedKeyUsage = clientAuth
 
[alt_name]
DNS = tpp1.demo.axway.com
```

| tpp2.cnf |
| ----------- |

```properties
[req]
default_bits = 2048
default_md = sha256
encrypt_key = yes
prompt = no
string_mask = utf8only
distinguished_name = client_distinguished_name
req_extensions = req_cert_extensions
 
[client_distinguished_name]
businessCategory = Third Party Provider 2
jurisdictionCountryName = BR
serialNumber = 18505934000140
countryName = BR
organizationName = AXWAY
stateOrProvinceName = SP
localityName = São Paulo
organizationalUnitName = 00000000-0000-0000-0000-000000000002
UID = 00000000-0000-0000-0000-000000000002
commonName = tpp2.demo.axway.com
 
[req_cert_extensions]
basicConstraints = CA:FALSE
subjectAltName = @alt_name
keyUsage = critical,digitalSignature,keyEncipherment
extendedKeyUsage = clientAuth
 
[alt_name]
DNS = tpp2.demo.axway.com
```

Download these files:

* [tpp1.cnf](https://axway-open-banking-docs.netlify.app/sample-files/tpp1.cnf)
* [tpp2.cnf](https://axway-open-banking-docs.netlify.app/sample-files/tpp2.cnf)

Then execute the following commands to generate the required certificates:

```bash
openssl req -new -newkey rsa:2048 -nodes -out tpp1.csr -keyout tpp1.key -config ./tpp1.cnfopenssl x509 -req -days 3650 -in tpp1.csr -CA ca1.crt -CAkey ca1.key -CAcreateserial -out tpp1.crtopenssl req -new -newkey rsa:2048 -nodes -out tpp2.csr -keyout tpp2.key -config ./tpp2.cnfopenssl x509 -req -days 3650 -in tpp1.csr -CA ca2.crt -CAkey ca2.key -CAcreateserial -out tpp2.crt
```

### Deploy root CA certificates on the Open Banking platform

#### ACP

Connect to the Cloudentity admin page on `https://acp.<domain-name>/app/default/admin/`.

1. Select workspace **openbanking_brasil**.
2. Click **Settings** on the left panel.
![ACP Authorization Settings](/Images/mtls-acp-auth.png)
3. Click **Authorization** on the main frame.
4. Scroll down to **Trusted client certificates**.
![ACP Trusted client certificates ](/Images/mtls-acp-ca.png)
5. Paste ca1.crt and ca2.crt contents in the text box.
6. Click **Save**.

#### APIM

The certificate is managed by nginx. It requires that all root CA used for signing client certificates must be in a secret.

The secret name is apitraffic-mtls-rootca in the namespace open-banking-apim.

1. First, concatenate all root CA and encode it in base64.

   ```bash
   cat ca1.crt ca2.crt > ca.crtcat ca.crt | base64
   ```

2. Edit the values.yaml file in the open-banking-apim Helm chart. Replace the encoded string on value apitraffic.mtlsRootCa.
![values.yaml](/Images/mtls-apim-yaml.png)

3. For first installation, use the Helm install command otherwise use the Helm upgrade command.

   ```bash
   helm install/upgrade <release name> open-banking-apim -n open-banking-apim  
   ```

#### NGINX

For upgrades only, nginx needs to be restarted with a rollout restart command to apply the new root CA.

```bash
kubectl get deployment -n <nginx namespace> kubectl rollout restart deployment <nginx deployment name>  -n <nginx namespace>
```

Check that all nginx pods are restarted with the age column using the following command:

```bash
kubectl get pods -n <nginx namespace>
```

## Test the MTLS setup

Here are several scenarios you can use to test the MTLS setup with NGINX and APIM:

* Configure both CA1 and CA2 in NGINX, APIM, and ACP as described in the previous section.
    * Use a simple curl command to test a call without cert and keys.
        * `curl 'https://mtls-api-proxy.<domain-name>/healthcheck'`
        * The call should return 400 with a SSL certificate error
    * Use a simple curl command to test sending the cert and key for TPP1 and TPP2.
        * `curl 'https://mtls-api-proxy.<domain-name>/healthcheck' --cert tpp1.crt --key tpp1.key`
        * `curl 'https://mtls-api-proxy.<domain-name>/healthcheck' --cert tpp2.crt --key tpp2.key`
        * The call should return 200 with status ok
* Configure only CA1 in NGINX, APIM, and ACP as described in the previous section.
    * Use a simple curl command to test sending the cert and key for TPP2.
        * `curl 'https://mtls-api-proxy.<domain-name>/healthcheck' --cert tpp2.crt --key tpp2.key`
        * The call should return 400 with a SSL certificate error

You can do similar tests on ACP using the following curl command:

```bash
curl --request POST 'https://acp.<domain-name>/default/openbanking_brasil/oauth2/token' \
--data-urlencode 'grant_type=client_credentials' --data-urlencode 'scope=accounts' \
--data-urlencode 'client_id=tpp1' --cert tpp1.crt --key tpp1.key
```