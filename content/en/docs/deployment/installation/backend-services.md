---
title: "Backend Services installation"
linkTitle: "Backend Services"
weight: 3
---
Install Backend Services for the Axway Open Banking solution.

## Download the Backend Services Helm chart

Download the Axway Open Banking Backend Services Helm chart to customize it locally.

```bash
helm pull open-banking/open-banking-backend-chart --untar
```

You should get an `open-banking-backend-chart` local folder.

## Customize the Backend Services Helm chart

Customize the `open-banking-backend-chart/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| global.apihost | MTLS apigateway endpoint. | None |
| global.apidomain | MTLS apigateway endpoint. | None |
| mysqldb.dbname | Mock backend database name. |  _medicimockbackend_ |
| mysqldb.dbuser | Mock backend database username. |  _mockbank_ |
| secrets.MYSQL_ROOT_PASSWORD | Mock backend database root password. | _Ch@ng3M3!_ |
| secrets.MYSQL_USER_PASSWORD | Mock backend database user password. | _Ch@ng3M3!_ |

## Install the Backend Services Helm chart

1. Create the target namespace on the cluster:

   ```bash
   kubectl create namespace open-banking-backend
   ```

2. Install the Backend Services Helm chart:

   ```bash
   helm install backend-services open-banking-backend-chart -n open-banking-backend
   ```

3. Check that the status of the Helm command is deployed:

   ```
       NAME: backend-services
       LAST DEPLOYED: <current date and time>
       NAMESPACE: open-banking-backend
       STATUS: deployed
       REVISION: 1 
       TEST SUITE: None
   ```

## Verify the Backend Services Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n open-banking-backend
   ```

2. Verify that:

   * **pods** with name mysqldb-xxx-xx and those name after the api names are all **Running** and Restart is **0**.

   ```
       NAME                   READY   STATUS    RESTARTS   AGE
       accounts-xxx-xx        1/1     Running   0          2m
       accounts-br-xxx-xx     1/1     Running   0          2m
       creditcards-xxx-xx     1/1     Running   0          2m
       customer-xxx-xx        1/1     Running   0          2m
       discovery-xxx-xx       1/1     Running   0          2m
       mysqldb-xxx-xx         1/1     Running   0          2m
       payments-xxx-xx        1/1     Running   0          2m
       products-xxx-xx        1/1     Running   0          2m
       reviews-xxx-xx         1/1     Running   0          2m
       servicechannel-xxx-xx  1/1     Running   0          2m
   ```
