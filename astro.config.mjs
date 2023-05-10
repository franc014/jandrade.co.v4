import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sanity from "astro-sanity";
import nightOwl from './src/styles/night_owl.json';
//import cobalt2 from './src/styles/cobalt2.json';

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: nightOwl,
      langs: ['astro'],
      wrap: true,
    },
  },
  integrations: [tailwind({
    config: { applyBaseStyles: false }
  }), sanity(
    {
      projectId: '4778um7r',
      dataset: 'production',
      apiVersion: '2023-05-01',
      useCdn: true
    }
  )],
});