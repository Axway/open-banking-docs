---
title: "Consent Applications Installation"
linkTitle: "Consent Applications"
weight: 2
---
Install Cloudentity sample consent applications for the Amplify Open Banking solution.

## Create a customized values.yaml file

Create a customized `values` file, for example, `myvalues.yaml`, and make your customizations. This file should contain only the sections of the `values.yaml` file that you wish to override. Any values not present in the customized file will be picked up from the original `values.yaml` file.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| dockerRegistry.username | Axway repo username. | None |
| dockerRegistry.token | Axway repo token. | None |
| dockerRegistryCloudentity.username | Cloudentity repo username. | None |
| dockerRegistryCloudentity.token | Cloudentity repo token. | None |
| cert.internal.certManager | Define if cert-manager is used internally.<br>False is currently not supported. | true |
| cert.internal.certManagerNamespace | Namespace where cert-manager is installed. Use the result of the previous command. | None |
| cert.ingress.certManager | Define if cert-manager is used externally.<br>If set to false, define cert and keys with values below. | true |
| cert.ingress.wildcard | Define whether the same wildcard certificate is used externally for all ingress.<br>If set to true, define wildcard certificate and its key with cert.ingress.cert/key below.<br>If set to false, define custom certificate and keys with cert.ingress.\<component>.cert/key below. | true |
| cert.ingress.cert | Use a specific wildcard certificate. Must be defined only if certManager is set to false. | None |
| cert.ingress.key | Use a specific wildcard key. Must be defined only if certManager is set to false. | None |
| cert.ingress.consentAdmin.cert | Use a dedicated certificate. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentAdmin.key | Use a dedicated key. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentPage.cert | Use a dedicated certificate. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentPage.key | Use a dedicated key. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentSS.cert | Use a dedicated certificate. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentSS.key | Use a dedicated key. Must be defined only if certManager and wildcard are set to false. | None |
| openbanking.acpURL |  Cloudentity server URL. | None |
| openbanking.consentPage.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-consent-page-tls.  | open-banking-consent-apps<br>/consent-openbanking-consent-page-tls |
| openbanking.consentPage.ingress.hosts | Update with the consent page URL. | consent.\<domain-name> |
| openbanking.consentPage.ingress.tls.hosts | Update with the consent page URL. | consent.\<domain-name> |
| openbanking.consentAdmin.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-consent-admin-tls. | open-banking-consent-apps<br>/consent-openbanking-consent-admin-tls |
| openbanking.consentAdmin.ingress.hosts | Update with the consent admin URL. | consent-admin.\<domain-name> |
| openbanking.consentAdmin.ingress.tls.hosts | Update with the consent admin URL. | consent-admin.\<domain-name> |
| openbanking.consentSelfservice.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-consent-self-service-tls. | open-banking-consent-apps<br>/consent-openbanking-consent-self-service-tls |
| openbanking.consentSelfservice.ingress.hosts | Update with the consent Self service URL. | consent-selfservice.\<domain-name> |
| openbanking.consentSelfservice.ingress.tls.hosts | Update with the consent Self service URL. | consent-selfservice.\<domain-name> |
| openbanking.import.enabled | To import the default configuration for Open Finance Brazil or FDX deployment. Set to true for installation and then keep it false for upgrades. | false |
| openbanking.import.variables.consent_self_service_portal_url | Update with the consent self service portal url. | `https://consent-selfservice.<domain-name>` |
| openbanking.import.variables.consent_admin_portal_url | Update with the consent admin portal url. | `https://consent-admin.<domain-name>` |
| openbanking.import.variables.consent_page_url | Update with the consent page url. | `https://consent.<domain-name>` |
| openbanking.import.variables.developer_tpp_url | Update with the developer tpp url.| `https://financroo.<domain-name>` |
| openbanking.import.variables.postman_client_id | Update with the Postman client id. | postman-eks |
| openbanking.import.variables.bank_io_client_id | Update with the Bank.io client id. | bankio-eks |
| openbanking.import.variables.bank_io_redirect_uri | Update with the bank.io redirect url. | `https://services-api.<domain-name>/login` |
| openbanking.import.variables. dcr_jwks_uri | Openbanking central directory jwks info. | OBB Sandbox |
| openbanking.import.variables.organization_id | Bank Organization ID registered at Central Directory. | None |
| openbanking.import.variables.first_tpp_redirect_uri | Sample TPP1 used. | None |
| openbanking.import.variables.second_tpp_redirect_uri | Sample TPP1 used. | None |

## Prepare deployment

Create the target namespace on the cluster:

```bash
kubectl create namespace open-banking-consent-apps 
```

## Install the Consent Apps Helm chart

1. Deploy the Consent Apps Helm chart from the Axway repository.

   ```bash
   helm install consent-apps -n open-banking-consent-apps open-banking-consent-apps -f myvalues.yaml
   ```

2. Check that the status of the Helm command is deployed:

   ```
      NAME: consent-apps 
      LAST DEPLOYED: <current date and time>
      NAMESPACE: open-banking-consent-apps 
      STATUS: deployed
      REVISION: 1 
      TEST SUITE: None
   ```

## Verify the Consent Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n open-banking-consent-apps 
   ```

2. Verify that:
   * **pods** with consent-openbanking-bank-xxxx-xxx, consent-openbanking-consent-admin-xxxx-xxx, consent-openbanking-consent-page-xxxx-xxx, consent-openbanking-consent-self-service-xxxx-xx   are  **Running** and Restart is **0**.
   * **pods** with consent-openbanking-import-xxx    is **Completed** and Restart is **0**.

   ```
      NAME                                                READY   STATUS      RESTARTS   
      consent-openbanking-bank-xxxx-xxx                   1/1     Running     0          
      consent-openbanking-consent-admin-xxxx-xxx          1/1     Running     0          
      consent-openbanking-consent-page-xxxx-xxx           1/1     Running     0          
      consent-openbanking-consent-self-service-xxxx-xxx   1/1     Running     0        
      consent-openbanking-import-xxx                      0/1     Completed   0          
   ```

3. Check ingress with this command:

   ```bash
   kubectl get ingress -n open-banking-consent-apps 
   ```

4. Verify that these ingresses are provisioned. They must have a public ip or a dns value in the ADDRESS column.

   ```
       NAME                                     HOSTS                             ADDRESS                       PORTS     AGE
       consent-openbanking-consent-admin        consent-admin.<domain-name>       xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
       consent-openbanking-consent-page         consent.<domain-name>             xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
       consent-openbanking-consent-self-service consent-selfservice.<domain-name> xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
   ```

## Post Deployment

* Navigate to Openbanking workspace, Settings - Authorization - Trusted client certificates, and update the Trusted client certificates content with the `open-banking-consent-apps/files/cert.pem` file attached.
