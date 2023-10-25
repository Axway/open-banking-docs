---
title: "Cloudentity Installation"
linkTitle: "Cloudentity"
weight: 20
---

Install Cloudentity for the Amplify Open Banking solution. Cloudentity component provides Identity and Access Management along with consent management.

Cloudentity includes 2 components:

* Cloudentity
* Sample Consent Applications

{{% alert title="Note" color="primary" %}} Sample Consent applications are not developed for production usage. For more information please see deatils in [Component View](/docs/overview/technical/component).{{% /alert %}}

## Fetch the Cloudentity Helm charts

Fetch the Amplify Open Banking Cloudentity Helm charts to view the `values.yaml` file.

```bash
helm fetch axway/open-banking-cloudentity --untar
helm fetch axway/open-banking-consent-apps --untar
```

You should get `open-banking-cloudentity` and `open-banking-consent-apps` local folders.

For each component, follow the instructions in the subsections below.
