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
    colors: {
      current: 'currentColor',
      base: {
        normal: '#009FB7',
        light:'#00c7b8'
      },
      gray: {
        normal: '#404040',
        bold: '#272727',
        light: '#4D4D4D',
        lighter: '#a4a4a4'
      },
      white: {
        canvas: '#FEFDFA',
        touch: '#EFF1F3'
      },
      accent: '#FED766',
    }
  },
  plugins: [],
}

