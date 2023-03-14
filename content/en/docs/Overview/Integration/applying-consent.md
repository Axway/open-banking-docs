---
title: "Applying access controls based on consent to an API request"
linkTitle: "Applying consent"
weight: 1
date: 2021-06-22
type: sequence
---

Access controls need to be applied based on the customer consent to return only the data to which a Data Recipient is permitted to retrieve.

This shows the approach based on retrieving account information. The preferred implementation is summarized as follows:

* A Data Recipient requests a given resource. If the Data Recipient does not have consent to access that resource on behalf of a customer the request is immediately rejected.
* The request is augmented with details of the consented accounts and permissions and forwarded to the backend integration application.
* The backend integration application calls the backend systems using appropriate transport and arguments.
* The backend retrieves the appropriate data, filtered for permitted accounts. Permissions are then applied to remove any data clusters that a customer has not consented to share.
* The data is then returned to the backend integration application which formats the response to the required standard.
* In turn the response is returned to the Data Recipient App by the API Gateway.

For optimal performance filtering data based on the customer should be executed **as close to the data as possible**. This therefore requires customers to implement this at the source of data.

![Applying consent sequence](/Images/Applying_Consent_Sequence.svg)
