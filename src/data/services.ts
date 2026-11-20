export type IconName =
  | "MessagesSquare"
  | "TrendingUp"
  | "UserRound"
  | "MonitorSmartphone"
  | "Search"
  | "Megaphone"
  | "Video"
  | "ChartColumn";

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
  /** Photograph behind the homepage card. */
  photo: string;
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
      "Strategy, social media, advertising, personal branding, websites and research, planned as one system.",
    serviceSlugs: [
      "social-media",
      "performance-marketing",
      "branding",
      "web-design",
      "google-ads",
      "meta-ads",
      "marketing-research",
    ],
  },
  {
    id: "production",
    name: "Video Production & Photography",
    shortName: "Production",
    summary:
      "Video shoots and editing, from planning to the final cut.",
    serviceSlugs: ["video-production"],
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
    photo: "/assets/images/services/social-media.jpg",
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
    photo: "/assets/images/services/paid-advertising-billboard.jpg",
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
    name: "Personal Branding",
    shortName: "Personal Branding",
    tagline: "Be known for what you do best.",
    summary:
      "Positioning, content and a consistent look for founders, professionals and creators who want to be recognised in their field.",
    division: "digital",
    icon: "UserRound",
    image: "/assets/images/branding-system.svg",
    imageAlt:
      "Layered violet, ink and cloud wave bands representing a personal brand system",
    photo: "/assets/images/services/personal-branding.jpg",
    problem:
      "People buy from people. Founders and professionals are often the best thing about their business, yet their online presence is quiet, inconsistent or says nothing about what they actually stand for.",
    problemPoints: [
      "A profile that does not say clearly what you do or who you help",
      "Posting in bursts, with no consistent voice or look",
      "Expertise that stays invisible outside your own network",
    ],
    approach: [
      {
        title: "Find what you want to be known for",
        body: "We look at your experience, your audience and the people already visible in your field, then agree a clear, honest positioning.",
      },
      {
        title: "Shape the voice and the look",
        body: "Profiles, bio, photography and a simple visual style that feel like you, and stay consistent across LinkedIn, Instagram and your website.",
      },
      {
        title: "Show up consistently",
        body: "A content plan built around your expertise, with formats you can sustain. We help write, shoot and edit so posting never starts from a blank page.",
      },
    ],
    deliverables: [
      "Personal positioning and story",
      "Profile and bio optimisation",
      "Personal brand photoshoot",
      "Visual style and templates",
      "Content plan and post writing",
      "Monthly review and refinement",
    ],
    faqs: [
      {
        q: "Who is personal branding for?",
        a: "Founders, doctors, consultants, coaches, creators and other professionals whose reputation drives their business.",
      },
      {
        q: "Do I have to be on camera?",
        a: "Not necessarily. We plan formats around what you are comfortable with, from written posts to photos to short videos.",
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
    photo: "/assets/images/services/web-design.jpg",
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
    slug: "google-ads",
    name: "Google Ads",
    shortName: "Google Ads",
    tagline: "Show up when they are searching.",
    summary:
      "Search, Performance Max and YouTube campaigns built around the terms your customers actually use, with tracking set up properly.",
    division: "digital",
    icon: "Search",
    image: "/assets/images/seo-analytics.svg",
    imageAlt: "Analytics dashboard artwork representing search advertising",
    photo: "/assets/images/services/google-ads.jpg",
    problem:
      "Google Ads rewards intent, but it punishes vague setups. Broad keywords, missing negatives and untracked conversions quietly spend the budget on clicks that were never going to become customers.",
    problemPoints: [
      "Budget spent on irrelevant searches and broad match terms",
      "Conversions not tracked, so nobody knows what is working",
      "Ads sending traffic to pages that do not answer the search",
    ],
    approach: [
      {
        title: "Start with search intent",
        body: "We map the searches that signal a real need, group them into tight campaigns and exclude the terms that waste money.",
      },
      {
        title: "Connect the ad to the page",
        body: "Each campaign points to a page that answers the search clearly. Ad copy, extensions and landing page are written as one message.",
      },
      {
        title: "Measure, then optimise",
        body: "Conversion tracking is set up before launch. We review search terms, bids and budgets regularly and report in plain language.",
      },
    ],
    deliverables: [
      "Account audit or new account setup",
      "Keyword and negative keyword research",
      "Search, Performance Max and YouTube campaigns",
      "Ad copy and extensions",
      "Conversion tracking setup",
      "Monthly performance report",
    ],
    faqs: [
      {
        q: "Is the ad budget included in your fee?",
        a: "No. Ad spend is paid directly to Google from your account. Our fee covers planning, setup, management and reporting, and both are agreed in writing.",
      },
      {
        q: "Do you guarantee results?",
        a: "No. We do not guarantee leads, sales or return on ad spend. We commit to a careful setup, clear reporting and honest recommendations.",
      },
    ],
    relatedWork: ["orbit", "kite"],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    shortName: "Meta Ads",
    tagline: "Creative that stops the scroll.",
    summary:
      "Facebook and Instagram campaigns with thumb-stopping creative, clear audiences and a funnel that turns attention into enquiries.",
    division: "digital",
    icon: "Megaphone",
    image: "/assets/images/content-system.svg",
    imageAlt: "Abstract content cards representing social advertising",
    photo: "/assets/images/services/meta-ads.jpg",
    problem:
      "On Meta, the creative is the targeting. Boosted posts and one tired ad running for months rarely reach the right people, and without a clear next step the attention never becomes a conversation.",
    problemPoints: [
      "Boosted posts instead of structured campaigns",
      "Creative that fatigues within days, with nothing new to test",
      "No pixel or conversion setup to learn from",
    ],
    approach: [
      {
        title: "Define the audience and offer",
        body: "We agree who the campaign is for, what it offers and what action counts as success before a single ad is made.",
      },
      {
        title: "Make creative worth watching",
        body: "Reels, stories, carousels and statics produced in-house, with several angles to test so the campaign keeps learning.",
      },
      {
        title: "Test, learn and scale",
        body: "We read the results, retire what is not working, refresh creative before it fatigues and scale what earns its budget.",
      },
    ],
    deliverables: [
      "Audience and offer planning",
      "Campaign and funnel structure",
      "Ad creative: Reels, stories, carousels and statics",
      "Pixel and Conversions API setup",
      "Creative testing and refresh",
      "Monthly performance report",
    ],
    faqs: [
      {
        q: "Do you make the ads as well as run them?",
        a: "Yes. Strategy, creative production and campaign management sit under one roof, so the ads and the targeting are planned together.",
      },
      {
        q: "Do you guarantee results?",
        a: "No. We do not guarantee leads, sales or return on ad spend. We commit to considered creative, a careful setup and honest reporting.",
      },
    ],
    relatedWork: ["halcyon", "orbit"],
  },
  {
    slug: "video-production",
    name: "Video Production & Editing",
    shortName: "Video Production & Editing",
    tagline: "From the shoot to the final cut.",
    summary:
      "Brand films, Reels, ads and product videos, planned, shot and edited for the platforms they will run on.",
    division: "production",
    icon: "Video",
    image: "/assets/images/video-frame.svg",
    imageAlt: "Cinematic frame artwork with a violet orbital motif",
    photo: "/assets/images/services/video-production.jpg",
    problem:
      "A beautiful film can still be useless if it was never planned for the channels it needs to run on. Footage shot without a plan, or edited without the platform in mind, ends up unused.",
    problemPoints: [
      "No clear idea or intended use before the shoot",
      "One long film instead of cuts for each placement",
      "Editing that ignores captions, safe areas and the first three seconds",
    ],
    approach: [
      {
        title: "Plan from the brief",
        body: "We start with the objective, the audience and where the video will appear. The idea, script and shot list follow from that.",
      },
      {
        title: "Shoot for every format",
        body: "Coverage is planned for vertical, square and landscape, so one shoot produces a library of useful assets, not a single film.",
      },
      {
        title: "Edit for the channel",
        body: "Editing, colour, sound, motion graphics and captions are finished for each platform, with files exported and named for their use.",
      },
    ],
    deliverables: [
      "Concept, script and storyboard",
      "Shoot planning and on-set direction",
      "Brand films, Reels and ad videos",
      "Editing, colour grading and sound",
      "Motion graphics and captions",
      "Platform-ready cutdowns",
    ],
    faqs: [
      {
        q: "Can you edit footage we already have?",
        a: "Yes. We can take existing footage and edit it into Reels, ads or a brand film, and advise on what extra coverage would help.",
      },
      {
        q: "Does every project include a shoot?",
        a: "No. Some projects are editing only, some need a full shoot and edit. The scope, deliverables and shoot days are agreed in writing.",
      },
    ],
    relatedWork: ["halcyon", "northwind", "fieldnote"],
  },
  {
    slug: "marketing-research",
    name: "Marketing Research and Analytics",
    shortName: "Marketing Research and Analytics",
    tagline: "Decisions backed by data.",
    summary:
      "Audience, competitor and market research, plus analytics and reporting that show what is working and what to do next.",
    division: "digital",
    icon: "ChartColumn",
    image: "/assets/images/insight-measurement.svg",
    imageAlt: "Measurement artwork representing marketing analytics",
    photo: "/assets/images/services/marketing-research.jpg",
    problem:
      "Most marketing decisions are made on instinct, and most reports are a wall of numbers nobody acts on. Without research up front and clear measurement after, it is hard to know where to spend the next rupee.",
    problemPoints: [
      "Little understanding of the audience or competitors",
      "Analytics installed but not configured to track what matters",
      "Reports full of metrics with no clear recommendation",
    ],
    approach: [
      {
        title: "Research the market",
        body: "We look at your audience, competitors and the language your customers use, so strategy starts from evidence rather than guesswork.",
      },
      {
        title: "Measure what matters",
        body: "We set up analytics and conversion tracking around the actions that matter to the business, not vanity metrics.",
      },
      {
        title: "Turn numbers into next steps",
        body: "Reports are short and plain, and each one ends with clear recommendations for what to keep, change or stop.",
      },
    ],
    deliverables: [
      "Audience and customer research",
      "Competitor and market analysis",
      "Google Analytics 4 and tracking setup",
      "Reporting dashboard",
      "Campaign performance analysis",
      "Monthly insights and recommendations",
    ],
    faqs: [
      {
        q: "Can you audit our existing analytics?",
        a: "Yes. We can review what is being tracked today, fix the gaps and set up reporting that the team can actually use.",
      },
      {
        q: "Do you need access to our accounts?",
        a: "Usually read or analyst access to your analytics and ad accounts. Access is agreed up front and can be removed at any time.",
      },
    ],
    relatedWork: ["kite", "verdant"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const serviceNames = services.map((s) => s.name);

export const serviceOptions = [
  ...serviceNames,
  "A few of the above",
  "Not sure yet",
];
