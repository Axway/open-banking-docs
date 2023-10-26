---
title: "Cloudentity Installation"
linkTitle: "Cloudentity"
weight: 1
---

Install Cloudentity for the Amplify Open Banking solution.

## Create a customized values.yaml file

Find the namespace of the cert-manager component.

```bash
kubectl get pods -A | grep cert-manager | awk '{print $1}' | uniq
```

Create a customized `values` file, for example, `myvalues.yaml`, and make your customizations. This file should contain only the sections of the `values.yaml` file that you wish to override. Any values not present in the customized file will be picked up from the original `values.yaml` file.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.dockerRegistry.username | Defining Cloudentity repository username. | None |
| global.dockerRegistry.password | Defining Cloudentity repository password. | None |
| acp-prereq.cert.internal.certManager | Define if cert-manager is used internally. <br>False is currently not supported. | true |
| acp-prereq.cert.internal.certManagerNamespace | Namespace where cert-manager is installed. Use the result of the previous command. | None |
| acp-prereq.cert.ingress.certManager | Define if cert-manager is used externally. <br>If set to false, define cert and keys with values below. | true |
| acp-prereq.cert.ingress.cert | Use specific cert. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| acp-prereq.cert.ingress.key | Use specific key. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| acp-prereq.cert.ingress.certMtls | Use specific cert for Cloudentity mtls endpoint. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| acp-prereq.cert.ingress.keyMtls | Use specific key for Cloudentity mtls endpoint. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| acp.serverURL | Cloudentity admin server URL. | None |
| acp.serverURLMtls | Cloudentity mtls server URL. | None |
| acp.secretConfig.data.redis.password | redis password. | None |
| acp.ingress.tls.hosts | Cloudentity admin server URL. | None |
| acp.ingress.hosts.host | Cloudentity admin server URL. | None |
| acp.ingressMtls.tls.hosts | Cloudentity mtls server URL. | None |
| acp.ingressMtls.hosts.host | Cloudentity mtls server URL. | None |
| acp.features.swagger_ui | Enable swagger UI. | true |
| acp.features.fdx_dcr | Enable FDX DCR endpoint. | true |
| acp.config.data.storage.audit_events.retention.enabled | Enable audit events retention. | true |
| acp.config.data.storage.audit_events.retention.batch_limit | Audit events retention batch delete limit. | 1000 |
| acp.config.data.storage.audit_events.retention.max_age | Remove audit events older than max age limit. | 6h0m0s |
| acp.config.data.server.obbr_base_paths | Open banking Brasil API base path whitelist. | None |
| redis-cluster.password | Defining Cloudentity's Redis password. | None |

Remove the following lines if cert-manager is not used for ingress:

```yaml
cert-manager.io/cluster-issuer: letsencrypt-prod (l22)
cert-manager.io/acme-challenge-type: http01 (l23)
```

## Prepare deployment

Create the target namespace on the cluster:

```bash
kubectl create namespace open-banking-cloudentity
```

## Install the Cloudentity Helm chart

1. Deploy the Cloudentity Helm chart:
   ```bash
   helm install acp -n open-banking-cloudentity -f myvalues.yaml axway/open-banking-cloudentity
   ```

2. Check that the status of the Helm command is deployed:

   ```
      NAME: acp
      LAST DEPLOYED: <current date and time>
      NAMESPACE: open-banking-cloudentity 
      STATUS: deployed
      REVISION: 1 
      TEST SUITE: None
   ```

## Verify the Cloudentity Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n open-banking-cloudentity 
   ```

2. Verify that:
   * **pods** with acp-xxx-xxx, name acp-cockroachdb-xxx, acp-redis-cluster-x are all **Running**.
   * **pods** with acp-cockroachdb-init-xxx is **Completed**.
  
   ```
      NAME                         READY   STATUS      RESTARTS   AGE
      acp-66d8797fb4-njbw6         1/1     Running     0          3m
      acp-cockroachdb-0            1/1     Running     0          3m
      acp-cockroachdb-init-h8hdc   0/1     Completed   0          3m
      acp-redis-cluster-0          1/1     Running     0          3m
      acp-redis-cluster-1          1/1     Running     0          3m
      acp-redis-cluster-2          1/1     Running     0          3m
   ```

3. Check ingress with this command:

   ```bash
   kubectl get ingress -n open-banking-cloudentity 
   ```

4. Verify that this ingress is provisioned. It must have a public ip or a dns value in the ADDRESS column.

   ```
       NAME         HOSTS                           ADDRESS                       PORTS     AGE
       acp          acp-admin.<domain-name>         xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
       acp-mtls     acp.<domain-name>               xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
   ```

5. Connect to `https://acp-admin.<domain-name>`  with admin / admin  and change the password immediately.
