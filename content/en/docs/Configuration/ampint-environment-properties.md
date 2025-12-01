---
title: "Amplify Fusion"
linkTitle: "Amplify Fusion"
weight: 4
date: 2024-09-10
---

Open Banking APIs and workflows are developed and exposed via Amplify Fusion. These APIs and workflows rely on specific environment properties that must be configured for them to function correctly. This section provides instructions on how to update these environment properties, along with detailed explanations for each property.

{{% alert title="Note" color="primary" %}} For more information on Amplify Fusion, refer to the [Axway Documentation Portal](https://docs.axway.com/bundle/amplify_integration/page/amplify_integration_guide.html).{{% /alert %}}

## Steps to configure environment properties

The following steps provide details on how to set up these properties.

1. Log in to Amplify Fusion.
2. Navigate to *Manager > Environments*. <br />
   ![Go to Environments](/Images/AI-Manager-Environments.png)
3. Click **Details**. <br />
   ![View Details](/Images/AI-Env-Property-Details.png)
4. Here you can update the environment properties. The details of the properties to be updated are provided in the next section.
   ![Update Properties](/Images/AI-Update-Environment-Properties.png)

## Environment properties

The following environment properties must be set up in each customer's data plane.

| Environment Property Name                                                | Description  |
|--------------------------------------------------------------------------|--------------|
| Connections_APIFrontendUrl                                               | URL to access the FDX APIs <br />**Example**:`https://griffin-design.openbanking.example.net:4443/`   |
| Connections_realmName                                                    | Realm Name in the Authorization Server representing customer tenant <br />**Example**: griffin-design |
| FDX_Accounts_Search_basePath                                             | Basepath of the FDX Accounts API <br />**Default**: /fdx/v6/core/accounts                             |
| FDX_Authorization_consentDurationOneTimePeriod                           | Default duration value (in days) for ONE_TIME consent <br />**Default**: 1                            |
| FDX_Authorization_consentDurationPersistentPeriod                        | Default long time duration of PERSISTENT consent <br />**Default**: 36525                             |
| FDX_Authorization_consentDurationSupportedTypes                          | Supported duration types of consent <br />**Default**: TIME_BOUND,ONE_TIME,PERSISTENT                 |
| FDX_Authorization_consentDurationTimeBoundMax                            | Maximum allowed duration period (in days) for TIME_BOUND consent <br />**Default**: 365               |
| FDX_Authorization_consentDurationTimeBoundMin                            | Minimum allowed duration period (in days) for TIME_BOUND consent <br />**Default**: 5                 |
| FDX_Authorization_consentLookbackPeriodMax                               | Maximum allowed lookback period (in days) for which historical data may be requested; measured from request time, not grant time <br />**Default**: 90 |
| FDX_Authorization_consentLookbackPeriodMin                               | Minimum allowed lookback period (in days) for which historical data may be requested; measured from request time, not grant time <br />**Default**: 1  |
| FDX_Authorization_consentSupportedDataClusters                           | Supported enumerations or types of the clusters of data elements that can be requested in a consent grant <br />**Default**: ACCOUNT_BASIC,ACCOUNT_DETAILED,TRANSACTIONS,STATEMENTS,CUSTOMER_CONTACT,CUSTOMER_PERSONAL,INVESTMENTS,PAYMENT_SUPPORT |
| FDX_Authorization_consentSupportedResourceTypes                          | Types of resources that can be requested and for which consent can be given <br />**Default**: ACCOUNT |
| FDX_Authorization_wellKnownNotSupportedKeys                              | The keys of a well known URI's response coming from the Authorization Server that need to be suppressed before sending the response <br />**Default**: introspection_endpoint,userinfo_endpoint,end_session_endpoint,check_session_iframe,device_authorization_endpoint,backchannel_authentication_endpoint,registration_endpoint |
| FDX_Kafka_Publish_Notification_priority                                  | Priority level of the logged events <br />**Default**: MEDIUM                                        |
| FDX_Kafka_Publish_Notification_severity                                  | Severity level of the logged events <br />**Default**: INFO                                          |
| FDX_Kafka_Publish_Notification_tenantType                                | Type of the tenant <br />**Default**: DATA_PROVIDER                                                  |
| FDX_Notification_Subscription_eventTypes                                 | Supported event types for subscription <br />**Default**: CONSENT_PARTIALLY_AUTHORIZED,CONSENT_AUTHORIZED,CONSENT_REJECTED,CONSENT_ON_HOLD,CONSENT_CONSUMED,CONSENT_EXPIRED,CONSENT_MODIFIED |
| Generic_Authorization_loginUrl                                           | Login url of the Authorization Server <br />**Example**: `https://auth.openbanking.example.net/realms/griffin-design/protocol/openid-connect/auth`|
| Generic_Authorization_maxConsentAllowedPerUserPerPartner                 | Maximum number of allowed consents per user per partner <br />**Default**: 10                         |
| Generic_Authorization_scaMethodEnabled                                   | If strong customer authentication is enabled <br />**Default**: TRUE                                  |
| Generic_Authorization_scaMethodExplanation                               | Description of the SCA method used                                                                |
| Generic_Authorization_scaMethodName                                      | SCA method name <br />**Default**: Keycloak Redirection                                               |
| Generic_Authorization_scaMethodProtocol                                  | SCA method protocol <br />**Default**: REDIRECT                                                       |
| Generic_Authorization_scaMethodRedirectUrl                               | SCA method redirect URL <br />**Example**: `https://auth.openbanking.example.net/realms/griffin-design/protocol/openid-connect/auth` |
| PartnerCoreService_CacheExpirationInMinutes                              | Cache expiration time in minutes <br />**Default**: 10                                                |
| PartnerCoreService_OnboardingFieldLabel_consentDataClusters              | Field from the onboarding portal that maps to data clusters <br />**Default**: Scope                  |
| PartnerCoreService_OnboardingFieldLabel_consentDurationPeriod            | Field from the partner onboarding portal that maps to consent duration period <br />**Default**: Duration Period  |
| PartnerCoreService_OnboardingFieldLabel_consentDurationType              | Field from the onboarding portal that maps to consent duration type <br />**Default**: Duration Type  |
| PartnerCoreService_OnboardingFieldLabel_consentLookbackPeriod            | Field from the onboarding portal that maps to consent lookback period <br />**Default**: Lookback Period          |
| PartnerCoreService_OnboardingFieldLabel_intermediaryHomeUrl              | Field from the onboarding portal that maps to intermediary uri <br />**Default**: Intermediary URI    |
| PartnerCoreService_OnboardingFieldLabel_intermediaryLogoUrl              | Field from the onboarding portal that maps to intermediary logo uri <br />**Default**: Intermediary Logo URI      |
| PartnerCoreService_OnboardingFieldLabel_intermediaryme                   | Field from the onboarding portal that maps to intermediary name <br />**Default**: Intermediary Name  |
| PartnerCoreService_OnboardingFieldLabel_intermediaryRegisteredEntityId   | Field from the onboarding portal that maps to intermediary registered entity id <br />**Default**: Intermediary Registered Entity Id |
| PartnerCoreService_OnboardingFieldLabel_intermediaryRegisteredEntityName | Field from the onboarding portal that maps to intermediary registered entity name <br />**Default**: Intermediary Registered Entity Name |
| PartnerCoreService_OnboardingFieldLabel_intermediaryRegistry             | Field from the onboarding portal that maps to intermediary registry <br />**Default**: Intermediary Registry      |
| PartnerCoreService_OnboardingFieldLabel_partnerHomeUrl                   | Field from the onboarding portal that maps to partner home url <br />**Default**: Website             |
| PartnerCoreService_OnboardingFieldLabel_partnerLogoUrl                   | Field from the onboarding portal that maps to logo uri <br />**Default**: Logo URI                    |
| PartnerCoreService_OnboardingFieldLabel_partnerRegisteredEntityId        | Field from the onboarding portal that maps to partner registered entity id <br />**Default**: Registered Entity Id |
| PartnerCoreService_OnboardingFieldLabel_partnerRegisteredEntityName      | Field from the onboarding portal that maps to registered entity name <br />**Default**: Registered Entity Name     |
| PartnerCoreService_OnboardingFieldLabel_partnerRegistry                  | Field from the onboarding portal that maps to partner registry <br />**Default**: Registry                         |
| PartnerCoreService_OnboardingFieldLabel_partnerType                      | Field from the onboarding portal that maps to partner type <br />**Default**: Entity Type                          |
| defaultPageSize                                                          | Default number of records in a single page <br />**Default**: 10                                      |
| maxPageSize                                                              | Maximum allowed number of records in a single page <br />**Default**: 100                             |
| organizationId                                                           | Organization identifier of the customer from market place                                         |
| organizationName                                                         | Organization name of the customer from market place                                               |
| revokeRefeshTokenOnConsentExpiry                                         | If refresh token needs to be revoked if consent expires <br />**Default**: TRUE                       |
