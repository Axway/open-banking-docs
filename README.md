# Axway Open Banking Docs

This repository contains the documentation for the Axway Open Banking solution. It follows the docs-as-code approach currently used by Axway for publishing product documentation.

This overview outlines the main points of note in that context with some "Getting Stared" style sections for making developers as productive as possible.

For more detailed information docs-as-code please refer to [Confluence](https://confluence.axway.com/display/RDAPI/Docs+as+code+approach).

## Content

All content is created in the `content/en/docs` directory as shown below.

```
content
| -- en
|    | -- docs
|    |    | -- deployment
|    |    | -- overview
|    |    |    | -- integration
|    |    |    | -- technical
|    |    | -- reference
|    |    |    | -- brazil
```

To explain the directories:

| Directory | Purpose |
| --------- | ------- |
| `content/en/docs` | Content "homepage". Shows overview of open banking and puts solution in context. |
| `content/en/docs/deployment` | Deployment guides. |
| `content/en/docs/overview` | Overview of solution and features. |
| `content/en/docs/overview/integration` | Integration overview with sequence diagrams showing interactions between system components. |
| `content/en/docs/overview/technical` | Technical architecture overview with information on Kubernetes architecture and a high-availability implementation. |
| `content/en/docs/reference` | Reference information not directly related to solution functionality. |
| `content/en/docs/reference/brazil` | Reference information on the Brazil market. |

### Text and Images

The process for adding new content to an existing directory is simple:

* Add a file to the relevant directory. For example, to add a new integration subpage create a file called `example.md` in `content/en/docs/overview/integration`
* Add Front Matter to the page as described [below](#front-matter-and-markdown) and add content in Markdown format below the Front Matter.
* To add an that cannot be referenced remotely copy the image to the `static/Images`.
* To add a sequence diagram follow the guidelines in the [PlantUML](#plantuml) section.

To create *new content in a new directory*:

* Create the new directory in the correct place in the directory structure.
* Create a new Markdown file called `_index.md` in the new directory. This creates the overview page that links all subpages within the new directory.
* Add Front Matter to `_index.md` and 

### PlantUML

All sequence diagrams are written using [PlantUML](https://plantuml.com/sequence-diagram) syntax. This is a text-based language that is transformed to a display format by the PlantUML Java Library.

Whilst there are solutions that support the real-time rendering of native PlantUML content this does not appear to be supported by our current docs-as-code stack. The PlantUML must therefore be converted to SVG and stored as an image as follows:

* Convert the source PlantUML file using a converter of your choice or the [conversion script](scripts/convert-plantuml.sh) in this repository. Note to use this **you must have `plantuml.jar` installed locally**.
* Copy the SVG file to `static/Images`.
* Include the snippet below where you want the imagine displayed (obviously changing the name to match the filename). This prevents the need to embed the SVG directly in your Markdown, avoiding an unholy mess.

```yaml
{{< readfile file="/static/Images/Generic_Web_Journey_Sequence.svg" >}}
```

### Static Assets

Static assets support the site functionality. There are two customizations in this site, namely 2 layouts that are designed to improve user experience. Both can be found in the default `layouts` directory.

#### Sequence Layout

The sequence layout maximises the available SVG viewport for the display of a sequence diagram by:

* The right sidebar is hidden.
* Injecting JavaScript that allows the sequence diagram headings to scroll down the page.

It should be used where a PlantUML sequence diagram converted to SVG is embedded in the page as described [above](#plantuml).

To use this layout add the key/value `type: sequence`.

The JavaScript that allows the headings to scroll is also checked-in as a static asset [here](static/js/scroll-sequence-diagram-headings.js).

#### Big Table Layout

The sequence layout maximises the available view area for the display of a table by hiding the right sidebar. An example is the [Brazil Compliance Guide](content/en/docs/reference/brazil/compliance.md).

To use this layout add the key/value `type: sequence`.

### Front Matter and Markdown

## Lifecycle

### Outline

To date this project implements [GitHub Flow](https://guides.github.com/introduction/flow/), which is a simple and easy-to-use method doing documentation updates.

The outline process is as follows:

* The relevant subject matter expert creates a new branch and starts work on their changes.
* When they are happy they commit and push to the branch.
* They then create a Pull Request, which creates a Preview site that can reviewed on Netlify (link to the site is shown in the Pull Request page). The technical writer then reviews and suggest changes, etc.
* When approved the changes are merged to `master`. This kicks off a deployment in Netlify to the [Netlify site](https://axway-open-banking-docs.netlify.app/).
* The final step is a merge to production, which does not necessarily need to be performed at each merge to `master` on GitHub. This happens through a manual push to Zoomin, the production provider for https://docs.axway.com.

### Production