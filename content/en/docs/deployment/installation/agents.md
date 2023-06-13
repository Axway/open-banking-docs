---
title: "Amplify Agents Installation"
linkTitle: "Amplify Agents"
weight: 15
---
Install Amplify Agents, discovery agent and traceability agent, for the Amplify Open Banking solution. For the detailed installation instructions please see [Connect API Manager](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connect_api_manager/index.html)

Also make sure that you configure discovery agent with IdP. For the detailed information see [Provisioning OAuth credential to an identity provider](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connected_agent_common_reference/marketplace_provisioning/index.html#provisioning-oauth-credential-to-an-identity-provider).

You can also use below sample discovery agent IdP configuration for Amplify Open Banking Deployment:

```console
AGENTFEATURES_IDP_NAME_1: "Cloudentity"
AGENTFEATURES_IDP_TYPE_1: "generic"
AGENTFEATURES_IDP_METADATAURL_1: ""
AGENTFEATURES_IDP_AUTH_TYPE_1: "client"
AGENTFEATURES_IDP_AUTH_CLIENTID_1: ""
AGENTFEATURES_IDP_AUTH_CLIENTSECRET_1: ""
```