import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Inline this small Tailwind stylesheet to avoid a render-blocking request.
    inlineCss: true,
  },
  turbopack: {
    // Next 16 includes several polyfills even for its modern browser target.
    // Replace that internal module with the one fallback below that is still
    // needed by Safari versions in Next's default support range.
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./src/lib/modern-polyfills.ts",
      "next/dist/build/polyfills/polyfill-module": "./src/lib/modern-polyfills.ts",
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
