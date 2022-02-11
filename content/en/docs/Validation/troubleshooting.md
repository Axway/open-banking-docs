---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
description: Find useful logs, enable debug options, connect to UIs to help you identify any error cause.
weight: 5
date: 2021-09-02
---

## Debug API traffic

Every time you get an unexpected response from one of the solution APIs, you can check the traffic details to understand the return code or message that was provided.

### Enable Debug and full data log on the API endpoint listener

First, enable debug and the full data log on the API endpoint listener to troubleshoot and debug API traffic.

1. Login to the API Gateway Manager user interface.
2. Navigate to Settings - Dynamic.
3. Select the corresponding API listener. In most cases, it is "API Manager Traffic."
4. Select the underlying internal port, just below the API listener.
5. Select all options in **Override settings for the port**, and then select DATA for the **Trace level**  for this port.
![api-gateway-manager-debug](/Images/api-gateway-manager-debug.png)
6. Click **Apply**.

### Identify the call in the traffic

Second, run your test again and identify the call in the traffic to troubleshoot and debug API traffic.

1. Navigate to Settings - HTTP.
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-list.png)
2. Click the method you want to troubleshoot to open the details.
3. The first section details the execution path.
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-execution-path.png)
You can identify the execution path, the policy used, and where some filter failed. According to the API configuration in API Manager, you will see one or several API policies executed. This could be Inbound Security Policy, Request Policy, Routing Policy, Response Policy, or Fault Handler Policy. Find our more about this policy configuration in [API Manager documentation > custom policies](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_custom_policies/index.html).
4. The next sections provide all internal or external requests and responses, with header and body, that are involved in this API call.
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-requests.png)
You can investigate the intermediate request parameters and responses to better understand the current behavior.
5. The last section provides the execution text trace of every step of the policies execution.
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-trace.png)
You can search for the word "error" or the error message you saw previously to see it in the trace context. Also, you can find more detailed error messages that can help you to fully understand the root cause.

### Take action to fix the issue

Once analyzed, you might take one or several actions to fix the issue:

* Fix a remote backend or cloud service that was not available.
* Fix client configuration to call the API differently.
* Fix the Authorization server configuration. Refer to [ACP workspace administration](https://docs.authorization.cloudentity.com/guides/workspace_admin/).
* Fix the API Manager configuration. Refer to [API Management](/docs/configuration/api-manager#api-management).
* Fix the API Gateway KPS configuration. Refer to [KPS configuration](/docs/configuration/api-gateway#kps-configuration).
* Update a certification configuration. Refer to [API Policies](/docs/configuration/api-gateway#api-policies).

### Change the log level back to the default

Once solved, make sure to reduce the log level back to default.

## API Policy debug

If traffic debug did not help to understand a specific behavior, you can also dive into the policy level.

1. Open *Policy Studio*.
2. Select **New project from an API Gateway instance**.
3. Provide a project name for the local copy of the remote instance.
4. Provide connection details  (`api-gateway-manager.\<domain-name>, 443, admin, apiAdminPwd!`).
5. Select the **apimgr** instance.
6. Click **Finish** and wait for all policies to load.
![api-gateway-manager-debug](/Images/apim-policy-studio-api-containers.png)
7. Browse under Policy - #AMPLIFY-OB to find the API. Or, use the search box to provide the API name.
8. Double click the API name to open the filter path.

### Review the API filter path

Once you open the filter path for the API, you can do the following:

* Discover every filter details configuration. This may help to understand a specific behavior.
* Change log level of any filter.
* Add a trace filter between 2 filters.
* Test changing the policy.

Any change needs to be published with the *Deploy (F6)* command and select all instances of the current group.

{{% alert title="Note" color="primary" %}} These changes will not be persisted after outside the container.{{% /alert %}}

If you need to change the API Policy configuration more permanently, refer to [Configuration - API Policies](/docs/configuration/api-gateway#api-policies).

## ACP logs

ACP logs can be accessed at the container standard output. In the Kubernetes cluster:

* Identify the acp-xxxxx-xxx pod name

```bash
kubectl get pods -n open-banking-consent 
```

* Display the logs:

```bash
kubectl logs acp-xxxxx-xxx -n open-banking-acp 
```

Use `-f` command option to get help to follow the logs stream.

## Portal debug options

1. Navigate to Menu - System - **Global configuration**.
2. Select the System tab, and then select **Yes** for *Debug Server*: Diagnostic information, language translation, and SQL errors (if present) will be displayed. The information will be displayed at the foot of every page you view within the Joomla Backend and Frontend.
![developer-portal-config-debug](/Images/developer-portal-config-debug.png)
3. Select the Server tab, and then select **Maximum** for _Error Reporting_: This parameter sets the level of error reporting to be used by PHP on the Joomla site. _Maximum_ would override the server setting to give the reporting of all errors.
![developer-portal-config-debug](/Images/developer-portal-config-error-reporting.png)
   * You will get diagnostic information and error reporting directly while navigating on the Developer Portal in your web browser. It is recommended to use this option only in a non-production environment, and for a limited period in time.
4. You can also get logs on the server side by accessing the container standard output. In the Kubernetes cluster:
    * Identify the api-portal-xxxxx-xxx pod name

    ```bash
    kubectl get pods -n open-banking-developer-portal 
    ```

    * Display the logs:

    ```bash
    kubectl logs api-portal-xxxxx-xxx -n open-banking-developer-portal 
    ```
    Use `-f` command option to get help to follow the logs stream.

## Analytics search

Analytics dashboard, reports, and metrics API should reflect every Open Banking API calls.

If you need to check correct Analytics integration, run a couple API call tests and use the Kibana interface to search for the corresponding events.

1. Click on Kibana - Discover.
2. (Optional) Use filters, like app (name of the client app) or service (name of the API).
3. Select the corresponding timerange
![analytics-search](/Images/analytics-search.png)
