---
title: "End-to-End Web Journey"
linkTitle: "End-to-End Web Journey"
weight: 1
date: 2021-06-22
description: End-to-end view of Axway Open Banking Web Journey
type: sequence
---

This end-to-end flow for provides a means to show how individual components are used in Axway Open Banking.

To summarize the diagram below:

* The TPP obtains Consent from the Customer to access their data or make payments on their behalf at a given bank.
* The TPP creates ("lodges") Consent at the target bank and redirects the Customer to the bank.
* The Customer authenticates themselves using their online banking credentials and confirms the Consent is correct.
* With Consent confirmed the Customer is redirected back to the TPP who then gets an Access Token.
* The TPP can then retrieve data or initiate payment on behalf of the Customer.

Note that all APIs that provide access to data are implemented in the same manner. The consent/data access pattern relating to Account Information is therefore representative regardless of the specific resource (checking accounts, credit cards, loans, etc.)

{{< readfile file="/static/Images/Generic_Web_Journey_Sequence.svg" >}}


