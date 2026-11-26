import { siteUrl } from "@/data/brand";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function absoluteUrl(path: string) {
  const base = siteUrl;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
