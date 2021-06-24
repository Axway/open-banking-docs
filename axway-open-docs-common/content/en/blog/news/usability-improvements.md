---
title: "Usability improvements for Axway-Open-Docs"
linkTitle: "Usability improvements for Axway-Open-Docs"
date: 2020-02-17
description: Find out about the latest usability improvements we've made for Axway-Open-Docs.
author: Alex Earnshaw
---

## Netlify CMS users no longer need to sync forks

If you use Netlify CMS to contribute, you no longer need to worry about your fork being up to date with the upstream `axway-open-docs` repository, as Netlify CMS now creates any new branch based on master from the upstream repository. This means you no longer have to manually delete your fork before making a new contribution.

If you use GitHub UI or Git CLI to contribute you should continue to [sync your fork](/docs/contribution_guidelines/deleting_a_repository/) regularly as a best practice.

## Better integration with Netlify CMS

A number of improvements have been made to improve the integration with Netlify CMS. A huge thank you to [Shawn Erquhart](https://github.com/erquhart), [Netlify CMS](https://www.netlifycms.org/) lead, for this contribution!

### Edit button opens specific page

The **Edit on Netlify CMS** button on each page of the documentation now opens that page for editing in the CMS, instead of opening the CMS home page. This means that you no longer need to navigate to the page you want to edit in the CMS.

### Preview opens specific page

The **View Preview** button that appears in the CMS editing view after you make changes to a page and send it for review, now opens the deployment preview directly on the page containing your changes, instead of the deploy preview home page. This means that you no longer have to navigate to find the page with your changes.

### New alert style

In the CMS WYSIWYG editor you can now use an **Alert** style to add a note or warning to the documentation. This is available via the drop-down menu in the editor toolbar, and these alerts are shown with the final styling in the CMS preview.

![Alert style](/Images/other/alert_example.png)

## Issue with links in deploy previews

In some cases the navigation links in a deploy preview were linking back to the main Axway-Open-Docs site instead of to the deploy preview for the pull request. This issue was causing confusion for contributors, as they might inadvertently end up on the main site instead of the preview site, and would be unable to find their changes.

This issue has now been fixed, and all links in a deploy preview link correctly to the preview site.

Thank you to [Chris Wiechmann](https://github.com/cwiechmann) for reporting this, and to [LisaFC](https://github.com/LisaFC) of the [Docsy theme](https://github.com/google/docsy) for assistance on fixing this.
