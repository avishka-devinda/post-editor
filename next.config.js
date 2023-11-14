/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["res.cloudinary.com"],
    },
    experimental: {
      serverComponentsExternalPackages: ["@prisma/client"],
    },
  }
module.exports = nextConfig

