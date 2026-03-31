import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
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
