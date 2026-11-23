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
    src: "/assets/images/studio-lights.jpg",
    alt: "The SOSIAL studio set up for a shoot, with softboxes and studio lights on a white stage",
  },
  searchAds: {
    src: "/assets/images/search-ads.svg",
    alt: "Illustrative analytics dashboard with campaign performance charts",
  },
  contact: {
    src: "/assets/images/contact.svg",
    alt: "Illustrative contact artwork with connected points and coordinate rings",
  },
} as const;
