/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // only these extensions—do NOT include suffixes like "page.tsx"
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;
