---
title: "API Security"
linkTitle: "API Security"
weight: 12
date: 2024-11-29
---

This guide provides an overview of the security mechanisms implemented to protect the APIs offered by our solution. These mechanisms ensure that sensitive data is exchanged securely and accessed only by authorized parties.

## Security overview

Our API security framework incorporates industry-standard mechanisms to ensure robust protection:

* **OAuth 2.0**: Ensures secure access control via token-based authentication.
* **Mutual TLS (mTLS)**: Guarantees secure communication between clients and servers through certificate-based authentication.
* **JWT Tokens**: Provides secure, tamper-proof access tokens, ensuring only authorized entities can access the APIs.
* **FDX Security Guidelines**: Aligns with FDX standards for secure financial data exchange, ensuring compliance with industry best practices.

## Certificate-based authentication

### TLS/SSL encryption

All API communications are encrypted using **TLS (Transport Layer Security)**, safeguarding data against interception and tampering. SSL certificates are used to verify the authenticity and integrity of the communication between clients and servers.

### Mutual TLS (mTLS)

To enhance security further, our APIs utilize **mutual TLS (mTLS)** for client and server authentication:

* **Server Authentication**: The server presents its SSL certificate to verify its identity to the client.
* **Client Authentication**: Clients must present valid certificates to authenticate themselves with the server, ensuring only authorized clients gain access.

Additionally, **certificate-bound access tokens** are employed to strengthen security by binding tokens to client certificates.

## Scope and permissions

Access to API resources is controlled through **scopes**, which define the permissions granted during authorization. The following table outlines available scopes and their corresponding access levels:

| Scope                        | Description                                                                 |
|------------------------------|-----------------------------------------------------------------------------|
| `fdx:accountbasic:read`       | Grants read access to basic account information, such as account number, type, and balance. |
| `fdx:accountdetailed:read`    | Grants read access to detailed account information, including account history, fees, and additional metadata. |
| `fdx:customercontact:read`    | Grants read access to the customer's contact details, such as email address, phone number, and mailing address. |
| `fdx:customerpersonal:read`   | Grants read access to the customer's personal information, such as date of birth, name, and other identifying details. |
| `fdx:notifications:subscribe` | Grants the ability to subscribe to notifications related to the user's account or transactions. |
| `fdx:paymentsupport:read`     | Grants read access to payment-related data, including payment history and support-related information. |
| `fdx:transactions:read`       | Grants read access to transaction data, including details on all transactions, such as amount, date, and status. |

## API security, scopes, and OAuth protocols

The tables below provides a summary of security measures, required scopes, and OAuth protocols for accessing API endpoints.

### FDX APIs

The following APIs are for Data Recipients and Data Aggregators to consume and build applications.

#### FDX Core API

| Method | Endpoint                                               | Security Protocol       | Scopes Required                                                   | OAuth Flow            |
|--------|--------------------------------------------------------|-------------------------|-------------------------------------------------------------------|-----------------------|
| GET |`/fdx/v6/core/accounts`                                    | mTLS, OAuth 2.0         | `fdx:accountbasic:read` or `fdx:accountdetailed:read`             | Authorization Code    |
| GET |`/fdx/v6/core/accounts/{accountId}`                        | mTLS, OAuth 2.0         | `fdx:accountbasic:read` or`fdx:accountdetailed:read`              | Authorization Code    |
| GET |`/fdx/v6/core/accounts/{accountId}/transactions`           | mTLS, OAuth 2.0         | `fdx:transactions:read`                                           | Authorization Code    |
| GET |`/fdx/v6/core/accounts/{accountId}/contact`                | mTLS, OAuth 2.0         | `fdx:customercontact:read`, `fdx:customerpersonal:read` (optional)| Authorization Code    |
| GET |`/fdx/v6/core/accounts/{accountId}/payment-networks`       | mTLS, OAuth 2.0         | `fdx:paymentsupport:read`                                         | Authorization Code    |
| GET |`/fdx/v6/core/accounts/{accountId}/asset-transfer-networks`| mTLS, OAuth 2.0         | `fdx:paymentsupport:read`                                         | Authorization Code    |

#### FDX Consent API

| Method | Endpoint                                               | Security Protocol       | Scopes Required | OAuth Flow            |
|--------|--------------------------------------------------------|-------------------------|-----------------|-----------------------|
| GET    |`/fdx/v6/consents/{consentId}`                          | mTLS, OAuth 2.0         | NA              | Authorization Code    |
| PATCH  |`/fdx/v6/consents/{consentId}/revocation`               | mTLS, OAuth 2.0         | NA              | Authorization Code    |
| GET    |`/fdx/v6/consents/{consentId}/revocation`               | mTLS, OAuth 2.0         | NA              | Authorization Code    |

#### FDX Notification Subscription API

| Method | Endpoint                                                    | Security Protocol       | Scopes Required   | OAuth Flow            |
|--------|-------------------------------------------------------------|-------------------------|-------------------|-----------------------|
|  POST   |`/fdx/v6/events/notification-subscriptions`                 | mTLS, OAuth 2.0         | `fdx:notifications:subscribe`              | Client Credentials    |
|  GET   |`/fdx/v6/events/notification-subscriptions/{subscriptionId}` | mTLS, OAuth 2.0         | `fdx:notifications:subscribe`              | Client Credentials    |
|  DELETE   |`/fdx/v6/events/{consentId}/revocation/{subscriptionId}`  | mTLS, OAuth 2.0         | `fdx:notifications:subscribe`              | Client Credentials    |

### Solution APIs

The following APIs are for Data Providers to integrate with our consent management module.

#### External Resource Authentication API

This API is for consent grant application to get and update the consent.

| Method | Endpoint                                            | Security Protocol | Scopes Required            | OAuth Flow            |
|--------|-----------------------------------------------------|-------------------|----------------------------|-----------------------|
|  GET   | `/external/authentication/v1/resources/{resourceId}`| OAuth 2.0         | `external:resources:read`  | Client Credentials    |
|  PATCH |`/external/authentication/v1/resources/{resourceId}` | OAuth 2.0         | `external:resources:write` | Client Credentials    |

### Participant Management User API

This API is for consumer consent dashboard to get and update the consent.

| Method | Endpoint                                            | Security Protocol | Scopes Required                 | OAuth Flow            |
|--------|-----------------------------------------------------|-------------------|---------------------------------|-----------------------|
|  GET   | `/participant/user/v1/consents/{consentId}`         | OAuth 2.0         | `participantuser:consents:read` | Client Credentials    |
|  PATCH |`/participant/user/v1/consents/{consentId}`          | OAuth 2.0         | `participantuser:consents:write`| Client Credentials    |
|  GET   |`/participant/user/v1/consents`                      | OAuth 2.0         | `participantuser:consents:read` | Client Credentials    |

## Conclusion

This API security approach ensures that sensitive financial data is exchanged securely and that only authorized clients and users can access the system's resources. By following the **FDX (Financial Data Exchange) standard** and adhering to the **FAPI Advanced** security profile, we provide a robust and scalable security model that meets the highest standards for financial-grade API security.
