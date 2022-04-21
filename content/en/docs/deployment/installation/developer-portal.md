---
title: "Developer Portal installation"
linkTitle: "Developer Portal"
weight: 2
---
Install the Developer Portal for the Axway Open Banking solution.

## Download the Developer Portal Helm chart

Download the Axway Open Banking Developer Portal Helm chart to customize it locally.

```bash
helm pull axway-open-banking/open-banking-developer-portal --untar
```

You should get an `open-banking-developer-portal` local folder.

## Customize the Developer Portal Helm chart

Customize the `open-banking-developer-portal/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.platform | Select the platform: AWS, AZURE, MINIKUBE. | AWS |
| global.domainName | Set the domainname for all ingress. | None |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| apiportal.adminPasswd | Password to access the Developer Portal Joomla admin console. | _portalAdminPwd!_ |
| apiportal.company | Your company name. | _Griffin Bank_ |
| apiportal.langage | Default API Portal language. | pt-BR |
| apiportal.chatraid |  Your Chatra account. |  |
| apiportal.recaptchkey | ReCaptcha key associated to your external domain name. |  |
| apiportal.recaptchsecret |  Corresponding ReCaptcha key associated to your external domain name. |  |
| apiportal.demoAppSource |   The demo app source URL to be used on the portal home page. | `https://demo-apps.<domain-name>/app.js?version=1.1` |
| apiportal.authorizationHost |   The OAuth server public name. |  acp.\<domain-name> |
| apiportal.apiWhitelist |  Comma-separated list of hosts exposing APIs. | api.\<domain-name>,mtls-api-proxy.\<domain-name> |
| apiportal.oauthWhitelist |  Comma-separated list of hosts used for external Oauth. | acp.\<domain-name> |
| apiportal.serviceDeskEndPoint | URL of service desk service.  | `https://api.<domain-name>/services/v1/incident`   |
| apiportal.apiReviewEndPoint |   URL of API review service.  | `https://api.<domain-name>/api/portal/v1.2/reviewapi` |
| mysqlPortal.external | Enabling external DB for Developer portal.  | false |
| mysqlPortal.dbname | DB Name for Developer portal.  | false |
| mysqlPortal.rootPasswd | Root password for the database to be created. | _portalDBRootPwd!_ |
| mysqlPortal.adminPasswd  | Admin password for the database to be created. | _portalDBAdminPwd!_ |
| apimgr.publicApiUser | Username of API Manager user to access Public APIs. | _publicuser_ |
| apimgr.publicApiPassword | Password of API Manager user to access Public APIs. | _publicUserPwd!_ |
| apimgr.trafficServer | CNAME for API manager traffic endpoint. Reviewing the domain.| `api.<domain-name>` |
| apimgr.mtlsProxyServer | CNAME for API manager MTLS traffic endpoint. Reviewing the domain.| `mtls-proxy-api.<domain-name>` |


## Install the Developer Portal Helm chart

1. Create the target namespace on the cluster:

   ```bash
   kubectl create namespace open-banking-developer-portal
   ```

2. Install the Developer Portal Helm charts:

   ```bash
      helm install developer-portal open-banking-developer-portal -n open-banking-developer-portal
   ```

3. Check that the status of the Helm command is deployed:

   ```
       NAME: developer-portal 
       LAST DEPLOYED: <current date and time>
       NAMESPACE: open-banking-developer-portal 
       STATUS: deployed 
       REVISION: 1 
       TEST SUITE: None
   ```

## Verify the Developer Portal Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n open-banking-developer-portal 
   ```

2. Verify that:
   * **pods** with name api-portal-xxx-xxx, mysql-portal-xxx-xxx, redis-xxx-xxx are **Running** and Restart is **0**.

   ```
       NAME                            READY   STATUS    RESTARTS   AGE  
       api-portal-7d8fb64c98-bt6jg     1/1     Running   0          2m
       mysql-portal-5dc9487c64-jccpm   1/1     Running   0          2m
       redis-7c9bf54b6-dn55s           1/1     Running   0          2m
   ```

3. Check ingress with this command:

   ```bash
   kubectl get ingress -n open-banking-developer-portal 
   ```

4. Verify that one ingress has been provisioned. It must have a public ip or a dns value in the ADDRESS column.

   ```
       NAME         HOSTS                           ADDRESS                       PORTS     AGE
       api-portal   developer-portal.<domain-name>  xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
   ```

5. Check the different user interfaces:
   * _Developer Portal home page_: `https://developer-portal.<domain-name>`. If the APIM Helm charts are successfully deployed, you should see APIs on the API Catalog (click the API tab).
   * _Joomla admin interface_: `https://developer-portal.<domain-name>/administrator`. Login with username _apiadmin_ and password _apiAdminPwd!_.


## Post Install steps

1. Customizing the brand.
   
   If needed, you can easily brand the developer portal with your logo and brand colors.
   
   Connect the the adminstrator UI and navigate to 

         `Extentions > Templates > Styles` Choose a Style profile, then click `Theme` tab, next click `Theme Magic` button top of screen.
         
         Key Colors:
            `Brand Color`: The base color of the site

         Basic Colors:
            `@page-text-color`: The base text color of the site

   Save the theme by clicking the arrow button next to preview button to `Save As`

2. Apply Theme
   To apply them exit out of the Theme Magic (Back to Administrator) then change the `Theme` dropdown to select your new theme. 


3. Customizing the Logo   
   To change the logo use the `Logo Image` Selector under the same Theme tab.
   
4. Saving the changes   
   Theme Magice only needs to be done once but to apply the theme saving will need to be done for each style you want to apply this to.
   
   