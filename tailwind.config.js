/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
      sans: ['WorkSans', 'Inter','sans-serif'],
      sans2: ['Inter', 'sans-serif'],
      mono:['JetBrainsMono','sans-serif']
    },
    },
  },
  plugins: [],
}

