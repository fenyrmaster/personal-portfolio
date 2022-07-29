/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["blog.digital-pineapple.com.mx"]
  }
}

module.exports = nextConfig
