---
title: "Customization"
linkTitle: "Customization"
description: Find all info on how to customize the solution.
weight: 10
date: 2021-09-02
---


## Solution Branding

You can easily apply your branding on most solution user interface.
This is usually change logos and style (color palette, font, etc.)

Here are the main items you can consider for branding:

* Logo and style in Solution Homepage: [API Gateway > Solution Homepage](/docs/deployment/configuration/api-gateway#solution-Homepage)
    ![Welcome email](/Images/homepage.png)
* Logo and style in Email templates: [API manager > Email templates override](/docs/deployment/configuration/api-manager#email-templates-override)
    ![Welcome email](/Images/welcome-email.png)
* Logo and style of Developer Portal: [Developer portal > Template customization](/docs/deployment/configuration/developer-portal#remplate-customization)
* Logo and style of Analytics homepage. Refer to deployment option for this component : [Solution Deployment](/docs/deployment/installation)

## Consent page

Each Axway Open Banking customer would need to customize the Consent page that is embedded in the solution.

*For this you would need to customize the corresponding Docker image and replace its reference to yours.*

* Download the [consent-page-image](/sample-files/consent-page-image.zip) docker project that is the customization kit for the consent page.

### Consent Page template files

Consent page are generated based on template files, that you can customize.

You can find them in `consent/consent-page/templates/base`

![Consent page image files](/Images/consent-page-files.png)
There is 2 main file you can customize

![obbr-payment-consent-1.tmpl](/Images/consent-page-obbr-payment1.png)
obbr-payment-consent-1.tmpl

![obbr-payment-consent-2.tmpl](/Images/consent-page-obbr-payment2.png)
obbr-payment-consent-2.tmpl

### Logo

Logo can be changed by switching the name of the file in the image tag below

````html
<div class="header">
  <img width="300px" src="/assets/images/griffinbank-logo.svg"/>
</div>
````

Host a new logo in folder `consent/consent-page/assets/images`, preferably with an SVG extension.
Note that the set width of the template is 300px, so there’s no need for a bigger file.

### Background color

Access the stylesheet at `consent/consent-page/assets/style.css`
![style.css](/Images/consent-page-css.png)

Change the background-color of the root element.

### Text translations

All text elements can be translated using the file in folder `consent/consent-page/templates/translations/en-us.yaml`
Enter the file and scroll the page until you find the syntax “br.payment...”, this syntax represents the files of the consent-page.

![en-us.yaml](/Images/consent-page-language.png)

## Demo apps

4 demo apps are delivered with the solution. They are accessible from the Developer Portal homepage.
![demo-app1](/Images/demo-app1.png)
If you would like to customize them to your specific use-case, please contact us.


