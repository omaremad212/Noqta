import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.noqtadesigns.com',
        pathname: '/web/image/**',
      },
    ],
  },
};

export default nextConfig;
