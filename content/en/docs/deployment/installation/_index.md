---
title: "Installation"
linkTitle: "Installation"
weight: 2
---

This guide describes how to install the Amplify Open Banking solution.

## Connect to the Axway Repository

You must have a Service Account with Axway in order to access the Helm chart and public images.

### Access the Helm chart

To access the Amplify Open Banking Helm charts, go to [Axway Repository](https://repository.axway.com/), and search for “Amplify Open Banking”, then check the helm chart box. The chart can be used directly from the repository, but you must fetch the chart first to see the `values.yaml` file.

### Add the Axway Helm repository

Add the helm repository:

```bash
helm repo add axway https://helm.repository.axway.com --username=<client_id> --password=<client_secret>
```

Once the registry is added, make sure you can see the open-banking packages:

```bash
helm repo update 
helm search repo axway
```

For each component, follow the install instructions.
