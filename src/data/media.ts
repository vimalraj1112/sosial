/**
 * Replaceable media config.
 * Point these at real client assets when they are available - no component
 * changes required.
 */

export const media = {
  hero: {
    video: "/assets/videos/sosial-hero.mp4",
    videoWebm: "/assets/videos/sosial-hero.webm",
    poster: "/assets/images/hero-poster.webp",
    fallbackImage: "/assets/images/hero-frame.svg",
    alt: "Abstract SOSIAL studio artwork with orbital rings on a midnight field",
  },
  ogImage: "/assets/brand/og.png",
  studio: {
    src: "/assets/images/studio.svg",
    alt: "Illustrative SOSIAL studio composition in cloud and ink tones",
  },
  seo: {
    src: "/assets/images/seo-analytics.svg",
    alt: "Illustrative analytics dashboard with campaign performance charts",
  },
  contact: {
    src: "/assets/images/contact.svg",
    alt: "Illustrative contact artwork with connected points and coordinate rings",
  },
} as const;
