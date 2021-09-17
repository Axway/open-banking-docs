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
