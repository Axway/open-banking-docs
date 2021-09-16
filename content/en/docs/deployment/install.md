---
title: "Installation"
linkTitle: "Installation"
weight: 1
description: Installing the Axway Open Banking solution
---

This guide describes how to install the Axway Open Banking solution.

## Download and Customize Axway Components

To install the solution add the Axway Docker Repository to your Helm configuration:

```bash
helm repo add axway-open-banking \ 
https://docker-registry.demo.axway.com/chartrepo/open-banking \ 
--username="<use the token name>" \ 
--password="<use your private token here>"   

helm repo update 
```

> Note that if your token includes a dollar it should be escaped e.g. “robot$” becomes “robot\$”.

Once the registry is added you can then fetch the deployment packages using the appropriate Helm commands:

```bash
helm search repo axway-open-banking
helm fetch axway-open-banking/open-banking-acp
helm fetch axway-open-banking/open-banking-consent
helm fetch axway-open-banking/open-banking-apim
helm fetch axway-open-banking/open-banking-apim-config
helm fetch axway-open-banking/open-banking-developer-portal
helm fetch axway-open-banking/open-banking-backend-chart
helm fetch axway-open-banking/open-banking-analytics
helm fetch axway-open-banking/open-banking-bankio-apps
```

Update the values for each chart to adapt it to your target environment. 

> Please refer to the `README.md` file in each package for more details. Note you can of course use your own choice of editor rather than vim if you prefer.

```bash
tar xvf open-banking-apim-1.4.x.tgz 
vi open-banking-apim/values.yaml  

tar xvf open-banking-apim-config-1.4.x.tgz 
vi open-banking-apim-config/values.yaml 

tar xvf open-banking-developer-portal-1.4.x.tgz 
vi open-banking-developer-portal/values.yaml 

tar xvf open-banking-backend-chart-1.4.x.tgz 
vi open-banking-backend/values.yaml 

tar xvf open-banking-analytics-1.4.x.tgz  
vi open-banking-analytics/values.yaml 

tar xvf open-banking-acp-1.4.x.tgz  
vi open-banking-openbanking-acp/values.yaml 

tar xvf open-banking-consent-1.4.x.tgz  
vi open-banking-openbanking-consent/values.yaml 

tar xvf open-banking-bankio-apps-1.4.x.tgz 
vi open-banking-bankio-apps/values.yaml
```

### API Management

#### Minimal parameters required

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

#### Product licence

A temporary license file is embedded in the default docker image.
This license key has a lifetime to 2 months maximum.
This license is perfect for a demo or a POC but another License key must be added for real environments.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.apimLicense | Insert your license key. An example is in the default value file. | None |

#### Externalize Cassandra database (Required for production environment)

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

#### Add new root CA for MTLS ingress (Optional)

The mutual authentication is provided by Nginx. It requires a Kubernetes secret that contains all rootCA used to signed your tpp cert.
The differents root CA certificats must be concatenate and encoded in base64.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| apitraffic.ingressMtlsRootCa | all concatenate root CA encoded in base64 | yes |

#### Customize storage class (Optional)

The APIM deployment needs a storage class in Read/Write Many. A custom storage class can be setted if the cluster doesn't use the standard deployment for Azure, AWS or if the deployment is on a vanilla Kubernetes.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| Global.customStorageClass.scrwm | Allow to specify a storageclass to mount a “Read Write Many” volume on pod. It’s used to share metrics between monitoring and analytics. | None |

#### Use a Wildcard certificate for all ingress (Optional)

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

#### Use a different custom certificate for ingress (Optional)

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

#### Configure Amplify Agents (Optional)

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

### Developer Portal

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.platform | select the platform : AWS, AZURE, MINIKUBE | AWS |
| global.domainName | set the domainname for all ingress. | None |
| global.dockerRegistry.url | URL of the Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking/developer-portal |
| global.dockerRegistry.username | Login of user that as been created for you. | None |
| global.dockerRegistry.token | Token of user that as been created for you. | None |
| apiportal.adminPasswd | password to access Developer Portal Joomla admin console | portalAdminPwd! |
| apiportal.company | name of you company, sued for brandind | Griffin Bank |
| apiportal.chatraid |  your Chatra account |  |
| apiportal.recaptchkey | recaptcha key associated to your external domain name |  |
| apiportal.recaptchsecret |  corresponding recaptcha key associated to your external domain name |  |
| apiportal.demoAppSource |   the demo app source URL to be used on the portal home page | https://demo-apps.openbanking.demoaxway.com/app.js?version=1.1 |
| apiportal.authorizationHost |   the OAuth server public name |  acp.openbanking.demoaxway.com |
| apiportal.apiWhitelist |  coma-separated list of hosts exposing APIs | api.openbanking.demoaxway.com,mtls-api-proxy.openbanking.demoaxway.com |
| apiportal.oauthWhitelist |  coma-separated list of hosts used for external Oauth | acp.openbanking.demoaxway.com |
| apiportal.serviceDeskEndPoint | URL of service desk service  |https://api.openbanking.demoaxway.com/services/v1/incident   |
| apiportal.apiReviewEndPoint |   URL of API review service  | https://api.openbanking.demoaxway.com/api/portal/v1.2/reviewapi |
| mysqlPortal.rootPasswd | root password for the database to be created | portalDBRootPwd! |
| mysqlPortal.adminPasswd  | admin password for the database to be created | portalDBAdminPwd! |

### Backend services

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.dockerRegistry.url | URL of the Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking |
| global.dockerRegistry.username | Login of user that as been created for you. |  |
| global.dockerRegistry.token | Token of user that as been created for you. |  |
| mysqldb.dbname | Mock backend database name |  "medicimockbackend" |
| mysqldb.dbuser | Mock backend database username |  "mockbank" |
| secrets.MYSQL_ROOT_PASSWORD | Mock backend database root password | Ch@ng3M3! |
| secrets.MYSQL_USER_PASSWORD | Mock backend database user password | Ch@ng3M3! |

### Analytics

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.domainName | set the domainname for all ingress. | openbanking.demoaxway.com |
| global.dockerRegistry.url | URL of the Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking |
| global.dockerRegistry.username | Login of user that as been created for you. |  |
| global.dockerRegistry.token | Token of user that as been created for you. |  |
| elastic.password | Password used for "elastic" user. | Open*Banking*2021 |
| metrics.apiKey | API Key used for the metrics. Used by Webserver and APIM | PuGB+3m1z2jeFVHf5pWoFKOxH0F/fW9M |
| kibana.ingress.dnsprefix | set the domain name for kibana. | kibana |
| webserver.ingress.dnsprefix | Frequency of reports generation | analytics |
| webserver.report.frequency | Frequency of reports generation | 00 00 * * * (Every day at midnight) |

### Demo apps

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| image.dockerRegistry.url | URL of the image in Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking/apps |
| image.dockerRegistry.username | Login of user that as been created for you. | None |
| image.dockerRegistry.token | Token of user that as been created for you. | None |
| frontEnd.cname | frontEnd server address. change domainname value | demo-apps.<domainname> |
| tppApi.cname | tppApi server address. change domainname value | tpp-demo-apps.<domainname> |
| autoLoanApi.cname | autoLoanApi server address. change domainname value | auto-loan-api-demo-apps.<domainname> |
| shopApi.cname | shopApi server address. change domainname value |shop-demo-api-apps.<domainname> |
| obieSandbox.cname | obieSandbox server address. change domainname value | obie-sandbox-demo-apps.<domainname> |
| griffin.tokenEndpoint | Token endpoint of Authorization server used by demo apps. change domainname value | https://acp.<domainname>/axway/openbanking_demo/oauth2/token |
| griffin.authorizationEndpoint | Authorization endpoint of Authorization server used by demo apps. change domainname value | https://acp.<domainname>/axway/openbanking_demo/oauth2/authorize |
| griffin.aispEndpoint | Account endpoint of Open Banking API used by demo apps. change domainname value | https://mtls-api-proxy.<domainname>/open-banking/v3.1/aisp |

## Download, Customize and Install Cloudentity Components

Add the Cloud Entity helm repository and download latest updates: 

```bash
helm repo add acp https://charts.cloudentity.io 
helm repo update 
```

Create the correct namespaces on the target cluster:
 
```bash
kubectl create namespace open-banking-acp 
kubectl create namespace open-banking-consent 
```

> **Before next step ensure you have followed all deployment preparation instructions listed in the `README.md` file of ACP Helm chart.**

Deploy ACP pre-requisites Helm chart from Axway repository as described in the `README.md` file:

```bash
helm install acp-prereq -n open-banking-acp open-banking-acp
```

Deploy the ACP Helm chart from CloudEntity repository with the version provided in the `README.md` file: 

```bash
helm install acp -n open-banking-acp acp/kube-acp-stack –-version [chart-version]  -f open-banking-acp/files/acp.values.yaml
```

> **Before the next step, ensure ACP is running correctly (as described in the `README.md` file of the ACP Helm chart) and you have followed all deployment preparation instructions listed in the `README.md` file of the Consent Helm chart.**

Deploy Consent pre-requisites Helm chart from Axway repository as described in the `README.md` file:

```bash
helm install consent-prereq -n open-banking-consent open-banking-consent  
```

Deploy the Open Banking Consent Helm chart from CloudEntity repo with the version provided in the `README.md` file:

```bash
helm install consent -n open-banking-consent acp/openbanking –-version [chart-version] -f open-banking-consent/files/consent.values.yaml
```

Update the APIM KPS deployment values using the instructions in the `README.md` file to reflect all oauth*clientId and oauth*clientSecret values as deployed in ACP: 

```bash
vi open-banking-apim-config/files/kps/kpsConfig1.json
```

## Install Axway Components

First create the target namespaces on the cluster:

```bash
kubectl create namespace open-banking-apim
kubectl create namespace open-banking-apps    
kubectl create namespace open-banking-backend
kubectl create namespace open-banking-developer-portal
kubectl create namespace open-banking-analytics
```

> **Before the next step, ensure you followed all deployment preparation instructions listed in the `README.md` file of each Helm chart.**

Deploy all the components: 

```bash
helm install apim -n open-banking-apim open-banking-apim
helm install apim-config -n open-banking-apim open-banking-apim-config 
helm install developer-portal -n open-banking-developer-portal open-banking-developer-portal
helm install bankio-apps -n open-banking-apps open-banking-bankio-apps
helm install backend-services -n open-banking-backend open-banking-backend-chart
helm install analytics -n open-banking-analytics open-banking-analytics
```

## Post Deployment

Check each the `README.md` file of each component for post-installation instructions.
