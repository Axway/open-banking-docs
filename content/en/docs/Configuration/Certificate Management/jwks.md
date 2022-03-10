---
title: "JWKS configuration"
linkTitle: "JWKS"
weight: 3
date: 2021-10-13
---

Some Open Banking flows are using JSON Web Tokens (JWT) for security purpose, for example the payment API.
To sign or to verify these tokens, the Open Banking solution needs keys that are stored in a JSON Web Key Set (JWKS).

Each instance of the Axway Open Banking solution has different keys that correspond to the bank and environment in use.

## ASPSP signing certificate

The ASPSP (Account Servicing Payment Service Provider, the bank or similar institution) signing certificate must be added to the authorization server to sign response messages.

Follow this procedure to change the signing certificate with the appropriate values:

1. Connect to the ACP Server and check the current authorization server signing certificate.

   * Replace `<ACP server interface`> by your ACP server interface, and then connect to the following URL in your navigator:
      `https://<ACP server interface>/app/default/admin/openbanking_brasil/workspaces/signing-keys`.
   * Connect with your user/admin password.
   * Verify that the **Current key in use** is the default ASPSP signing certificate (what you will change with this procedure).
  
    ![ACPSigningKey](/Images/ACPSigningKey.PNG)

2. Export the actual authorization server configuration with ACP API.
   * Navigate to the ACP swagger page. The previous step will keep you logged in with your credentials.
   Browse to the servers section, and then *Get authorization server*.</br>
   `https://<ACP server interface>/api/swagger/default/openbanking_brasil/#/servers/getAuthorizationServer`.
   * Click *Try it out*.
   * Replace with your tid (tenant id) and aid (authorization server id). In Open Banking Brasil, the tid is *default* and the aid is *openbanking_brasil*
   * Execute the request.
  ![GetAuthServer](/Images/GetAuthServer.PNG)
   * Copy the response.

3. Convert the ASPSP certificate from PEM to JWK.  
   You can use your own tools or find tools online to execute this operation.
  
4. Modify the response obtained in step 2 to replace the signature entry by your ASPSP JWK certificate converted in step 3.
  Use the KID that comes from Central Directory.

5. Upload the configuration to the authorization server.
   * Go back to the swagger page, to the *Update authorization server* section.
      `https://<ACP server interface>/api/swagger/default/openbanking_brasil/#/servers/updateAuthorizationServer`.
   * Click *Try it out*.
   * Replace with your tid (tenant id) and aid (authorization server id). In Open Banking Brasil, the tid is *default* and the aid is *openbanking_brasil*.
   * Paste the response of the previous step 3 with the new signing certificate in the body.
   * Execute the request.
   ![PutAuthServer](/Images/PutAuthServer.PNG)
  
6. Validate the procedure.
   * Refresh the ACP interface and you will see that your ASPSP signature key has been modified.

## TPP signing certificate
  
The TPP (Third Party Provider) signing certificates are located in the ACP configuration. Connect to the ACP Interface, navigate to your workspace (openbanking Brasil for Brasil specifications), and then click on the application. Click the application name of the desired TPP.
The signing certificate is located in the OAuth tab, under client authentication, as a JSON Web Key Set. You can modify the signing certificate here, and then click *Save changes*.
  
![TPPSignatureKey](/Images/TPPSignatureKey.PNG)