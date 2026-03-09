/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Static export for Vercel
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
