---
title: "Upgrade"
linkTitle: "Upgrade"
weight: 2
description: Upgrading the Axway Open Banking solution
---

If a new Open Banking API is released or an existing Open Banking API is updated you can perform an upgrade to the deployed application.

> If you are migrating from version 1.3 to 1.4, the API management component has been split into two Helm charts: `apim` for products and `apim-config` for configuration. In this case you must therefore uninstall `apim`, verify it has been completely removed, and then install `apim` and `apim-config`. 

## Steps

Backup your previous deployments if reusing the same directory:

```bash
mv open-banking-developer-portal open-banking-<previous-version>/ 
mv open-banking-apim open-banking-<previous-version>/ 
mv open-banking-backend open-banking-<previous-version>/ 
mv open-banking-apps open-banking-<previous-version>/ 
mv open-banking-analytics open-banking-<previous-version>/
```

Update your repo:

```bash
helm repo update 
```

Fetch only the Helm charts you want to upgrade: 

```bash
helm search repo axway-open-banking 
helm fetch axway-open-banking/open-banking-apim
helm fetch axway-open-banking/open-banking-apim-config
helm fetch axway-open-banking/open-banking-bankio-apps 
helm fetch axway-open-banking/open-banking-developer-portal  
helm fetch axway-open-banking/open-banking-backend-chart  
helm fetch axway-open-banking/open-banking-analytics  
```

Update `values.yaml` for each chart your are deploying to configure it to your target environment. Transpose your previously configured values where they are not expected to change (please review the `README.md` file for more information). 

```bash
tar xvf open-banking-developer-portal-1.x.x.tgz 
vi open-banking-developer-portal/values.yaml 

tar xvf open-banking-apim-1.x.x.tgz 
vi open-banking-apim/values.yaml

tar xvf open-banking-apim-config-1.x.x.tgz 
vi open-banking-apim/values.yaml

tar xvf open-banking-backend-chart-1.x.x.tgz
vi open-banking-backend/values.yaml

tar xvf open-banking-analytics-1.x.x.tgz
vi open-banking-analytics/values.yaml 

tar xvf open-banking-bankio-apps-1.x.x.tgz 
vi open-banking-bankio-apps/values.yaml
``` 

Execute the upgrade commands as required:

```bash
helm upgrade apim -n open-banking-apim open-banking-apim
helm upgrade apim-config -n open-banking-apim open-banking-apim-config 
helm upgrade developer-portal -n open-banking-developer-portal open-banking-developer-portal
helm upgrade bankio-apps -n open-banking-apps open-banking-bankio-apps
helm upgrade backend-services -n open-banking-backend open-banking-backend-chart
helm upgrade analytics -n open-banking-analytics open-banking-analytics
```