// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://labs.gksm.sk",

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    locales: ["sk", "en"],
    defaultLocale: "sk",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  fonts: [
    {
      name: "Space Grotesk",
      cssVariable: "--font-space-grotesk",
      provider: fontProviders.google(),
      weights: ["300", "400", "500", "600", "700"],
      subsets: ["latin", "latin-ext"],
    },
  ],

  integrations: [sitemap(), react()],
});
