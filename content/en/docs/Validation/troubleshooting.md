---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
description: Find useful logs, enable debug options, connect to UIs to help you identify any error cause.
weight: 5
date: 2021-09-02
---

## Debug API traffic

Every time you get an unexpected response from one of the APIs of the solution. You can easily check traffic details to understand with the return code or message was provided.

The first step is to enable debug and full data log on the API endpoint listener.

* Login to API Gateway Manager user interface
* Navigate to Settings > Dynamic
* Select the corresponding API listener. In most cases, it is "API Manager Traffic"
* Select the underlying internal port, just below
* Override settings and trace level for this port as describe below
![api-gateway-manager-debug](/Images/api-gateway-manager-debug.png)
* Save

Now all new traffic will be logged with the highest level of information, so that debug will be easier for next API call attempt.

Run your test again and idenfify the call in the traffic

* Navigate to Settings > HTTP
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-list.png)
* Click to open
* The first section details the execution path.
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-execution-path.png)
* you can identify the execution path the policy used and where some filter failed
* According to the API configuration in API Manager, you will see one or several API policy executed. This could be Inbound Security Policy, Request Policy, Routing Policy, Response Policy, Fault Handler Policy. Find our more about this policy configuration in [API Manager documentation > custom policies](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_custom_policies/index.html)
* The next sections provide all internal or external request and response , with header and body, that is involved in this API call.
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-requests.png)
* You can now further investigate the intermediate request parameters and responses to better understand the current behavior
* the last section provide the execution text trace of every step of the policies execution. 
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-trace.png)
* you can search for the word "error" or the error message you saw previously to see it in the trace context
* you can find here more explicit error messages that would help you to fully understand the root cause.

Once analysed, you might take one or several decision to fix your issue:

* fix a remote backend or cloud service that was not available
* fix client configuration to call the API differently
* fix Authorization server configuration: refer to [ACP workspace administration](https://docs.authorization.cloudentity.com/guides/workspace_admin/)
* fix API Manager configuration: refer to [API Management](/docs/configuration/api-manager#api-management)
* fix API Gateway KPS configuration: refer to [KPS configuration](/docs/configuration/api-gateway#kps-configuration)
* update a cerfication configuration: refer to [Certificate Management](/docs/configuration/certificate-management)
* fix the API policy definition: refer to [API Policies](/docs/configuration/api-gateway#api-policies)

Once solved, don't forget to reduce the log level back to default.

## API Policy debug

If traffic debug didn't help to understand a specific behavior, you can also dive into the policy level.

* Open *Policy Studio*
* Select "New project from an API Gateway instance"
* Provide a project name, for the local copy of the remote instance.
* Provide connection details  (i.e: api-gateway-manager.\<domain-name>, 443, admin, apiAdminPwd!)
* Select apimgr instance
* Click on Finish and wait for all policies to load:
![api-gateway-manager-debug](/Images/apim-policy-studio-api-containers.png)
* Browse under Policy > #AMPLIFY-OB to find the API . Or, use search box to provide the API name
* Double click on the API name to open the filter path

You can now :

* discover every filter details configuration. This may help to understand a specific behavior
* change log level of any filter
* add a trace filter between 2 filters
* test changing the policy

Any change needs to be published with the _Deploy (F6)_ command and select all instances of the current group.

>These changes will not be persisted after ouside the container

If you need to change API Policy configuration more permanetly, please refer to [Configuration > API Policies](/docs/configuration/api-gateway#api-policies)

## ACP logs

ACP logs can access at the container standard output.
In the Kubernetes cluster:

* Identify the acp-xxxxx-xxx pod name

```bash
kubectl get pods -n open-banking-consent 
```

* Display the logs :

```bash
kubectl logs acp-xxxxx-xxx -n open-banking-acp 
```

Use `-f` command option to get help to follow the logs stream.

## Portal debug options

* Navigate to Menu > System > Global configuration

* Select System tab, and select _Yes_ for _Debug Server_ : diagnostic information, language translation, and SQL errors (if present) will be displayed. The information will be displayed at the foot of every page you view within the Joomla Backend and Frontend.
![developer-portal-config-debug](/Images/developer-portal-config-debug.png)
* Select Server tab, and select _Maximum_ for _Error Reporting_ :  This parameter sets the level of error reporting to be used by PHP on the Joomla site. _Maximum_ would override the server setting to give the reporting of all errors.
![developer-portal-config-debug](/Images/developer-portal-config-error-reporting.png)

* You will get diagnostic information and error reporting directly while navigating on the Developer Portal in you web browser. It is recommanded to use this option only in non-production environment , and for a limited period in time.

* You can also get logs on the server side by accessing the container standard output. In the Kubernetes cluster:

    * Identify the api-portal-xxxxx-xxx pod name

    ```bash
    kubectl get pods -n open-banking-developer-portal 
    ```

    * Display the logs :

    ```bash
    kubectl logs api-portal-xxxxx-xxx -n open-banking-developer-portal 
    ```

    Use `-f` command option to get help to follow the logs stream.

## Analytics search

Analytics dashbaord, reports, and metrics API should reflect every Open Banking API calls.

If you need to check correct Analytics integration, run couple API call tests and use Kibana interface to search for the corresponding events.

* Click on Kibana > Discover
* Optionnaly use filters , like app (name of the client app) or service (name of the API)
* Select the corresponding timerange
![analytics-search](/Images/analytics-search.png)
