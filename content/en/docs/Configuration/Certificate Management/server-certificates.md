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

## Secure internal connections

{{% pageinfo %}}
This section is under development
{{% /pageinfo %}}