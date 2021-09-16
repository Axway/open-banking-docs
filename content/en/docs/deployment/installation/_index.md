---
title: "Installation"
linkTitle: "Installation"
weight: 2
description: Installing the Axway Open Banking solution
---

This guide describes how to install the Axway Open Banking solution.

## Download and Customize Axway Components

To install the solution add the Axway Docker Repository to your Helm configuration:

```bash
helm repo add axway-open-banking \ 
https://docker-registry.demo.axway.com/chartrepo/open-banking \ 
--username="<use the token name>" \ 
--password="<use your private token here>"   

helm repo update 
```

> Note that if your token includes a dollar it should be escaped e.g. “robot$” becomes “robot\$”.

Once the registry is added you can then fetch the deployment packages using the appropriate Helm commands:

```bash
helm search repo axway-open-banking
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
```

