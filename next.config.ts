import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config, { dev, isServer }) => {
    // Ignore Cypress files during build
    if (!dev && !isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'cypress/support/commands': 'commonjs cypress/support/commands',
      });
    }
    return config;
  },
};

export default nextConfig;
