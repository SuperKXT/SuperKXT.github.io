import fs from "node:fs";
import path from "node:path";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://superkxt.com",
  server: { host: true },
  vite: {
    plugins: [
      {
        name: "public-directory-index",
        apply: "serve",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = (req.url ?? "/").split("?")[0];
            if (url.includes(".") || url.startsWith("/@")) return next();
            const withSlash = url.endsWith("/") ? url : `${url}/`;
            const candidate = path.join(process.cwd(), "public", withSlash, "index.html");
            if (!fs.existsSync(candidate)) return next();
            if (!url.endsWith("/")) {
              res.writeHead(302, { Location: withSlash });
              return res.end();
            }
            req.url = `${withSlash}index.html`;
            next();
          });
        },
      },
    ],
  },
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
