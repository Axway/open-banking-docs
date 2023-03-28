---
title: "Financial Data Exchange"
linkTitle: "Financial Data Exchange"
weight: 9
---

This section provides reference information relating to Financial Data Exchange.

## List of FDX APIs included in Amplify Open Banking

The table below provides the list of FDX APIs supported in the Amplify Open Banking solution.

|  API Name | Guidance | URI(s) |
|  -------- | -------- | ------ |
| Core | This API provides account information including balances, transactions, statements and customer information.<br></br>Customer consent is required for a Data Recipient to access this API and retrieve a customer's data. | /fdx/v5/accounts<br> /fdx/v5/accounts/{accountId}<br> /fdx/v5/accounts/{accountId}/statements<br> /fdx/v5/accounts/{accountId}/statements/{statementId}<br> /fdx/v5/accounts/{accountId}/transactions<br> /fdx/v5/accounts/{accountId}/transaction-images/{imageId}<br> /fdx/v5/accounts/{accountId}/contact<br>/fdx/v5/core/customers<br>/fdx/v5/core/customers/{customerId}<br> /fdx/v5/accounts/{accountId}/payment-networks |
| Money Movement | It incorporates four operations:<ul><li>Payee management</li><li>Payment Initiation</li><li>Recurring payments</li><li>Internal transfers</li></ul>| /fdx/v5/payees <br> /fdx/v5/payees/{payeeId} <br> /fdx/v5/payments <br> /fdx/v5/payments/{paymentId} <br> /fdx/v5/recurring-payments <br> /fdx/v5/recurring-payments/{recurringPaymentId} <br> /fdx/v5/recurring-payments/{recurringPaymentId}/payments <br> /fdx/v5/transfers <br> /fdx/v5/transfers/{transferId} |
| Tax | It incorporates two operations:<ul><li>Get the full lists of tax document data and tax form images available for a specific year for the current authorized customer</li><li>Get the form image or TaxDataList as json for a single tax document for the customer.</li></ul>| /fdx/v5/tax-forms <br> /fdx/v5/tax-forms/{taxFormId} |