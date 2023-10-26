---
title: "Open Finance Brazil API Management Configuration"
linkTitle: "Open Finance Brazil API Management"
weight: 2
---

## Configure API Gateway

Once the installation is complete following the instructions at [Install API Gateway using your customized YAML file](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_containers/deployment_flows/axway_image_deployment/helm_deployment/index.html#install-api-gateway-using-your-customized-yaml-file), mount the FDX policies and configuration files using the below steps.

### Download the API Gateway configuration files

To download the Amplify Open Banking API Management configuration package for OBB deployment, go to [Axway Repository](https://repository.axway.com/) and search for “Amplify Open Banking.” Check the `Utility` box and download the `apigateway-config-obb-7.7.0.20xxxxxx-BNxx.tar.gz` file.

After the download is finished, extract the archive's contents:

```bash
tar -xzf apigateway-config-obb-7.7.0.20xxxxxx-BNxx.tar.gz
```

This command creates a directory `apigateway-config-obb-7.7.0.20xxxxxx-BNxx` containing the following sub-directories and files:

```
apigateway-config-obb-7.7.0.20xxxxxx-BNxx
├── PS-Projects
│   └── OBB-YAML            #directory containing policy configuration in YAML format
├── README.md
├── merge                   #merge directory containing API Gateway configuration files
│   ├── apigateway
│   └── mandatoryFiles
└── sample                  #sample scripts
    └── mount_config.sh     #import KPS configuration
```

`PS-Projects/OBB-YAML` directory contains the policies created using [YAML configuration](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_yamles/index.html).

### Prepare values.yaml for the deployment

As some of the variables are defined in the `PS-Projects/OBB-YAML/values.yaml` file, you must update it before deployment. It is recommended to copy the `PS-Projects/OBB-YAML/values.yaml` to `local_values/OBB-YAML/values.yaml` and then make changes in it.

```bash
cp apigateway-config-obb-7.7.0.20xxxxxx-BNxx/PS-Projects/OBB-YAML/values.yaml local_values/OBB-YAML/values.yaml
```


### Mount the OBB Configuration

Make sure that API Gateway pods (i.e. anm, apimgr, apitraffic) are in running state and then execute the following commands:

```bash
cd apigateway-config-obb-7.7.0.20xxxxxx-BNxx/sample
./mount_config.sh -p OBB
cd -
```

The above script deploys YAML archive and other configuration files from `merge` directory to `gw-external-config` volume mount in K8S cluster. Before building the YAML archive it replaces `apigateway-config-obb-7.7.0.20xxxxxx-BNxx/PS-Projects/OBB-YAML/values.yaml` with `local_values/OBB-YAML/values.yaml`, which contains the actual values for the target environment.

## Configure API Manager

To configure API Manager (i.e. to create Organizations, APIs, applications and import KPS data), use the `open-banking-apim-config` helm chart. During installation it creates Organizations, sample applications and OBB APIs. It also imports data in the KPS tables.

### Change apiadmin user password

Log in to the API Manager UI to change the default password of `apiadmin` user. It is required for the successful execution of the below steps.

### Fetch the Helm chart to examine the values file

Run a `helm fetch` command on the added repository to view the Helm `values.yaml` file:

```bash
helm fetch axway/open-banking-apim-config --untar
```

This command creates a directory `open-banking-apim-config` containing the complete chart, including the `values.yaml` file.

### Customize the APIM configuration Helm chart

Customize the `open-banking-apim-config/values.yaml` file as follows:

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.domainName | Set the domainname for all ingress. | None |
| global.env | Set the default environment. | prod |
| global.dockerRegistry.url | URL for the docker registry. | None |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| anm.admin.username | API Gateway admin username. | admin |
| anm.admin.password | API Gateway admin password. | |
| apimgr.admin.username | API Manager admin username. | apiadmin |
| apimgr.admin.password | API Manager admin password. | |
| demoapp.bankio.clientId | The bankio demo apps client id. | bankio |
| demoapp.postman.clientId | The postman client id. | postman |

### Install the APIM configuration Helm chart

1. Run the following command to install the APIM config Helm chart:

   ```bash
   helm install apim-config open-banking-apim-config -n open-banking-apim
   ```

2. Check that the status of the Helm command is deployed:

   ```
   NAME: apim-config 
   LAST DEPLOYED: <current date and time>
   NAMESPACE: open-banking-apim 
   STATUS: deployed
   REVISION: 1 
   TEST SUITE: None
   ```

### Verify the APIM configuration Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status:

   ```bash
   kubectl get pods -n open-banking-apim 
   ```

2. Verify that:
   * **jobs** with name import-api-27983c3f-xxx  are **Completed**:

   ```
   NAME                                 READY   STATUS      RESTARTS 
   anm-6d86b7dfbd-4wbnx                 1/1     Running     0 
   apimgr-544b55fffb-qsn87              1/1     Running     0
   import-api-27983c3f-...              0/1     Completed   0
   traffic-5d986c7d55-cv6dv             1/1     Running     0
   ```

3. Check API Manager `https://api-manager.<domain-name>`:
    * Refresh or log in again.
    * Make sure that Open Banking APIs are in the API Catalog.
    * Make sure that Default apps are in Client applications.


## Post deployment


### Update KPS configuration

Fetch the new kps-config module

```bash
helm fetch axway/open-banking-kps-config --untar
```

This command creates a directory `open-banking-kps-config` containing the complete chart, including the `values.yaml` file.

### Customize the KPS Config Helm chart

Customize the `open-banking-apim-config/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| gateway.user | The Gateway Manager user. | admin |
| gateway.password | The Gateway manager password. | changeme |
| gateway.name | The deployment name. | open-banking-gateway |
| gateway.ingress | The Gateway Manager URL. | api-gateway-manager.<domain> |
| gateway.apimPodName | APIM Pod name. | apim-apimanager-<ID> |
| kps.env.config | KPS Configuration | Usually this won't change often |

Verify the insertion in the KPS table:
   * Log into the API Gateway Manager UI and go on Settings - Key Property Stores.
   * Click on AMPLIFY/Configuration.
   * Check that the table is not empty. Click on table rows to chech details.

