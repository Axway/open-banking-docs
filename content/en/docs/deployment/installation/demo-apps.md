---
title: "Demo apps Installation"
linkTitle: "Demo apps"
weight: 5
description: Installing Demo apps of the Axway Open Banking solution
---


## Demo apps

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| image.dockerRegistry.url | URL of the image in Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking/apps |
| image.dockerRegistry.username | Login of user that as been created for you. | None |
| image.dockerRegistry.token | Token of user that as been created for you. | None |
| frontEnd.cname | frontEnd server address. change domainname value | demo-apps.<domainname> |
| tppApi.cname | tppApi server address. change domainname value | tpp-demo-apps.<domainname> |
| autoLoanApi.cname | autoLoanApi server address. change domainname value | auto-loan-api-demo-apps.<domainname> |
| shopApi.cname | shopApi server address. change domainname value |shop-demo-api-apps.<domainname> |
| obieSandbox.cname | obieSandbox server address. change domainname value | obie-sandbox-demo-apps.<domainname> |
| griffin.tokenEndpoint | Token endpoint of Authorization server used by demo apps. change domainname value | https://acp.<domainname>/axway/openbanking_demo/oauth2/token |
| griffin.authorizationEndpoint | Authorization endpoint of Authorization server used by demo apps. change domainname value | https://acp.<domainname>/axway/openbanking_demo/oauth2/authorize |
| griffin.aispEndpoint | Account endpoint of Open Banking API used by demo apps. change domainname value | https://mtls-api-proxy.<domainname>/open-banking/v3.1/aisp |

