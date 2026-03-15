import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://superkxt.com",
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Barlow",
      cssVariable: "--font-barlow",
    },
    {
      provider: fontProviders.google(),
      name: "Noto Nastaliq Urdu",
      cssVariable: "--font-noto-nastaliq-urdu",
      subsets: ["arabic"],
    },
  ],
});
