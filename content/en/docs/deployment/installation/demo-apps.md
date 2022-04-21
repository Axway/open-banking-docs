---
title: "Demo Apps installation"
linkTitle: "Demo Apps"
weight: 5
---
Install Demo Apps for the Axway Open Banking solution.

## Download the Demo Apps Helm chart

Download the Axway Open Banking Demo Apps Helm chart to customize it locally.

```bash
helm pull open-banking/open-banking-bankio-apps --untar
```

You should get an `open-banking-bankio-apps` local folder.

## Customize the Demo Apps Helm chart

Customize the `open-banking-bankio-app/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| image.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| image.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| ingress.certManager | Enabling the certmanager. | true |
| ingress.issuedByLetsEncrypt | Enabling letsencrypt to issue the certificates. | true |
| ingress.wildcard | Enabling wildcard certificate. | false |
| ingress.cert |  Wildcard cert information. | None |
| ingress.key |  Wildcard key information. | None |
| ingress.frontEnd.cname | FrontEnd server address. Change the domainname value. | demo-apps.\<domain-name> |
| ingress.frontEnd.cert | Custom cert for FrontEnd server endpoint.  if certManager is true, cert and key will be ignored.| None |
| ingress.frontEnd.key | Custom key for FrontEnd server endpoint. if certManager is true, cert and key will be ignored. | None |
| ingress.tppApi.cname | tppApi server address. Change the domainname value. | tpp-demo-apps.\<domain-name> |
| ingress.tppApi.cert | Custom cert for tppApi server endpoint.  if certManager is true, cert and key will be ignored. | None |
| ingress.tppApi.key | Custom key for tppApi server endpoint. if certManager is true, cert and key will be ignored. | None |
| ingress.autoLoanApi.cname | autoLoanApi server address. Change the domainname value. | auto-loan-api-demo-apps.\<domain-name> |
| ingress.autoLoanApi.cert | Custom cert for autoLoanApi server endpoint. if certManager is true, cert and key will be ignored. | None |
| ingress.autoLoanApi.key | Custom key for autoLoanApi server endpoint.  if certManager is true, cert and key will be ignored. | None |
| ingress.shopApi.cname | shopApi server address. Change the domainname value. |shop-demo-api-apps.\<domain-name> |
| ingress.shopApi.cert | Custom cert for shopApi endpoint. if certManager is true, cert and key will be ignored. | None |
| ingress.shopApi.key | Custom key for shopApi endpoint. if certManager is true, cert and key will be ignored.| None |
| griffin.tokenEndpoint | Token endpoint of Authorization server used by demo apps. Change the domainname value.| `https://acp.<domain-name>/default/openbanking_brasil/oauth2/token` |
| griffin.authorizationEndpoint | Authorization endpoint of Authorization server used by demo apps. Change the domainname value. | `https://acp.<domain-name>/default/openbanking_brasil/oauth2/authorize` |
| griffin.jwksEndpoint | JWKS well known endpoint . Change the domainname value. | `https://acp.<domain-name>/default/openbanking_brasil/.well-known/jwks.json` |
| griffin.aispEndpoint | Account endpoint of Open Banking API used by demo apps. Change the domainname value. | `https://mtls-api-proxy.<domain-name>/open-banking/accounts/v1` |
| griffin.pispEndpoint | Payment endpoint of Open Banking API used by demo apps. Change the domainname value. | `https://mtls-api-proxy.<domain-name>/open-banking/payments/v1` |



## Install the Demo Apps Helm chart

1. Create the target namespace on the cluster:

   ```bash
   kubectl create namespace open-banking-app
   ```

2. Install the Demo Apps Helm chart:

   ```bash
   helm install demo-apps open-banking-bankio-apps -n open-banking-app
   ```

3. Check that the status of the Helm command is deployed:

   ```
   NAME: demo-apps
    LAST DEPLOYED: <current date and time>
    NAMESPACE: open-banking-app
    STATUS: deployed
    REVISION: 1 
    TEST SUITE: None
   ```

## Verify the Demo Apps Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n open-banking-app
   ```

   ```
   NAME                                READY   STATUS      RESTARTS   
   auto-loan-api-deployment-xxxx-xxx   1/1     Running     0          
   bankio-init-reference-data-job-xxx  0/1     Completed   0          
   bankio-link-deployment-xxxx-xxx     1/1     Running     0          
   demo-frontends-deployment-xxxx-xxx  1/1     Running     0          
   mongo-deployment-xxxx-xxx           1/1     Running     0          
   obie-sandbox-deployment-xxxx-xxx    1/1     Running     0          
   shop-api-deployment-xxxx-xxx        1/1     Running     0          
   ```

2. Verify that:
   * All **pods** but bankio-init-reference-data-job-xxx are  **Running** and Restart is **0**.
   * The **pod** named bankio-init-reference-data-job-xxx is  **Completed** and Restart is **0**.

3. Check ingress with this command:

   ```bash
   kubectl get ingress -n open-banking-app 
   ```

4. Verify that these five ingress have been provisioned. They must have a public ip or a dns value in the ADDRESS column.

   ```
    NAME                     HOSTS                                   ADDRESS                       PORTS     
    auto-loan-api-ingress    auto-loan-api-demo-apps.<domain-name>   xxxxxxxxxxxxx.amazonaws.com   80, 443   
    bankio-link-ingress      tpp-demo-apps.<domain-name>             xxxxxxxxxxxxx.amazonaws.com   80, 443   
    demo-frontends-ingress   demo-apps.<domain-name>                 xxxxxxxxxxxxx.amazonaws.com   80, 443   
    obie-sandbox-ingress     obie-sandbox-demo-apps.<domain-name>    xxxxxxxxxxxxx.amazonaws.com   80, 443   
    shop-api-ingress         shop-demo-api-apps.<domain-name>        xxxxxxxxxxxxx.amazonaws.com   80, 443  
   ```

5. Check the different user interfaces:
   * _Demo app 1_: `https://demo-apps.<domain-name>/account-information` shows a demo app for account aggregation. If all other components are already installed and configured correctly, you should be able to test _Demo app 1_ connecting a bank account from demo01 sandbox.
   * _Demo app 2_: `https://demo-apps.<domain-name>/store` shows a demo app for online store with payments.
   * _Demo app 3_: `https://demo-apps.<domain-name>/auto-loan/calculator` shows a demo app for a loan calculation.
   * _Demo app 4_: `https://demo-apps.<domain-name>/product-marketplace/compare` shows a demo app for banking products listing.
