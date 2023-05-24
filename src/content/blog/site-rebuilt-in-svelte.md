---
title: I rebuilt my Web Site with Sveltekit
tags: ["site migration", "sveltekit"]
excerpt: "In late 2021 I decided to build a new version of my Website which was initially a Gatsby site. This time I decided to use Sveltekit and keep the Sanity CMS. This post describes how my experience was working with this great stack."
pubDate: 2022-04-04 00:00
---

By late 2021 I had heard good things about a new Javascript Framerok called Svelte. I had also seen this presentation from its author, an engaging, exciting one, which motivates you to jump in and learn all the great features it has to offer. So that's what I did. I followed its tutorial and to practice more, I translated to Svelte some pure Javascript examples I had implemented before.

Those examples were compiled in a Web App built with Sveltekit, which is a Svelte meta-framework, as NextJs is for React.
Confirming that Sveltekit is an amazing Metaframework to build Web Apps, and as I love discovering and working with new and useful tools, I decided to rebuild my Web Site (built before with Gatsby). In this post, I'll show you as much as I can, how this process went, and some learnings along the way.

## Design / Develop Decisions

My first thought to migrate my Web Site from Gatsby to Svelte was I had to keep some structure, specifically the component abstractions built with React. As both platforms are component-oriented tools, I knew this wasn't a really hard challenge. One can easily map the React components to Svelte. Of course, Svelte components are equipped with nice features that make our work more enjoyable than other frameworks.
I also wanted to keep other tools like Tailwind for the UI building, and Sanity as a CMS. Here are some insights about making them work with Sveltekit seamlessly.

### Tailwind for building the UI

You may already know that Tailwind can be installed as a PostCSS plugin. The instructions in the Tailwind docs show us that we must install Tailwind as a dev dependency as well as postCSS and Autoprefixer. But, as Sveltekit comes packed with postCSS we can just make:

`npm install -D tailwindcss autoprefixer`

After this, we must create a postCSS config file (postcss.config.cjs), adding Tailwind and Autoprefixer as plugins:

```javascript
module.exports = {
  plugins: {
    autoprefixer: {},
    tailwindcss: {},
  },
};
```

And also, a Tailwind config file is used to extend the basic theme configuration:

```javascript
module.exports = {
	// add this section
	content: [
		'./src/**/*.html',
		'./src/**/*.svelte'
	],
	theme: {
		extend: {
		// here we extend the tailwind basic theme...
	},
}
...
```

To test this integration, first, we create a global.css file inside the **src** directory. Here we place the basic tailwind directives that enable us to use Tailwind throughout our application, and if we want, we can set up global styles under the @layer directive:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @font-face {
    font-family: WorkSans;
    font-weight: bold;
    font-display: swap;
    src: url("/fonts/WorkSans-Bold.ttf") format("truetype");
  }

  @font-face {
    font-family: WorkSans;
    font-weight: bold;
    font-display: swap;
    font-style: italic;
    src: url("/fonts/WorkSans-BoldItalic.ttf") format("truetype");
  }
  //...More global styles
}
```

Then, we reference the `global.css` file in our page layout component which must be prefixed with a double underscore. We name it `__layout.svelte`:

```svelte
<script>
// Some Svelte components
import Header from '$lib/components/Header.svelte';
// Our global css styles
import '../global.css';
</script>
```

Finally, we are ready to use Tailwind utility classes at the component and page markup level. For example, for a Project component, I applied some classes like this:

```html
<div>
  <div class="w-full flex filter brightness-105">
    <img class="object-cover" {src} alt="{project.image.caption}" />
  </div>
  <div class="flex flex-col gap-2">...</div>
</div>
```

## Sanity as CMS

Let's remember that with Gatsby we access the data from a service via a Graphql data layer. Lots of tools have built Gatsby plugins to make the integration easier and Sanity has its own. For frameworks like Sveltekit, we must use the javascript client to send a GROQ query and fetch the data we need for the Website content. GROQ (Graph-Relational Object Queries) is a Sanity open-sourced language that allows us to filter and sort documents from the Sanity dataset. It's similar to SQL which is the tool to query databases.

To extract the Sanity data, I found the following flow very straightforward:

### 1. Install the Sanity Javascript CLI

I installed the Sanity Javascript CLI library, which allows us to connect to the Sanity dataset and then query for the data needed to populate the Web Site contents.

### 2. Define a query using the GROQ language

For any piece of data I need on my Web Site, I write a query that follows the GROQ rules. For example, to extract all the projects I need for the portfolio page, I wrote:

```svelte
const query = groq`{
	"projects": *[_type=="project"],
	"seoItems": *[_type=="SEOItems" && page=='projects']
}
`;
```

You may have noticed that I use a **groq** literal tag, which simply allows some syntax highlighting. Inside this literal tag, I'm writing the query to extract all the Projects as well as SEO information for the Projects page.

### 3. Fetch the data

I fetch the data using a server-side strategy. Sveltekit implements a loader function, which executes in the server. The loader API gives us some helpers to get information about navigation, session, routes, etc.
Once we fetch the data, we can return it in a props object, which can be accessed on the client side or the page HTML. For example, for the same projects listing, I wrote:

```svelte

<script context="module">
	import client from '$lib/utils/sanityClient';
	import groq from 'groq';
	const query = groq`{
		"projects": *[_type=="project"],
		"seoItems": *[_type=="SEOItems" && page=='projects']
	}
	`;
	export async function load({ stuff }) {
		const { projects, seoItems } = await client.fetch(query);
		return {
			props: {
				projects,
				seoItems,
				siteConfig: stuff.siteConfig
			}
		};
	}
</script>
```

Notice that this is all written inside a **module** context, a Svelte feature that allows us to use the props defined here, inside a regular `<script>` tag.

### 4. Use the data inside the page HTML

Finally, we can use the data fetched from our Sanity dataset. Remember that we exposed a props object containing this data coming from the loader function. We need a `<script>` block, where we map that data to the page props we use inside the template, like this:

```svelte
<script>
	export let projects;
	export let seoItems;
	export let siteConfig;
</script>
...
<div class="mt-16 projects">
	{#each projects as project}
		<div class="mb-16"><Project {project} /></div>
	{/each}
</div>
...
```

Notice that we define three props, related to the props object returned in the loader function. You can also notice that each project is iterated inside a Svelte `each` block. This way we render the data extracted from the Sanity backend.

## Using an API Endpoint to send Email

In the Gatsby version, I didn't implement a contact form. So I decided to do it now with Sveltekit. You can create API Endpoints, which are files that can handle server responses. So, you don't need to create a separate backend for such a simple action as sending an email. This is another fantastic feature, similar to what NextJs does with API routes.

I created an Endpoint called contact.js inside the routes directory. Here I wrote all the logic related to sending an email to me (the Web Site Owner) containing the contact information filled in by the visitor. Following is a fragment of this implementation.

```javascript
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: import.meta.env.VITE_SMTP_HOST,
  port: import.meta.env.VITE_SMTP_PORT,
  auth: {
    user: import.meta.env.VITE_SMTP_USER,
    pass: import.meta.env.VITE_SMTP_PASS,
  },
});

// Response handler to manage email sending
export async function post(request) {
  // Here we use Nodemailer to send the message
}
```

Of course, I had to configure an Email Service. You can use, for example, Sendgrid or Mailgun.

## UI Decisions

I liked my Gatsby Website design. When creating it, I had thought about a clean and simple design the main purpose was to showcase myself as a Web Development professional, a blog, and a portfolio to present my projects. However, It seemed a little sad to me and for the redesign, I decided to add some decorations that make it a little more vivid. So you can see a Website that shows gradients, patterns, and illustrations throughout pages and components which I think, have indeed enhanced the presentation of the Website.
Last but not least, Tailwind provides fantastic utility classes that helped me establish a consistent CSS structure and styles. Remember that Tailwind allows you to create a new theme, customizing tokens according to your design preferences like typography and color.

## Features I wish Sveltekit had

So far, I have made a fast review of the many things that Sveltekit allowed me to do to migrate my Website from Gatsby. I feel very happy with the final result. A faster site, without having to use plugins to accomplish one thing or another, thinking back to the days I used server-side rendering solutions, but with the new and great features a modern frontend framework has to offer.
The tools I would've liked to have out of the box, nevertheless, are a sitemap and PWA generators. I think this has to be solved by oneself. But I'm sure as the framework evolves, it will be packed with these and more
features that will make an even more enjoyable development experience. That's the promise of Sveltekit.

## Final thoughts

So this was a fast overview of my Website remake. For now, my purpose is not to present you with a full tutorial on how to create a Website with Sveltekit, but to tell you about my experience using this beautiful framework. I obviously do recommend that you experiment with it to create amazing Websites and apps. Though I'm planning to create some tutorials which you may be interested in following in the future, you can now start learning from the Sveltekit docs and some links I write below.
Also, I you want to discuss any thoughts about this post, you can write to me using the contact form, perfectly crafted with Sveltekit. Thanks for reading!

## Links of interest about Svelte and Sveltekit

- Svelte and Sveltekit by Scott Tolinski:
  https://www.youtube.com/watch?v=IKhtnhQKjxQ&t=354s

- From React to Svelte by Syntax.fm podcast:
  https://syntax.fm/show/390/from-react-to-sveltekit

- A Sveltekit crash course by James Quick:
  https://www.youtube.com/watch?v=UU7MgYIbtAk&pp=ugMICgJlcxABGAE%3D

- Tailwind guide to integrating with Sveltekit:
  https://codechips.me/tailwindcss-sveltekit-the-easy-way/

- Svelte and Sveltekit docs:
  https://svelte.dev
