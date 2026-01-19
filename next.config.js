/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_STATIC ? 'export' : 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  turbopack: {},
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', '@phosphor-icons/react'],
  },
};

export default nextConfig;
