import type { Metadata } from "next";
import { siteUrl } from "@/data/brand";
import { media } from "@/data/media";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export const titleTemplate = "%s | SOSIAL";

export function buildMetadata({
  title,
  description,
  path,
  image = media.ogImage,
  noIndex = false,
}: PageMeta): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "SOSIAL",
      images: [{ url: image, width: 1200, height: 630, alt: `${title} - SOSIAL` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
