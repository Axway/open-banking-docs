---
title: "Backend services Installation"
linkTitle: "Backend services"
weight: 3
description: Installing Backend services for the Axway Open Banking solution
---


## Download the Backend Services Helm chart

Download the Axway Open Banking Backend Services Helm chart to customize it locally.

```bash
helm pull axway-open-banking/open-banking-backend-chart --untar
```

You should get an `open-banking-backend-chart` local folder.

## Customize the Backend Services Helm chart

Customize the `open-banking-backend-chart/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.dockerRegistry.username | Login name to pull Docker images from Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from Axway Repository. | None |
| mysqldb.dbname | Mock backend database name. |  _medicimockbackend_ |
| mysqldb.dbuser | Mock backend database username. |  _mockbank_ |
| secrets.MYSQL_ROOT_PASSWORD | Mock backend database root password. | _Ch@ng3M3!_ |
| secrets.MYSQL_USER_PASSWORD | Mock backend database user password. | _Ch@ng3M3!_ |

## Install the Backend Services Helm chart

Create the target namespace on the cluster:

```bash
kubectl create namespace open-banking-backend
```

Install the Backend Services Helm chart:

```bash
helm install backend-services open-banking-backend-chart -n open-banking-backend
```

Check that the status of the Helm command is deployed:

```
    NAME: backend-services
    LAST DEPLOYED: <current date and time>
    NAMESPACE: open-banking-backend
    STATUS: deployed
    REVISION: 1 
    TEST SUITE: None
```

### Verification

Wait a few minutes and use the following commands to check the status of the deployment.

```
kubectl get pods -n open-banking-backend
```

Verify that:

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
