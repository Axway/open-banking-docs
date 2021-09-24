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

For this you would need to customize the corresponding Docker image and replace its reference to yours.

* Download the [consent-page-image](/sample-files/consent-page-image.zip) Docker project that is the customization kit for the consent page.
* Customize the items you need to be customized as described in the sections below
* Rebuild the Docker image with the custom change, and tag it for your own Docker repository : this docker repository should be reachable from the Kubernetes cluster.

```console
docker build consent-page -t <your-docker-repo>/open-banking-consent-page:<image-tag>
```

* Push the docker image to your docker repository.

```console
docker push  <your-docker-repo>/open-banking-consent-page:<image-tag>
```

* Update the `open-banking-consent/files/consent.values.yaml` used in [Install Open Banking Consent Helm chart](/docs/deployment/installation/cloudentity#install-open-banking-consent-helm-chart) to  insert the _image_ record inside the _consentPage_ record as below

```yaml
  consentPage: 
      image: 
          pullPolicy: IfNotPresent  
          repository: <your-docker-repo>/open-banking-consent-page
          tag: <image-tag>
```

* Upgrade the helm chart release

```console
helm upgrade consent -n open-banking-consent cloudentity/openbanking –-version <chart-version> -f open-banking-consent/files/consent.values.yaml
```

The consent page should now reflect your changes on your Kubernetes environment.

The sections below detail how to customize the consent page in the docker image project.

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

```html
<div class="header">
  <img width="300px" src="/assets/images/griffinbank-logo.svg"/>
</div>
```

Host a new logo in folder `consent/consent-page/assets/images`, preferably with an SVG extension.
Note that the set width of the template is 300px, so there’s no need for a bigger file.

### Background color

Access the stylesheet at `consent/consent-page/assets/style.css`
![style.css](/Images/consent-page-css.png)

Change the background-color of the root element.

### Text translations

All text elements can be translated using the file in folder `consent/consent-page/templates/translations/en-us.yaml`

Enter the file and scroll the page until you find the syntax "br.payment...", this syntax represents the files of the consent-page.

![en-us.yaml](/Images/consent-page-language.png)

You translate all texts for the desired messages in the target language

### Button colors

Cancel and confirm buttons are located and styled inline in consent-page files

```html
 <div class="form-actions">
 	<button class="mdc-button mdc-button--outlined" type="submit" name="action" value="deny" style="height: 48px; padding: 12px 24px; color: #002D4C; border-color: #002D4C">
   <div class="mdc-button__ripple"></div>
         <span class="mdc-button__label">{{.trans.cancel}}</span>
      </button>
      <button class="mdc-button mdc-button--raised" type="submit" name="action" value="continue" style="height: 48px; padding: 12px 24px; margin-left: 8px; background: #DC1B37">
         <div class="mdc-button__ripple"></div>
         <span class="mdc-button__label">{{.trans.confirm}}</span>
     </button>
 </div>
```

Change the colors, widths, shapes, borders and paddings as you like.

### Payment type choice

As of the date of this document the only payment type accepted is PIX, so there’s no need for a dropdown.
Change the Payment Method of file `obbr-payment-consent-1.tmpl` from `<select>` tag to a paragraph (`<p>PIX</p>`) explicitly saying PIX.

### Account list

All accounts owned by the user from the bank need to be shown at Payment Account dropdown for the selection of the user. 
The dropdown can be upgraded to a set of cards for better display of the options.

### Account balance

If accessible, is considered a best practice to inform the account balance under the payment amount in file `obbr-payment-consent-2.tmpl`

![payment-amount](/Images/consent-page-payment-amount.png)

## Demo apps

4 demo apps are delivered with the solution. They are accessible from the Developer Portal homepage.
![demo-app1](/Images/demo-app1.png)
If you would like to customize them to your specific use-case, please contact us.
