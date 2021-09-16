---
title: "APIM Management Installation"
linkTitle: "APIM"
weight: 1
description: Installing APIM component of the Axway Open Banking solution
---


## Download Helm chart

Download Axway Open Banking APIM Helm charts to customize them locally

```bash
helm pull axway-open-banking/open-banking-apim --untar
helm pull axway-open-banking/open-banking-apim-config --untar
```

You should get open-banking-apim and open-banking-apim-config local folders.

## Customize APIM Helm chart

Customize the open-banking-apim/values.yaml file as follow

### Minimal parameters required

The following parameters are required for any deployment. This deployment use cert-manager and let's encrypt issuer to provide certificates. This deployment requires to have an ingress controller (nginx) that listen on a public IP.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.platform | select the platform to configure appropriate objects like storage for RWM. Possible values are AWS, AZURE, MINIKUBE | None |
| global.domainName | set the domainname for all ingress. | None |
| global.env | Set the default environment |dev |
| global.dockerRegistry.url | URL of the Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking/apim |
| global.dockerRegistry.username | Login of user that as been created for you. | None |
| global.dockerRegistry.token | Token of user that as been created for you. | None |
| global.smtpServer.host | Smtp server host | None |
| global.smtpServer.port | Smtp server port | None |
| global.smtpServer.username | Smtp server username | None |
| global.smtpServer.password | Smtp server password | None |
| apimcli.settings.email | email used in api-manager settings |None |
| backend.serviceincident.host| ServiceNow URL|None|
| backend.serviceincident.username| ServiceNow username |None|
| backend.serviceincident.password| ServiceNow password |None|

### Product licence

A temporary license file is embedded in the default docker image.
This license key has a lifetime to 2 months maximum.
This license is perfect for a demo or a POC but another License key must be added for real environments.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.apimLicense | Insert your license key. An example is in the default value file. | None |

### Externalize Cassandra database (Required for production environment)

According to the reference architecture, database must be external to the cluster. Change the following values according to the cassandra configuration. Please follow the Axway documentation to create the Cassandra cluster.

```yaml
cassandra:
   external: true
   adminName: "cassandra"
   adminPasswd: "cassandra"
   host1: "cassandra"
   host2: "cassandra"
   host3: "cassandra"
```

### Add new root CA for MTLS ingress (Optional)

The mutual authentication is provided by Nginx. It requires a Kubernetes secret that contains all rootCA used to signed your tpp cert.
The differents root CA certificats must be concatenate and encoded in base64.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| apitraffic.ingressMtlsRootCa | all concatenate root CA encoded in base64 | yes |

### Customize storage class (Optional)

The APIM deployment needs a storage class in Read/Write Many. A custom storage class can be setted if the cluster doesn't use the standard deployment for Azure, AWS or if the deployment is on a vanilla Kubernetes.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| Global.customStorageClass.scrwm | Allow to specify a storageclass to mount a “Read Write Many” volume on pod. It’s used to share metrics between monitoring and analytics. | None |

### Use a Wildcard certificate for all ingress (Optional)

It's possible to use a custom wildcard certifcate. change values listed below. Note: the cert field must contains the full chain.

```yaml
global:
   ingress:
      certManager: false
      wildcard: true
      cert: |
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded certificate>>
         -----END CERTIFICATE-----
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded certificate>>
         -----END CERTIFICATE-----
         ...

      key: |
         -----BEGIN RSA PRIVATE KEY-----
         <<insert here base64-encoded key>>
         -----END RSA PRIVATE KEY-----
```

### Use a different custom certificate for ingress (Optional)

It's possible to define a different certificate for each ingress. Change values listed below. keep an empty line after the key or the certificate.

```yaml
global:
   ingress:
      certManager: false
      wildcard: false

anm:
   ingressCert: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKey: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----

apimgr:
   ingressCert: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKey: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----

apitraffic:
   ingressCert: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKey: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----

   ingressCertMtls: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKeyMtls: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----

   ingressCertHttps: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKeyHttps: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----
```

> Note : Oauth component is activated but ingress isn't enabled. It's not required to create a certificate for this ingress.

### Configure Amplify Agents (Optional)

The following values must be set to reports API and their usage on the **Amplify platform**. Note that Private Key and Public Key must be encoded in base64.

```
amplifyAgents:
   enabled: true
   centralAuthClientID:
   centralOrgID: 
   centralEnvName: 
   centralTeam: 
   #Private and Public keys of the service account on Central. Need to encode in base64 the value
   centralPrivateKey:
   centralPublicKey:
```

## Install APIM Helm chart

Create the target namespaces on the cluster:

```bash
kubectl create namespace open-banking-apim
```

Install the APIM  helm charts:

```bash
helm install apim open-banking-apim -n open-banking-apim
```

Check that the status of the helm command is deployed:

>NAME: apim \
>LAST DEPLOYED: Fri Apr 16 07:36:35 2021 \
>NAMESPACE: open-banking-apim \
>STATUS: **deployed** \
>REVISION: 1 \
>TEST SUITE: None

### Verifications

Wait a few minutes and use the following commands to check the status of the deployment.

```
kubectl get pods -n open-banking-apim \
```

>NAME &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; READY &nbsp; STATUS &nbsp; &nbsp; &nbsp;  &nbsp;RESTARTS \
>anm-6d86b7dfbd-4wbnx &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1/1 &nbsp; &nbsp; &nbsp; &nbsp; Running &nbsp; &nbsp;  &nbsp;0 \
>apimgr-544b55fffb-qsn87 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1/1 &nbsp; &nbsp; &nbsp; &nbsp; Running &nbsp; &nbsp;  &nbsp;0 \
>cassandra-0  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1/1  &nbsp; &nbsp; &nbsp; &nbsp;Running  &nbsp; &nbsp;  &nbsp;0 \
>db-create-mysql-apigw-379e224c-... &nbsp; &nbsp;0/1 &nbsp; &nbsp; &nbsp; &nbsp;Completed  &nbsp;0 \
>filebeat-analytics-86d588954b-lsx2p  &nbsp; &nbsp;1/1 &nbsp; &nbsp; &nbsp; &nbsp;Running &nbsp; &nbsp; &nbsp;0 \
>mysql-aga-757495f88f-vpw79  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1/1  &nbsp; &nbsp; &nbsp; &nbsp;Running  &nbsp; &nbsp; &nbsp; 0 \
>traffic-5d986c7d55-cv6dv  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1/1  &nbsp; &nbsp; &nbsp; &nbsp;Running  &nbsp; &nbsp; &nbsp; 0

Verify that :

* **pods** with name anm-xxx-xxx, apimgr-xxx-xxx, traffic-xxx-xxx, cassandra-0 are **Running** and Restart is **0**.
* **jobs** with name db-create-mysql-apigw-xxx is **Completed**.

Check all ingress with this command :

```bash
kubectl get ingress -n open-banking-apim \
```

>NAME  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;HOSTS  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ADDRESS  &nbsp; &nbsp; &nbsp; PORTS \
>apimanager  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; api-manager.*yourdomain*  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;*public ip* &nbsp; &nbsp; &nbsp; &nbsp; 80, 443 \
>gatewaymanager &nbsp;api-gateway-manager.apim.*yourdomain* &nbsp; &nbsp;*public ip* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;80, 443 \
>oauth &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;oauth.apim.*yourdomain* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *public ip* &nbsp; &nbsp; &nbsp; &nbsp; 80, 443 \
>traffic &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;api.apim.*yourdomain* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *public ip* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;80, 443 \
>traffichttps &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; services-api.apim.*yourdomain* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;*public ip* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;80, 443 \
>trafficmtls &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; mtls-api.apim.*yourdomain* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; *public ip* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;80, 443
Verify that the same number of ingress has been provisioned. They must have a public ip or a dns value is in the ADDRESS column.

Check the differents URL
**API Gateway Manager**. Login with username *admin* and password *apiAdminPwd!* Check in the topology section that pods apimgr and traffic are available.

**API Manager**. Login with username *apiadmin* and password *apiAdminPwd!*. Check in frontend 

## Customize APIM configuration helm chart

Customize the open-banking-apim-config/values.yaml file as follow

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.domainName | set the domainname for all ingress. | None |
| Global.customStorageClass.scrwm | Allow to specify a storageclass to mount a “Read Write Many” volume on pod. It’s used to share metrics between monitoring and analytics. | None |
| global.env | Set the default environment |dev |
| global.dockerRegistry.url | URL of the Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking/apim |
| global.dockerRegistry.username | Login of user that as been created for you. | None |
| global.dockerRegistry.token | Token of user that as been created for you. | None |
| global.smtpServer.host | Smtp server host | None |
| global.smtpServer.port | Smtp server port | None |
| global.smtpServer.username | Smtp server username | None |
| global.smtpServer.password | Smtp server password | None |
| apimcli.settings.email | email used in api-manager settings |None |
|backend.serviceincident.host| ServiceNow URL|None|
|backend.serviceincident.username| ServiceNow username |None|
|backend.serviceincident.password| ServiceNow password |None|

## Install APIM config helm chart

Install the APIM config helm chart:

```bash
helm install apim-config open-banking-apim-config -n open-banking-apim
```

Check that the status of the helm command is deployed:

>NAME: apim-config \
>LAST DEPLOYED: Fri Apr 16 07:46:35 2021 \
>NAMESPACE: open-banking-config \
>STATUS: **deployed** \
>REVISION: 1 \
>TEST SUITE: None

### Verifications

Wait a few minutes and use the following commands to check the status of the deployment.

```
kubectl get pods -n open-banking-apim 
```

>NAME &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; READY &nbsp; STATUS &nbsp; &nbsp; &nbsp;  &nbsp;RESTARTS \
>anm-6d86b7dfbd-4wbnx &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1/1 &nbsp; &nbsp; &nbsp; &nbsp; Running &nbsp; &nbsp;  &nbsp;0 \
>apimgr-544b55fffb-qsn87 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1/1 &nbsp; &nbsp; &nbsp; &nbsp; Running &nbsp; &nbsp;  &nbsp;0 \
>cassandra-0  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1/1  &nbsp; &nbsp; &nbsp; &nbsp;Running  &nbsp; &nbsp;  &nbsp;0 \
>db-create-mysql-apigw-379e224c-... &nbsp; &nbsp;0/1 &nbsp; &nbsp; &nbsp; &nbsp;Completed  &nbsp;0 \
>filebeat-analytics-86d588954b-lsx2p  &nbsp; &nbsp;1/1 &nbsp; &nbsp; &nbsp; &nbsp;Running &nbsp; &nbsp; &nbsp;0 \
>import-api-27983c3f-... &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 0/1  &nbsp; &nbsp; &nbsp; &nbsp;Completed  &nbsp; 0 \
>mysql-aga-757495f88f-vpw79  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;1/1  &nbsp; &nbsp; &nbsp; &nbsp;Running  &nbsp; &nbsp; &nbsp; 0 \
>traffic-5d986c7d55-cv6dv  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 1/1  &nbsp; &nbsp; &nbsp; &nbsp;Running  &nbsp; &nbsp; &nbsp; 0

Verify that :
- **jobs** with name import-api-27983c3f-xxx  are **Completed**.


**API Manager**. Refresh and check that:

* Open Banking APIs are in the API Catalog,
* Default apps are in Client applications 

## Post Deployment

Once APIM helm charts and Cloud Entity Helm chart are deployed, update the KPS configuration as follow

### Update KPS configuration

You need to import KPS configuration. They are used in policies for consent flows. 
The organization ID is different for each bank, please odify the helm chart file open-banking-apim-config/files/kps/kpsConfig1.json to change the organizationId with your own bank/PSPSP ID.
Change the the 'domainname' value in the second command.

```shell
APIMGR_POD="$(kubectl get pod -n open-banking-apim -l app=apimgr -o jsonpath='{.items[0].metadata.name}')"
ANM_INGRESS_NAME="$(kubectl get ingress -n open-banking-apim gatewaymanager -o jsonpath='{.spec.rules[0].host}')"
# check variables APIMGR_POD and ANM_INGRESS_NAME are not empty
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

Verify the insertion in the KPS table:
- Login the API Gateway Manager UI and go on Settings > Key Property Stores
- Click on AMPLIFY/Configuration
- Check the column **key_values** that isn't empty.
