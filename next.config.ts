import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  // Set the basePath if deploying to a subdirectory (GitHub Pages)
  // Ensure this matches your repository name
  basePath: isProd ? '/ava-blog' : '',
  // Asset prefix ensures assets are loaded from the correct path
  assetPrefix: isProd ? '/ava-blog/' : '',
  // Disable image optimization for static export (since we don't have a Node server)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;