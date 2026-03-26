/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        CFE: {
          500: "#FFFF8B",
          600: "#C6DA52",
          700: "#8DB600",
          800: "#588100",
          900: "#255000",
        },
      },
    },
  },
  plugins: [],
};
