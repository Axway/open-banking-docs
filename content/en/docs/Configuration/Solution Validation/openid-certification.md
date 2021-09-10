---
title: "OpenID certification"
linkTitle: "OpenID certification"
description: How to used OpenID test suite to certify your solution deployment
weight: 2
date: 2021-09-02
---

As part of the certification process, the customer´s platforms should be compliance with OpenID Foundation security tests:
• <https://openid.net/certification/instructions/>
We have two different set of tests:
• FAPI Advanced test .
• DCR Test .

This document describes the high-level setup tests that is necessary to configure the environment to run the security tests. For this guideline we are using the APIM v1.4.9 helm chart version

https://www.certification.openid.net/login.html

## Dynamic Client Registration Test

This test validates the TPP creation on Authorization Server via Central Directory request.

###	Getting Central Directory information

It is important to run the test to get the following information:
• Client ID.
• RSEAL – message certificate (cert e key) – used for JWKS .
• BRCAC – transport certificate – used for MTLS comunication

###	APIM deployment

The setup process below are described on README file of apim deployment.
