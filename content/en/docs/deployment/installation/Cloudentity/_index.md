---
title: "Cloudentity Installation"
linkTitle: "Cloudentity"
weight: 20
---

Install Cloudentity for the Amplify Open Banking solution. Cloudentity includes 2 components:

* Cloudentity
* Sample Consent Applications

{{% alert title="Note" color="primary" %}} Sample Consent applications are not developed for production usage. For more information please see deatils in [Component View](/docs/overview/technical/component).{{% /alert %}}

## Download the ACP Helm charts

Download the Amplify Open Banking ACP Helm charts to customize them locally.

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
