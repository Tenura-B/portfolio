import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
