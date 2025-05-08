/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Disable problematic optimizations
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['@tiptap/react', '@tiptap/starter-kit'],
  },
  // Ensure proper handling of images
  images: {
    domains: ['blog-back-end-9h38.onrender.com'],
  },
  // Configure webpack for proper handling of CSS modules
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });
    return config;
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