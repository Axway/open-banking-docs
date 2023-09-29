---
title: "Open Finance Brazil API Management Configuration"
linkTitle: "Open Finance Brazil API Management"
weight: 2
---

## Customize the APIM Helm chart

Customize the `open-banking-apim/values.yaml` file as follows.

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
| global.smtpServer.host | Smtp server host. | None |
| global.smtpServer.port | Smtp server port. | None |
| global.smtpServer.username | Smtp server username. | None |
| global.smtpServer.password | Smtp server password. | None |
| global.smtpServer.protocol | Smtp server protocol as SSL, TLS, or None. | None |

<!--
TODO:
Add anm user and password change option. once https://jira.axway.com/browse/MED-472 and https://jira.axway.com/browse/MED-118 are solved

| anm.admin.username | API Gateway admin username | admin |
| anm.admin.password | API Gateway admin password | apiAdminPwd! |

Add apimgr  user and password change option. once https://jira.axway.com/browse/MED-835 is solved
| apimgr.admin.username | API Manager admin username | apiadmin |
| apimgr.admin.password | API Manager admin password | apiAdminPwd! |
-->

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

The Helm chart is delivered with an internal cassandra database that would work for non-production environments. You can change this parameter to use an external one. A Cassandra environment is required for production environments at minimum.

```yaml
cassandra:
   external: true
   adminName: "cassandra"
   adminPasswd: "cassandra"
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

{{% alert title="Note" color="primary" %}}The Oauth component is activated but ingress is not enabled. It is not required to create a certificate for this ingress. {{% /alert %}}

Refer to [Certificate Management](/docs/configuration/certificate-management) for configuring certificates for the entire solution.

### Defining the number of api traffic replicas

If it is necessary to adjust the number of API traffic replicas, you can adjust on the following parameters:

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| apitraffic.replicaCount | Number of initial replicas for API traffic. | 3 |
| apitraffic.autoscalling.enable | Enable the autoscaling feature. | true |
| apitraffic.maxreplicas | Maximum number of API traffic replicas. | 5 |

### Defining the information required for Open Banking Brazil

There are some specific information related to Open Banking Brazil for each institution. And it can be defined here:

| Value         | Description                           | Default value |
|:------------- |:------------------------------------- |:-------------- |
| bank.jwtsign.cert | Certificate of the bank used to sign the JWT. | None |
| bank.jwtsign.key | Private key of the bank used to sign the JWT. | None |
| bank.jwtkid | Bank certificate identification (JWKID). | None |

## Install the APIM Helm chart

1. Create the target namespace on the cluster:

   ```bash
   kubectl create namespace open-banking-apim
   ```

2. Install the APIM Helm charts:

   ```bash
   helm install apim open-banking-apim -n open-banking-apim
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
   * **jobs** with name db-create-mysql-apigw-xxx is **Completed**.

   ```console
      NAME                                 READY   STATUS         RESTARTS 
      anm-6d86b7dfbd-4wbnx                 1/1     Running        0 
      apimgr-544b55fffb-qsn87              1/1     Running        0 
      cassandra-0                          1/1     Running        0 
      db-create-mysql-apigw-379e224c-...   0/1     Completed      0 
      filebeat-analytics-86d588954b-lsx2p  1/1     Running        0 
      mysql-aga-757495f88f-vpw79           1/1     Running        0 
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

       * Login with username *admin* and password *apiAdminPwd!*
       * Check in the topology section that apimgr and traffic pods are available.

   * *API Manager* `https://api-manager.<domain-name>`.

       * Login with username *apiadmin* and password *apiAdminPwd!*
       * Check that API and Client configurations are empty for now.

## Customize the APIM configuration Helm chart

Customize the `open-banking-apim-config/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.domainName | Set the domainname for all ingress. | None |
| global.env | Set the default environment. |dev |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| apimcli.language | The language used to describe the APIs on API Manager. | pt-BR |
| apimcli.settings.email | Sender email address used in api-manager settings. | None |
| apimcli.users.publicApiUser | Username of user to access the Public APIs from the API Portal. | *publicuser* |
| apimcli.users.publicApiPassword | Password of user to access the Public APIs from the API Portal. | *publicUserPwd!* |
| backend.serviceincident.host | ServiceNow URL. | None|
| backend.serviceincident.username | ServiceNow username. |None|
| demoapp.bankio.clientId | The bankio client id. | None |
| demoapp.postman.clientId | The postman client id. |None|

## Install the APIM configuration Helm chart

1. Run the following command to install the APIM config Helm chart:

   ```bash
   helm install apim-config open-banking-apim-config -n open-banking-apim
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
   db-create-mysql-apigw-379e224c-...   0/1     Completed   0 
   filebeat-analytics-86d588954b-lsx2p  1/1     Running     0 
   import-api-27983c3f-...              0/1     Completed   0 
   mysql-aga-757495f88f-vpw79           1/1     Running     0 
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

1. To change the KPS:
   * The organization ID is different for each bank. Modify the Helm chart file `open-banking-apim-config/files/kps/kpsConfig1.json` to change the organizationId with your own bank/PSPSP ID.
   * Execute the following command:

   ```shell
   APIMGR_POD="$(kubectl get pod -n open-banking-apim -l app=apimgr -o jsonpath='{.items[0].metadata.name}')"
   ANM_INGRESS_NAME="$(kubectl get ingress -n open-banking-apim gatewaymanager -o jsonpath='{.spec.rules[0].host}')"
   # check variables APIMGR_POD and ANM_INGRESS_NAME are not empty
   echo $APIMGR_POD : $ANM_INGRESS_NAME
   ANM_USERNAME=admin
   ANM_PASSWORD='apiAdminPwd!'
   curl -k -X PUT -u "$ANM_USERNAME:$ANM_PASSWORD" \
        -H "Content-Type: application/json" \
        -d @open-banking-apim-config/files/kps/kpsConfig1.json \
        "https://${ANM_INGRESS_NAME}:443/api/router/service/${APIMGR_POD}/api/kps/cfg/1" 
   awk  -F '\t' '{ \
            if ($5==Y) {$5="true"} else {$5="false"}; \
            print "Create id"$1; \
       system("curl -k -X PUT -u \"'"${ANM_USERNAME}"':'"${ANM_PASSWORD}"'\" -H \"Content-Type: application/json\" 'https://${ANM_INGRESS_NAME}:443'/api/router/service/'${APIMGR_POD}'/api/kps/'mediciobie_endpoint'/"$1" -d '\''{\"id\":\""$1"\",\"category\":\""$2"\",\"name\":\""$3"\",\"segment\":\""$4"\",\"used\":"$5"}'\''")}' \
        "open-banking-apim-config/files/kps/obie_endpoint.txt"
   ```

2. Verify the insertion in the KPS table:
   * Log into the API Gateway Manager UI and go on Settings - Key Property Stores.
   * Click on AMPLIFY/Configuration.
   * Check that the column **k_values** is not empty. Click on it to check the details.
