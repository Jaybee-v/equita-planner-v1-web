import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL((process.env.BACKEND_URL as string) + "/**/*")],
  },
};

export default nextConfig;
