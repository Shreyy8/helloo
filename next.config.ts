import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Allow dev access from local network
  allowedDevOrigins: ['192.168.161.49'],
  
  // Empty turbopack config to silence the warning
  turbopack: {},
};

export default nextConfig;
