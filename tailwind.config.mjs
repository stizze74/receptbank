/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bas: {
          50: '#f7faf7',
          100: '#e8f0e7',
          200: '#cfe0cd',
          300: '#a9c5a5',
          400: '#7ba577',
          500: '#568b53',
          600: '#3f6f3d',
          700: '#345733',
          800: '#2c462c',
          900: '#253a26',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
