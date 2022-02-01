---
title: "Demo apps Installation"
linkTitle: "Demo apps"
weight: 5
description: Installing Demo apps for the Axway Open Banking solution
---


## Download the Demo Apps Helm chart

Download the Axway Open Banking Demo Apps Helm chart to customize it locally.

```bash
helm pull axway-open-banking/open-banking-bankio-apps --untar
```

You should get an `open-banking-bankio-apps` local folder.

## Customize the Demo Apps Helm chart

Customize the `open-banking-bankio-app/values.yaml` file as follow

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| image.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| image.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| frontEnd.cname | FrontEnd server address. Change the domainname value. | demo-apps.\<domain-name> |
| tppApi.cname | tppApi server address. Change the domainname value. | tpp-demo-apps.\<domain-name> |
| autoLoanApi.cname | autoLoanApi server address. Change the domainname value. | auto-loan-api-demo-apps.\<domain-name> |
| shopApi.cname | shopApi server address. Change the domainname value. |shop-demo-api-apps.\<domain-name> |
| obieSandbox.cname | obieSandbox server address. Change the domainname value. | obie-sandbox-demo-apps.\<domain-name> |
| griffin.tokenEndpoint | Token endpoint of Authorization server used by demo apps. Change the domainname value.| `https://acp.<domain-name>/axway/openbanking_demo/oauth2/token` |
| griffin.authorizationEndpoint | Authorization endpoint of Authorization server used by demo apps. Change the domainname value. | `https://acp.<domain-name>/axway/openbanking_demo/oauth2/authorize` |
| griffin.aispEndpoint | Account endpoint of Open Banking API used by demo apps. Change the domainname value. | `https://mtls-api-proxy.<domain-name>/open-banking/v3.1/aisp` |

## Install the Demo Apps Helm chart

Create the target namespace on the cluster:

```bash
kubectl create namespace open-banking-app
```

Install the Demo Apps Helm chart:

```bash
helm install demo-apps open-banking-bankio-apps -n open-banking-app
```

Check that the status of the Helm command is deployed:

```
    NAME: demo-apps
    LAST DEPLOYED: <current date and time>
    NAMESPACE: open-banking-app
    STATUS: deployed
    REVISION: 1 
    TEST SUITE: None
```

## Verify the Demo Apps Helm chart deployment

Wait a few minutes and use the following commands to check the deployment status.

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

Verify that:

* All **pods** but bankio-init-reference-data-job-xxx are  **Running** and Restart is **0**.
* The **pod** named bankio-init-reference-data-job-xxx is  **Completed** and Restart is **0**.

Check ingress with this command:

```bash
kubectl get ingress -n open-banking-app 
```

Verify that these 5 ingress have been provisioned. They must have a public ip or a dns value in the ADDRESS column.

```
    NAME                     HOSTS                                   ADDRESS                       PORTS     
    auto-loan-api-ingress    auto-loan-api-demo-apps.<domain-name>   xxxxxxxxxxxxx.amazonaws.com   80, 443   
    bankio-link-ingress      tpp-demo-apps.<domain-name>             xxxxxxxxxxxxx.amazonaws.com   80, 443   
    demo-frontends-ingress   demo-apps.<domain-name>                 xxxxxxxxxxxxx.amazonaws.com   80, 443   
    obie-sandbox-ingress     obie-sandbox-demo-apps.<domain-name>    xxxxxxxxxxxxx.amazonaws.com   80, 443   
    shop-api-ingress         shop-demo-api-apps.<domain-name>        xxxxxxxxxxxxx.amazonaws.com   80, 443  
```

Check the different user interfaces:

* *Demo app 1*: `https://demo-apps.<domain-name>/account-information` shows a demo app for account aggregation
    * If all other components are already installed and configured correctly, you should be able to test *Demo app 1* connecting a bank account from demo01 sandbox.
* *Demo app 2*: `https://demo-apps.<domain-name>/store` shows a demo app for online store with payments.
* *Demo app 3*: `https://demo-apps.<domain-name>/auto-loan/calculator` shows a demo app for a loan calculation.
* *Demo app 4*: `https://demo-apps.<domain-name>/product-marketplace/compare` shows a demo app for banking products listing.
