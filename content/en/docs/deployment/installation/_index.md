---
title: "Installation"
linkTitle: "Installation"
weight: 2
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
tar xvf open-banking-apim-config-1.4.x.tgz 
tar xvf open-banking-developer-portal-1.4.x.tgz 
tar xvf open-banking-backend-chart-1.4.x.tgz 
tar xvf open-banking-analytics-1.4.x.tgz  
tar xvf open-banking-acp-1.4.x.tgz  
tar xvf open-banking-consent-1.4.x.tgz  
tar xvf open-banking-bankio-apps-1.4.x.tgz 
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
