---
title: "Applying Access Controls based on Consent to an API Request"
linkTitle: "Applying Consent"
weight: 1
date: 2021-06-22
description: View of Applying Access Controls based on Consent
type: sequence
---

Access controls need to be applied based on the customer consent to return only the data to which a TPP is permitted to retrieve.

This shows the approach based on retrieving account information. The preferred implementation is summarized as follows:

* A Third Party requests a given resource. If the Third Party does not have consent to access that resource on behalf of a customer the request is immediately rejected.
* The request is augmented with details of the consented accounts and permissions and forwarded to the API Builder Application.
* The API Builder Application calls the backend using appropriate transport and arguments.
* The backend retrieves the appropriate data, filtered for permitted accounts. Permissions are then applied to remove any data clusters that a customer has not consented to share.
* The data is then returned to the API Builder Application which formats the response to the required standard.
* In turn the response is returned to the Third-Party App by the API Gateway.

For optimal performance filtering data based on customer should be executed **as close to the data as possible**. This will therefore require customers to implement this at the source of data.

{{< readfile file="/static/Images/Applying_Consent_Sequence.svg" >}}
