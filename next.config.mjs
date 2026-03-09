/** @type {import('next').NextConfig} */
const nextConfig = {
  // Application requires dynamic API routes for NextAuth and Prisma.
  // Static export implies no node server, which breaks auth flows.
};

export default nextConfig;
