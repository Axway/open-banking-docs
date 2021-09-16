### API Management

#### Minimal parameters required

The following parameters are required for any deployment. This deployment use cert-manager and let's encrypt issuer to provide certificates. This deployment requires to have an ingress controller (nginx) that listen on a public IP.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.platform | select the platform to configure appropriate objects like storage for RWM. Possible values are AWS, AZURE, MINIKUBE | None |
| global.domainName | set the domainname for all ingress. | None |
| global.env | Set the default environment |dev |
| global.dockerRegistry.url | URL of the Axway Repo. Need to be modified only if url is different| docker-registry.demo.axway.com/open-banking/apim |
| global.dockerRegistry.username | Login of user that as been created for you. | None |
| global.dockerRegistry.token | Token of user that as been created for you. | None |
| global.smtpServer.host | Smtp server host | None |
| global.smtpServer.port | Smtp server port | None |
| global.smtpServer.username | Smtp server username | None |
| global.smtpServer.password | Smtp server password | None |
| apimcli.settings.email | email used in api-manager settings |None |
| backend.serviceincident.host| ServiceNow URL|None|
| backend.serviceincident.username| ServiceNow username |None|
| backend.serviceincident.password| ServiceNow password |None|

#### Product licence

A temporary license file is embedded in the default docker image.
This license key has a lifetime to 2 months maximum.
This license is perfect for a demo or a POC but another License key must be added for real environments.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| global.apimLicense | Insert your license key. An example is in the default value file. | None |

#### Externalize Cassandra database (Required for production environment)

According to the reference architecture, database must be external to the cluster. Change the following values according to the cassandra configuration. Please follow the Axway documentation to create the Cassandra cluster.

```yaml
cassandra:
   external: true
   adminName: "cassandra"
   adminPasswd: "cassandra"
   host1: "cassandra"
   host2: "cassandra"
   host3: "cassandra"
```

#### Add new root CA for MTLS ingress (Optional)

The mutual authentication is provided by Nginx. It requires a Kubernetes secret that contains all rootCA used to signed your tpp cert.
The differents root CA certificats must be concatenate and encoded in base64.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| apitraffic.ingressMtlsRootCa | all concatenate root CA encoded in base64 | yes |

#### Customize storage class (Optional)

The APIM deployment needs a storage class in Read/Write Many. A custom storage class can be setted if the cluster doesn't use the standard deployment for Azure, AWS or if the deployment is on a vanilla Kubernetes.

| Value         | Description                           | Default value  |
|:------------- |:------------------------------------- |:-------------- |
| Global.customStorageClass.scrwm | Allow to specify a storageclass to mount a “Read Write Many” volume on pod. It’s used to share metrics between monitoring and analytics. | None |

#### Use a Wildcard certificate for all ingress (Optional)

It's possible to use a custom wildcard certifcate. change values listed below. Note: the cert field must contains the full chain.

```yaml
global:
   ingress:
      certManager: false
      wildcard: true
      cert: |
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded certificate>>
         -----END CERTIFICATE-----
         -----BEGIN CERTIFICATE-----
         <<insert here base64-encoded certificate>>
         -----END CERTIFICATE-----
         ...

      key: |
         -----BEGIN RSA PRIVATE KEY-----
         <<insert here base64-encoded key>>
         -----END RSA PRIVATE KEY-----
```

#### Use a different custom certificate for ingress (Optional)

It's possible to define a different certificate for each ingress. Change values listed below. keep an empty line after the key or the certificate.

```yaml
global:
   ingress:
      certManager: false
      wildcard: false

anm:
   ingressCert: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKey: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----

apimgr:
   ingressCert: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKey: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----

apitraffic:
   ingressCert: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKey: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----

   ingressCertMtls: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKeyMtls: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----

   ingressCertHttps: |
      -----BEGIN CERTIFICATE-----
      <<insert here base64-encoded certificate>>
      -----END CERTIFICATE-----

   ingressKeyHttps: |
      -----BEGIN RSA PRIVATE KEY-----
      <<insert here base64-encoded key>>
      -----END RSA PRIVATE KEY-----
```

> Note : Oauth component is activated but ingress isn't enabled. It's not required to create a certificate for this ingress.

#### Configure Amplify Agents (Optional)

The following values must be set to reports API and their usage on the **Amplify platform**. Note that Private Key and Public Key must be encoded in base64.
```
amplifyAgents:
   enabled: true
   centralAuthClientID:
   centralOrgID: 
   centralEnvName: 
   centralTeam: 
   #Private and Public keys of the service account on Central. Need to encode in base64 the value
   centralPrivateKey:
   centralPublicKey:
```
