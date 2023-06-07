---
title: "FDX API Management Installation"
linkTitle: "FDX API Management"
weight: 1
---

## Customize the APIM Helm chart

Customize the `open-banking-fdx-apim/values.yaml` file as follows.

### Base parameters

The following parameters are required for any deployment.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.platform | Select the platform to configure appropriate objects (like storage for RWM). <br>Possible values are AWS, AZURE, MINIKUBE. | None |
| global.domainName | Set the domainname for all ingress. | None |
| global.env | Set the default environment. | dev |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| global.denyDemoLogin | Disables the demo login idp. It should be disabled on the customer environment. | false |
| global.awsVolumeHandle | Value available only for AWS | None |
| anm.admin.username | API Gateway admin username | admin |
| anm.admin.password | API Gateway admin password | None |
| apimgr.admin.username | API Manager admin username | apiadmin |
| apimgr.admin.initPassword | API Manager initial admin password | None |
| apimgr.admin.password | API Manager admin password | None |

With these base parameters set, you can install the Helm chart. See [Install the APIM Helm chart](#install-the-apim-helm-chart).

This deployment uses cert-manager and the [Let's Encrypt](https://letsencrypt.org) issuer to provide certificates. This requires an ingress controller (nginx) that listens on a public IP. You must replace the certificates provided with the sample Helm chart with your own certificates.

You can also customize the chart values with the following sub-sections.

### Product license

A temporary license file is embedded in the default Docker image.

This license key has a lifetime to two months maximum.

This license is perfect for a demo or a proof of concept but another license key must be added for production environments.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.apimLicense | Insert your license key. An example is in the default value file. | None |

### External Cassandra

According to the reference architecture, the Cassandra database is external to the cluster. Change the following values according to the cassandra configuration.

The Helm chart is delivered with an internal cassandra database that would work for non-production environments. You can change this parameter to use an external one. A 3 node Cassandra HA setup is required for production environments at minimum.

```yaml
cassandra:
   external: true
   adminName: "cassandra"
   adminPasswd: ""
   host1: "cassandra"
   host2: "cassandra"
   host3: "cassandra"
```

Refer to the [Administer Apache Cassandra](https://docs.axway.com/bundle/axway-open-docs/page/docs/cass_admin/index.html) in the API Management documentation to configure and manage the Apache Cassandra database for API Gateway and API Manager.

### Root CA for MTLS clients

Optionally, you can add a new root CA for MTLS ingress during the first deployment.

The mutual authentication is provided by Nginx. It requires a Kubernetes secret that contains all rootCA used for client certificates (used by TPPs).

The different root CA certificates must be concatenated and encoded in base64.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| apitraffic.ingressMtlsRootCa | All concatenated root CA encoded in base64. | yes |

### Customize storage class

Only if needed, you can change the storage class.

The APIM deployment needs a storage class in Read/Write Many. A custom storage class can be set if the cluster does not use the standard deployment for Azure, AWS, or if the deployment is on a vanilla Kubernetes.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| Global.customStorageClass.scrwm | Allow to specify a storage class to mount a “Read Write Many” volume on pod.<br>It is used to share metrics between monitoring and analytics. | None |

### Specify a Wildcard certificate

If you do not use cert-manager for your cluster, you can specify a unique certificate for all ingress of this chart.

It is possible to use a custom wildcard certificate by changing the values listed below. Make sure to provide the full chain of the certificate in the cert field.

```yaml
global:
   ingress:
      certManager: false
      wildcard: true
      cert: |
         -----BEGIN CERTIFICATE-----
         <base64-encoded certificate>
         -----END CERTIFICATE-----
         -----BEGIN CERTIFICATE-----
         <base64-encoded certificate>
         -----END CERTIFICATE-----
         ...

      key: |
         -----BEGIN RSA PRIVATE KEY-----
         <base64-encoded key>
         -----END RSA PRIVATE KEY-----
```

Refer to [Certificate Management](/docs/configuration/certificate-management) for configuring certificates for the entire solution.

### Specify different certificates

If you do not use cert-manager for your cluster, you can specify a certificate for each ingress of this chart.

It is possible to define a different certificate for each ingress by changing the values listed below. Keep an empty line after the key or the certificate.

```yaml
global:
   ingress:
      certManager: false
      wildcard: false
anm:
   ingressCert: ...
   ingressKey: ...
apimgr: 
   ingressCert: ...
   ingressKey: ... 
apitraffic:
   ingressCert: ...
   ingressKey: ...
   ingressCertMtls: ...
   ingressKeyMtls: ...
   ingressCertHttps: ...
   ingressKeyHttps: ...
```

Insert each cert and key with the following format (same indent and empty lines):

```yaml
   ingressCert: |
      -----BEGIN CERTIFICATE-----
      < insert here base64-encoded certificate >
      -----END CERTIFICATE-----
      -----BEGIN CERTIFICATE-----
      < insert here base64-encoded certificate >
      -----END CERTIFICATE-----

   ingressKey: |
      -----BEGIN RSA PRIVATE KEY-----
      < insert here base64-encoded key >
      -----END RSA PRIVATE KEY----- 

```

{{% alert title="Note" color="primary" %}}The OAuth component is activated but ingress is not enabled. It is not required to create a certificate for this ingress. {{% /alert %}}

Refer to [Certificate Management](/docs/configuration/certificate-management) for configuring certificates for the entire solution.

### Defining the number of api traffic replicas

If it is necessary to adjust the number of API traffic replicas, you can adjust on the following parameters:

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| apitraffic.replicaCount | Number of initial replicas for API traffic. | 3 |
| apitraffic.autoscalling.enable | Enable the autoscaling feature. | true |
| apitraffic.maxreplicas | Maximum number of API traffic replicas. | 5 |

## Install the APIM Helm chart

1. Create the target namespace on the cluster:

   ```bash
   kubectl create namespace open-banking-apim
   ```

2. Install the APIM Helm charts:

   ```bash
   helm install apim open-banking-fdx-apim -n open-banking-apim
   ```

3. Check that the status of the Helm command is deployed:

   ```console
      NAME: apim 
      LAST DEPLOYED: <current date and time>
     NAMESPACE: open-banking-apim 
     STATUS: deployed 
      REVISION: 1 
     TEST SUITE: None
   ```

## Verify the APIM Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```bash
   kubectl get pods -n open-banking-apim 
   ```

2. Verify that:
   * **pods** with name anm-xxx-xxx, apimgr-xxx-xxx, traffic-xxx-xxx, cassandra-0 are **Running** and Restart is **0**.

   ```console
      NAME                                 READY   STATUS         RESTARTS 
      anm-6d86b7dfbd-4wbnx                 1/1     Running        0 
      apimgr-544b55fffb-qsn87              1/1     Running        0 
      cassandra-0                          1/1     Running        0
      traffic-5d986c7d55-cv6dv             1/1     Running        0
   ```

3. Check all ingress with this command:

   ```bash
   kubectl get ingress -n open-banking-apim 
   ```

4. Verify that these ingress are provisioned. They must have a public ip or a dns value in the ADDRESS column.

   ```console
      NAME            HOSTS                               ADDRESS                        PORTS 
      apimanager      api-manager.<domain-name>           xxxxxxxxxxxxx.amazonaws.com    80, 443 
      gatewaymanager  api-gateway-manager.<domain-name>   xxxxxxxxxxxxx.amazonaws.com    80, 443 
      oauth           oauth.<domain-name>                 xxxxxxxxxxxxx.amazonaws.com    80, 443
      traffic         api.<domain-name>                   xxxxxxxxxxxxx.amazonaws.com    80, 443 
      traffichttps    services-api.<domain-name>          xxxxxxxxxxxxx.amazonaws.com    80, 443 
      trafficmtls     mtls-api.<domain-name>              xxxxxxxxxxxxx.amazonaws.com    80, 443
   ```
5. Check that you can access the following user interfaces:
   * *API Gateway Manager* `https://api-gateway-manager.<domain-name>`.

       * Login with username *admin* and password set during deployment.
       * Check in the topology section that apimgr and traffic pods are available.

   * *API Manager* `https://api-manager.<domain-name>`.

       * Login with username *apiadmin* and initial password. you will be prompted to change the password on first login.
       * Check that API and Client configurations are empty for now.

## Customize the APIM configuration Helm chart

Customize the `open-banking-fdx-apim-config/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.domainName | Set the domainname for all ingress. | None |
| global.env | Set the default environment. |dev |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| apimcli.language | The language used to describe the APIs on API Manager. | en-EN |
| anm.admin.username | API Gateway admin username | admin |
| anm.admin.password | API Gateway admin password | |
| apimgr.admin.username | API Manager admin username | apiadmin |
| apimgr.admin.password | API Manager admin password | |
| apimcli.settings.email | Sender email address used in api-manager settings. | None |
| demoapp.bankio.clientId | The bankio demo apps client id. | None |
| demoapp.postman.clientId | The postman client id. |None|

## Install the APIM configuration Helm chart

1. Run the following command to install the APIM config Helm chart:

   ```bash
   helm install apim-config open-banking-fdx-apim-config -n open-banking-apim
   ```

2. Check that the status of the Helm command is deployed:

   ```
   NAME: apim-config 
   LAST DEPLOYED: <current date and time>
   NAMESPACE: open-banking-config 
   STATUS: deployed
   REVISION: 1 
   TEST SUITE: None
   ```

## Verify the APIM configuration Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n open-banking-apim 
   ```

2. Verify that:
   * **jobs** with name import-api-27983c3f-xxx  are **Completed**:

   ```
   NAME                                 READY   STATUS      RESTARTS 
   anm-6d86b7dfbd-4wbnx                 1/1     Running     0 
   apimgr-544b55fffb-qsn87              1/1     Running     0 
   cassandra-0                          1/1     Running     0
   import-api-27983c3f-...              0/1     Completed   0
   traffic-5d986c7d55-cv6dv             1/1     Running     0
   ```

3. Check API Manager `https://api-manager.<domain-name>`:
    * Refresh or login again.
    * Make sure that Open Banking APIs are in the API Catalog.
    * Make sure that Default apps are in Client applications.

## Post deployment

Once the APIM and [Cloudentity](/docs/deployment/installation/cloudentity) Helm charts are deployed, update the KPS configuration as follows to integrate the components together.

### Update KPS configuration

You need to import some configurations in the Key Properties Store (KPS). They are used in policies for consent flows.

1. Get the KPS configuration and error table data files from the helmchart:
   * Configuration Table KPS data file is `open-banking-apim-config/files/kps/amplify_configuration.json`
   * Error Table KPS data file is `open-banking-apim-config/files/kps/amplify_error.json`

2. You can use the below sample script to import data in KPS.

   ```shell
   #!/bin/bash

   function usage {
       echo "NAME"
       echo "       ./loadKPS.sh"
       echo ""
       echo "SYNOPSIS"
       echo "       loadKPS.sh -a <ANM host name> -i <Instance Id> -f <path of kps data file> -t <KPS table alias> -u <API Gateway admin> -p <API Gateway Admin user password>"
       echo ""
       echo "      -h : Display usage."
       echo ""
       echo "EXAMPLE"
       echo "      loadKPS.sh -a api-gateway-manager.<domain-name> -i traffic-5dbc49dfd8-6mdnt -f amplify_configuration.json -t cfg -u admin -p password"
       echo "      loadKPS.sh -a api-gateway-manager.<domain-name> -i traffic-5dbc49dfd8-6mdnt -f amplify_error.json -t err -u admin -p password"
       echo ""
       exit 1
   }

   #####################################
   #              M A I N              #
   #####################################
   while getopts a:i:f:t:u:p:h opt; do
      case $opt in
         a) ANM=${OPTARG} ;;
         i) INSTANCE=${OPTARG} ;;
         f) FILE=${OPTARG} ;;
         t) TABLEALIAS=${OPTARG} ;;
         u) USERNAME=${OPTARG} ;;
         p) PASSWORD=${OPTARG} ;;
         h) usage; exit ;;
         :) echo "[ERROR] -${opt} requires an argument."
            usage; exit 1 ;;
         *) usage; exit 1 ;;
      esac
   done

   if [[  $# -eq 0 || $1 == "-h" ]]
   then
     usage
     exit 1
   fi

   if [[ -z "${ANM}" ]]; then
     echo "Please provide the target ANM host name to -a"
     echo "Stopping now."
     exit 1
   fi

   if [[ -z "${INSTANCE}" ]]; then
     echo "Please provide the instance id with -i"
     echo "Stopping now."
     exit 1
   fi

   if [[ -z "${FILE}" ]]; then
     echo "Please provide the KPS data file with -f"
     echo "Stopping now."
     exit 1
   fi

   if [[ -z "${USERNAME}" ]]; then
     echo "Please provide the ANM username with -u"
     echo "Stopping now."
     exit 1
   fi

   if [[ -z "${PASSWORD}" ]]; then
     echo "Please provide the ANM password with -p"
     echo "Stopping now."
     exit 1
   fi

   if [[ -z "${TABLEALIAS}" ]]; then
     echo "Please provide the KPS table alias with -t"
     echo "Stopping now."
     exit 1
   fi

   jq -c '.[]' ${FILE} | while read i; do
       id=`echo $i | jq --raw-output '.a_id'`
       echo "$id"
       curl -k --location --request PUT https://${ANM}/api/router/service/${INSTANCE}/api/kps/${TABLEALIAS}/${id} -u "${USERNAME}:${PASSWORD}" --header 'Content-Type: application/json' --data-raw $i
       echo "================================================="
   done

   ```

3. Verify the insertion in the KPS table:
   * Log into the API Gateway Manager UI and go on Settings - Key Property Stores.
   * Click on AMPLIFY/Configuration and make sure that data exist in it.
   * Click on AMPLIFY/Error and make sure that data exist in it.
