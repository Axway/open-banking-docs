---
title: "Cloud Entity Installation"
linkTitle: "Cloud Entity"
weight: 7
description: Installing Cloud Entity for Axway Open Banking solution
---


## Download Helm charts

Download Axway Open Banking Cloud Entity Helm charts to customize them locally

```bash
helm pull axway-open-banking/open-banking-acp --untar
helm pull axway-open-banking/open-banking-consent --untar
```

You should get open-banking-acp and open-banking-consent local folders.

## Customize ACP Helm chart

Find the namespace of the cert-manager component

```
kubectl get pods -A | grep cert-manager | awk '{print $1}' | uniq
```

Modify the open-banking-acp/values.yaml file from Axway package.
| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| cert.internal.certManager | Desactive usage of cert-manager. Don't set to false. | true |
| cert.internal.certManagerNamespace | Namespace where is installed cert-manager. Use the result of the previous command. | None |
| cert.ingress.cert | Use specific cert. It can be a wildcard. Must be defined only if certManager is set to false. | None |
| cert.ingress.key | Use specific key. It can be a wildcard. Must be defined only if certManager is set to false. | None |

Update the open-banking-acp/files/acp.values.yaml  with all environment variables required:

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| acp.serverURL | ACP server URL | None |
| acp.ingress.tls.hosts | ACP server URL | None |
| acp.ingress.hosts.host | ACP server URL | None |
| acp.ingress.annotations.honginx.ingress.kubernetes.io/proxy-ssl-secretst | [NAMESPACE]/acp-tls : acp/acp-tls | None |

Remove the following lines if cert-manager not used for ingress:
       cert-manager.io/cluster-issuer: letsencrypt-prod (l22)
       cert-manager.io/acme-challenge-type: http01 (l23)



## Customize Open Banking Consent Helm chart

## Prepare deployment

Add the Cloud Entity helm repository :

```bash
helm repo add acp https://charts.cloudentity.io 
helm repo update 
```

Create the target namespaces on the cluster:

```bash
kubectl create namespace open-banking-acp 
kubectl create namespace open-banking-consent 
```

Add the Docker registry to pull cloud-entity private images in both namespaces

```bash
kubectl create secret docker-registry artifactory --docker-server=acp.artifactory.cloudentity.com --docker-username=USERNAME --docker-password=PASSWORD -n open-banking-acp 
```


## Install ACP Helm chart

Deploy ACP pre-requisites Helm chart from Axway repository:

```bash
helm install acp-prereq -n open-banking-acp open-banking-acp
```

Deploy the ACP Helm chart from CloudEntity repository :

```bash
helm install acp -n open-banking-acp acp/kube-acp-stack –-version [chart-version]  -f open-banking-acp/files/acp.values.yaml
```

## Install Open Banking Consent Helm chart

Deploy Consent pre-requisites Helm chart from Axway repository

```bash
helm install consent-prereq -n open-banking-consent open-banking-consent  
```

Deploy the Open Banking Consent Helm chart from CloudEntity repository

```bash
helm install consent -n open-banking-consent acp/openbanking –-version [chart-version] -f open-banking-consent/files/consent.values.yaml
```

## Post Deployment

Update the APIM KPS deployment values using the instructions in the `README.md` file to reflect all oauth*clientId and oauth*clientSecret values as deployed in ACP:

```bash
vi open-banking-apim-config/files/kps/kpsConfig1.json
```
