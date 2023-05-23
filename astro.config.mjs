import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sanity from "astro-sanity";
import svelte from '@astrojs/svelte';
import nightOwl from './src/styles/night_owl.json';
//import cobalt2 from './src/styles/cobalt2.json';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
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
  }), svelte()],
  output: 'server',
  adapter: vercel({
    imageService: true
  })
});