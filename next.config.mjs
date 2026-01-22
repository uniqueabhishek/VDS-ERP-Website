/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development warnings
  reactStrictMode: true,

  // Optimize images
  images: {
    // Enable modern image formats
    formats: ['image/avif', 'image/webp'],
    // Allow external image domains if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Note: compiler.removeConsole is not compatible with Turbopack
  // Use a build-time tool like terser for production console removal if needed

  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@tailwindcss/forms', '@tailwindcss/container-queries'],
  },
};

export default nextConfig;
