---
title: "Cloud Entity Installation"
linkTitle: "Cloud Entity"
weight: 7
description: Installing Cloud Entity for the Axway Open Banking solution
---


## Download the Cloud Entity Helm charts

Download the Axway Open Banking Cloud Entity Helm charts to customize them locally.

```bash
helm pull axway-open-banking/open-banking-acp --untar
helm pull axway-open-banking/open-banking-consent --untar
```

You should get an `open-banking-acp` and `open-banking-consent` local folders.

## Customize the ACP Helm chart

Find the namespace of the cert-manager component.

```bash
kubectl get pods -A | grep cert-manager | awk '{print $1}' | uniq
```

Modify the `open-banking-acp/values.yaml` file from the Axway package.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| cert.internal.certManager | Define if cert-manager is used internaly. <br>False is currently not supported. | true |
| cert.internal.certManagerNamespace | Namespace where is installed cert-manager. Use the result of the previous command. | None |
| cert.ingress.certManager | Define if cert-manager is used externaly. <br>If set to false, define cert and keys with values below. | true |
| cert.ingress.cert | Use specific cert. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| cert.ingress.key | Use specific key. It can be a wildcard. Must be defined only if certManager is set to false. | None |

Update the `open-banking-acp/files/acp.values.yaml`  with all environment variables required:

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| acp.serverURL | ACP server URL | None |
| acp.ingress.tls.hosts | ACP server URL | None |
| acp.ingress.hosts.host | ACP server URL | None |
| acp.ingress.annotations.honginx.ingress.kubernetes.io/proxy-ssl-secretst | set to \<NAMESPACE>/acp-tls | open-banking-acp/acp-tls |

Remove the following lines if cert-manager is not used for ingress:

```yaml
cert-manager.io/cluster-issuer: letsencrypt-prod (l22)
cert-manager.io/acme-challenge-type: http01 (l23)
```

## Customize the Open Banking Consent Helm chart

Modify the `open-banking-consent/values.yaml` file:

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| cert.internal.certManager | Define if cert-manager is used internally.<br>False is currently not supported. | true |
| cert.internal.certManagerNamespace | Namespace where cert-manager is installed. Use the result of the previous command. | None |
| cert.ingress.certManager | Define if cert-manager is used externally.<br>If set to false, define cert and keys with values below. | true |
| cert.ingress.wildcard | Define whether the same wildcard certificate is used externally for all ingress.<br>If set to true, define widcard certificate and its key with cert.ingress.cert/key below<br>If set to false, define custom certificate and keys with cert.ingress.\<component>.cert/key below | true |
| cert.ingress.cert | Use a specific wildcard certificate. Must be defined only if certManager is set to false. | None |
| cert.ingress.key | Use a specific wildcard key. Must be defined only if certManager is set to false. | None |
| cert.ingress.consentAdmin.cert | Use a dedicated certificate. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentAdmin.key | Use a dedicated key. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentPage.cert | Use a dedicated certificate. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentPage.key | Use a dedicated key. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentSS.cert | Use a dedicated certificate. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.consentSS.key | Use a dedicated key. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.financroo.cert | Use a dedicated certificate. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.financroo.key | Use a dedicated key. Must be defined only if certManager and wildcard are set to false. | None |

Update the `open-banking-consent/files/consent.values.yaml` file:

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| acpURL | ACP server URL | None |
| consentPage.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-consent-page-tls  | open-banking-consent<br>/consent-openbanking-consent-page-tls |
| consentPage.ingress.hosts | update with the consent page URL | consent.\<domain-name> |
| consentPage.ingress.tls.hosts | update with the consent page URL | consent.<domain-name> |
| consentAdmin.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-consent-admin-tls | open-banking-consent<br>/consent-openbanking-consent-admin-tls |
| consentAdmin.ingress.hosts | update with the consent admin URL | consent-admin.\<domain-name> |
| consentAdmin.ingress.tls.hosts | update with the consent admin URL | consent-admin.\<domain-name> |
| consentSelfservice.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-consent-self-service-tls | open-banking-consent<br>/consent-openbanking-consent-self-service-tls |
| consentSelfservice.ingress.hosts | update with the consent Self service URL | consent-selfservice.\<domain-name> |
| consentSelfservice.ingress.tls.hosts | update with the consent Self service URL | consent-selfservice.\<domain-name> |
| financroo.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-financroo-tls | open-banking-consent<br>/consent-openbanking-financroo-tls |
| financroo.ingress.hosts | update with the financroo URL | financroo.\<domain-name> |
| financroo.ingress.tls.hosts | update with the financroo URL | financroo.\<domain-name>|
| import.variables.consent_self_service_portal_url | update with the consent self service portal url | `https://consent-selfservice.<domain-name>` |
| import.variables.consent_admin_portal_url | update with the consent admin portal url | `https://consent-admin.<domain-name>` |
| import.variables.consent_page_url | update with the consent page url | `https://consent.<domain-name>` |
| import.variables.financroo_tpp_url | update with the financroo tpp url | `https://financroo.<domain-name>` |
| import.variables.developer_tpp_url | update with the developer tpp url| `https://financroo.<domain-name>` |
| import.variables.postman_client_id | update with the Postman client id | postman-eks |
| import.variables.bank_io_client_id | update with the Bank.io client id | bankio-eks |
| import.variables.bank_io_redirect_uri | update with the bank.io redirect url | `https://services-api.<domain-name>/login` |

## Prepare deployment

Add the Cloud Entity helm repository :

```bash
helm repo add cloudentity https://charts.cloudentity.io 
helm repo update 
```

Create the target namespaces on the cluster:

```bash
kubectl create namespace open-banking-acp 
kubectl create namespace open-banking-consent 
```

Add the Docker registry to pull cloud-entity private images in both namespaces

```bash
kubectl create secret docker-registry artifactory --docker-server=acp.artifactory.cloudentity.com --docker-username=USERNAME --docker-password=PASSWORD -n open-banking-acp 
kubectl create secret docker-registry artifactory --docker-server=acp.artifactory.cloudentity.com --docker-username=USERNAME --docker-password=PASSWORD -n open-banking-consent
```

## Install ACP Helm chart

Deploy ACP pre-requisites Helm chart from Axway repository:

```bash
helm install acp-prereq -n open-banking-acp open-banking-acp
```

Check that the status of the helm command is deployed:

```
   NAME: acp-prereq 
   LAST DEPLOYED: <current date and time>
   NAMESPACE: open-banking-acp 
   STATUS: deployed
   REVISION: 1 
   TEST SUITE: None
```

Deploy the ACP Helm chart from CloudEntity repository :
>Find the ACP chart-version to be used in the open-banking-acp/README.md. Otherwise use the latest.

```bash
helm install acp -n open-banking-acp cloudentity/kube-acp-stack –-version <chart-version>  -f open-banking-acp/files/acp.values.yaml
```

Check that the status of the helm command is deployed:

```
   NAME: acp
   LAST DEPLOYED: <current date and time>
   NAMESPACE: open-banking-acp 
   STATUS: deployed
   REVISION: 1 
   TEST SUITE: None
```

### Verifications

Wait a few minutes and use the following commands to check the status of the deployment.

```
kubectl get pods -n open-banking-acp 
```

Verify that :

* **pods** with acp-xxx-xxx, name acp-cockroachdb-x, acp-redis-master-x, acp-redis-replicas-x are all **Running** and Restart is **0**.
* **pods** with acp-cockroachdb-init-xxx is **Completed** and Restart is **0**.
  
```
   NAME                         READY   STATUS      RESTARTS   AGE
   acp-66d8797fb4-njbw6         1/1     Running     0          3m
   acp-cockroachdb-0            1/1     Running     0          3m
   acp-cockroachdb-init-h8hdc   0/1     Completed   0          3m
   acp-redis-master-0           1/1     Running     0          3m
   acp-redis-replicas-0         1/1     Running     0          3m
   acp-redis-replicas-1         1/1     Running     0          3m
   acp-redis-replicas-2         1/1     Running     0          3m
```

Check ingress with this command :

```bash
kubectl get ingress -n open-banking-acp 
```

Verify that this ingress has been provisioned. It must have a public ip or a dns value is in the ADDRESS column.

```
    NAME         HOSTS                           ADDRESS                       PORTS     AGE
    acp          acp.<domain-name>               xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
```

Connect to `https://acp.<domain-name>`  with admin / admin  and change the password immediatly

Check that you see an "openbanking" workspace

## Install Open Banking Consent Helm chart

Deploy Consent pre-requisites Helm chart from Axway repository

```bash
helm install consent-prereq -n open-banking-consent open-banking-consent  
```

Check that the status of the helm command is deployed:

```
   NAME: consent-prereq 
   LAST DEPLOYED: <current date and time>
   NAMESPACE: open-banking-consent 
   STATUS: deployed
   REVISION: 1 
   TEST SUITE: None
```

Deploy the Open Banking Consent Helm chart from CloudEntity repository
>Find the Open Banking Consent chart-version to be used in the open-banking-consent/README.md. Otherwise use the latest.

```bash
helm install consent -n open-banking-consent cloudentity/openbanking –-version <chart-version> -f open-banking-consent/files/consent.values.yaml
```

Check that the status of the helm command is deployed:

```
   NAME: consent
   LAST DEPLOYED: <current date and time>
   NAMESPACE: open-banking-consent 
   STATUS: deployed
   REVISION: 1 
   TEST SUITE: None
```

### Verifications

Wait a few minutes and use the following commands to check the status of the deployment.

```
kubectl get pods -n open-banking-consent 
```

Verify that :

* **pods** with consent-openbanking-bank-xxxx-xxx, consent-openbanking-consent-admin-xxxx-xxx, consent-openbanking-consent-page-xxxx-xxx, consent-openbanking-consent-self-service-xxxx-xx   are  **Running** and Restart is **0**.
* **pods** with consent-openbanking-import-xxx    is **Completed** and Restart is **0**.

```
   NAME                                                READY   STATUS      RESTARTS   
   consent-openbanking-bank-xxxx-xxx                   1/1     Running     0          
   consent-openbanking-consent-admin-xxxx-xxx          1/1     Running     0          
   consent-openbanking-consent-page-xxxx-xxx           1/1     Running     0          
   consent-openbanking-consent-self-service-xxxx-xxx   1/1     Running     0          
   consent-openbanking-financroo-xxxx-xxx              1/1     Running     0          
   consent-openbanking-import-xxx                      0/1     Completed   0          
```

Check ingress with this command :

```bash
kubectl get ingress -n open-banking-consent 
```

Verify that these ingress have been provisioned. They must have a public ip or a dns value is in the ADDRESS column.

```
    NAME                                     HOSTS                            ADDRESS                       PORTS     AGE
    consent-openbanking-consent-admin        consent-admin.<domain-name>       xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
    consent-openbanking-consent-page         consent.<domain-name>             xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
    consent-openbanking-consent-self-service consent-selfservice.<domain-name> xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
    consent-openbanking-financroo            financroo.<domain-name>           xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
```

## Post Deployment

* Update the APIM KPS deployment values using the instructions in [APIM Management Installation > Post Deployment](/docs/deployment/installation/apim#update-kps-configuration)  file to reflect all oauth*clientId and oauth*clientSecret values as deployed in ACP.

* Navigate to Openbanking workspace, Settings -> Authorization -> Trusted client certificates, and update the Trusted client certificates content with the `open-banking-consent/files/cert.pem` file attached.

* Navigate to Openbanking workspace, Applications -> Bank -> OAuth -> Subject Distinguished Name, update with the following entry
`CN=cid2.authorization.cloudentity.com,OU=Authorization,O=Cloudentity,L=Seattle,ST=Washinghton,C=US`
