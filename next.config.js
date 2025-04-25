/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    unoptimized: true, // Allow unoptimized images for local files
  },
  // Disable webpack cache to prevent file system errors
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
