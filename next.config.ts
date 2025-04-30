/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  output: 'standalone',
  // Disable problematic optimizations
  experimental: {
    optimizeCss: false, // Disable CSS optimization that's causing issues
    optimizePackageImports: ['@tiptap/react', '@tiptap/starter-kit'],
  },
  // Ensure proper handling of images
  images: {
    domains: ['blog-back-end-9h38.onrender.com'],
  },
  // Add proper error handling
  onError: (err) => {
    console.error('Next.js build error:', err);
  },
  // Disable some problematic features
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;
