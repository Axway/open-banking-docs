---
title: "Certificate management"
linkTitle: "Certificate management"
weight: 7
date: 2021-09-02
---

Amplify Open Banking uses digital certificates for many security functions. The solution comes with sample certificates that can be used in non-production environments for testing purposes only. It is highly recommended to change all certificates and use official certificates signed by one of your approved Certificate Authorities.

This section provides instructions for managing certificates.

## Context

Mutual authentication is required for most APIs developed for Open Banking.

According to the Open Banking Specification, Mutual Transport Layer Security (MTLS) client connections are required for the API Gateway Listener and Authorization Server components.

See more about the Certificate Verification with MTLS in the Open Banking context in [Mutual Authentication and Certificate Verification](/docs/overview/integration/mutual-auth).

## Set up the solution for MTLS with test certificates

This section includes the prerequisites and tasks to setup the solution for MTLS.

### Prerequisites

* An OpenSSL tool is available.
* Amplify Integration is running with Open Banking projects.

### Create the root CA certificates

First, some certificates must exist to generate multiples:

```bash
openssl genrsa -out ca1.key 2048
openssl req -new -x509 -days 3650 -key ca1.key -subj "/C=US/ST=Arizona/L=Phoenix/O=Axway/CN=Axway Root CA" -out ca1.crt
```

### Create client certificates

The data recipient or Third-Party Provider (TPP) applications need the client certificate for MTLS. In this section there are sample instructions to generate certificates for testing purposes.

Each certificate must have one key that is signed with a previously created root certificate authority. The following configuration files are provided as examples.

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
jurisdictionCountryName = US
serialNumber = 18505934000140
countryName = US
organizationName = AXWAY
stateOrProvinceName = Arizona
localityName = Phoenix
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
jurisdictionCountryName = US
serialNumber = 18505934000140
countryName = US
organizationName = AXWAY
stateOrProvinceName = Arizona
localityName = Phoenix
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

Then execute the following commands to generate the required certificates:

```bash
openssl req -new -newkey rsa:2048 -nodes -out tpp1.csr -keyout tpp1.key -config ./tpp1.cnf
openssl x509 -req -days 3650 -in tpp1.csr -CA ca1.crt -CAkey ca1.key -CAcreateserial -out tpp1.crt
openssl req -new -newkey rsa:2048 -nodes -out tpp2.csr -keyout tpp2.key -config ./tpp2.cnf
openssl x509 -req -days 3650 -in tpp1.csr -CA ca1.crt -CAkey ca1.key -CAcreateserial -out tpp2.crt
```

### Configure root CA certificates in Amplify Integration

The root CA certificate (e.g., ca1.crt), must to be added in Amplify Integration:

1. Import the certificate in *Manager > Security > Certificates*.
![Certificate Import](/Images/AI-Manager-Certificates.png)
2. Navigate to *Design > Select Project*.
3. Update the **Governance rule** of type *Transport Policy* to add/update the Root CA.
4. Do this for each project in which APIs are exposed via MTLS to add the Root CA.
    * FDX_Accounts project and FDX_MTLS governance rule
    * FDX_Authorization project and FDX_Authorization_MTLS governance rule
