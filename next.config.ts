/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  output: 'standalone',
  experimental: {
    // Enable modern optimizations
    optimizeCss: true,
    optimizePackageImports: ['@tiptap/react', '@tiptap/starter-kit'],
  },
  // Ensure proper handling of images
  images: {
    domains: ['blog-back-end-9h38.onrender.com'],
  },
};

module.exports = nextConfig;
