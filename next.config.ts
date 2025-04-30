/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'page.tsx', 'page.ts'],
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;