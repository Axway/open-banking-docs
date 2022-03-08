---
title: "Analytics installation"
linkTitle: "Analytics"
weight: 4
---
Install Analytics for the Axway Open Banking solution.

## Download the Analytics Helm chart

Download the Axway Open Banking Analytics Helm chart to customize it locally.

```bash
helm pull axway-open-banking/open-banking-analytics --untar
```

You should get an `open-banking-analytics` local folder.

## Customize the Analytics Helm chart

Customize the `open-banking-analytics/values.yaml` file as follows.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.domainName | Set the domainname for all ingress. | \<domain-name> |
| global.dockerRegistry.username | Login name to pull Docker images from the Axway Repository. | None |
| global.dockerRegistry.token | Password token to pull Docker images from the Axway Repository. | None |
| elastic.password | Password used for "elastic" user. | Open*Banking*2021 |
| metrics.apiKey | API Key used for the metrics. Used by Webserver and APIM. | \<api-key> |
| kibana.ingress.dnsprefix | Set the domain name for kibana. | kibana |
| webserver.ingress.dnsprefix | Set the domain name for the web server used for Analytics. | analytics |
| webserver.report.frequency | Frequency of reports generation. | 00 00 \* \* \* (Every day at midnight) in UNIX chron format |

You can update the company logo and the colors used for the navigation map.

* *Company Logo*: Logo must be an svg file and must be name "company-logo.svg". Replace the file in `open-banking-analytics/branding/logo`.
* *Navigation Map Colors*: Update the css file `open-banking-analytics/branding/css`.

## Install the Analytics Helm chart

1. Create the target namespace on the cluster:

   ```bash
   kubectl create namespace open-banking-analytics
   ```

2. Install the Analytics Helm charts:

   ```bash
   helm install analytics open-banking-analytics -n open-banking-analytics
   ```

3. Check that the status of the Helm command is deployed:

   ```
   NAME: analytics 
   LAST DEPLOYED: <current date and time>
   NAMESPACE: open-banking-analytics 
   STATUS: deployed
   REVISION: 1 
   TEST SUITE: None
   ```

## Verify the Analytics Helm chart deployment

1. Wait a few minutes and use the following commands to check the deployment status.

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

2. Verify that:
   * **pods** with name elasticsearch-master-x, logstash-portal-x, kibana-xxx-xxx, metrics-apis-xxx-xxx, webserver-xxx-xxx are **Running** and Restart is **0**.

3. Check ingress with this command:

   ```bash
   kubectl get ingress -n open-banking-analytics 
   ```

4. Verify that these ingress are provisioned. They must have a public ip or a dns value in the ADDRESS column.

   ```
    NAME         HOSTS                           ADDRESS                       PORTS     AGE
    kibana       kibana.<domain-name>            xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
    webserver    analytics.<domain-name>         xxxxxxxxxxxxx.amazonaws.com   80, 443   2m
   ```

5. Check that you can access the different user interfaces:
   * _Analytics homepage_: `https://webserver.<domain-name>`
      * The Dashboard and Reports navigation (top bar) should show up with the custom logo and color theme.
      * No dashboard is deployed yet.
   * _ELK admin interface_: `https://kibana.<domain-name>`
      * You should be able to login with the credentials provided in the Helm chart values.

## Post Deployment

You need to import the dashboards to Kiban.

* Navigate to Stack Management - Kibana - Saved Objects.
* Import the dashboards file `open-banking-analytics/dashboards/export.ndjson`.