---
title: "Amplify agents configuration"
linkTitle: "Amplify agents"
description: Connect Amplify agent to Amplify platform
weight: 9
date: 2021-09-02
---

## Amplify agents

The Amplify agents are software applications that run on your host. The agents are responsible for gathering information that is happening in your data plane and sending it to the Amplify platform. The two types of agents that are supported are Discovery and Traceability Agents.

### Discovery Agents

Discovery Agents automate the process of finding assets that are deployed in a Gateway, for example OAS 3.0, WSDL etc., and sends them to the Amplify platform where they are made available in the Catalog for people to find and use. Consumers can subscribe to use the discovered assets, and the agent helps to provision this subscription in the Gateway.

### Traceability Agents

Traceability Agents collect usage, metrics, and dataplane traffic details and send them to the Amplify platform. In the platform, API consumers and API providers can view the performance and behavior of the assets discovered in the dataplane.

## Amplify agents for Axway Open Banking

Axway Open Banking solution embbeds the Discovery and tracability agent fo Axway API Management. It gather information about the Open Banking APIs to the Amplify platform.
