---
title: "Upgrade"
linkTitle: "Upgrade"
weight: 4
---

The use of Helm charts and Docker images greatly improves and simplifies the Amplify Open Banking upgrade process. With each new release, a new version of the Helm chart will also be released. This new version will have the latest images at the time of the release set as the default, along with any additional features or configuration that might have been added to the chart. If other images are released in between Helm chart releases, such as for patch or security fixes, it is up to the user to update their Helm configuration to pull these new images. The chart is not backward compatible, and you cannot use a new version of the chart and continue using older versions of the images.
<!--
## Prerequisites
While the actual process of upgrade is straightforward, there are some prerequisite steps that you must perform to prepare for the upgrade.
Primarily, it is critical that you backup your previous versions.
-->
## Steps

Backup your previous deployments if reusing the same directory:

```bash
mkdir previous-version
mv open-banking-apim             previous-version/ 
mv open-banking-apim-config      previous-version/
mv open-banking-backend          previous-version/
mv open-banking-acp              previous-version/
mv open-banking-consent          previous-version/
```

Update your repo:

```bash
helm repo update 
```

Pull only the Helm charts you want to upgrade:

```bash
helm search repo axway 
helm pull axway/open-banking-apim --untar       
helm pull axway/open-banking-apim-config --untar
helm pull axway/open-banking-backend --untar   
helm pull axway/open-banking-acp --untar   
helm pull axway/open-banking-consent --untar         
```

For each new Helm chart, update `open-banking-xxxxx/values.yaml` using the:

* Install documentation of the components.
* Previous values used in `previous-version/open-banking-xxxxx/value.yaml`.
* Release notes in `open-banking-xxxxx/README.md`.

Execute the upgrade commands as required:

```bash
helm upgrade apim -n open-banking-apim open-banking-apim
helm upgrade apim-config -n open-banking-apim open-banking-apim-config
helm upgrade backend-services -n open-banking-backend open-banking-backend-chart
helm upgrade acp -n open-banking-acp open-banking-acp
helm upgrade consent -n open-banking-consent open-banking-consent
```
