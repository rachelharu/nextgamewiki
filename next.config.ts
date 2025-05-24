import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    // Warning: This allows production builds to successfully complete even if
    // project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: ['./node_modules'],
    quietDeps: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        pathname: '/media/**',
      },
    ],
  }
};

export default nextConfig;
