export type IconName =
  | "MessagesSquare"
  | "TrendingUp"
  | "PenTool"
  | "MonitorSmartphone"
  | "MapPin"
  | "Clapperboard"
  | "Camera"
  | "Sun";

export type ServiceDivision = "digital" | "production";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  division: ServiceDivision;
  icon: IconName;
  image: string;
  imageAlt: string;
  problem: string;
  problemPoints: string[];
  approach: { title: string; body: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
  relatedWork: string[];
};

export type Division = {
  id: ServiceDivision;
  name: string;
  shortName: string;
  summary: string;
  serviceSlugs: string[];
};

export const divisions: Division[] = [
  {
    id: "digital",
    name: "Digital Marketing & Creative Growth",
    shortName: "Digital marketing",
    summary:
      "Strategy, social media, advertising, branding, websites and local digital visibility — planned as one system.",
    serviceSlugs: [
      "social-media",
      "performance-marketing",
      "branding",
      "web-design",
      "local-visibility",
    ],
  },
  {
    id: "production",
    name: "Video Production & Photography",
    shortName: "Production",
    summary:
      "End-to-end branding and marketing shoots, indoors and outdoors, from planning to post-production.",
    serviceSlugs: [
      "brand-production",
      "indoor-production",
      "outdoor-production",
    ],
  },
];

export const services: Service[] = [
  {
    slug: "social-media",
    name: "Social Media Marketing & Management",
    shortName: "Social Media",
    tagline: "A consistent presence, not a content scramble.",
    summary:
      "Channel strategy, content calendars and production for the platforms that matter, with one clear message across every post.",
    division: "digital",
    icon: "MessagesSquare",
    image: "/assets/images/social-campaign.svg",
    imageAlt:
      "Abstract social media content cards in violet, ink and cloud tones",
    problem:
      "Most brands post because they feel they should. Without a defined role for each channel, every post starts from a blank page and success gets measured by likes instead of whether the content is doing a job.",
    problemPoints: [
      "No clear role for each channel or audience",
      "Content produced one post at a time, with no repeatable formats",
      "Vanity metrics standing in for enquiries, saves or useful conversations",
    ],
    approach: [
      {
        title: "Choose the channels that earn the effort",
        body: "We agree which platforms deserve attention, who they serve and what each one should achieve. A smaller, deliberate presence is usually stronger than being everywhere at once.",
      },
      {
        title: "Build formats, not one-offs",
        body: "We design a handful of repeatable content formats with clear visual and copy rules. That is what makes a feed feel like one brand and makes production sustainable.",
      },
      {
        title: "Plan, publish and review",
        body: "A monthly calendar keeps the work visible. We review what was saved, shared, watched and acted on, then adjust the next month rather than starting over.",
      },
    ],
    deliverables: [
      "Channel strategy and audience notes",
      "Monthly content calendar",
      "Static posts and carousels",
      "Captions and short-form copy",
      "Short-form video production support",
      "Monthly content and performance review",
    ],
    faqs: [
      {
        q: "Do you handle design and copy as well as the strategy?",
        a: "Yes. We can plan and produce content end to end, or work with your in-house team on formats, templates and direction. The split is agreed before the work starts.",
      },
      {
        q: "Do we need to be on every platform?",
        a: "No. A few channels done with intent will usually outperform a presence everywhere. We will say where to focus, even when that means doing less.",
      },
    ],
    relatedWork: ["halcyon", "northwind"],
  },
  {
    slug: "performance-marketing",
    name: "Paid Advertising & Performance Marketing",
    shortName: "Paid Advertising",
    tagline: "Paid media with a clear job.",
    summary:
      "Meta, Google and PPC campaigns planned around a defined objective, with the creative, landing page and measurement connected.",
    division: "digital",
    icon: "TrendingUp",
    image: "/assets/images/work-orbit.svg",
    imageAlt:
      "Dark orbital artwork representing connected paid media channels",
    problem:
      "Paid media gets expensive when the objective is vague. Budgets drift towards broad audiences, creative is disconnected from the landing page, and reporting shows activity without explaining what to change.",
    problemPoints: [
      "Campaigns launched without an agreed measure of success",
      "Too few distinct creative ideas, or too many versions of one",
      "Landing pages and tracking that cannot answer what worked",
    ],
    approach: [
      {
        title: "Define the job and the measure",
        body: "Before spending, we agree what a useful result looks like and how it will be counted. The campaign structure follows the objective, not a template.",
      },
      {
        title: "Connect creative to the landing page",
        body: "We plan distinct angles for Meta, Google or PPC, then make sure the promise in the ad continues on the page. Creative and page are built as one experience.",
      },
      {
        title: "Review, learn and adjust",
        body: "At an agreed rhythm we review what changed, what we learned and what happens next. Tests are documented so the account gets smarter, not just busier.",
      },
    ],
    deliverables: [
      "Campaign plan and measurement approach",
      "Meta, Google and PPC campaign setup",
      "Audience and creative direction",
      "Landing page recommendations",
      "Conversion tracking recommendations",
      "Performance review and next actions",
    ],
    faqs: [
      {
        q: "What budget do we need to start?",
        a: "It depends on the category and how much data is needed to learn responsibly. We recommend a test budget with a clear hypothesis rather than a minimum spend designed to lock you in.",
      },
      {
        q: "Do you guarantee leads or sales?",
        a: "No. We do not guarantee leads, sales, revenue, return on ad spend or any other commercial outcome. We commit to the quality of the setup, the clarity of the reporting and honest recommendations.",
      },
    ],
    relatedWork: ["orbit", "kite"],
  },
  {
    slug: "branding",
    name: "Branding & Creative Strategy",
    shortName: "Branding & Creative",
    tagline: "One clear idea, expressed consistently.",
    summary:
      "Audience and competitor research, messaging, creative direction and the rules that keep a brand recognisable.",
    division: "digital",
    icon: "PenTool",
    image: "/assets/images/branding-system.svg",
    imageAlt:
      "Layered violet, ink and cloud wave bands representing a brand system",
    problem:
      "A brand is not a logo. It is the cumulative impression of every message, image and interaction. When the idea is vague, the visual language drifts and every campaign has to start from zero.",
    problemPoints: [
      "Messaging that sounds like every other business in the category",
      "Assets made by different people with no shared rules",
      "A visual identity that looks good once but does not hold together",
    ],
    approach: [
      {
        title: "Research the business and the category",
        body: "We look at the audience, the competition and the language already being used. The goal is to find a clear, defensible idea rather than a new slogan.",
      },
      {
        title: "Define the message",
        body: "One primary message and a small set of supporting messages, written so the team can repeat them without a slide deck.",
      },
      {
        title: "Build the creative direction",
        body: "Type, colour, layout, imagery and tone documented as a practical system. Distinctive at a glance, flexible enough for a post, a website and a shoot.",
      },
    ],
    deliverables: [
      "Audience and competitor research",
      "Positioning and messaging",
      "Creative direction",
      "Identity system support",
      "Tone of voice guidance",
      "Brand guidelines and templates",
    ],
    faqs: [
      {
        q: "Do we need a full rebrand?",
        a: "Not always. Sometimes the equity is in the name and the fix is in the system around it. We recommend the smallest change that solves the real problem.",
      },
      {
        q: "Can you work with our existing brand?",
        a: "Yes. We often extend a brand that is fundamentally sound but lacks consistency, templates or a distinctive digital expression.",
      },
    ],
    relatedWork: ["northwind", "fieldnote"],
  },
  {
    slug: "web-design",
    name: "Website Development",
    shortName: "Website Development",
    tagline: "A site that explains the offer.",
    summary:
      "Business websites and landing pages built around a clear message, a simple journey and a maintainable structure.",
    division: "digital",
    icon: "MonitorSmartphone",
    image: "/assets/images/web-experience.svg",
    imageAlt: "Browser window illustration showing a clean website layout",
    problem:
      "A website is often the hardest-working asset a business owns, and the least maintained. Beautiful redesigns fail when nobody thought about the journey, the content or what happens after launch.",
    problemPoints: [
      "Unclear hierarchy and competing calls to action",
      "Slow, fragile builds that are expensive to update",
      "Designs handed over without a content or measurement plan",
    ],
    approach: [
      {
        title: "Clarify the journey",
        body: "We start with the decisions a visitor needs to make, then structure the pages and content around those decisions. Structure comes before visuals.",
      },
      {
        title: "Design the system",
        body: "A component-based design language that stays consistent as the site grows, with responsive behaviour and accessibility considered from the first screen.",
      },
      {
        title: "Build and hand over",
        body: "A maintainable build with a sensible editorial workflow, analytics guidance and documentation so your team can keep the site current.",
      },
    ],
    deliverables: [
      "Site structure and user journeys",
      "Page wireframes and design",
      "Responsive component system",
      "Front-end development and CMS setup",
      "Accessibility and performance QA",
      "Analytics, tracking and launch support",
    ],
    faqs: [
      {
        q: "What do you build with?",
        a: "We choose the platform to fit the job: WordPress or a similar CMS when the team publishes often, or a custom build when the requirements call for it. The trade-offs are explained before you decide.",
      },
      {
        q: "Do you maintain sites after launch?",
        a: "Maintenance and care can be agreed as a separate scope. We can also hand over full documentation to your team.",
      },
    ],
    relatedWork: ["tessellate", "kite"],
  },
  {
    slug: "local-visibility",
    name: "Local Digital Visibility",
    shortName: "Local Visibility",
    tagline: "Be found by nearby customers.",
    summary:
      "Local SEO fundamentals and Google Business Profile support for businesses that depend on local discovery.",
    division: "digital",
    icon: "MapPin",
    image: "/assets/images/seo-analytics.svg",
    imageAlt:
      "Analytics dashboard artwork representing local search visibility",
    problem:
      "Local customers often decide before they call. An incomplete profile, inconsistent business details and basic on-page gaps can make a good business harder to find than a weaker competitor.",
    problemPoints: [
      "Google Business Profile details that are incomplete or out of date",
      "Inconsistent name, address and phone information across listings",
      "Obvious on-page gaps that block local discovery",
    ],
    approach: [
      {
        title: "Audit the local presence",
        body: "We check the profile, the core business details, the site's local pages and the obvious gaps between them.",
      },
      {
        title: "Fix the fundamentals",
        body: "We recommend and support the practical changes: profile information, categories, photos, basic on-page details and consistent citations.",
      },
      {
        title: "Set a review rhythm",
        body: "Local visibility is maintained, not switched on. We agree a simple monthly check so the profile and pages stay accurate.",
      },
    ],
    deliverables: [
      "Local visibility audit",
      "Google Business Profile support",
      "Basic on-page recommendations",
      "Local content guidance",
      "Citation consistency checklist",
      "Monthly local visibility review",
    ],
    faqs: [
      {
        q: "Do you provide advanced technical SEO?",
        a: "Our local visibility work covers local SEO fundamentals, Google Business Profile support and relevant basic on-page recommendations. Complex technical SEO, large-scale link building and enterprise search programmes are outside this scope, and we will say so clearly.",
      },
      {
        q: "Do you guarantee rankings or map positions?",
        a: "No. Search and map results depend on factors outside our control. We do not guarantee rankings, map positions, traffic or enquiries.",
      },
    ],
    relatedWork: ["kite", "verdant"],
  },
  {
    slug: "brand-production",
    name: "Branding & Marketing Production",
    shortName: "Brand Production",
    tagline: "Shoots planned around the marketing.",
    summary:
      "End-to-end branding and marketing shoots, from creative planning and production coordination to the final edit, indoors or outdoors.",
    division: "production",
    icon: "Clapperboard",
    image: "/assets/images/video-frame.svg",
    imageAlt: "Cinematic frame artwork with a violet orbital motif",
    problem:
      "A beautiful film can still be useless if it was never planned for the channels it needs to run on. Production disconnected from marketing produces footage nobody can place.",
    problemPoints: [
      "No clear idea or intended use before the shoot",
      "One hero film instead of assets for each placement",
      "Footage and photography delivered without a content plan",
    ],
    approach: [
      {
        title: "Plan from the brief",
        body: "We start with the business objective, the audience and the places the work will appear. The creative treatment and shot list follow from that.",
      },
      {
        title: "Shoot for the formats you need",
        body: "Coverage is planned around vertical, square, landscape and cutdown lengths. One well-planned shoot should produce a useful library, not a single film.",
      },
      {
        title: "Finish for the channel",
        body: "Editing, colour, sound and captions are finished for the platforms in scope, with files named and exported for their intended use.",
      },
    ],
    deliverables: [
      "Creative treatment and direction",
      "Shot list and storyboard",
      "Production schedule and coordination",
      "Shoot planning and on-set direction",
      "Editing, colour and sound",
      "Platform-ready cutdowns and formats",
    ],
    faqs: [
      {
        q: "Do you handle full production?",
        a: "We plan and lead the production within the agreed scope, coordinating the crew, equipment and locations the project needs. Those details are confirmed per project before work begins.",
      },
      {
        q: "Does every project include every stage?",
        a: "No. Some projects need only production support, some need a full shoot and edit. The scope, deliverables and number of shoot days are agreed in writing.",
      },
    ],
    relatedWork: ["halcyon", "northwind", "fieldnote"],
  },
  {
    slug: "indoor-production",
    name: "Indoor Production",
    shortName: "Indoor Production",
    tagline: "Controlled light, clean detail.",
    summary:
      "Indoor video and photography for products, people and brand stories, in a studio or controlled location.",
    division: "production",
    icon: "Camera",
    image: "/assets/images/studio.svg",
    imageAlt: "Illustrative studio composition in cloud and ink tones",
    problem:
      "Indoor work is unforgiving: colour shifts, reflections, background clutter and mixed light quickly make a product or a person look wrong. Without a shot plan, a controlled set still produces uncontrolled results.",
    problemPoints: [
      "Product colour and texture that do not match the real item",
      "Mixed light sources and distracting backgrounds",
      "No plan for the angles, crops and details the marketing needs",
    ],
    approach: [
      {
        title: "Plan the shot list",
        body: "We agree the product angles, people, details and crops before the shoot, based on how the images and footage will be used.",
      },
      {
        title: "Control the light and set",
        body: "Lighting, background and reflections are managed for consistency. Products are shown clearly and accurately, and people are photographed in calm, natural light.",
      },
      {
        title: "Review on set, finish after",
        body: "Framing and exposure are checked during the shoot. The selected images and edits are then finished consistently for the agreed channels.",
      },
    ],
    deliverables: [
      "Indoor shoot plan and shot list",
      "Studio or controlled-location coordination",
      "Product photography",
      "Indoor brand and people video",
      "Consistent lighting and colour",
      "Edited selects and agreed exports",
    ],
    faqs: [
      {
        q: "Do you provide the studio?",
        a: "Studio or controlled-location access is confirmed per project and included in the agreed scope. If you already have a suitable space, we can plan around it.",
      },
      {
        q: "Can you shoot both products and people?",
        a: "Yes. Product, people and brand-story content can be planned into one shoot, provided the shot list and schedule support it.",
      },
    ],
    relatedWork: ["halcyon", "northwind"],
  },
  {
    slug: "outdoor-production",
    name: "Outdoor Production",
    shortName: "Outdoor Production",
    tagline: "Real settings, planned properly.",
    summary:
      "On-location video and photography for branding and marketing, planned around light, weather, access and permissions.",
    division: "production",
    icon: "Sun",
    image: "/assets/images/hero-visual.svg",
    imageAlt: "Abstract aperture artwork representing an outdoor camera lens",
    problem:
      "Outdoor shoots depend on things that cannot be fully controlled: light, weather, access and busy backgrounds. A loose plan turns those variables into expensive compromises.",
    problemPoints: [
      "Light and weather changing faster than the schedule",
      "Locations confirmed late or without the right permissions",
      "Subjects lost against cluttered or inconsistent backgrounds",
    ],
    approach: [
      {
        title: "Scout and plan",
        body: "We plan around the available light, the time of day, access and permissions, and agree a weather backup before the shoot.",
      },
      {
        title: "Shoot with the setting, not against it",
        body: "Natural light, movement and real settings are used deliberately. Subjects are kept distinct from busy backgrounds and coverage is planned for the edit.",
      },
      {
        title: "Finish for the placement",
        body: "Selected footage and images are graded and exported for the channels in scope, with captions and safe areas checked for each format.",
      },
    ],
    deliverables: [
      "Location and light plan",
      "Permissions checklist",
      "Outdoor video and photography",
      "Natural-light direction",
      "Edited selects and colour grade",
      "Platform-ready cutdowns",
    ],
    faqs: [
      {
        q: "What happens if the weather changes?",
        a: "We agree a backup plan before the shoot and flag risks early. If conditions make the agreed work impossible, we discuss the practical options rather than pretending the original plan is still viable.",
      },
      {
        q: "Do you handle location permissions?",
        a: "Permissions and access are confirmed before the shoot within the agreed scope. Any location fees or special requirements are agreed in writing.",
      },
    ],
    relatedWork: ["kite", "verdant", "fieldnote"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const serviceNames = services.map((s) => s.name);

export const serviceOptions = [
  ...serviceNames,
  "A few of the above",
  "Not sure yet",
];
