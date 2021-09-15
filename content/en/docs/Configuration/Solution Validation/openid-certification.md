---
title: "OpenID certification"
linkTitle: "OpenID certification"
description: How to used OpenID test suite to certify your solution deployment
weight: 2
date: 2021-09-02
---

As part of the certification process, the customer´s platforms should be compliance with OpenID Foundation security tests:

* <https://openid.net/certification/instructions/>

We have two different set of tests:

* FAPI Advanced test .
* DCR Test .

This section describes the setup tests that is necessary to configure the environment to run the security tests. 

## Conformance test suite

You can either run these tests:

* on Open ID platform <https://www.certification.openid.net>. You would need an account to login
* on your local test platform that you can deploy by following these instructions : <https://gitlab.com/openid/conformance-suite/-/wikis/Developers/Build-&-Run>

You should then be able to create and run new test plans

![Conformance Suite : Create Plan](/Images/conformance-suite/create-plan.png)

## Dynamic Client Registration Test

This test validates the TPP creation on Authorization Server via Central Directory request.

### Getting Central Directory information

It is important to run the test to get the following information:

* Client ID : new TPP client ID to register
* RSEAL – message certificate (cert and key) – used for JWKS .
* BRCAC – transport certificate – used for MTLS comunication

### Certificate configuration

Make sure the corresponding CA are configured in the Axway Open Banking solution, by following each section of [Certificate Management](/docs/configuration/certificate-management)

### Create the DCR test plan

Create a new plan and select Dynamic Client Registration Authorization server test:
![Conformance Suite : Create Plan](/Images/conformance-suite/dcr-plan-select.png)

Use the JSON tab to import this sample JSON test configuration :

* [conformance-test-dcr.json](/sample-files/conformance-test-dcr.json)

Then go back to the Form tab to customize the following :

* Test Information : include your company name and/or environment info. decide wether you want to publish the result or not.
* Server: provide the Authorization server URL (keep /.well-known/openid-configuration)
* Client : Change jwks with RSEAL information
* TLS certificates for client :  change certificate and key with BRCAC information
* Directory: change client ID with the new TPP client ID to register.

## FAPI Advanced Tests

### TPP configurations

Make sure that the 2 test TPP are configured in APIM:

* Connect to API Manager UI
* Under Client > Organization : you should see TPP name
* Under Client > application : you should see a application for each TPP. In each application a OAuth clientId should be configured in the Authorization section.

Make sure that the 2 test TPP are configured in ACP:

* Connect to ACP and select to workspace for Open Banking
* Under Application, you be able to find the each TPP with same application name as in APIM, and the same clientID 
* Each application should be configured with a correct client authorization
{{% pageinfo %}}
to be completed
{{% /pageinfo %}}

Make sure the corresponding CAs are configured in the Axway Open Banking solution:

* Including the CA cert of each TPP on IngressMTLSCA entry of values.yaml of APIM package. See detailed instructions in [Certificate Management > MTLS](/docs/configuration/certificate-management/mtls)
* Update the filters Jwt-Verify and Jwt-Sign, udpdating the JWKS certificate (bracac). See detailed instructions in [Certificate Management > JWKS](/docs/configuration/certificate-management/jwks)

### Create the FAPI Advanced test plan

Create a new plan and select FAPI Authorization server test:
![Conformance Suite : Create Plan](/Images/conformance-suite/fapi-plan-select.png)

Use the JSON tab to import this sample JSON test configuration :

* [conformance-test-dcr.json](/sample-files/conformance-test-fapi.json)

Then go back to the Form tab to customize the following :

{{% pageinfo %}}
to be completed
{{% /pageinfo %}}