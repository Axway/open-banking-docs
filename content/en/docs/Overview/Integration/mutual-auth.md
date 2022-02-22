---
title: "Mutual Authentication and Certificate Verification"
linkTitle: "Mutual Authentication"
weight: 3
date: 2021-06-22
description: View of Certificate Verification during Mutual Authentication over TLS
type: sequence
---

Mutual Authentication is an important part of security in open banking. It is commonly implemented and is a component of FAPI.

The flow is summarized as follows:

* The TPP presents their client certificate that is signed by the relevant certificate authority.
* The API Gateway validates the certificate against the expected certificate chain to ensure the requestor is entitled to make a connection.
* The certificate (and by implication the organization providing the Third-Party App) is then validated against the relevant source of truth for the market in question:
    * In EU markets the solution calls the Konsentus API. The Konsentus solution checks the validity of the Third Party against the relevant Qualified Trust Service Provider (QTSP) and National Competent Authority (NCA).
    * In non-EU markets Axway Open Banking solution calls the relevant Certificate Authority (CA) to ensure the Third Party is still valid.
* Finally where certificate binding is enforced association between the Access Token and the presented certificate is checked.

This pattern is not implemented for "open data" APIs such as Products & Services.

{{< readfile file="/static/Images/Mutual_Authentication_Sequence.svg" >}}
