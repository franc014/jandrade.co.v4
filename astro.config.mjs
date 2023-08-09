import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sanity from "astro-sanity";
import svelte from '@astrojs/svelte';
import nightOwl from './src/styles/night_owl.json';
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.jandrade.co',
  markdown: {
    shikiConfig: {
      theme: nightOwl,
      langs: ['astro'],
      wrap: true
    }
  },
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sanity({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
    useCdn: true
  }), svelte(), sitemap(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), mdx()],
  output: 'server',
  adapter: vercel()
});