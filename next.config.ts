/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cea.vtexassets.com",
      },
    ],
  },
}

module.exports = nextConfig
