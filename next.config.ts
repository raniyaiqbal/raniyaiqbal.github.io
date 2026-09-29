import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * This is a *user* site (raniyaiqbal.github.io), served from the domain root,
 * so no basePath is needed.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
