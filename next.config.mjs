/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Also ignore type errors during builds for a smoother deployment
    ignoreBuildErrors: true,
  },
};

export default nextConfig;