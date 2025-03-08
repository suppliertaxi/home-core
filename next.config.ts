import type { NextConfig } from "next";
import tailwindConfig from "./tailwind.config";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ykrhsjtpgljjxgxgffoh.supabase.co",
      },
    ],
  },
};

export default nextConfig;
