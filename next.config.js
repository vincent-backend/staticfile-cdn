/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    API_HOST: process.env.API_HOST,
    API_STATISTICS: process.env.API_STATISTICS
  },
  reactStrictMode: true,
  output: "export"
};

module.exports = nextConfig;
