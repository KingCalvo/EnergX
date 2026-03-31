import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  integrations: [react()],
  adapter: vercel(),
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
