import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "film-management-api.labse.id",
      },
    ],
  },
};

export default nextConfig;
