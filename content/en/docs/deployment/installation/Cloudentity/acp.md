---
title: "Cloudentity Installation"
linkTitle: "Cloudentity"
weight: 1
---

Install Cloudentity for the Amplify Open Banking solution.

## Customize the ACP Helm chart

Find the namespace of the cert-manager component.

```bash
kubectl get pods -A | grep cert-manager | awk '{print $1}' | uniq
```

Modify the `open-banking-fdx-acp/values.yaml` file for FDX deployment and `open-banking-acp/values.yaml` file for Open Finance Brazil deployment.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.dockerRegistry.username | Defining Cloudentity repository username. | None |
| global.dockerRegistry.password | Defining Cloudentity repository password. | None |
| redis-cluster.password | Defining Cloudentity's Redis password. | None |
| acp-prereq.cert.internal.certManager | Define if cert-manager is used internally. <br>False is currently not supported. | true |
| acp-prereq.cert.internal.certManagerNamespace | Namespace where cert-manager is installed. Use the result of the previous command. | None |
| acp-prereq.cert.ingress.certManager | Define if cert-manager is used externally. <br>If set to false, define cert and keys with values below. | true |
| acp-prereq.cert.ingress.cert | Use specific cert. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| acp-prereq.cert.ingress.key | Use specific key. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| acp.serverURL | Cloudentity server URL | None |
| acp.serverURLMtls | Cloudentity server URL | None |
| acp.config.data.storage.audit_events.retention.enabled | Enable audit events retention | true |
| acp.config.data.storage.audit_events.retention.batch_limit | Audit events retention batch delete limit | 1000 |
| acp.config.data.storage.audit_events.retention.max_age | Remove audit events older than max age limit | 6h0m0s |
| acp.config.data.server.obbr_base_paths | Open banking Brasil API base path whitelist. | None |
| acp.ingress.hosts.host | Cloudentity server URL | None |
| acp.ingress.customAnnotations.nginx.ingress.kubernetes.io/proxy-ssl-secret | Secret to keep the ssl cert. It should be [NAMESPACE]/acp-tls | open-banking-cloudentity/acp-tls |
| acp.features.swagger_ui | Enable swagger UI. | true |

Remove the following lines if cert-manager is not used for ingress:

```yaml
cert-manager.io/cluster-issuer: letsencrypt-prod (l22)
cert-manager.io/acme-challenge-type: http01 (l23)
```

## Prepare deployment

1. Add the Cloud Entity Helm repository:

   ```bash
   helm repo add cloudentity https://charts.cloudentity.io 
   helm repo update 
   ```

2. Create the target namespace on the cluster:

   ```bash
   kubectl create namespace open-banking-acp
   ```

## Install the ACP Helm chart

1. Deploy the ACP Helm chart from the CloudEntity repository:
   {{% alert title="Note" color="primary" %}}Find the ACP chart-version to use in the `open-banking-acp/README.md`. Otherwise use the latest.{{% /alert %}}

   For FDX:
   ```bash
   helm install acp -n open-banking-acp ./open-banking-fdx-acp
   ```
   For Open Finance Brazil:
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

## Post Deployment

* Update the APIM KPS deployment values using the instructions in [APIM Management Installation - Post Deployment](/docs/deployment/installation/api-management/obb-apim/#update-kps-configuration) file to reflect all oauth*clientId and oauth*clientSecret values as deployed in ACP.

* Navigate to Openbanking workspace, Settings - Authorization - Trusted client certificates, and update the Trusted client certificates content with the `open-banking-consent/files/cert.pem` file attached.

* Navigate to Openbanking workspace, Applications - Bank - OAuth - Subject Distinguished Name, update with the following entry
`CN=cid2.authorization.acp.com,OU=Authorization,O=Cloudentity,L=Seattle,ST=Washinghton,C=US`.
