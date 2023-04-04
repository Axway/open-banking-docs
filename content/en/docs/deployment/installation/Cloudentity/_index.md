---
title: "Cloud Entity Installation"
linkTitle: "Cloud Entity"
weight: 20
---

Install Cloud Entity for the Amplify Open Banking solution. Cloud Entity includes 2 components:
* Authorization Control Plane
* Sample Consent Applications

{{% alert title="Note" color="primary" %}} Sample Consent applications are not developed for production usage. For more information please see deatils in [Component View](/docs/overview/technical/component).{{% /alert %}}

## Download the Cloud Entity Helm charts

Download the Amplify Open Banking Cloud Entity Helm charts to customize them locally.

### Financial Data Exchange (FDX)

```bash
helm pull axway/open-banking-fdx-acp --untar
helm pull axway/open-banking-fdx-consent-apps --untar
```
You should get `open-banking-fdx-acp` and `open-banking-fdx-consent-apps` local folders.

### Open Finance Brazil

```bash
helm pull axway/open-banking-acp --untar
helm pull axway/open-banking-consent --untar
```

You should get `open-banking-acp` and `open-banking-consent` local folders.

For each component, follow the instructions in the subsections below.
