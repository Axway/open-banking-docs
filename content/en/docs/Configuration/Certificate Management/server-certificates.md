---
title: "Server certificates"
linkTitle: "Server certificates"
description: 
weight: 1
date: 2021-09-02
---

How to change and test the server certificate configurations used for https services.

## Secure external access to services

Server certificate are required for all of the following ingresses:

| Ingress Name                              | External address                       | NAMESPACE                      |
|-------------------------------------------|----------------------------------------|--------------------------------|
| acp                                       | acp.`<domain-name>`                    | open-banking-cloudentity       |
| apimanager                                | api-manager.`<domain-name>`            | open-banking-apim              |
| gatewaymanager                            | api-gateway-manager.`<domain-name>`    | open-banking-apim              |
| traffic                                   | api.`<domain-name>`                    | open-banking-apim              |
| traffichttps                              | services-api.`<domain-name>`           | open-banking-apim              |
| trafficmtls                               | mtls-api-proxy.`<domain-name>`         | open-banking-apim              |
| consent-openbanking-consent-admin         | consent-admin.`<domain-name>`          | open-banking-consent           |
| consent-openbanking-consent-page          | consent.`<domain-name>`                | open-banking-consent           |
| consent-openbanking-consent-self-service  | consent-selfservice.`<domain-name>`    | open-banking-consent           |
| jwe-generator                             | jwe.`<domain-name>`                    | open-banking-jwe               |

These certificates are set at the deployment on each Ingress. See the following options to use your own certificates.

### Use cert-manager

You can configure [cert-manager](https://cert-manager.io/) at the ingress controller level. This tool is recommended to manage all certificates of your cluster from the same component.
You can configure your issuers, assignment rules, and so on. Refer to <https://cert-manager.io/docs> for more details.

See this tutorial on how to configure cert-manager a Kubertnetes cluster using Let's Encrypt: <https://cert-manager.io/docs/tutorials/acme/nginx-ingress/>.

### Use a wildcard certificate

If you have a wildcard certificate matching `*.<domain-name>`, it can be configured for all ingress listed above. This certificate should be declared for each Helm chart deployment where you have an ingress defined. You can do so during the first deployment, or update it later if you change certificate strategy or if you need to renew the certificate.

For each Helm chart where you have a record for global.ingress.wildcard in the `values.yaml`, set its value to `true` and update the global.ingress.certmanager, global.ingress.cert and global.ingress.key values as follows:

```yaml
global:
   ingress:
      certManager: false
      wildcard: true
      cert: |
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded certificate matching the wildcard certificate>>
         -----END CERTIFICATE-----
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded certificate for the intermadiate Certificate Authority>>
         -----END CERTIFICATE-----
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded certificate for the Root Certificate Authority>>
         -----END CERTIFICATE-----

      key: |
         -----BEGIN RSA PRIVATE KEY-----
         <<insert here base64-encoded key corresponding to the wildcard certificate>>
         -----END RSA PRIVATE KEY-----

```

If a Helm chart has ingress but does not have the global.ingress.wildcard option, simply refer to [use specific certificates](#use-specific-certificates) below to set the wildcard certificate in the appropriate record.

### Use specific certificates

If you have a specific certificate matching each external address listed above, you can configure each of them in each solution component. This certificate should be declared for each Helm chart deployment where you have an ingress defined. You can update it during the first deployment, or update it later if you change the certificate strategy or if you need to renew the certificate.

For each Helm chart, update every certmanager, cert, and key values in the `values.yaml` as follows in you have an ingress component:

```yaml
global:
   ingress:
      certManager: false
      wildcard: false #only if it exists
<component>:  #do this for each component with ingress values as below
   ingress:
      cert: 
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded server certificate matching the ingress name>>
         -----END CERTIFICATE-----
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded certificate for the intermadiate Certificate Authority>>
         -----END CERTIFICATE-----
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded certificate for the Root Certificate Authority>>
         -----END CERTIFICATE-----

       key: |
         -----BEGIN RSA PRIVATE KEY-----
         <<insert here base64-encoded key corresponding to the server certificate>>
         -----END RSA PRIVATE KEY-----

```

{{% alert title="Important" color="warning" %}}Make sure to keep the indent and format similar as above, as well as the empty line after certificate and key.{{% /alert %}}

<!-- ## Secure internal connections

{{% alert title="Note" color="primary" %}}
This section is under development
{{% /alert %}} -->