/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'mechhub.example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    // Enable Server Components
    serverComponentsExternalPackages: ['bcryptjs'],
  },
  // Optimize bundle size
  webpack: (config) => {
    config.externals.push('bcryptjs');
    return config;
  },
}

module.exports = nextConfig