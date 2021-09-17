---
title: "Backend services Installation"
linkTitle: "Backend services"
weight: 3
description: Installing Backend services of the Axway Open Banking solution
---


## Download Helm chart

Download Axway Open Banking Backend Services Helm chart to customize it locally

```bash
helm pull axway-open-banking/open-banking-backend-chart --untar
```

You should get a open-banking-backend-chart local folder.

## Customize Backend Services  Helm chart

Customize the open-banking-backend-chart/values.yaml file as follow

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.dockerRegistry.url | URL of the Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking |
| global.dockerRegistry.username | Login of user that as been created for you. |  |
| global.dockerRegistry.token | Token of user that as been created for you. |  |
| mysqldb.dbname | Mock backend database name |  "medicimockbackend" |
| mysqldb.dbuser | Mock backend database username |  "mockbank" |
| secrets.MYSQL_ROOT_PASSWORD | Mock backend database root password | Ch@ng3M3! |
| secrets.MYSQL_USER_PASSWORD | Mock backend database user password | Ch@ng3M3! |

## Install Backend Services Helm chart

Create the target namespace on the cluster:

```bash
kubectl create namespace open-banking-backend
```

Install the helm chart:

```bash
helm install backend open-banking-backend-chart -n open-banking-backend
```

Check that the status of the helm command is deployed:

```
    NAME: backend
    LAST DEPLOYED: Fri Apr 16 08:36:35 2021 
    NAMESPACE: open-banking-backend
    STATUS: deployed
    REVISION: 1 
    TEST SUITE: None
```

## Verification

Wait a few minutes and use the following commands to check the status of the deployment.

```
kubectl get pods -n open-banking-backend
```

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

Verify that :

* **pods** with name mysqldb-xxx-xx and those name after the api name are all **Running** and Restart is **0**.
