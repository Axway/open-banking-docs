---
title: "FDX API Management Configuration"
linkTitle: "FDX API Management"
weight: 1
---
## Configure API Gateway

Once installation is complete, following the instructions at [Install API Gateway using your customized YAML file](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_installation/apigw_containers/deployment_flows/axway_image_deployment/helm_deployment/index.html#install-api-gateway-using-your-customized-yaml-file), and mount the FDX policies and configuration files using the below steps.

### Download the API Gateway configuration files

To download the Amplify Open Banking API Management configuration package for FDX deployment, go to [Axway Repository](https://repository.axway.com/), and search for “Amplify Open Banking”, then check the `Utility` box. Then download the `apigateway-config-fdx-7.7.0.20xxxxxx-BNxx.tar.gz` file.

After the download is finished, extract the archive's contents.

```bash
tar -xzf apigateway-config-fdx-7.7.0.20xxxxxx-BNxx.tar.gz
```

This command creates a directory `apigateway-config-fdx-7.7.0.20xxxxxx-BNxx` containing following sub-directories and files.

```
apigateway-config-fdx-7.7.0.20xxxxxx-BNxx
├── PS-Projects
│   └── FDX-YAML            #directory containing policy configuration in YAML format
├── README.md
├── merge                   #merge directory containing API Gateway configuration files
│   ├── apigateway
│   └── mandatoryFiles
└── sample                  #sample scripts
    ├── kps_import.sh       #deploy YAML config and merge dir
    └── mount_config.sh     #import KPS configuration
```

`PS-Projects/FDX-YAML` directory contains the policies created using [YAML configuration](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_yamles/index.html).

### Prepare values.yaml for the deployment

As some of the variables are defined in `PS-Projects/FDX-YAML/values.yaml` file, you must update it before deployment. it is recommendation to copy the `PS-Projects/FDX-YAML/values.yaml` to `local_values/FDX-YAML/values.yaml` and then make changes in it.

```bash
cp apigateway-config-fdx-7.7.0.20xxxxxx-BNxx/PS-Projects/FDX-YAML/values.yaml local_values/FDX-YAML/values.yaml
```

The following parameters are required for FDX deployment, so update the `local_values/FDX-YAML/values.yaml` file.

| Value         | Description                           | Default value  | Example |
|:------------- |:------------------------------------- |:-------------- |:--------|
| Environment_Configuration.Service.ACP_Host.name | Host on which Cloudentity is running. | acp.open-banking-cloudentity |  |
| Environment_Configuration.Service.ACP_Host.port | Port where Cloudentity is running. | 8443 |  |
| Environment_Configuration.Service.apimgr.name | Endpoint where API Manager is running. | api-manager-host | api-manager.open-banking.axway.com |
| Environment_Configuration.Service.apimgr.port | Post at which API Manager is running. | 443 | |
| Policies._AMPLIFY_OB_FDX.Mock.Login_Page.PAGE_login.Set_var_demo_apps_enabled.attributeValue | Set to `true` if demo-apps are deployed. | false | |
| Policies._AMPLIFY_OB_FDX.Mock.Login_Page.PAGE_login.Set_demo_apps_url.attributeValue | Endpoint where demo apps are running. If not deploying demo apps component then keep the default. | `https://demo-apps.\<domain-name\>` | `https://demo-apps.open-banking.axway.com` |

### Mount the FDX Configuration

Make sure that API Gateway pods (i.e., anm, apimgr, apitraffic) are in running state and then execute the following commands:

```bash
cd apigateway-config-fdx-7.7.0.20xxxxxx-BNxx/sample
./mount_config.sh -p FDX
cd -
```

The above script deploys YAML archive and other configuration files from `merge` directory to `gw-external-config` volume mount in K8S cluster. Before building the YAML archive, it replaces `apigateway-config-fdx-7.7.0.20xxxxxx-BNxx/PS-Projects/FDX-YAML/values.yaml` with `local_values/FDX-YAML/values.yaml`, which contains the actual values for the target environment.

## Configure API Manager

To configure API Manager (i.e., to create Organizations, APIs, applications and import KPS data), use the `open-banking-fdx-apim-config` helm chart. During installation it creates Organizations, sample applications and FDX APIs. It also imports data in the KPS tables.

### Change apiadmin user password

Log in to the API Manager UI to change the default password of `apiadmin` user. It is required for successful execution of the below steps.

### Fetch the Helm chart to examine the values file

Run a `helm fetch` command on the added repository to view the Helm `values.yaml` file:

```bash
helm fetch axway/open-banking-fdx-apim-config --untar
```

This command creates a directory `open-banking-fdx-apim-config` containing the complete chart, including the `values.yaml` file.

### Customize the APIM configuration Helm chart

Customize the `open-banking-fdx-apim-config/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.domainName | Set the domainname for all ingress. | None |
| global.env | Set the default environment. | prod |
| global.dockerRegistry.url | URL for the docker registry. | None |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| anm.admin.username | API Gateway admin username | admin |
| anm.admin.password | API Gateway admin password | |
| apimgr.admin.username | API Manager admin username | apiadmin |
| apimgr.admin.password | API Manager admin password | |
| demoapp.bankio.clientId | The bankio demo apps client id. | bankio |
| demoapp.postman.clientId | The postman client id. | postman |

### Install the APIM configuration Helm chart

1. Run the following command to install the APIM config Helm chart:

   ```bash
   helm install apim-config open-banking-fdx-apim-config -n open-banking-apim
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

1. Wait a few minutes and use the following commands to check the deployment status.

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

4. Check KPS data in API Gateway Manager `https://api-gateway-manager.<domain-name>`:
    * Log in and go to *Settings - Key Property Stores*.
    * Make sure that `Configuration` and `Error` tables are not emplty.

## Post deployment

This post deployment step is only applicable if you have changed the default ports, client ids, client secrets, etc. during the [Cloudentity](/docs/deployment/installation/cloudentity/acp) or [Consent Apps](/docs/deployment/installation/cloudentity/consent-apps) deployment.

### Update KPS configuration

To update configurations in the `cfg` KPS table:

1. Get the KPS configuration table data file from the Helm chart:
   * Configuration table KPS data file is `open-banking-fdx-apim-config/files/kps/amplify_configuration.json`.
   * Update it with the values specific to your deployment.

2. You can use the sample script `kps_import.sh` provided in `apigateway-config-fdx-7.7.0.20xxxxxx-BNxx.tar.gz` package to import data in KPS. Example usage is:

   ```bash
   kps_import.sh -a api-gateway-manager.<domain-name> -i traffic-5dbc49dfd8-6mdnt -f amplify_configuration.json -t cfg -u admin -p password"
   ```

3. Verify the insertion in the KPS table:
   * Log in to the API Gateway Manager UI and go to *Settings - Key Property Stores*.
   * Click on AMPLIFY/Configuration and make sure that the data is updated.
