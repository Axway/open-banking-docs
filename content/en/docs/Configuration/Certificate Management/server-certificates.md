---
title: "Server certificates"
linkTitle: "Server certificates"
description: How to change and test the server certificate configurations used for https services
weight: 1
date: 2021-09-02
---

## Secure external access to services

Server certificate are required for all of the following ingresses:

| Ingress Name                              | External address                       | NAMESPACE                      |
|-------------------------------------------|----------------------------------------|--------------------------------|
| acp                                       | acp.`<domain-name>`                    | open-banking-acp               |
| kibana                                    | kibana.`<domain-name>`                 | open-banking-analytics         |
| webserver                                 | analytics.`<domain-name>`              | open-banking-analytics         |
| apimanager                                | api-manager.`<domain-name>`            | open-banking-apim              |
| gatewaymanager                            | api-gateway-manager.`<domain-name>`    | open-banking-apim              |
| traffic                                   | api.`<domain-name>`                    | open-banking-apim              |
| traffichttps                              | services-api.`<domain-name>`           | open-banking-apim              |
| trafficmtls                               | mtls-api-proxy.`<domain-name>`         | open-banking-apim              |
| auto-loan-api-ingress                     | auto-loan-api-demo-apps.`<domain-name>`| open-banking-app               |
| bankio-link-ingress                       | tpp-demo-apps.`<domain-name>`          | open-banking-app               |
| demo-frontends-ingress                    | demo-apps.`<domain-name>`              | open-banking-app               |
| obie-sandbox-ingress                      | obie-sandbox-demo-apps.`<domain-name>` | open-banking-app               |
| shop-api-ingress                          | shop-demo-api-apps.`<domain-name>`     | open-banking-app               |
| consent-openbanking-consent-admin         | consent-admin.`<domain-name>`          | open-banking-consent           |
| consent-openbanking-consent-page          | consent.`<domain-name>`                | open-banking-consent           |
| consent-openbanking-consent-self-service  | consent-selfservice.`<domain-name>`    | open-banking-consent           |
| consent-openbanking-financroo             | financroo.`<domain-name>`              | open-banking-consent           |
| api-portal                                | developer-portal.`<domain-name>`       | open-banking-developer-portal  |
| jwe-generator                             | jwe.`<domain-name>`                    | open-banking-jwe               |

These certificates are set at the deployment on each Ingress.
There is 3 options to use your own certificates:

### Use cert-manager

You can configure [cert-manager](https://cert-manager.io/) at the ingress controler level.
This tool is recommanded to manage all certificates of your cluster from the same component.
You can configure your issuers, assignment rules, etc. See more on <https://cert-manager.io/docs>

See this tutorial on how to configure cert-manager a Kubertnetes cluster using Let's Encrypt: <https://cert-manager.io/docs/tutorials/acme/ingress/>

### Use a wilcard certificate

If you have a wildcard certificate matching `*.<domain-name>`, it can be configured for all ingress listed above.
This certicate should be declared for each helm chart deployment where you have an ingress defined.
You can do so during the first deployment, or update it later if you change certicate strategy or if you need to renew the certificate.

For each helm chart where you have a record for global.ingress.wildcard in the values.yaml, set its value to `true` and update the global.ingress.certmanager, global.ingress.cert and global.ingress.key values as follow :

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

If a helm chart have ingress but doesn't have the global.ingress.wildcard option, simply refer to [#use-specific-certificates] below to set the wildcard certificate in the appropriate record.

### Use specific certificates

If you have a specific certificate matching each external address listed above, you can configure each of them in each solution component.
This certicate should be declared for each helm chart deployment where you have an ingress defined.
You can do so during the first deployment, or update it later if you change certicate strategy or if you need to renew the certificate.

For each helm chart, update every certmanager, cert and key values in the values.yaml as follow in you have an ingress component :

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

Important: make sure to keep the indent and format similar as above, as well as the empty line after certificate and key.

<!-- ## Secure internal connections

{{% alert title="Note" color="primary" %}}
This section is under development
{{% /alert %}} -->