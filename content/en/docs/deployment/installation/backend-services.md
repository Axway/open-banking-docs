---
title: "Backend Services Installation"
linkTitle: "Backend Services"
weight: 25
---
Install Backend Services for the Amplify Open Banking solution.

## Financial Data Exchange (FDX) deployments

Fetch the Amplify Open Banking Backend Services Helm chart to view the `values.yaml` file.

```bash
helm fetch axway/open-banking-fdx-backend --untar
```

You should get an `open-banking-fdx-backend` local folder.

### Customize the Backend Services Helm chart

Customize the `values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| global.apihost | MTLS apigateway endpoint. | https://mtls-api-proxy.<domain-name>/open-banking |
| mysqldb.dbname | Mock backend database name. |  *fdxmockbackend* |
| mysqldb.dbuser | Mock backend database username. |  *mockbank* |
| secrets.MYSQL_ROOT_PASSWORD | Mock backend database root password. | None|
| secrets.MYSQL_USER_PASSWORD | Mock backend database user password. | None |
| *apiname*.enable | To enable or disable the API deployment. | true |

### Install the Backend Services Helm chart

1. Create the target namespace on the cluster:

   ```bash
   kubectl create namespace open-banking-backend
   ```

2. Install the Backend Services Helm chart:

   ```bash
   helm install backend open-banking-fdx-backend -n open-banking-backend
   ```

3. Check that the status of the Helm command is deployed:

   ```bash
       NAME: backend
       LAST DEPLOYED: <current date and time>
       NAMESPACE: open-banking-backend
       STATUS: deployed
       REVISION: 1 
       TEST SUITE: None
   ```

### Verify the Backend Services Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

   ```
   kubectl get pods -n open-banking-backend
   ```

2. Verify that:

   * **pods** with name mysqldb-xxx-xx and those name after the api names are all **Running** and Restart is **0**.

   ```
       NAME                      READY   STATUS    RESTARTS   AGE
       fdxcore-xxx-xx            1/1     Running   0          2m
       fdxmoneymovement-xxx-xx   1/1     Running   0          2m
       fdxtax-xxx-xx             1/1     Running   0          2m
       obieproducts-xxx-xx       1/1     Running   0          2m
       mysqldb-xxx-xx            1/1     Running   0          2m
   ```

## Open Finance Brazil deployments

Download the Amplify Open Banking Backend Services Helm chart to customize it locally.

```bash
helm pull axway/open-banking-backend-chart --untar
```

You should get an `open-banking-backend-chart` local folder.

### Customize Backend Services Helm chart

Customize the `values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| global.apihost | MTLS apigateway endpoint. | None |
| global.apidomain | MTLS apigateway endpoint. | None |
| mysqldb.dbname | Mock backend database name. |  *medicimockbackend* |
| mysqldb.dbuser | Mock backend database username. |  *mockbank* |
| secrets.MYSQL_ROOT_PASSWORD | Mock backend database root password. | None|
| secrets.MYSQL_USER_PASSWORD | Mock backend database user password. | None |
| *apiname*.disable | To disable the API deployment set it to true | false |

### Install Backend Services Helm chart

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

### Verify Backend Services Helm chart deployment

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
