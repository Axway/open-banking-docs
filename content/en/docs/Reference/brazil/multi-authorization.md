---
title: "Multi-Party Authorization Pattern"
linkTitle: "Multi-Party Authorization"
description: Guidelines on implementing multi-party authorization with Axway Open Banking under Open Banking Brazil
weight: 3
date: 2021-07-16
type: sequence
---

Multi-party authorization is a requirement of many internet banking systems. Access controls are implemented so that more than one customer must authorize access to data or making a payment. Situations such as this include joint accounts where authority of both parties is required and business accounts that apply four-eyes or greater principles. By extension, these access controls must be applied when a customer wants to share data with or initiate payment through a Third-Party App.

The sequence diagram below shows the steps required once the initial approver has completed confirmation of the consent granted to the Third-Party and selected the accounts to be shared or the debit account payment is to be drawn from (where required). Please note that these requirements are a **guide** and need to be implemented **according to the both the bank's access controls** and **how they aim to contact approvers to confirm consent**.

At the start of this sequence diagram:

* The consent `status` for the consent will have been returned as `AUTHORISED`.
* Communication of the fulfillment of the multi-party authorization is delegated to a given API. 
* The Third-Party will have possession of an Access Token they can use to query the API.

This follows the model of for Multi-Authorization implemented in the [UK Open Banking standards](https://openbankinguk.github.io/read-write-api-site3/v3.1.8/profiles/payment-initiation-api-profile.html#multiple-authorisation). The `status` property of the API responses returned to the TPP will be as follows:

* Account Information Resources API: `PENDING_AUTHORISATION`.
* Payment Initiation API: `PART`.

Other approvers are then contacted to approve the consent based on the following generic process:

* Each approver is contacted using a channel known to the bank. For example, this could be via push notification to a mobile banking app which provides a "link" to the approval workflow.
* When the approver follows the link they will then be required to authenticate, using an appropriate number of factors. The number of factors is dependent on whether the bank requires Level of Assurance 2 or 3 based on their view of the [Brazil Security Profile requirements](https://openbanking-brasil.github.io/specs-seguranca/open-banking-brasil-financial-api-1_ID2.html#section-5.2.2.4).
* Once authenticated to the required level the approver will be presented with one of two screens:
  * If another approver has already refused the request for authorization a consent rejection screen should be shown.
  * If approval from all approvers is still outstanding the customer will be shown the consent confirmation screen.
* If not rejected the customer is presented with the consent confirmation screen. The details depend on whether the subject is sharing account information or making a payment, but from a multi-party perspective they should include:
  * The accounts selected by the initial approver.
  * Details of who has already approved the consent.
  * (Where applicable) the date and time by which consent needs to be approved.
* The approver can either approve or refuse the consent. If they approve the consent their approval needs to be cached **unless they are the last approver in which case**:
    * For Account Information the Resource API datastore can be if updated to change the `status` from `PENDING_AUTHORISATION` to `AVAILABLE`.
    * For Payment Initiation the payment instruction can be executed and the `status` updated according to the status within the PIX infrastructure.
* The approver should then be shown a completion screen confirming their actions.

{{< readfile file="/static/Images/Multi_Authorization_Pattern.svg" >}}

