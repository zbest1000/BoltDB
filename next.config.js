/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'boltdb.example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig