import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/brand";
import { services } from "@/data/services";
import { articles } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/insights`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/insights/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...insightRoutes];
}
