---
title: "Installation"
linkTitle: "Installation"
weight: 2
description: Installing the Axway Open Banking solution
---

This guide describes how to install the Axway Open Banking solution.

## Connect to Axway Repository

To install the solution, add the Axway Repository to your Helm configuration:

```bash
helm repo add axway-open-banking \ 
https://docker-registry.demo.axway.com/chartrepo/open-banking \ 
--username="<use the token name>" \ 
--password="<use your private token here>"   
```

> Note that if your token name starts with `robot$` , you should type `robot\$` if your running the command from Linux or MacOs, and you should type `robot``$`if you are using Windows Powershell.

Once the registry is added, make sure you can see the open-banking packages :

```bash
helm repo update 
helm search repo axway-open-banking
```

For each component, follow the install instructions

<!--
```bash
helm fetch axway-open-banking/open-banking-acp
helm fetch axway-open-banking/open-banking-consent
helm fetch axway-open-banking/open-banking-apim
helm fetch axway-open-banking/open-banking-apim-config
helm fetch axway-open-banking/open-banking-developer-portal
helm fetch axway-open-banking/open-banking-backend-chart
helm fetch axway-open-banking/open-banking-analytics
helm fetch axway-open-banking/open-banking-bankio-apps
```

Update the values for each chart to adapt it to your target environment. 

> Please refer to the `README.md` file in each package for more details. Note you can of course use your own choice of editor rather than vim if you prefer.

```bash
tar xvf open-banking-apim-1.4.x.tgz 
tar xvf open-banking-apim-config-1.4.x.tgz 
tar xvf open-banking-developer-portal-1.4.x.tgz 
tar xvf open-banking-backend-chart-1.4.x.tgz 
tar xvf open-banking-analytics-1.4.x.tgz  
tar xvf open-banking-acp-1.4.x.tgz  
tar xvf open-banking-consent-1.4.x.tgz  
tar xvf open-banking-bankio-apps-1.4.x.tgz 
``` -->