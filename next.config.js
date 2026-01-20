/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
    additionalData: `@use "m3-scss/material" as mat;`,
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

module.exports = nextConfig
