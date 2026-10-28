export type ProjectCategory =
  | "Branding"
  | "Performance"
  | "Social"
  | "Web"
  | "Content"
  | "SEO";

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export type ProjectResult = {
  label: string;
  value: string;
  note?: string;
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: ProjectCategory;
  discipline: string;
  year: string;
  summary: string;
  image: string;
  imageAlt: string;
  aspect: "wide" | "tall" | "square";
  featured?: boolean;
  projectType: string;
  tags: string[];
  /** Service slugs represented by this concept, used for the portfolio stats. */
  services: string[];
  objective: string;
  challenge: string;
  approach: { title: string; body: string }[];
  deliverables: string[];
  gallery: ProjectGalleryItem[];
  /** Deliberately empty: no verified client results have been supplied. */
  verifiedResults: ProjectResult[] | null;
  conceptNote: string;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  Branding: "Branding",
  Web: "Website Design",
  Social: "Social Media",
  Performance: "Performance Marketing",
  Content: "Content & Creative",
  SEO: "SEO & Growth",
};

export const categoryOrder: ProjectCategory[] = [
  "Branding",
  "Web",
  "Social",
  "Performance",
  "Content",
  "SEO",
];

const conceptNote =
  "Illustrative concept created for layout and art-direction purposes. It is not a real client engagement, and no performance data, revenue or endorsement is associated with it.";

export const projects: Project[] = [
  {
    slug: "northwind",
    number: "01",
    name: "Northwind Athletic",
    category: "Branding",
    discipline: "Brand identity, art direction, e-commerce",
    year: "2026",
    summary:
      "A performance-wear label rebuilt around the idea of movement earned, not bought. Identity, packaging and a storefront that feels like the product.",
    image: "/assets/images/work-northwind.svg",
    imageAlt:
      "Abstract wave artwork in violet, ink and soft violet used as a concept visual",
    aspect: "wide",
    featured: true,
    projectType: "Identity system & storefront concept",
    tags: ["Brand strategy", "Art direction", "E-commerce"],
    services: ["branding", "web-design", "social-media"],
    objective:
      "Give a performance-wear label one ownable idea and a visual system that can move from a shoebox to a product page without losing its edge.",
    challenge:
      "Northwind had strong product and weak recognition. The brand looked like a reseller of itself: borrowed typography, inconsistent photography and a storefront that undersold the quality of the clothing.",
    approach: [
      {
        title: "Positioning around effort",
        body: "We moved the brand away from lifestyle aspiration and toward the honest language of training: repetition, discipline and progress you can measure.",
      },
      {
        title: "A system built for motion",
        body: "The identity uses a single structural idea across packaging, retail and digital, so the brand stays recognisable whether it appears on a shoe box or a six-second ad.",
      },
      {
        title: "A storefront that explains",
        body: "Product pages were restructured around fit, fabric and use, with photography briefs that show the product doing its job rather than floating in a studio.",
      },
    ],
    deliverables: [
      "Brand strategy and messaging",
      "Visual identity and motion principles",
      "Packaging and retail applications",
      "Art direction and photography briefs",
      "E-commerce UX and UI design",
      "Launch campaign concepts",
    ],
    gallery: [
      {
        src: "/assets/images/work-northwind-gallery-1.svg",
        alt: "Northwind identity board with violet, ink and soft violet wave marks, wordmark and colour palette",
        caption: "Identity board — one structural idea carried across every surface.",
      },
      {
        src: "/assets/images/work-northwind-gallery-2.svg",
        alt: "Northwind packaging and campaign mockup with bold wave graphics and product labels",
        caption: "Packaging and launch campaign, art-directed as one system.",
      },
    ],
    verifiedResults: null,
    conceptNote,
  },
  {
    slug: "halcyon",
    number: "02",
    name: "Halcyon Skin",
    category: "Social",
    discipline: "Social strategy, content production, community",
    year: "2026",
    summary:
      "A skincare brand with clinical credibility and no personality. We built a content system that explains the science without sounding like a leaflet.",
    image: "/assets/images/work-halcyon.svg",
    imageAlt:
      "Dark abstract artwork with orbiting rings and a violet accent",
    aspect: "tall",
    featured: true,
    projectType: "Social content system",
    tags: ["Social strategy", "Content system", "Community"],
    services: ["social-media", "brand-production", "indoor-production"],
    objective:
      "Turn clinical credibility into a social language people want to spend time with, without overclaiming what the products can do.",
    challenge:
      "Halcyon had excellent formulations and a feed full of product flat-lays. The audience could not tell what made the products different, and engagement depended entirely on paid reach.",
    approach: [
      {
        title: "Turn the formula into a story",
        body: "We built repeatable formats around one ingredient, one claim and one proof point, so every post taught the audience something specific.",
      },
      {
        title: "Design for the scroll",
        body: "A visual system of clinical diagrams, close-up texture and restrained typography gave the brand a recognisable look without chasing trends.",
      },
      {
        title: "Give the community a role",
        body: "Comment questions became the editorial calendar. The audience told us what to explain next, and the content became more useful as a result.",
      },
    ],
    deliverables: [
      "Social strategy and channel roles",
      "Content formats and visual system",
      "Monthly production and editing",
      "Community management playbook",
      "Creator collaboration direction",
      "Monthly insight reporting",
    ],
    gallery: [
      {
        src: "/assets/images/work-halcyon-gallery-1.svg",
        alt: "Halcyon social feed concept with clinical skincare diagrams, texture imagery and a violet accent",
        caption: "Feed system — one ingredient, one claim, one proof point.",
      },
      {
        src: "/assets/images/work-halcyon-gallery-2.svg",
        alt: "Halcyon vertical story frames showing ingredient callouts and product texture",
        caption: "Story formats built to be understood with the sound off.",
      },
    ],
    verifiedResults: null,
    conceptNote,
  },
  {
    slug: "tessellate",
    number: "03",
    name: "Tessellate Studio",
    category: "Web",
    discipline: "UX, web design, development",
    year: "2026",
    summary:
      "An architecture practice with an exceptional portfolio and a website that buried it. A new digital home built around the work.",
    image: "/assets/images/work-tessellate.svg",
    imageAlt:
      "Grid of geometric tiles in cloud, ink, violet and soft-violet tones",
    aspect: "wide",
    featured: true,
    projectType: "Website experience",
    tags: ["UX architecture", "Web design", "Development"],
    services: ["web-design", "branding", "brand-production"],
    objective:
      "Put the architecture first, make the practice's point of view legible, and turn the website into a useful qualification tool rather than a digital brochure.",
    challenge:
      "Tessellate's site treated every project the same, regardless of scale or relevance. Enquiries came from the wrong clients, and the studio spent too much time explaining its process in email.",
    approach: [
      {
        title: "Let the work lead",
        body: "Project pages were rebuilt around large imagery, a short intent statement and the specific constraints of each brief. Less description, better context.",
      },
      {
        title: "A quieter interface",
        body: "Navigation and typography step back so the architecture can occupy the screen. The design system keeps that discipline across every page.",
      },
      {
        title: "Qualify before the call",
        body: "A short process and engagement page answers the questions that were consuming discovery calls, so conversations start further along.",
      },
    ],
    deliverables: [
      "Content audit and UX architecture",
      "Wireframes and page templates",
      "Responsive UI design system",
      "Next.js front-end build",
      "CMS setup for project publishing",
      "Performance and accessibility QA",
    ],
    gallery: [
      {
        src: "/assets/images/work-tessellate-gallery-1.svg",
        alt: "Tessellate website concept shown in a desktop browser with an architectural project grid",
        caption: "Desktop experience — the work occupies the screen, the interface steps back.",
      },
      {
        src: "/assets/images/work-tessellate-gallery-2.svg",
        alt: "Tessellate responsive website screens on mobile and tablet with modular project tiles",
        caption: "Responsive templates for a practice that publishes constantly.",
      },
    ],
    verifiedResults: null,
    conceptNote,
  },
  {
    slug: "orbit",
    number: "04",
    name: "Orbit Finance",
    category: "Performance",
    discipline: "Paid search, paid social, measurement",
    year: "2026",
    summary:
      "A business banking product competing on trust in a category that advertises on fear. We built a calmer, more specific acquisition system.",
    image: "/assets/images/work-orbit.svg",
    imageAlt:
      "Dark orbital composition with concentric rings and a violet signal dot",
    aspect: "wide",
    featured: true,
    projectType: "Acquisition & measurement system",
    tags: ["Paid search", "Paid social", "Measurement"],
    services: ["performance-marketing", "web-design", "branding"],
    objective:
      "Build an acquisition system around qualified applications instead of cheap form fills, with creative and landing pages that make a specific, honest argument.",
    challenge:
      "Orbit was buying expensive search traffic for generic finance terms and losing the argument on the landing page. Cost per application kept climbing while conversion stayed flat.",
    approach: [
      {
        title: "Narrow the intent",
        body: "We rebuilt the account around specific business situations instead of broad category terms, then matched each ad group to a landing page that answered that exact question.",
      },
      {
        title: "Test the argument, not the colour",
        body: "Creative tests compared distinct propositions: speed, transparency, human support. The winners told us what the market actually cared about.",
      },
      {
        title: "Measure what closes",
        body: "Tracking was rebuilt around qualified applications rather than form fills, so optimisation stopped rewarding the wrong behaviour.",
      },
    ],
    deliverables: [
      "Paid search and social account architecture",
      "Landing page strategy and wireframes",
      "Creative concepts and copy testing",
      "Conversion tracking and event design",
      "Weekly optimisation and budget pacing",
      "Monthly performance commentary",
    ],
    gallery: [
      {
        src: "/assets/images/work-orbit-gallery-1.svg",
        alt: "Orbit Finance advertising concept with three calm, specific campaign propositions",
        caption: "Creative testing framed around distinct propositions, not colour variants.",
      },
      {
        src: "/assets/images/work-orbit-gallery-2.svg",
        alt: "Orbit Finance measurement plan interface with funnel stages and empty data states",
        caption: "A measurement plan built around qualified applications.",
      },
    ],
    verifiedResults: null,
    conceptNote,
  },
  {
    slug: "fieldnote",
    number: "05",
    name: "Fieldnote",
    category: "Content",
    discipline: "Editorial identity, publishing system",
    year: "2026",
    summary:
      "An independent journal about land and craft. A brand system designed to make slowness feel deliberate rather than dated.",
    image: "/assets/images/work-fieldnote.svg",
    imageAlt:
      "Editorial artwork with a large ink circle, text lines and a violet accent",
    aspect: "tall",
    featured: true,
    projectType: "Editorial identity & publishing system",
    tags: ["Editorial identity", "Print & digital", "Publishing"],
    services: ["branding", "social-media", "brand-production"],
    objective:
      "Create an editorial identity and publishing system that can move from a long-form digital journal to print without losing intimacy or becoming precious.",
    challenge:
      "Fieldnote wanted to move from a personal newsletter to a paid journal without losing the intimacy of the original. The challenge was scale without polish for its own sake.",
    approach: [
      {
        title: "Design the reading experience first",
        body: "Typography, measure and pacing were treated as the identity. The layout gives long-form work room to breathe on screen and in print.",
      },
      {
        title: "A system for contributors",
        body: "Templates and a clear art-direction guide let photographers and writers contribute without diluting the look.",
      },
      {
        title: "Make the transition legible",
        body: "The subscription offer was framed as a continuation of the existing relationship, not a new product launch.",
      },
    ],
    deliverables: [
      "Editorial strategy and positioning",
      "Identity and typographic system",
      "Print and digital templates",
      "Art direction for contributors",
      "Subscription page design",
      "Launch content plan",
    ],
    gallery: [
      {
        src: "/assets/images/work-fieldnote-gallery-1.svg",
        alt: "Fieldnote editorial spread with a large serif headline, text columns and a circular artwork",
        caption: "Editorial spread — measure and pacing treated as the identity.",
      },
      {
        src: "/assets/images/work-fieldnote-gallery-2.svg",
        alt: "Fieldnote article index and subscription page concept on cloud",
        caption: "A quiet digital home for long-form work and contributors.",
      },
    ],
    verifiedResults: null,
    conceptNote,
  },
  {
    slug: "kite",
    number: "06",
    name: "Kite & Co.",
    category: "Web",
    discipline: "Website, SEO foundations, content",
    year: "2026",
    summary:
      "A consultancy with a referral-only pipeline. A new site built to make the expertise findable and the offer easy to buy.",
    image: "/assets/images/work-kite.svg",
    imageAlt:
      "Illustration of a browser window with a structured website layout",
    aspect: "wide",
    featured: true,
    projectType: "Website & search foundation",
    tags: ["Web design", "SEO foundations", "Content"],
    services: ["web-design", "local-visibility", "brand-production"],
    objective:
      "Turn expertise into findable pages and a clear offer, so growth does not depend entirely on word of mouth.",
    challenge:
      "Kite's growth depended on word of mouth. The team wanted a site that could explain the offer clearly, rank for the problems they solve and support a more predictable pipeline.",
    approach: [
      {
        title: "Turn expertise into pages",
        body: "We identified the specific problems clients search for, then built service and insight pages around those problems rather than internal job titles.",
      },
      {
        title: "Remove friction from the offer",
        body: "Clear engagement models, indicative scope and a short qualification form replaced the vague contact page.",
      },
      {
        title: "Build on solid ground",
        body: "A fast, accessible build with clean information architecture and structured data gave the content a fair chance to rank.",
      },
    ],
    deliverables: [
      "Information architecture",
      "Service and insight page templates",
      "Design system and build",
      "CMS and editorial workflow",
      "On-page SEO foundations",
      "Analytics and enquiry tracking",
    ],
    gallery: [
      {
        src: "/assets/images/work-kite-gallery-1.svg",
        alt: "Kite consultancy website concept in a dark browser with a clear service-led homepage",
        caption: "Homepage — the offer explained before the first call.",
      },
      {
        src: "/assets/images/work-kite-gallery-2.svg",
        alt: "Kite service and insight page templates with editorial layouts and search structure",
        caption: "Service and insight templates built for findability.",
      },
    ],
    verifiedResults: null,
    conceptNote,
  },
  {
    slug: "verdant",
    number: "07",
    name: "Verdant Home",
    category: "SEO",
    discipline: "SEO, content strategy, editorial",
    year: "2026",
    summary:
      "A homeware retailer with thousands of products and no content strategy. We built a topic system around how people actually furnish a home.",
    image: "/assets/images/work-verdant.svg",
    imageAlt:
      "Radar-style illustration with connected points on a cloud background",
    aspect: "wide",
    projectType: "Search & content program",
    tags: ["Technical SEO", "Content strategy", "Analytics"],
    services: ["local-visibility", "branding", "web-design"],
    objective:
      "Build a search and content system around real decorating decisions, connect it to commerce, and fix the technical foundations underneath it.",
    challenge:
      "Product pages competed on price while competitors owned every research query. Verdant needed to be present earlier, when customers were still deciding what kind of home they wanted.",
    approach: [
      {
        title: "Organise around decisions",
        body: "We mapped the real sequence of decisions in furnishing a room, then built content clusters around each decision rather than each product category.",
      },
      {
        title: "Fix the technical debt",
        body: "Faceted navigation, duplicate pages and slow templates were creating crawl problems at scale. Fixing the foundations made the new content viable.",
      },
      {
        title: "Connect content to commerce",
        body: "Every guide links to products with context, so editorial traffic arrives at a page that continues the story rather than restarting it.",
      },
    ],
    deliverables: [
      "Technical SEO remediation plan",
      "Topic clusters and internal linking map",
      "Editorial briefs and production",
      "Category page optimisation",
      "Structured data implementation",
      "Monthly search performance review",
    ],
    gallery: [
      {
        src: "/assets/images/work-verdant-gallery-1.svg",
        alt: "Verdant Home topic cluster map connecting decorating questions to product categories",
        caption: "Topic architecture built around decorating decisions.",
      },
      {
        src: "/assets/images/work-verdant-gallery-2.svg",
        alt: "Verdant Home search-focused article template with contextual product recommendations",
        caption: "Editorial that continues the journey into commerce.",
      },
    ],
    verifiedResults: null,
    conceptNote,
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);

export const workFilters = [
  { value: "all" as const, label: "All Work", count: projects.length },
  ...categoryOrder.map((category) => ({
    value: category,
    label: categoryLabels[category],
    count: projects.filter((project) => project.category === category).length,
  })),
];

export const workStats = [
  { value: String(projects.length).padStart(2, "0"), label: "Concept projects" },
  {
    value: String(new Set(projects.map((project) => project.category)).size).padStart(2, "0"),
    label: "Disciplines",
  },
  {
    value: String(new Set(projects.flatMap((project) => project.services)).size).padStart(2, "0"),
    label: "Services represented",
  },
];

export function relatedProjects(slug: string, limit = 3) {
  const current = projectBySlug(slug);
  if (!current) return projects.slice(0, limit);

  return projects
    .filter((project) => project.slug !== slug)
    .map((project) => {
      const sharedServices = project.services.filter((service) =>
        current.services.includes(service),
      ).length;
      const sameCategory = project.category === current.category ? 2 : 0;
      return { project, score: sharedServices + sameCategory };
    })
    .sort((a, b) => b.score - a.score || a.project.number.localeCompare(b.project.number))
    .slice(0, limit)
    .map((entry) => entry.project);
}
