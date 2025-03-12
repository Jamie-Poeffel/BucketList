/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // If you want to disable default styles
  },
  important: true, // If you need to increase specificity
  theme: {
    extend: {
    }
  },
  plugins: [],
}
