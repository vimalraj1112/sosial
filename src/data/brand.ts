/**
 * Central brand + site configuration.
 * Everything a client may want to change lives here first.
 */

export const brand = {
  name: "SOSIAL",
  legalName: "Sosial",
  tagline: "Attention is earned, not bought.",
  shortDescription:
    "Sosial is a digital marketing and creative brand in Bengaluru. We bring digital marketing, creative content and production together, so your message, your visuals and your channels work as one.",
  email: "sosial.solutions@gmail.com",
  phoneLabel: "+91 91104 80590",
  phoneHref: "+919110480590",
  whatsappNumber: "919482861084",
  whatsappMessage: "Hi Sosial, I would like to talk about my marketing.",
  location: "Bengaluru, India",
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
  enabled: true,
  label: "Bengaluru · Marketing & production",
  shortLabel: "Bengaluru · Marketing",
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
        label: "Paid Advertising",
        href: "/services/performance-marketing",
        description: "Meta, Google and PPC campaigns",
      },
      {
        label: "Branding & Creative Strategy",
        href: "/services/branding",
        description: "Messaging, direction and research",
      },
      {
        label: "Website Development",
        href: "/services/web-design",
        description: "Business sites and landing pages",
      },
      {
        label: "Local Digital Visibility",
        href: "/services/local-visibility",
        description: "Local SEO and Google Business Profile",
      },
      {
        label: "Branding & Marketing Production",
        href: "/services/brand-production",
        description: "End-to-end branding and marketing shoots",
      },
      {
        label: "Indoor Production",
        href: "/services/indoor-production",
        description: "Studio and controlled-location work",
      },
      {
        label: "Outdoor Production",
        href: "/services/outdoor-production",
        description: "On-location video and photography",
      },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  services: [
    { label: "Social Media Marketing", href: "/services/social-media" },
    { label: "Paid Advertising", href: "/services/performance-marketing" },
    { label: "Branding & Creative Strategy", href: "/services/branding" },
    { label: "Website Development", href: "/services/web-design" },
    { label: "Branding & Marketing Production", href: "/services/brand-production" },
    { label: "All services", href: "/services" },
  ],
  company: [
    { label: "About Sosial", href: "/about" },
    { label: "Our Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Insights", href: "/insights" },
    { label: "Testimonials", href: "/testimonials" },
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
  icon: "instagram" | "linkedin" | "youtube";
};

export const socialProfiles: SocialProfile[] = [
  { label: "Instagram", href: "https://www.instagram.com/so.sial25/", icon: "instagram" },
  { label: "LinkedIn", href: "", icon: "linkedin" },
  { label: "YouTube", href: "", icon: "youtube" },
];

export const capabilities = [
  "Social media",
  "Paid media",
  "Brand strategy",
  "Websites",
  "Local visibility",
  "Brand production",
  "Photography",
  "Video",
  "Post-production",
  "Creative direction",
];
