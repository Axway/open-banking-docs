---
title: "Analytics Installation"
linkTitle: "Analytics"
weight: 4
description: Installing Analytics for the Axway Open Banking solution
---

## Analytics

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.domainName | set the domainname for all ingress. | openbanking.demoaxway.com |
| global.dockerRegistry.url | URL of the Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking |
| global.dockerRegistry.username | Login of user that as been created for you. |  |
| global.dockerRegistry.token | Token of user that as been created for you. |  |
| elastic.password | Password used for "elastic" user. | Open*Banking*2021 |
| metrics.apiKey | API Key used for the metrics. Used by Webserver and APIM | PuGB+3m1z2jeFVHf5pWoFKOxH0F/fW9M |
| kibana.ingress.dnsprefix | set the domain name for kibana. | kibana |
| webserver.ingress.dnsprefix | Frequency of reports generation | analytics |
| webserver.report.frequency | Frequency of reports generation | 00 00 * * * (Every day at midnight) |
