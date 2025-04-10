import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./node_modules'],
    quietDeps: true
  }
};

export default nextConfig;
