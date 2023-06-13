---
title: "Troubleshooting"
linkTitle: "Troubleshooting"
weight: 10
date: 2021-09-02
---
Find useful logs, enable debug options, and connect to UIs to help identify the root cause of errors.

## Debug API traffic

Every time you get an unexpected response from one of the solution APIs, you can check the traffic details to understand the return code or message that was provided.

### Enable debug and full data log on the API endpoint listener

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

1. Navigate to Traffic - HTTP.
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-list.png)
2. Click the method you want to troubleshoot to open the details.
3. The first section details the execution path.
![api-gateway-manager-debug](/Images/api-gateway-manager-traffic-execution-path.png)
You can identify the execution path, the policy used, and where some filter failed. According to the API configuration in API Manager, you will see one or several API policies executed. This could be Inbound Security Policy, Request Policy, Routing Policy, Response Policy, or Fault Handler Policy. Find our more about this policy configuration in [API Manager documentation - custom policies](https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_administration/apimgr_admin/api_mgmt_custom_policies/index.html).
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
* Fix the Authorization server configuration. Refer to [Cloudentity workspace administration](https://cloudentity.com/developers/howtos/).
* Fix the API Manager configuration. Refer to [API Management](/docs/configuration/api-management#api-management).
* Fix the API Gateway KPS configuration. Refer to [KPS configuration](/docs/configuration/api-management/#key-properties-store-kps-configuration).
* Update a certification configuration. Refer to [API Policies](/docs/configuration/api-management#api-policies).

### Change the log level back to the default

Once solved, make sure to reduce the log level back to default.

## API policy debug

If traffic debug did not help to understand a specific behavior, you can also dive into the policy level.

1. Open *Policy Studio*.
2. Select **New project from an API Gateway instance**.
3. Provide a project name for the local copy of the remote instance.
4. Provide connection details  (`api-gateway-manager.\<domain-name>, 443, admin, password`).
5. Select the **apimgr** instance.
6. Click **Finish** and wait for all policies to load.
![api-gateway-manager-debug](/Images/apim-policy-studio-api-containers.png)
7. Browse under Policy Container - #AMPLIFY-OB-FDX for FDX deployments or #AMPLIFY-OB for Open Finance Brazil deployments. Or, use the search box to provide the API name.
8. Double click the API name to open the filter path.

### Review the API filter path

Once you open the filter path for the API, you can do the following:

* Discover every filter details configuration. This may help to understand a specific behavior.
* Change log level of any filter.
* Add a trace filter between 2 filters.
* Test changing the policy.

Any change needs to be published with the *Deploy (F6)* command and select all instances of the current group.

{{% alert title="Note" color="primary" %}} These changes will not be persisted and restart of the pod will reverse your changes.{{% /alert %}}

If you need to change the API Policy configuration more permanently, refer to [Configuration - API Policies](/docs/configuration/api-management#api-policies).

## Cloudentity logs

Cloudentity logs can be accessed at the container standard output. In the Kubernetes cluster:

* Identify the acp-xxxxx-xxx pod name

```bash
kubectl get pods -n open-banking-consent 
```

* Display the logs:

```bash
kubectl logs acp-xxxxx-xxx -n open-banking-acp 
```

Use `-f` command option to get help to follow the logs stream.
