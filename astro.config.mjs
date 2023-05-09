import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
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