---
title: "Cloud Entity installation"
linkTitle: "Cloud Entity"
weight: 7
---
Install Cloud Entity for the Amplify Open Banking solution.

## Download the Cloud Entity Helm charts

Download the Amplify Open Banking Cloud Entity Helm charts to customize them locally.

```bash
helm pull open-banking/open-banking-acp --untar
helm pull open-banking/open-banking-consent --untar
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
| global.dockerRegistry.username | Defining Cloudentity repository username. | None |
| global.dockerRegistry.password | Defining Cloudentity repository password. | None |
| redis-cluster.password | Defining ACP's Redis password. | *p@ssw0rd!* |
| acp-prereq.cert.internal.certManager | Define if cert-manager is used internally. <br>False is currently not supported. | true |
| acp-prereq.cert.internal.certManagerNamespace | Namespace where cert-manager is installed. Use the result of the previous command. | None |
| acp-prereq.cert.ingress.certManager | Define if cert-manager is used externally. <br>If set to false, define cert and keys with values below. | true |
| acp-prereq.cert.ingress.cert | Use specific cert. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| acp-prereq.cert.ingress.key | Use specific key. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| acp.serverURL | ACP server URL | None |
| acp.serverURLMtls | ACP server URL | None |
| acp.config.data.storage.audit_events.retention.enabled | Enable audit events retention | true |
| acp.config.data.storage.audit_events.retention.batch_limit | Audit events retention batch delete limit | 1000 |
| acp.config.data.storage.audit_events.retention.max_age | Remove audit events older than max age limit | 6h0m0s |
| acp.config.data.server.obbr_base_paths | Open banking Brasil API base path whitelist. | None |
| acp.ingress.hosts.host | ACP server URL | None |
| acp.ingress.customAnnotations.nginx.ingress.kubernetes.io/proxy-ssl-secret | Secret to keep the ssl cert. It should be NAMESPACE]/acp-tls | open-banking-acp/acp-tls |
| acp.features.swagger_ui | Enable swagger UI. | true |

Remove the following lines if cert-manager is not used for ingress:

```yaml
cert-manager.io/cluster-issuer: letsencrypt-prod (l22)
cert-manager.io/acme-challenge-type: http01 (l23)
```

## Customize the Consent Helm chart

Modify the `open-banking-consent/values.yaml` file:

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| dockerRegistry.username | Cloudentity repo username. | None |
| dockerRegistry.token | Cloudentity repo token. | None |
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
| cert.ingress.financroo.cert | Use a dedicated certificate. Must be defined only if certManager and wildcard are set to false. | None |
| cert.ingress.financroo.key | Use a dedicated key. Must be defined only if certManager and wildcard are set to false. | None |

Update the `open-banking-consent/files/consent.values.yaml` file:

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| acpURL | ACP server URL. | None |
| consentPage.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-consent-page-tls.  | open-banking-consent<br>/consent-openbanking-consent-page-tls |
| consentPage.ingress.hosts | Update with the consent page URL. | consent.\<domain-name> |
| consentPage.ingress.tls.hosts | Update with the consent page URL. | consent.\<domain-name> |
| consentAdmin.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-consent-admin-tls. | open-banking-consent<br>/consent-openbanking-consent-admin-tls |
| consentAdmin.ingress.hosts | Update with the consent admin URL. | consent-admin.\<domain-name> |
| consentAdmin.ingress.tls.hosts | Update with the consent admin URL. | consent-admin.\<domain-name> |
| consentSelfservice.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret | \<namespace>/consent-openbanking-consent-self-service-tls. | open-banking-consent<br>/consent-openbanking-consent-self-service-tls |
| consentSelfservice.ingress.hosts | Update with the consent Self service URL. | consent-selfservice.\<domain-name> |
| consentSelfservice.ingress.tls.hosts | Update with the consent Self service URL. | consent-selfservice.\<domain-name> |
| financroo.ingress.annotations.nginx.ingress.kubernetes.io<br>/proxy-ssl-secret. | \<namespace>/consent-openbanking-financroo-tls. | open-banking-consent<br>/consent-openbanking-financroo-tls |
| financroo.ingress.hosts | Update with the financroo URL. | financroo.\<domain-name> |
| financroo.ingress.tls.hosts | Update with the financroo URL. | financroo.\<domain-name>|
| import.variables.consent_self_service_portal_url | Update with the consent self service portal url. | `https://consent-selfservice.<domain-name>` |
| import.variables.consent_admin_portal_url | Update with the consent admin portal url. | `https://consent-admin.<domain-name>` |
| import.variables.consent_page_url | Update with the consent page url. | `https://consent.<domain-name>` |
| import.variables.financroo_tpp_url | Update with the financroo tpp url. | `https://financroo.<domain-name>` |
| import.variables.developer_tpp_url | Update with the developer tpp url.| `https://financroo.<domain-name>` |
| import.variables.postman_client_id | Update with the Postman client id. | postman-eks |
| import.variables.bank_io_client_id | Update with the Bank.io client id. | bankio-eks |
| import.variables.bank_io_redirect_uri | Update with the bank.io redirect url. | `https://services-api.<domain-name>/login` |
| Import.Variables. dcr_jwks_uri | Openbanking central directory jwks info. | OBB Sandbox |
| Import.Variables.organization_id | Bank Organization ID registered at Central Directory. | None |
| Import.Variables.first_tpp_redirect_uri | Sample TPP1 used. | None |
| Import.Variables.second_tpp_redirect_uri | Sample TPP1 used. | None |

## Prepare deployment

1. Add the Cloud Entity Helm repository:

   ```bash
   helm repo add cloudentity https://charts.cloudentity.io 
   helm repo update 
   ```

2. Create the target namespaces on the cluster:

   ```bash
   kubectl create namespace open-banking-acp 
   kubectl create namespace open-banking-consent 
   ```

## Install the ACP Helm chart

1. Deploy the ACP Helm chart from the CloudEntity repository:
   {{% alert title="Note" color="primary" %}}Find the ACP chart-version to use in the `open-banking-acp/README.md`. Otherwise use the latest.{{% /alert %}}

   ```bash
   helm install acp -n open-banking-acp ./open-banking-acp
   ```

2. Check that the status of the Helm command is deployed:

   ```
      NAME: acp
      LAST DEPLOYED: <current date and time>
      NAMESPACE: open-banking-acp 
      STATUS: deployed
      REVISION: 1 
      TEST SUITE: None
   ```

## Verify the ACP Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n open-banking-acp 
   ```

2. Verify that:
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

3. Check ingress with this command:

   ```bash
   kubectl get ingress -n open-banking-acp 
   ```

4. Verify that this ingress is provisioned. It must have a public ip or a dns value in the ADDRESS column.

   ```
       NAME         HOSTS                           ADDRESS                       PORTS     AGE
       acp          acp.<domain-name>               xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
   ```

5. Connect to `https://acp.<domain-name>`  with admin / admin  and change the password immediately.

6. Check that you see an "openbanking" workspace.

## Install the Consent Helm chart

1. Deploy the Consent pre-requisites Helm chart from the Axway repository.

   ```bash
   helm install consent-prereq -n open-banking-consent open-banking-consent  
   ```

2. Check that the status of the Helm command is deployed:

   ```
      NAME: consent-prereq 
      LAST DEPLOYED: <current date and time>
      NAMESPACE: open-banking-consent 
      STATUS: deployed
      REVISION: 1 
      TEST SUITE: None
   ```

3. Deploy the Open Banking Consent Helm chart from the CloudEntity repository.
   {{% alert title="Note" color="primary" %}} Find the Open Banking Consent chart-version to use in the `open-banking-consent/README.md`. Otherwise use the latest.{{% /alert %}}

   ```bash
   helm install consent -n open-banking-consent cloudentity/openbanking –-version 0.1.9 -f open-banking-consent/files/consent.values.yaml
   ```

4. Check that the status of the Helm command is deployed:

   ```
      NAME: consent
      LAST DEPLOYED: <current date and time>
      NAMESPACE: open-banking-consent 
      STATUS: deployed
      REVISION: 1 
      TEST SUITE: None
   ```

## Verify the Consent Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n open-banking-consent 
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
      consent-openbanking-financroo-xxxx-xxx              1/1     Running     0          
      consent-openbanking-import-xxx                      0/1     Completed   0          
   ```

3. Check ingress with this command:

   ```bash
   kubectl get ingress -n open-banking-consent 
   ```

4. Verify that these ingress is provisioned. They must have a public ip or a dns value in the ADDRESS column.

   ```
       NAME                                     HOSTS                            ADDRESS                       PORTS     AGE
       consent-openbanking-consent-admin        consent-admin.<domain-name>       xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
       consent-openbanking-consent-page         consent.<domain-name>             xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
       consent-openbanking-consent-self-service consent-selfservice.<domain-name> xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
       consent-openbanking-financroo            financroo.<domain-name>           xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
   ```

## Post Deployment

* Update the APIM KPS deployment values using the instructions in [APIM Management Installation - Post Deployment](/docs/deployment/installation/apim#update-kps-configuration) file to reflect all oauth*clientId and oauth*clientSecret values as deployed in ACP.

* Navigate to Openbanking workspace, Settings - Authorization - Trusted client certificates, and update the Trusted client certificates content with the `open-banking-consent/files/cert.pem` file attached.

* Navigate to Openbanking workspace, Applications - Bank - OAuth - Subject Distinguished Name, update with the following entry
`CN=cid2.authorization.cloudentity.com,OU=Authorization,O=Cloudentity,L=Seattle,ST=Washinghton,C=US`.
