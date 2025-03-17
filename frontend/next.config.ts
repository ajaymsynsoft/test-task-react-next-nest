import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts', 'mw.ts'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async redirects() {
    return [{ source: '/home', destination: '/', permanent: true }]
  },
  
}

export default nextConfig
