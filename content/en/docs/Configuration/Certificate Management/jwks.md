---
title: "JWKS configuration"
linkTitle: "JWKS"
description: How to change and test the JWKS configurations 
weight: 3
date: 2021-09-02
---

Some Open Banking flows are using JSON Web Tokens (JWT) for security purpose.
To sign or to verify these token , the Open Banking solution needs keys that are stored in JSON Web Key Set (JWKS).

Each instance of Axway Open Banking solution has differents keys that are corresponding the the bank and to the environment in use.

After deploying/upgrading/killing an APIM pod, the JWT certificate and key must be uploaded on a policy.
Here is the solution to change it with the appropriate values:

* Open API Gateway policies configuration
    * Start the policy studio
    * Click on *New Project from an API Gateway instance*
    * Complete the field with the name of a project and click on *Next*
    * Complete the fields: Host (ANM ingress host value), port (443), the anm password and click on *Next*
* Modify JWT Sign filter
    * Search for the policy *_createJWTResponse*
    * Double click on *JWT Sign* filter
    * Click on the ... next to the field *Signing Key* 
    * Click on *Create/import*
    * Import the certificate and key or both at the same time.
    * Click on Ok.
* Modify JWT Verify filter
    * Search for the policy *Get JSON Payload from JWT*
    * Double click on *JWT Verify*
    * Click on the ... next to the field *X509 certificate* 
    * Select the certificate you imported in the previous step.
    * Click on ok
* Deploy configuration to the pod
    * Click on Deploy and follow the steps.

Note: This manipulation must be realized after each redeployment.