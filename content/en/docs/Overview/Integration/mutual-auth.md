---
title: "Mutual authentication and certificate verification"
linkTitle: "Mutual Authentication"
weight: 2
date: 2021-06-22
type: sequence
---

Mutual Authentication is an important part of security in open banking. It is commonly implemented and is a component of Financial-grade API (FAPI).

The flow is summarized as follows:

* The Data Recipient (DR) application presents their client certificate that is signed by the relevant certificate authority.
* The API Gateway validates the certificate against the expected certificate chain to ensure the requestor is entitled to make a connection.
* The certificate (and by implication the organization providing the Data Recipient App) is then validated against the relevant source of truth for the market in question. Amplify Open Banking solution calls the relevant Certificate Authority (CA) to ensure the Data Recipient is still valid.
* Finally where certificate binding is enforced association between the Access Token and the presented certificate is checked.

This pattern is not implemented for "open data" APIs such as Products & Services.

![Mutual authentication sequence](/Images/Mutual_Authentication_Sequence.svg)
