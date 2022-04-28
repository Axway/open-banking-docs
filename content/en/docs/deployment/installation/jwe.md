---
title: "JWE key generator tool installation"
linkTitle: "JWE Generator"
weight: 4
---
Install the JWE key generator tool for the Axway Open Banking solution.

## Download the JWE key generator tool Helm chart

Download the Axway Open Banking JWE key generator tool Helm chart to customize it locally.

```bash
helm pull open-banking/jwe-generator --untar
```

You should get an `jwe-generator` local folder.

## Customize the JWE key generator tool Helm chart

Customize the `jwe-generator/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| ingress.domainName | Set the domainname for all ingress. | \<domain-name> |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |

## Install the JWE key generator tool Helm chart

1. Create the target namespace on the cluster:

   ```bash
   kubectl create namespace jwe-generator
   ```

2. Install the JWE key generator Helm charts:

   ```bash
   helm install jwe jwe-generator -n jwe-generator
   ```

3. Check that the status of the Helm command is deployed:

   ```
   NAME: jwe
   LAST DEPLOYED: <current date and time>
   NAMESPACE: jwe-generator 
   STATUS: deployed
   REVISION: 1 
   TEST SUITE: None
   ```

## Verify the JWE key generator tool Helm chart deployment

Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n jwe-generator 
       NAME                                         READY   STATUS    RESTARTS   AGE
       jwe-jwe-generator-6ff796599c-pdxph           1/1     Running   0          57s
       
   ```
