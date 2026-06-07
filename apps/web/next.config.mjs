/** @type {import('next').NextConfig} */
const nextConfig = {
  // output left undefined so Vercel auto-detects the optimal build target.
  images: {
    formats: ['image/webp'],
  },
  transpilePackages: ['@brightbox/configurator'],
};

export default nextConfig;
