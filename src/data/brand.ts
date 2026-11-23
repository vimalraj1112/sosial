/**
 * Central brand + site configuration.
 * Everything a client may want to change lives here first.
 */

export const brand = {
  name: "SOSIAL",
  legalName: "Sosial",
  tagline: "Marketing with clarity. Creative with purpose. Execution you can count on.",
  positioning: "One creative partner for digital marketing, content, and video production.",
  shortDescription:
    "SOSIAL is one creative partner for digital marketing, content and video production, helping businesses build their presence, communicate their value and connect with their audiences.",
  email: "sosial.solutions@gmail.com",
  /** Inbox that receives website enquiries and booking requests. */
  enquiryInbox: "sosial.solutions@gmail.com",
  phoneLabel: "+91 91104 80590",
  phoneHref: "+919110480590",
  whatsappNumber: "919482861084",
  whatsappMessage: "Hi Sosial, I would like to talk about my marketing.",
  location: "India",
  responsePromise: "We aim to reply with a clear next step.",
} as const;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sosial.solutions"
).replace(/\/$/, "");

export const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
  brand.whatsappMessage,
)}`;

export const telHref = `tel:${brand.phoneHref}`;
export const mailHref = `mailto:${brand.email}`;
export const enquiryMailHref = `mailto:${brand.enquiryInbox}`;

/** Splash intro — tagline and timings are configurable in one place. */
export const intro = {
  enabled: true,
  tagline: "Marketing, creative and production, working as one.",
  kicker: "Digital marketing, creative and production",
  /** milliseconds from mount */
  timeline: {
    symbol: 240,
    wordmark: 700,
    tagline: 1280,
    exit: 2350,
    unmount: 2900,
  },
  fallbackExit: 4200,
} as const;

export const announcement = {
  enabled: false,
  label: "Marketing & production",
  shortLabel: "Marketing",
  message: "Two divisions, one direction.",
  cta: "Start a conversation",
  href: "/contact",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Social Media Marketing",
        href: "/services/social-media",
        description: "Strategy, content and community",
      },
      {
        label: "Pay Per Click",
        href: "/services/performance-marketing",
        description: "Meta, Google and PPC campaigns",
      },
      {
        label: "Personal Branding",
        href: "/services/branding",
        description: "Positioning and content for founders",
      },
      {
        label: "Website Development",
        href: "/services/web-design",
        description: "Business sites and landing pages",
      },
      {
        label: "Google Ads",
        href: "/services/google-ads",
        description: "Search, Performance Max and YouTube",
      },
      {
        label: "Meta Ads",
        href: "/services/meta-ads",
        description: "Facebook and Instagram campaigns",
      },
      {
        label: "Video Production & Editing",
        href: "/services/video-production",
        description: "Brand films, Reels and ads",
      },
      {
        label: "Marketing Research and Analytics",
        href: "/services/marketing-research",
        description: "Research, tracking and reporting",
      },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  services: [
    { label: "Social Media Marketing", href: "/services/social-media" },
    { label: "Pay Per Click", href: "/services/performance-marketing" },
    { label: "Personal Branding", href: "/services/branding" },
    { label: "Website Development", href: "/services/web-design" },
    { label: "Video Production & Editing", href: "/services/video-production" },
    { label: "All services", href: "/services" },
  ],
  company: [
    { label: "About Sosial", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

/**
 * Social profiles. Only the Instagram account is confirmed. Unconfirmed
 * channels render as muted, non-interactive icons rather than dead links.
 */
export type SocialProfile = {
  label: string;
  href: string;
  icon: "instagram" | "whatsapp" | "email" | "linkedin" | "facebook" | "x" | "youtube";
};

export const socialProfiles: SocialProfile[] = [
  { label: "Instagram", href: "https://www.instagram.com/sosial.solutions/", icon: "instagram" },
  { label: "WhatsApp", href: whatsappHref, icon: "whatsapp" },
  { label: "Email", href: mailHref, icon: "email" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sosial-production-5703b144b/", icon: "linkedin" },
  { label: "Facebook", href: "https://www.facebook.com/Sosial.solutions/", icon: "facebook" },
  { label: "X", href: "https://x.com/sosialsolution", icon: "x" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCtayTd6E7P9ikoYxkSRH7pQ", icon: "youtube" },
];

export const capabilities = [
  "Social media",
  "Paid media",
  "Personal branding",
  "Websites",
  "Google Ads",
  "Meta Ads",
  "Research & analytics",
  "Photography",
  "Video",
  "Post-production",
  "Creative direction",
];
