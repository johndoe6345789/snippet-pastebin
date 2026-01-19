import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Output as static HTML for GitHub Pages, or standalone for Docker
  output: process.env.BUILD_STATIC ? 'export' : 'standalone',
  
  // Base path for GitHub Pages deployment
  // Set to '/' for custom domain or root deployment
  // Set to '/repo-name/' for GitHub Pages at username.github.io/repo-name/
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Configure webpack for browser-only modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Externalize node modules for browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        'node:url': false,
        'node:fs': false,
        'node:fs/promises': false,
        'node:vm': false,
        'node:path': false,
        'node:crypto': false,
        'node:child_process': false,
      };
    }
    return config;
  },
  
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_FLASK_BACKEND_URL: process.env.NEXT_PUBLIC_FLASK_BACKEND_URL || '',
  },
  
  // Image optimization
  images: {
    unoptimized: true, // Required for static export
  },
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', '@phosphor-icons/react'],
  },
};

export default nextConfig;
