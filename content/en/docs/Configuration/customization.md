---
title: "Customization"
linkTitle: "Customization"
weight: 10
date: 2021-09-02
---
This section includes details to customize the Amplify Open Banking solution.

## Solution branding

You can easily apply your branding on most of the solution's user interface, such as changing the logos and the style (color palette, font, and so on.)

Consider the following for branding changes:

* Email templates logo and style: [API manager - Email templates override](/docs/configuration/api-manager#email-templates-override).
    ![Welcome email](/Images/welcome-email.png)
* Developer Portal logo and style: [Developer portal - Template customization](/docs/configuration/portal/#template-customization).
* Analytics homepage logo and style. Refer to the deployment option for this component: [Customize Analytics Helm chart](/docs/deployment/installation/analytics/#customize-analytics-helm-chart).

## Consent page

The Consent page embedded in the solution is provided for demonstration purposes only. Each customer should customize the consent page to match their target application's requirements.

For this you would need to customize the corresponding Docker image and replace its reference to yours.

* Download the [consent-page-image](https://axway-open-banking-docs.netlify.app/sample-files/consent-page-image.zip) Docker project that is the customization kit for the consent page.
* Customize the items you need to be customized as described in the sections below.
* Rebuild the Docker image with the custom change, and tag it for your own Docker repository: this Docker repository should be reachable from the Kubernetes cluster.

```console
docker build consent-page -t <your-docker-repo>/open-banking-consent-page:<image-tag>
```

* Push the Docker image to your Docker repository.

```console
docker push  <your-docker-repo>/open-banking-consent-page:<image-tag>
```

* Update the `open-banking-consent/files/consent.values.yaml` used in [Install Open Banking Consent Helm chart](/docs/deployment/installation/cloudentity#install-open-banking-consent-helm-chart) to insert the _image_ record inside the _consentPage_ record as shown below.

```yaml
  consentPage: 
      image: 
          pullPolicy: IfNotPresent  
          repository: <your-docker-repo>/open-banking-consent-page
          tag: <image-tag>
```

* Upgrade the Helm chart release

```console
helm upgrade consent -n open-banking-consent cloudentity/openbanking –-version <chart-version> -f open-banking-consent/files/consent.values.yaml
```

The consent page should now reflect your changes on your Kubernetes environment.

The sections below details how to customize the consent page in the Docker image project.

### Consent page template files

The consent pages are generated based on customizable template files.

You can find them in `consent/consent-page/templates/base`.

![Consent page image files](/Images/consent-page-files.png)

For instance, there are two main files you can customize for payment.
![obbr-payment-consent-1.tmpl](/Images/consent-page-obbr-payment1.png)

* obbr-payment-consent-1.tmpl

![obbr-payment-consent-2.tmpl](/Images/consent-page-obbr-payment2.png)

* obbr-payment-consent-2.tmpl

### Logo

The logo can be changed by switching the name of the file in the image tag below.

```html
<div class="header">
  <img width="300px" src="/assets/images/griffinbank-logo.svg"/>
</div>
```

Host a new logo in the `consent/consent-page/assets/images` folder, preferably with an SVG extension. The set width of the template is 300px, so there is no need for a bigger file.

### Background color

Access the stylesheet at `consent/consent-page/assets/style.css`.
![style.css](/Images/consent-page-css.png)

Change the background-color of the root element.

### Text translations

All text elements can be translated using the file in the `consent/consent-page/templates/translations/en-us.yaml` folder.

Open the file and scroll the page until you find the syntax "br.payment..."; this syntax represents the files of the consent-page.

![en-us.yaml](/Images/consent-page-language.png)

Translate all texts for the desired messages in the target language.

### Button colors

Cancel and confirm buttons are located and styled inline in the consent-page files.

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

Change the colors, widths, shapes, borders, and paddings as you like.

### Payment type choice

As of the date of this document the only payment type accepted is PIX, so there is no need for a dropdown.
Change the Payment Method of file `obbr-payment-consent-1.tmpl` from a `<select>` tag to a paragraph (`<p>PIX</p>`) explicitly saying PIX.

### Account list

All accounts owned by the user from the bank need to be shown at the Payment Account dropdown as options for the user to select or displayed as a set of cards.

### Account balance

If accessible, it is considered a best practice to inform the account balance under the payment amount in the `obbr-payment-consent-2.tmpl` file.

![payment-amount](/Images/consent-page-payment-amount.png)

## Demo apps

There are four demo apps delivered with the solution. They are accessible from the Developer Portal homepage.
![demo-app1](/Images/demo-app1.png)
If you would like to customize them to your specific use-case, please contact Axway.
