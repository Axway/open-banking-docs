---
title: "Installation"
linkTitle: "Installation"
weight: 2
description: Installing the Axway Open Banking solution
---

This guide describes how to install the Axway Open Banking solution.

## Connect to the Axway Repository

To install the solution, add the Axway Repository to your Helm configuration:

```bash
helm repo add axway-open-banking \ 
https://docker-registry.demo.axway.com/chartrepo/open-banking \ 
--username="<use the token name>" \ 
--password="<use your private token here>"   
```

{{% alert title="Note" color="primary" %}}If your token name starts with `robot$` , you should type `robot\$` if your running the command from Linux or MacOs, and you should type `robot``$` if you are using Windows Powershell.{{% /alert %}}

Once the registry is added, make sure you can see the open-banking packages:

```bash
helm repo update 
helm search repo axway-open-banking
```

For each component, follow the install instructions.
