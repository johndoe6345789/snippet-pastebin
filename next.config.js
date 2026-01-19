/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_STATIC ? 'export' : 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  typescript: {
    // TypeScript incorrectly flags CSS imports as errors in Next.js
    // This is a known issue: https://github.com/vercel/next.js/issues/54282
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', '@phosphor-icons/react'],
    turbopackScopeHoisting: false,
  },
  serverExternalPackages: ['pyodide'],
  webpack: (config, { isServer, webpack }) => {
    // Pyodide contains references to Node.js built-in modules that should be ignored in browser bundles
    if (!isServer) {
      // Replace node: protocol imports with empty modules
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /^node:/,
          (resource) => {
            resource.request = resource.request.replace(/^node:/, '');
          }
        )
      );

      // Set fallbacks for node modules to false (don't polyfill)
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        crypto: false,
        path: false,
        url: false,
        vm: false,
      };

      // Exclude pyodide from server-side rendering completely
      config.resolve.alias = {
        ...config.resolve.alias,
        pyodide: false,
      };
    }
    
    // On server, also exclude pyodide
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('pyodide');
    }
    
    return config;
  },
};

export default nextConfig;
