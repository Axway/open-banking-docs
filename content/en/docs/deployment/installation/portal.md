---
title: "Developer Portal Installation"
linkTitle: "Developer Portal"
weight: 2
description: Installing Developer Portal of the Axway Open Banking solution
---


## Developer Portal

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
