import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent @libsql/client from being bundled — it uses native modules internally
  serverExternalPackages: ["@libsql/client"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
