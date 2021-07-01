---
title: "End-to-End Account Information"
linkTitle: "Account Information"
weight: 2
date: 2021-06-22
description: End-to-end view of Axway Open Banking using Account Information as an example
type: sequence
---

The end-to-end flow for Account Information provides a means to show how individual components are used in Axway Open Banking.

To summarize the diagram below:

* The TPP obtains Consent from the Customer to access their data or make payments on their behalf at a given bank.
* The TPP creates ("lodges") Consent at the target bank and redirects the Customer to the bank.
* The Customer authenticates themselves using their online banking credentials and confirms the Consent is correct.
* With Consent confirmed the Customer is redirected back to the TPP who then gets an Access Token.
* The TPP can then retrieve data or initiate payment on behalf of the Customer.

All APIs that allow for the retrieval of confidential data are accessed in this way.

> Note that Mutual Authentication over TLS is omitted from this diagram for the sake of brevity. Wherever a Third-Party App makes a connection to the API Gateway the reader should consider that it has been enforced.

{{< readfile file="/static/Images/Account_Information_Sequence.svg" >}}


