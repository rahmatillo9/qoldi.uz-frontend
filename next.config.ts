import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {

  server: {
    host: '0.0.0.0',  // Tashqi tarmoqdan ulanish uchun
    port: 3000,        // Port raqami
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
