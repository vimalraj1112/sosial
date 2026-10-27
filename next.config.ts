import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["nodemailer"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keeps the preview environment quiet about the placeholder SVGs we ship.
  // Real photography supplied by the client can use next/image normally.
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
