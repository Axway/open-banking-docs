---
title: "Amplify Agents Installation"
linkTitle: "Amplify Agents"
weight: 15
---
Install Amplify Agents, discovery and traceability agents, for the Amplify Open Banking solution. For detailed installation instructions, see [Connect API Manager](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/connect_api_manager/index.html).

Also make sure that you configure discovery agent with IdP. For the detailed information, see [Provisioning OAuth credential to an identity provider](https://docs.axway.com/bundle/amplify-central/page/docs/connect_manage_environ/marketplace_provisioning/index.html#provisioning-oauth-credential-to-an-identity-provider).

You can also use the following sample discovery agent IdP configuration for Amplify Open Banking Deployment:

```console
AGENTFEATURES_IDP_NAME_1: "Cloudentity"
AGENTFEATURES_IDP_TYPE_1: "generic"
AGENTFEATURES_IDP_METADATAURL_1: "<Cloudentity well-known endpoint>"
AGENTFEATURES_IDP_AUTH_TYPE_1: "tls_client_auth"
AGENTFEATURES_IDP_AUTH_CLIENTID_1: "string"
AGENTFEATURES_IDP_SSL_ROOTCACERTPATH_1: /tls/ca.crt
AGENTFEATURES_IDP_SSL_CLIENTCERTPATH_1: /tls/client.crt
AGENTFEATURES_IDP_SSL_CLIENTKEYPATH_1: /tls/client.key
AGENTFEATURES_IDP_AUTH_USECACHEDTOKEN_1: "false"
```
