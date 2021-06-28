---
title: "Client-Initiated Backchannel Authentication (CIBA)"
linkTitle: "Client-Initiated Backchannel Authentication"
weight: 5
date: 2021-06-28
description: Example of Implementing CIBA in Axway Open Banking
type: sequence
---

The diagram below provides an overview of payment initiation using CIBA to send an Authentication Request.

To summarize the steps shown below:

- The Third-Party App first registers its notification preferences and parameters with the Authorization Server.
- Once registered the payment consent is created which contains the `consentId`.
- The Authentication Request is then created that references the `consentId`.
- The Authentication Request is then sent to the Authorization Server. An identifier is returned to the Third-Party App in the property `auth_req_id`.
- The authentication and consent confirmation workflow then takes place. The Customer is contacted using their preferred channel, authenticates and then confirms consent and selects the payment account.
- Once authentication and consent confirmation is complete the Third-Party App receives notification based on their registered preferences.
- The Third-Party App then sends the payment instruction to initiate payment from the Customers account.

Note that the flow following the receipt of the Authentication Request shows a hypothetical approach to completing the authentication and consent confirmation workflow. The specifics of how this is implemented is dependent on your architecture and customer channels that can support contacting the customer out-of-band. Bear in mind that channels that do not come from a known, secure context - for example, emails and text messages that simply send a link - may be construed as phishing attempts and therefore lead to low payment completion rates.

{{< readfile file="/static/Images/CIBA_Example_Sequence.svg" >}}

<script src="/js/scroll-sequence-diagram-headings.js"></script>