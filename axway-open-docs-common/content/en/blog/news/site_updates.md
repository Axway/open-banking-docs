---
title: "Important updates to Axway-Open-Docs"
linkTitle: "Important updates to Axway-Open-Docs"
date: 2019-10-23
description: Learn about some important usability updates and best practice recommendations for Axway-Open-Docs.
author: Alex Earnshaw
---

Recently we have made some important changes to make contributing to our docs even easier, including a Netlify CMS upgrade, updates to the contribution guidelines, and the ability to search all of the documentation directly on Axway-Open-Docs.

## Netlify CMS update

For those of you using the WYSIWYG editing option (**Edit on Netlify CMS**) provided by [Netlify CMS](https://www.netlifycms.org/), there are some important bug fixes and improvements that have been made in the most recent beta version, which we upgraded to on October 22nd 2019. These include:

* You can now make additional edits to a topic in the CMS after saving it and also *after sending it to review*. Previously, additional edits could not be made in the CMS and had to be made using GitHub or CLI.
* You can move your topic back and forth between **In Review** and **Draft** and the associated PR is opened, closed, and reopened as appropriate.
* You can access the deployment preview for any topic **In Review** directly from the CMS. The preview link appears in the toolbar when viewing any topic in the **In Review** column on the **Workflow** page.

## Updates to contribution guidelines

The [guidelines for contributing to the docs](/docs/contribution_guidelines/) have recently been updated to include a recommendation to delete and recreate your existing fork of the `axway-open-docs` GitHub repository before starting each new contribution/PR. This is to prevent any conflicts or issues with merging your PRs, which can occur if your fork is out of sync (behind) the Axway repo. You should only do this if you don't have any PRs currently in progress. This is recommended whether you are editing on GitHub or on Netlify CMS.

## Site search

We have added the ability to search all of the documentation on Axway-Open-Docs. The search functionality is provided free by [Algolia DocSearch](https://community.algolia.com/docsearch/) and their crawler runs every 24 hours so the search is always up to date. To search, just enter a term in the **Search this site** box in the toolbar and click one of the search results in the drop-down list.
