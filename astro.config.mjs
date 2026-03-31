import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind()],
  image: {
    service: {
      entrypoint: "astro/assets/services/noop",
    },
  },
  vite: {
    ssr: {
      noExternal: ["@mui/x-charts", "@mui/material"],
    },
  },
  devToolbar: {
    enabled: false,
  },
});