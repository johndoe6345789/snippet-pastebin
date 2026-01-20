/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
  eslint: {
    // Linting is handled separately with direct ESLint invocation (eslint.config.mjs)
    // Disable Next.js ESLint wrapper to avoid compatibility issues with ESLint 9+ flat config
    ignoreDuringBuilds: true,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
    // Skip type checking during build - types are checked by IDE and test suite
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
