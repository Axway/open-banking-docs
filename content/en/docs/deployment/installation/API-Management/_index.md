---
title: "API Management Installation"
linkTitle: "API Management"
weight: 3
---
Install API Management for the Amplify Open Banking solution. This guide should be used in conjunction with [Helm Deployment](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_containers/deployment_flows/axway_image_deployment/helm_deployment/index.html) instructions for API Gateway installation.

## Deploy a Cassandra cluster

Follow the cassandra deployment steps outlined [Deploy a Cassandra cluster](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_containers/deployment_flows/axway_image_deployment/helm_deployment/index.html#deploy-a-cassandra-cluster).

## Fetch the Helm chart to examine the values file

To be able to view the Helm `values.yaml` file you can run a `helm fetch` command on the added repository:

```bash
helm fetch axway/open-banking-apim --untar
```

This command creates a directory `open-banking-apim` containing the complete chart, including the `values.yaml` file.

## Create a customized values.yaml file

Create a customized `values` file, for example, `myvalues.yaml`, and make your customizations. This file should contain only the sections of the `values.yaml` file that you wish to override. Any values not present in the customized file will be picked up from the original `values.yaml` file.

Additional details about customizing values.yaml are available [Create a customized values.yaml file](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_containers/deployment_flows/axway_image_deployment/helm_deployment/index.html#create-a-customized-valuesyaml-file).

### Open Banking parameters

The following parameters are required for any openbanking deployment.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| openbanking.enabled | Enable or disable openbanking deployment | true |
| openbanking.standard | Set the Open Banking specification or standard | FDX |

### Sample customized values file

Click [openbanking_sample_values.yaml](/samples/apimanagement/openbanking_sample_values.yaml) to download an example of a customized `myvalues.yaml` file.

### Install API Gateway using your customized YAML file

To install API Gateway using your customized YAML file, follow the installation instructions from [Install API Gateway using your customized YAML file](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_containers/deployment_flows/axway_image_deployment/helm_deployment/index.html#install-api-gateway-using-your-customized-yaml-file).

When installation is finished, go to the instructions in the subsections below for more details on particular deployments.
