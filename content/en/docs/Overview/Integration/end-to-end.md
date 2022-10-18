---
title: "End-to-end web journey"
linkTitle: "End-to-end web journey"
weight: 1
date: 2021-06-22
type: sequence
---

This end-to-end flow provides a means to show how individual components are used in Axway Open Banking.

The flow is summarized as follows:

* The Third-Party Provider (TPP) obtains Consent from the Customer to access their data or make payments on their behalf at a given bank.
* The TPP creates ("lodges") Consent at the target bank and redirects the Customer to the bank.
* The Customer authenticates themselves using their online banking credentials and confirms the Consent is correct.
* With Consent confirmed the Customer is redirected back to the TPP who then gets an Access Token.
* The TPP can then retrieve data or initiate payment on behalf of the Customer.

All APIs that provide access to data are implemented in the same manner. The consent/data access pattern relating to Account Information is therefore representative regardless of the specific resource (checking accounts, credit cards, loans, and so on).

![End-to-end web journey sequence](/Images/Generic_Web_Journey_Sequence.svg)