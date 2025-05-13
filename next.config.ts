import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true, // React xatolarini aniqlash uchun
  swcMinify: true, // Tezroq va samarali minifikatsiya
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/service-worker.js',
      },
      {
        source: '/manifest.json',
        destination: '/manifest.json',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
