/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
  },
  env: {
    URL: process.env.URL,
  },
};

export default nextConfig;
