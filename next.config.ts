import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: true, 
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bleedingcool.com",
      },
      {
        protocol: "https",
        hostname: "supabase.co",
      },
    ],
  },
};

export default nextConfig;
