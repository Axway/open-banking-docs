---
title: "Installation"
linkTitle: "Installation"
weight: 1
description: Installing the Axway Open Banking solution
---

This guide describes how to install the Axway Open Banking solution.

## Prerequisites

Prior to installation you will need to perform the following tasks:

* Read and understand the Architecture Overview guide.
* Make choices that are described in the Architecture Overview guide including:
  * Choice of Kubernetes provider (cloud, on-premise, etc).
  * Components that will be supported (Demo Applications, mock backend services, etc).
  * Approach to database deployment (inside Kubernetes vs. externalized services).
  * Components that reflect their choice of deployment model (certificate manager, load balancer/Ingress Controller, etc).
* Install the following command line tools:
  * Helm.
  * Kubectl.
* Obtain a private token for use with the Axway Docker Registry.
* Create a Kubernetes cluster that conforms to that described in the Architecture Overview guide and reflects the architecture choices described above.

Please note that all these tasks need to be completed for your installation to be successful.

## Steps

### Download and Customize Axway Components

To install the solution add the Axway Docker Repository to your Helm configuration:
 
```bash
helm repo add axway-open-banking \ 
https://docker-registry.demo.axway.com/chartrepo/open-banking \ 
--username="<use the token name>" \ 
--password="<use your private token here>"   

helm repo update 
```

> Note that if your token includes a dollar it should be escaped e.g. “robot$” becomes “robot\$”. 

Once the registry is added you can then fetch the deployment packages using the appropriate Helm commands:
 
```bash
helm search repo axway-open-banking
helm fetch axway-open-banking/open-banking-acp
helm fetch axway-open-banking/open-banking-consent
helm fetch axway-open-banking/open-banking-apim
helm fetch axway-open-banking/open-banking-apim-config
helm fetch axway-open-banking/open-banking-developer-portal
helm fetch axway-open-banking/open-banking-backend-chart
helm fetch axway-open-banking/open-banking-analytics
helm fetch axway-open-banking/open-banking-bankio-apps
```

Update the values for each chart to adapt it to your target environment. 

> Please refer to the `README.md` file in each package for more details. Note you can of course use your own choice of editor rather than vim if you prefer.

 
```bash
tar xvf open-banking-apim-1.4.x.tgz 
vi open-banking-apim/values.yaml  

tar xvf open-banking-apim-config-1.4.x.tgz 
vi open-banking-apim-config/values.yaml 

tar xvf open-banking-developer-portal-1.4.x.tgz 
vi open-banking-developer-portal/values.yaml 

tar xvf open-banking-backend-chart-1.4.x.tgz 
vi open-banking-backend/values.yaml 

tar xvf open-banking-analytics-1.4.x.tgz  
vi open-banking-analytics/values.yaml 

tar xvf open-banking-acp-1.4.x.tgz  
vi open-banking-openbanking-acp/values.yaml 

tar xvf open-banking-consent-1.4.x.tgz  
vi open-banking-openbanking-consent/values.yaml 

tar xvf open-banking-bankio-apps-1.4.x.tgz 
vi open-banking-bankio-apps/values.yaml
```

### Download, Customize and Install Cloudentity Components

Add the Cloud Entity helm repository and download latest updates: 

```bash
helm repo add acp https://charts.cloudentity.io 
helm repo update 
```

Create the correct namespaces on the target cluster:
 
```bash
kubectl create namespace open-banking-acp 
kubectl create namespace open-banking-consent 
```

> **Before next step ensure you have followed all deployment preparation instructions listed in the `README.md` file of ACP Helm chart.**

Deploy ACP pre-requisites Helm chart from Axway repository as described in the `README.md` file:

```bash
helm install acp-prereq -n open-banking-acp open-banking-acp
```

Deploy the ACP Helm chart from CloudEntity repository with the version provided in the `README.md` file: 

```bash
helm install acp -n open-banking-acp acp/kube-acp-stack –-version [chart-version]  -f open-banking-acp/files/acp.values.yaml
```

> **Before the next step, ensure ACP is running correctly (as described in the `README.md` file of the ACP Helm chart) and you have followed all deployment preparation instructions listed in the `README.md` file of the Consent Helm chart.**

Deploy Consent pre-requisites Helm chart from Axway repository as described in the `README.md` file:

```bash
helm install consent-prereq -n open-banking-consent open-banking-consent  
```

Deploy the Open Banking Consent Helm chart from CloudEntity repo with the version provided in the `README.md` file:

```bash
helm install consent -n open-banking-consent acp/openbanking –-version [chart-version] -f open-banking-consent/files/consent.values.yaml
```

Update the APIM KPS deployment values using the instructions in the `README.md` file to reflect all oauth*clientId and oauth*clientSecret values as deployed in ACP: 

```bash
vi open-banking-apim-config/files/kps/kpsConfig1.json
```

### Install Axway Components

First create the target namespaces on the cluster:

```bash
kubectl create namespace open-banking-apim
kubectl create namespace open-banking-apps    
kubectl create namespace open-banking-backend
kubectl create namespace open-banking-developer-portal
kubectl create namespace open-banking-analytics
```

> **Before the next step, ensure you followed all deployment preparation instructions listed in the `README.md` file of each Helm chart.**

Deploy all the components: 

```bash
helm install apim -n open-banking-apim open-banking-apim
helm install apim-config -n open-banking-apim open-banking-apim-config 
helm install developer-portal -n open-banking-developer-portal open-banking-developer-portal
helm install bankio-apps -n open-banking-apps open-banking-bankio-apps
helm install backend-services -n open-banking-backend open-banking-backend-chart
helm install analytics -n open-banking-analytics open-banking-analytics
```

### Post Deployment

Check each the `README.md` file of each component for post-installation instructions.
