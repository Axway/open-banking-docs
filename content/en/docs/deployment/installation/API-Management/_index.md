---
title: "API Management Installation"
linkTitle: "API Management"
weight: 3
---
Install API Management for the Amplify Open Banking solution.

## Download the API Management (APIM) Helm charts

Download the Amplify Open Banking API Management (APIM) Helm charts to customize them locally.

### Financial Data Exchange (FDX)

```bash
helm pull axway/open-banking-fdx-apim --untar
helm pull axway/open-banking-fdx-apim-config --untar
```

You should get the `open-banking-fdx-apim` and `open-banking-fdx-apim-config` local folders.

### Open Finance Brazil

```bash
helm pull axway/open-banking-apim --untar
helm pull axway/open-banking-apim-config --untar
```

You should get the `open-banking-apim` and `open-banking-apim-config` local folders.

Follow the instructions in below subsections for more information on specific deployments.