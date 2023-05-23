---
title: Shopify CLI and GitHub Theme Development Workflow
tags: ["shopify", "shopify cli", "GitHub", "shopify theme development"]
excerpt: "In this post, you will learn a workflow for your Shopify theme development projects. We'll use the Shopify CLI that works great for Developer Experience since its last implementations. Together with GitHub, Shopify CLI  enables you to be more productive and effective in your daily work."
pubDate: 2022-10-04 00:00
---

The Shopify Command-line Interface (CLI) is a fantastic tool to accomplish lots of tasks when we develop on Shopify. For Theme Development, there's no exception. Together with GitHub, we can nowadays have a great dev workflow to develop themes for the Shopify Store Front.
If you're developing solo or within a team, this post will help you set up your local dev environment, push your customizations to GitHub, and synchronize your updates with a test or production theme in the Shopify Editor.

## Shopify CLI installation and sign in

For different operating systems, Shopify Docs give you the necessary steps to install the CLI.
After you've installed it, be sure to first identify the theme or themes you're going to work on.

### Identify the store

Either you're working inside your partner account or you have to ask for access to your client's Shopify dashboard, your first step is to identify the store or stores you're going to work on.
Consider the following scenarios:

#### First scenario: Theme customization

To customize a theme, duplicate the current production theme first. Then, rename it using a suffix or prefix so you can identify it as a Development or Stage Theme. As an example, I will use a fictitious store called "Virtual Fits". I named the development one **VIRTUAL_FITS_DEV**. With the CLI, we'll download this theme to our computer, and later we will push it to a GitHub repository, so we have version control included. But we'll see this in detail in a further section of this article.

![Duplicate current theme](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1684804600/jandrade.co.v4/hfyly3iptk9we1cjn31c.png)

![Duplicate current theme](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1684804600/jandrade.co.v4/xff5wynlqufyqk182uzn.png)

#### Second scenario: Theme Development from Scratch

If you're going to develop a theme from scratch, the first step is to create a DAWN theme copy from the CLI that will serve as a starter theme, like so:

1. In your local drive create a directory where you're going to place all of your themes.

2. Inside this directory, from the terminal run this command: `shopify theme init`.

This command will ask you for a project or theme name

3. Initialize a Git repository in the theme directory: `git init`

4. Create a GitHub remote repo and set it up with your local one:
   `git remote add origin [your-remote-repo]`

5. Stage and commit your initial changes and push them to your remote repo.

6. In your Shopify Theme Dashboard, in the Theme Library section, choose "Add theme" and then "Connect from GitHub". You'll be prompted to choose the repository and the branch you want to use for development or deployment purposes and the necessary permissions to accomplish this integration.

![Screen showing you can connect from GitHub from the Shopify Dashboard](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1684805481/jandrade.co.v4/Screen_Shot_2022-08-29_at_5.21.16_PM.png)
![Screen showing you have to choose your GitHub repo](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1684805481/jandrade.co.v4/Screen_Shot_2022-08-29_at_5.22.15_PM.png)

These are the first steps to set up our workflow. Now we will log in to our stores before starting to work on the themes.

### Sign In to a development store

Previously we saw that for theme customization, we first made a copy of our current production theme. Now it's time to download this copy to work on it locally and add version control. But first, we need to sign in to our Shopify store account, like so:

`shopify login --store [name-of-your-store]`

For our fictitious theme Virtual Fits, we'd log in like this:

`shopify login --store virtual-fits`

You'll be prompted to fill in your Shopify Store dashboard authentication. Once you've completed this step, you're ready to execute CLI commands to your chosen store. In fact, let's download a copy of your development theme to work with it locally:

1. Make sure you're working in the appropriate directory in your local drive.

2. Execute the following command and choose the theme you want to work with. Remember to choose a copy of the current theme which is your development theme:

`shopify theme pull`

![Downloading a theme from your Shopify store via the CLI](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1684805481/jandrade.co.v4/Screen_Shot_2022-08-30_at_12.39.00_PM.png)

This will download all your chosen theme files from your Shopify store, including the configuration ones. So, any changes you've been making to the theme, including those using the Shopify Editor, for example, content edition within sections and blocks; will be reflected in your local environment.

## Start your development environment

Now, it's time to start to work on your theme's files! But first, I suggest you switch your work to a different branch other than the main one, so you can keep track of the changes or features you'll be adding to the theme. Then you might create pull requests, and add other additional tasks as a CI/CD workflow. However, this last point is an advanced topic that will depend on the workflow you or your team have for your projects.

To start your local theme copy run:

`shopify theme serve`

What makes CLI an awesome tool is that it replicates the whole production environment for the theme, including Shopify Editor. This is of great help for the developer for they can isolate the dev environment from the live one which is extremely important as you are free to manipulate the Editor features when you find it necessary for the theme customizations. In fact, many of the tasks will require that you customize the Editor, as well.
While running the local environment, you'll have access to three URLs similar to the ones in the picture below (it will depend on the name of the store and the identifier the CLI has given to the current theme customization session, the one at the end of the URL):

![Terminal the local environment for Shopify development is running](https://res.cloudinary.com/dfpkdo5tf/image/upload/v1684805481/jandrade.co.v4/Screen_Shot_2022-08-30_at_12.57.15_PM.png)

Make a change to a CSS, Liquid, or Javascript code and verify it in your browser. It will be reloaded automatically. However, for any change you make in the Editor, you should reload your browser by yourself.

### Git integration when customizing your theme

In a previous section, we added version control with Git and GitHub. This way we were also able to integrate it with our Shopify store.
When customizing an existing theme, after pulling all files from the Shopify store, it's recommended to add these files to a GitHub repository. We can also integrate this repository with the Shopify store, adding the theme via the GitHub integration as we learned before (Connect with GitHub).

However, if you only want to set up Git for version control purposes, it's ok to just push your changes via the Shopify CLI to your current dev store as we will see next.

### Pushing your changes to your Shopify Store

If you're using GitHub to synchronize your local changes with your Shopify Store you don't need to worry about anything else. If not, the way to do it is via the CLI, using the command:

`shopify theme push --only [files]`

This will take your files from your theme's local copy to your development Shopify Store. Note that I've added the flag --only to specify just the files I want to push. This should be a best practice so you don't mess up with your Shopify dev copy. The majority of times, you or another marketing or dev team member will separately work on content creation or customizations in your Shopify remote copy, and you won't want to start all over again, replacing it with your fake content in your local environment!

An example of pushing files would be:

`shopify theme push --only sections/header.liquid`

You may want to explore more options for push, in the following link:
https://shopify.dev/themes/tools/cli/theme-commands#push

### Checking your theme

Finally, Shopify has another fantastic tool that will help us to keep the quality of our theme code according to Shopify standards and best practices. You may want to run [Shopify Theme Check](https://shopify.dev/themes/tools/theme-check), to verify that any changes you've made to your theme files, don't break them. Theme Check is a linter that will help you accomplish quality on your theme.
