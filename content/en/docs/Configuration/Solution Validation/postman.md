---
title: "Functional tests with Postman"
linkTitle: "Functional tests"
description: Use postman to test all Open Banking APIs are working as expected
weight: 1
date: 2021-09-02
---

Admins or TPP Developer can test and validate their access to APIs by using postman.

## Retrieve the postman files

First they should retrieve the "Postman Collection" and "Postman Environment"

1. Go to the API Portal and click the "Explore APIs" button
2. Browse to the API you'd like to test and click the "Learn More" button
3. Click both the "Postman Collection" and "Postman Environment" links to download the Collection and Environment files

## Import into Postman

Import the 2 files together into postman. Note that Postman collection are different for each API while environment file is unique by environment.
Once imported, you can select the collection in the left pane, and select the environmen in the top right corner of postman.

## Postman Settings

Use the cog button to open Settings:

* Choose the General tab. Ensure the "Automatically follow redirects" is set to OFF also turn off SSL certificate validation:
* Choose the Certificates tab. Ensure a TPP client certificate is installed for the target environment. If not click "Add Certificate": (crt and key files seen in the screen shot are available in the open banking team's channel ) 
* Enter the target host and port and upload the public and private keys (CRT file and KEY file respectively) and click ADD

## Test

Simply follow the collection step-by-step flow that is different for each API.
Some API would require to get a consent (account, credit card, payment, ) before actually using the API main methods. this would required to copy/paste some value between your browser and postman and details in the API collection method description