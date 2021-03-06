---
title: "Upgrade"
linkTitle: "Upgrade"
weight: 4
---

If a new Open Banking API is released or an existing Open Banking API is updated you can perform an upgrade to the deployed application.

## API Management component prerequisites

If you are migrating from version 1.3 to 1.4, the API management component has been split into two Helm charts: `apim` for products and `apim-config` for configuration. In this case you must uninstall `apim`, verify it has been completely removed, and then install `apim` and `apim-config`.

If you are upgrading from an old version of the API management (APIM) component (before APIM Helm chart v1.7 ), it is necessary to upgrade the  Cassandra database from v2.x to v3.11 before upgrading the APIM package. Follow the <https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_upgrade/upgrade_cassandra/index.html> document.

## ACP component prerequisite

If you are upgrading the ACP components from previous releases before Helm chart v2.0, it is necessary to update the CockroachDB to v21.2 before you upgrade the acp package:

```bash
helm upgrade -n open-banking-acp acp acp/kube-acp-stack -f open-banking-acp/files/acp.values.yaml --version 0.15.3
```

Wait for all pods to be running and now uninstall the acp-prereq.

```bash
helm uninstall [ACP_PREREQ_RELEASE_NAME] -n [NAMESPACE]
```

## Steps

Backup your previous deployments if reusing the same directory:

```bash
mkdir previous-version
mv open-banking-apim             previous-version/ 
mv open-banking-apim-config      previous-version/
mv open-banking-developer-portal previous-version/
mv open-banking-backend-chart    previous-version/
mv open-banking-analytics        previous-version/
mv open-banking-bankio-apps      previous-version/
mv open-banking-acp              previous-version/
mv open-banking-consent          previous-version/
```

Update your repo:

```bash
helm repo update 
```

Pull only the Helm charts you want to upgrade:

```bash
helm search repo axway-open-banking 
helm pull axway-open-banking/open-banking-apim --untar       
helm pull axway-open-banking/open-banking-apim-config --untar     
helm pull axway-open-banking/open-banking-developer-portal --untar  
helm pull axway-open-banking/open-banking-backend-chart --untar   
helm pull axway-open-banking/open-banking-analytics --untar   
helm pull axway-open-banking/open-banking-bankio-apps --untar         
```

For each new Helm chart, update `open-banking-xxxxx/values.yaml` using the:

* Install documentation of the components.
* Previous values used in `previous-version/open-banking-xxxxx/value.yaml`.
* Release notes in `open-banking-xxxxx/README.md`.

Execute the upgrade commands as required:

```bash
helm upgrade apim -n open-banking-apim open-banking-apim
helm upgrade apim-config -n open-banking-apim open-banking-apim-config 
helm upgrade developer-portal -n open-banking-developer-portal open-banking-developer-portal
helm upgrade bankio-apps -n open-banking-apps open-banking-bankio-apps
helm upgrade backend-services -n open-banking-backend open-banking-backend-chart
helm upgrade analytics -n open-banking-analytics open-banking-analytics
```
