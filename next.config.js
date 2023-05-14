/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    APP_NAME: process.env.APP_NAME,
    SWING_PROJECT_ID: process.env.SWING_PROJECT_ID,
  },
}

module.exports = nextConfig
