---
title: "Developer Portal Installation"
linkTitle: "Developer Portal"
weight: 2
description: Installing Developer Portal of the Axway Open Banking solution
---


## Download Helm chart

Download Axway Open Banking Developer Portal Helm chart to customize it locally

```bash
helm pull axway-open-banking/open-banking-developer-portal --untar
```

You should get a open-banking-developer-portal local folder.

## Customize Developer Portal Helm chart

Customize the open-banking-developer-portal/values.yaml file as follow

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

## Install Developer Portal Helm chart

Create the target namespace on the cluster:

```bash
kubectl create namespace open-banking-developer-portal
```

Install the APIM  helm charts:

```bash
helm install developer-portal open-banking-developer-portal -n open-banking-developer-portal
```

Check that the status of the helm command is deployed:

>NAME: developer-portal \
>LAST DEPLOYED: Fri Apr 16 07:56:35 2021 \
>NAMESPACE: open-banking-developer-portal \
>STATUS: **deployed** \
>REVISION: 1 \
>TEST SUITE: None

### Verifications

Wait a few minutes and use the following commands to check the status of the deployment.

```
kubectl get pods -n open-banking-developer-portal \
```

>NAME                            READY   STATUS    RESTARTS   AGE  
>api-portal-7d8fb64c98-bt6jg     1/1     Running   0          2m
>mysql-portal-5dc9487c64-jccpm   1/1     Running   0          2m
>redis-7c9bf54b6-dn55s           1/1     Running   0          2m

Verify that :

* **pods** with name api-portal-xxx-xxx, mysql-portal-xxx-xxx, redis-xxx-xxx are **Running** and Restart is **0**.

Check ingress with this command :

```bash
kubectl get ingress -n open-banking-developer-portal \
```

>NAME         HOSTS                           ADDRESS                       PORTS     AGE
>api-portal   developer-portal.*yourdomain*   xxxxxxxxxxxxx.amazonaws.com   80, 443   2m

Check the differents URL
https://developer-portal.*yourdomain* the Developer Portal home page should show up.
If APIM helm charts were successfully deployed, you should already be able to see APIs on the API Catalog (click on API tab)

https://developer-portal.*yourdomain*/administrator Login with username *apiadmin* and password *apiAdminPwd!*.
