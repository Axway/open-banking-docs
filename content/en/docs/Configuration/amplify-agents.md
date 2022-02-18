---
title: "Amplify agents configuration"
linkTitle: "Amplify agents"
description: Connect Amplify agents to Amplify platform
weight: 6
date: 2021-09-02
---

## Amplify agents

The Amplify agents are software applications that run on your host. The agents are responsible for gathering information that is happening in your data plane and sending it to the [Amplify platform](https://platform.axway.com). The two types of agents that are supported are Discovery and Traceability Agents.

### Discovery Agents

Discovery Agents automate the process of finding assets that are deployed in a Gateway, for example OAS 3.0, WSDL and so on, and sending them to the Amplify platform where they are made available in the Catalog for people to find and use. Consumers can subscribe to use the discovered assets and the agent helps to provision this subscription in the Gateway.

### Traceability Agents

Traceability Agents collect usage, metrics, and dataplane traffic details and sends them to the Amplify platform. In the platform, API consumers and API providers can view the performance and behavior of the assets discovered in the dataplane.

## Amplify agents for Axway Open Banking

The Axway Open Banking solution embeds the discovery and traceability agents for Axway API Management. The agents gather information about the Open Banking APIs to send the Amplify platform.

### Amplify configuration

This section includes details for Amplify configuration such as creating a service account, creating an environment, finding the organization ID and team details.

#### Service Account Creation

You must first create a service account in the [Amplify platform](https://platform.axway.com).

1. In the drop down menu from your user click Organization - **Service Accounts**.
![Service Account in Amplify](/Images/agents/service-account-img1.PNG)
2. Check the Service Accounts drop down to make sure you have the correct organization selected.
3. Create a new service account.
![Service Account Creation in Amplify](/Images/agents/service-account-img3.PNG)
4. Select a Name.
5. Complete the following fields.
    * **Method**: select **Client Certificate**.
    * **Credentials**: Select **Platform-generated key pair** or **Provide public key** if you have your own certificate.
6. You can add one or more organizations and teams, but the default options would work.
7. Click **Save**.
8. A pop-up window will appear with the private key. Download it and save a copy as it will be used in the `values.yaml` file.

![Service Account Private key window in Amplify](/Images/agents/service-account-privatekey.PNG)

The service account client id, name, public, and private key will be used in the `values.yaml` file in the following parameters:

``` shell
centralAuthClientID: "test-eks-openbanking_882712e1-8465-4d26-8610-c4406c90e2ea"
serviceAccountName: "test-eks-openbanking"

centralPrivateKey:  |
      -----BEGIN PRIVATE KEY-----
      <<insert private key from service account>>
      -----END PRIVATE KEY-----
      
   centralPublicKey: |
      -----BEGIN PUBLIC KEY-----
      <<insert public key from service account>>
      -----END PUBLIC KEY-----

```

The private key is the one you downloaded after you created the service account.

![Service Account Yaml conf](/Images/agents/service-account-yaml-conf.PNG)

#### Environment Creation

You must create an environment.

1. Go to Central, and then click **Topology** to create a new environment.
![Environment conf](/Images/agents/environment-img1.PNG)
2. Select a title and a logical name and then click **Save**.
![Environment creation](/Images/agents/environment-img2.PNG)
3. Use the logical name in the **centralEnvName** parameter from `values.yaml`.

``` shell
centralEnvName: "test-eks-int"
```

#### Organization ID and Team

To locate the organization id, select **Organization** from the drop down menu under your user.

![Environment creation](/Images/agents/org-img1.PNG)

``` shell
centralOrgID: "20049705293414"
```

For the **centralTeam** parameter from `values.yaml`, click the **Teams** menu in the left navigation under **Organization**.

![Environment creation](/Images/agents/team-img1.PNG)

``` shell
centralTeam: "Default Team"
```

### Agents deployment parameters

This section describes how to fill the **amplifyAgents** parameters from the `values.yaml` file of the open-banking-apim helm chart to connect Amplify and the the Open Banking Platform.

``` shell
amplifyAgents:
   enabled: true
   repository: axway.jfrog.io/ampc-public-docker-release/agent
   statusPort: 8990
   centralAuthClientID: "DOSA_xx_yy_zz"
   serviceAccountName: "example-xxxx"
   centralOrgID: "ORGANIZATION_ID"
   centralEnvName: "ENVIRONMENT_NAME"
   centralTeam: "TEAM"
   #Private and Public keys of the service account on Central. Need to encode in base64 the value
   centralPrivateKey:
   centralPublicKey:
   traceability:
      name: traceability-agent
      imageName: v7-traceability-agent
      imageTag: 1.0.20210616
      replicaCount: 1
      statusPort: 8990
   discovery:
      name: discovery-agent
      imageName: v7-discovery-agent
      imageTag: 1.0.20210616
      replicaCount: 1
      statusPort: 8990
```

Example:

``` shell
amplifyAgents:
   enabled: true
   repository: axway.jfrog.io/ampc-public-docker-release  
   centralOrgID: "20049705293414"
   centralAuthClientID: "sa-eks-int_882712e1-8465-4d26-8610-c4406c90e2ea"
   centralEnvName: "int-eks"
   centralTeam: "Default Team"
   logLevel: info
   #  centralUrl defaults is US prod
   centralUrl: "https://central.eu-fr.axway.com"
   #  centralAuthUrl defaults is US prod
   centralAuthUrl: "https://login.axway.com/auth"
   #Private and Public keys of the service account on Central. Need to encode in base64 the value
   centralPrivateKey: "LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2QUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktZd2dnU2lBZ0VBQW9JQkFRQ2xjMlBTNU4vUnlCdG0KQ3BIR0dnREhzblVvNDBLM1VhVWdWTGVyOFo0Ni9hQVdlYnJnUURlUHBRcmhXR2xJUURueWN6SklDNjhkcnBwNwp3YmtlWS9Xb0RXYzN0dWZSSW8vWFo0K3dDVnFlVUZ2ekhKK0FzMkFDZXpGWmZ2S2I2T3RjL2xhWk5Bd3pmN2s1CnRzNC9GM1Z1NjUwNmVPWGRvR1prbE04NzlXbGhsZkdPMmF1K1hSSXdYdGRMR3p0a1RWQzBJYXQ5YlJ5U0w4T1UKcCsybTVndUQ3WXpnZ0F0MTc5aGtrUVVZM0FjVVZGUjVSZk9sWkFrTDV4UmVaZmN1UGJ2TEZLRFpjYjllVmNqWQpIdjdHQWdXZWM1RUhpSFppa3BoeFE1Q2t4TlhpZEo1NHV1d1BSNTVTbllyb0VOOTFjYm1CQTIvVnBSeTlNU0d1CmhIUnphRHRwQWdNQkFBRUNnZ0VBUTJ6bS9ZY3dmM21oVU5CMTM5bXcvN0VHZGdkSHBSV3N5YVE4eGVITnJoUzIKTFBLbTZjVEIzOVJPdnM4YytNalQxSzZGaXo3WHVxenhZQVh1dnlmVmNRc2xTVnRNMWJuVURPQ3plZllWNi9hcgp3a09qN1BzczRWWDdJcEhOcFNRaTV0N3Z3N2VtVVVaMzRjRlNBL3czYTJDeHpxWitadmQ3UXZveUNpbFZMT01hCllaSkducXIzR0VQdHBuMFJLR001YldINTl1ZDBVUm1GVVdUOFIvRzFhOWxyVDhZaFRXVUxkeDgvb3dmbUNBVzgKVGxaVEF0WW1PcE53NExXZVNPTGdXaVp3dXFCWlFzQ3E5djI4c3JSNGJzNlZ1M3hXRjBvOHAvSnlGelYrQlZhNApCQ1ZYdE5UNEh2YUszanpHVlBBOGZKbjlRSzNCMmJIUHdGMlJhYWF6VVFLQmdRRGE4Y3RHWUZZcDhUelZ5cURxCjlCL2lDeUVhclQ2WS8rTFhuRjBJcTlkMUM1MVhuampzOGx0QjhqL3N3NFZJUVkyTUJuZ2VQb3dKRWJBUnhrM0gKam1LZWt5azJnNVZvRHFzME9yN3VyQVhsM3llVFdXamYzeGd1L3dYM3BPbUZGMUcrR1dZZS9LUkRRclJrSHNPOAp2c3prSGROUHlybkp6MGM3RGxjR25POVZhd0tCZ1FEQmM5OUdDTFE2WVNaNUxZODJsU3dtVGtGN2hwZXdpaWVYCjNHOXF2ZllkQjh0N0pHOWQwWjZNU09JSXlKaFdBRUFxaGQ5WG9pOFBwdGl5azI1c2NtbEU1QjVoZCs5bHZHRzMKaTlqTTR1RFZjejBTUDh3NGJlMTQ5QWcxUW44aUVVcmFTWUNnTVlpOC9CQXFKeC9GODRFTVVrdGVGeWpNU0ZMdwpzRHJCS01uVGV3S0JnRHMrenFpK2pOSlFxd3VYQnpCTTJ3dkp3eTE2ejhPTENwRVppTHM5OU5HQlVSUlNoa2puCjAvWG1YWkh0M25VTStBWjZBYXI5ZGR0R1pBU0xTcVREVE1Cb1JmQ3dibzkzMkxBTGJYc2NKWVJzZkVNTklLbmoKcnFHWTlMNXNhNXhPRVJxRnVQS05uczFza1crK08yMHBuRHZtTGpZYlAyYnlwZTIvRmFGK2VlejlBb0dBS1hoTwpkN1ByOXN2V3RJbG90dm01Y2lpNmJ1R0dhUWprdmZBNlRqYVVxTnAvNjFEL01xeDZBWGFxUmRuQ2xrVU5mRkFnCmRhZkYwT1FpZGYyVzRWYVJiSHcrYXdTTDVGSkMzRmIxVGM2aEJnRGpLYU5WZ3c5RnBmVWlRVkNVOGxla3BUQzIKaXlDelFGZ0VteFN5QWZ4V1FLN3ZpeWNKenVqK0pxeVFtOUhEbWpzQ2dZQWRGL3l6UkNBaWJKend5THB3bE1hago2K0VOMGRyRHYvWHdQUDQxZE1CdXdCVmN2V2JOcmZHOGlBMllvN0JUcG96UkpjWDMvVytSVmFxbmgvTWM4UHhWCm4rN2pYL1RLUFAyZmRIZVlwbEpURkpIdUFGZkRSakhXazIvVXk2YzlzYk1Pc3hKWitQYkZkQml2K3FGRzFQWlUKM1JBQ0RKM243TG5JSWcrNjlpMGhoQT09Ci0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0="
   centralPublicKey: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFwWE5qMHVUZjBjZ2JaZ3FSeGhvQQp4N0oxS09OQ3QxR2xJRlMzcS9HZU92MmdGbm02NEVBM2o2VUs0VmhwU0VBNThuTXlTQXV2SGE2YWU4RzVIbVAxCnFBMW5ON2JuMFNLUDEyZVBzQWxhbmxCYjh4eWZnTE5nQW5zeFdYN3ltK2pyWFA1V21UUU1NMys1T2JiT1B4ZDEKYnV1ZE9uamwzYUJtWkpUUE8vVnBZWlh4anRtcnZsMFNNRjdYU3hzN1pFMVF0Q0dyZlcwY2tpL0RsS2Z0cHVZTApnKzJNNElBTGRlL1laSkVGR053SEZGUlVlVVh6cFdRSkMrY1VYbVgzTGoyN3l4U2cyWEcvWGxYSTJCNyt4Z0lGCm5uT1JCNGgyWXBLWWNVT1FwTVRWNG5TZWVMcnNEMGVlVXAySzZCRGZkWEc1Z1FOdjFhVWN2VEVocm9SMGMyZzcKYVFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t"
   traceability:
      name: traceability-agent
      imageName: agent/v7-traceability-agent
      imageTag: 1.0.20210616
      replicaCount: 1
      statusPort: 8990
      traceabilityHost: "ingestion-lumberjack.visibility.eu-fr.axway.com:453"
      centralDeployment: "prod-eu"
      apigatewayHealthcheckProtocol: "https"
      traceabilityProtocol: "tcp"
      logPathInstance: "axwayDemo"
      eventLogPaths: "/opt/Axway/apigateway/events/*_traffic-*.log"
      resources:
        limits:
          cpu: 100m
          memory: 128Mi
        requests:
          cpu: 100m
          memory: 128Mi
   discovery:
      name: discovery-agent
      imageName: agent/v7-discovery-agent
      imageTag: 1.0.20210616
      replicaCount: 1
      statusPort: 8989
      resources:
        limits:
          cpu: 100m
          memory: 128Mi
        requests:
          cpu: 100m
          memory: 128Mi
   serviceAccount:
      # Specifies whether a service account should be created
      create: true
      # The name of the service account to use.
      # If not set and create is true, a name is generated using the fullname template
      name:
```

You have the following options to apply this configuration:

* **New APIM install**: If you are ready with the entire setup mentioned above, before the first installing the APIM Helm charts, simply follow the [Installation - APIM Helm charts](/docs/deployment/installation/apim).
* **Update APIM instance**: If you want to set up these agent deployment values after installing the APIM Helm charts, you need to update your existing Helm chart with the amplifyAgents values. Execute the following command from the open-banking-apim parent directory.

``` bash
  helm upgrade apim -n open-banking-apim open-banking-apim
```
