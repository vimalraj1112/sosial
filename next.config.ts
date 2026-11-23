import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["nodemailer"],
  // Pages that were removed: send old links somewhere useful instead of a 404.
  redirects() {
    const oldInsights = [
      "attention-audit",
      "seo-is-a-product-problem",
      "creative-testing-system",
      "one-clear-idea",
      "first-frame-strategy",
      "reporting-that-changes-decisions",
    ];
    return [
      { source: "/work", destination: "/services", permanent: true },
      { source: "/work/:slug", destination: "/services", permanent: true },
      ...oldInsights.map((slug) => ({
        source: `/insights/${slug}`,
        destination: "/insights",
        permanent: true,
      })),
    ];
  },
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
