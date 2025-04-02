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
    domains: [
      'res.cloudinary.com',
    ]
  },
};

export default nextConfig;
