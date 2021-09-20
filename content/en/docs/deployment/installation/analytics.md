---
title: "Analytics Installation"
linkTitle: "Analytics"
weight: 4
description: Installing Analytics for the Axway Open Banking solution
---

## Download Helm chart

Download Axway Open Banking Analytics Helm chart to customize it locally

```bash
helm pull axway-open-banking/open-banking-analytics --untar
```

You should get a open-banking-analytics local folder.

## Customize Analytics Helm chart

Customize the open-banking-analytics/values.yaml file as follow

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.domainName | set the domainname for all ingress. | openbanking.demoaxway.com |
| global.dockerRegistry.username | Login name to pull Docker images from Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from Axway Repository. | None |
| elastic.password | Password used for "elastic" user. | Open*Banking*2021 |
| metrics.apiKey | API Key used for the metrics. Used by Webserver and APIM | PuGB+3m1z2jeFVHf5pWoFKOxH0F/fW9M |
| kibana.ingress.dnsprefix | set the domain name for kibana. | kibana |
| webserver.ingress.dnsprefix | Frequency of reports generation | analytics |
| webserver.report.frequency | Frequency of reports generation | 00 00 * * * (Every day at midnight) |

You can update the company logo and the colors used for the navigation map.

* Company Logo: Logo must be an svg file and must be name "company-logo.svg". Replace the file in open-banking-analytics/branding/logo
* Navigation Map Colors: Update the css file open-banking-analytics/branding/css

## Install Analytics Helm chart

Create the target namespace on the cluster:

```bash
kubectl create namespace open-banking-analytics
```

Install the APIM  helm charts:

```bash
helm install analytics open-banking-analytics -n open-banking-analytics
```

Check that the status of the helm command is deployed:

>NAME: analytics \
>LAST DEPLOYED: <current date and time>
>NAMESPACE: open-banking-analytics \
>STATUS: **deployed** \
>REVISION: 1 \
>TEST SUITE: None

### Verifications

Wait a few minutes and use the following commands to check the status of the deployment.

```
kubectl get pods -n open-banking-analytics 
```

```
    NAME                           READY   STATUS    RESTARTS   AGE
    elasticsearch-master-0         1/1     Running   0          57s
    elasticsearch-master-1         1/1     Running   0          57s
    elasticsearch-master-2         1/1     Running   0          57s
    kibana-647679fd47-btnt6        1/1     Running   0          57s
    logstash-0                     1/1     Running   0          57s
    metrics-apis-8684c7594-8p46b   1/1     Running   0          52s
    webserver-5d59fc5447-gvnmk     1/1     Running   0          50s
```

Verify that :

* **pods** with name elasticsearch-master-x, logstash-portal-x, kibana-xxx-xxx, metrics-apis-xxx-xxx, webserver-xxx-xxx are **Running** and Restart is **0**.

Check ingress with this command :

```bash
kubectl get ingress -n open-banking-analytics 
```

```
    NAME         HOSTS                           ADDRESS                       PORTS     AGE
    kibana       kibana.<domain-name>             xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
    webserver    analytics.<domain-name>          xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
```

Check you can access the differents user interfaces: 

* Analytics homepage : `https://webserver.<domain-name>` 

    * the Dashboard an Reports navigation (top bar) should show up with custom logo and color theme. 
    * No dashboard is deployed yet

* ELK admin interface : `https://kibana.<domain-name>`

    * You should be able to login with the credentials provided in the helm chart values.

## Post Deployment

you need to import the dashboards to Kibana

* Navigate to Stack Management -> Kibana -> Saved Objects
* Import the dashboards file open-banking-analytics/dashboards/export.ndjson