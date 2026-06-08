/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress all HTTP responses with gzip
  compress: true,

  // Optimize package imports — tree-shake lucide-react and framer-motion
  // to only bundle the icons/exports actually used. Significant bundle reduction.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  images: {
    // Prefer AVIF (50% smaller than WebP), fallback to WebP
    formats: ['image/avif', 'image/webp'],
    // Cover all common device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    API_KEY: process.env.GEMINI_API_KEY,
  },

  // Suppress specific build-time warnings that are known false positives
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
