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
    tagline: "Show up consistently, with content that has a purpose.",
    summary:
      "Strategy, content calendars, posts, Reels and community management for Instagram, Facebook, LinkedIn and YouTube, so your brand stays active and recognisable.",
    division: "digital",
    icon: "MessagesSquare",
    image: "/assets/images/social-campaign.svg",
    imageAlt: "Abstract social media content cards in violet, ink and cloud tones",
    photo: "/assets/images/services/social-media.jpg",
    problem:
      "Most businesses know they should be on social media, but posting becomes a weekly scramble. Without a plan, content feels random, the brand looks different from post to post, and it is hard to tell what is actually working.",
    problemPoints: [
      "Posting in bursts, then going quiet for weeks",
      "No clear purpose behind each post",
      "Judging success by likes instead of enquiries and real interest",
    ],
    approach: [
      {
        title: "Understand your business and audience",
        body: "We start with your goals, your customers and what your competitors are doing, then choose the platforms that are worth your time.",
      },
      {
        title: "Plan a clear monthly calendar",
        body: "Every post has a purpose, a format and a caption written for the platform. A mix of helpful, creative and sales content keeps your feed interesting.",
      },
      {
        title: "Create, publish and review",
        body: "We design the posts, edit the Reels and publish on schedule. Each month we review what worked and improve the next plan.",
      },
    ],
    deliverables: [
      "Social media strategy and content pillars",
      "Monthly content calendar",
      "Post and carousel design",
      "Reels and short-form video editing",
      "Platform-specific captions and hashtags",
      "Monthly performance review",
    ],
    faqs: [
      {
        q: "Which platforms do you manage?",
        a: "Instagram, Facebook, LinkedIn and YouTube. We recommend the ones that suit your audience, rather than trying to be everywhere at once.",
      },
      {
        q: "Do you create the content as well?",
        a: "Yes. We plan, design, write and edit the content, and we can also shoot photos and videos when needed. You review everything before it goes live.",
      },
    ],
  },
  {
    slug: "performance-marketing",
    name: "Pay Per Click (PPC) Advertising",
    shortName: "Pay Per Click",
    tagline: "Pay for results you can measure, not guesswork.",
    summary:
      "Pay per click campaigns on Google, Facebook, Instagram and LinkedIn, set up around a clear goal with tracking that shows where every rupee goes.",
    division: "digital",
    icon: "TrendingUp",
    image: "/assets/images/work-orbit.svg",
    imageAlt: "Dark orbital artwork representing connected paid media channels",
    photo: "/assets/images/services/paid-advertising-billboard.jpg",
    problem:
      "Ads can bring in customers quickly, but they can also burn through a budget with little to show for it. Boosted posts, unclear goals and missing tracking make it hard to know whether the money is working.",
    problemPoints: [
      "Spending on ads without a clear goal",
      "No tracking, so nobody knows which ads bring enquiries",
      "Ads sending people to pages that do not convert",
    ],
    approach: [
      {
        title: "Set the goal and budget",
        body: "We agree what success looks like, such as enquiries, bookings or sales, and plan a budget that fits your business.",
      },
      {
        title: "Build focused campaigns",
        body: "We choose the right platform, audience and keywords, write the ad copy and create the visuals, so every ad has a clear job.",
      },
      {
        title: "Track, test and improve",
        body: "Conversion tracking is set up before launch. We test different ads, cut what is not working and put more behind what is.",
      },
    ],
    deliverables: [
      "Campaign strategy and budget plan",
      "Audience and keyword research",
      "Ad copy and creative",
      "Conversion tracking setup",
      "Ongoing optimisation and testing",
      "Monthly performance report",
    ],
    faqs: [
      {
        q: "Is the ad budget included in your fee?",
        a: "No. Your ad spend is paid directly to the platform. Our fee covers planning, setup, management and reporting, and both are agreed in writing.",
      },
      {
        q: "Do you guarantee results?",
        a: "No honest agency can guarantee leads or sales from ads. We commit to a careful setup, regular improvements and clear, honest reporting.",
      },
    ],
  },
  {
    slug: "branding",
    name: "Personal Branding",
    shortName: "Personal Branding",
    tagline: "Be known for what you do best.",
    summary:
      "Positioning, profiles, photography and content for founders, professionals and creators who want to be recognised and trusted in their field.",
    division: "digital",
    icon: "UserRound",
    image: "/assets/images/branding-system.svg",
    imageAlt: "Layered violet, ink and cloud wave bands representing a personal brand system",
    photo: "/assets/images/services/personal-branding-suit.jpg",
    problem:
      "People buy from people. Founders and professionals are often the best thing about their business, yet their online presence is quiet, inconsistent or says very little about what they actually do.",
    problemPoints: [
      "A profile that does not say clearly what you do or who you help",
      "Posting now and then, with no consistent voice or look",
      "Expertise that stays invisible outside your own network",
    ],
    approach: [
      {
        title: "Find what you want to be known for",
        body: "We look at your experience, your audience and others in your field, then agree a clear, honest positioning that feels like you.",
      },
      {
        title: "Shape your voice and look",
        body: "Profiles, bio, photography and a simple visual style that stay consistent across LinkedIn, Instagram and your website.",
      },
      {
        title: "Show up regularly",
        body: "A content plan built around your expertise. We help write, shoot and edit, so sharing your knowledge never starts from a blank page.",
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
        a: "Founders, consultants, doctors, coaches, creators and other professionals whose reputation helps bring in business.",
      },
      {
        q: "Do I have to be on camera?",
        a: "Not necessarily. We plan formats around what you are comfortable with, from written posts and photos to short videos.",
      },
    ],
  },
  {
    slug: "web-design",
    name: "Website Design & Development",
    shortName: "Website Development",
    tagline: "A website that explains your business and brings in enquiries.",
    summary:
      "Business websites and landing pages designed around a clear message, easy navigation and simple ways to get in touch, built to work well on every phone.",
    division: "digital",
    icon: "MonitorSmartphone",
    image: "/assets/images/web-experience.svg",
    imageAlt: "Browser window illustration showing a clean website layout",
    photo: "/assets/images/services/web-design.jpg",
    problem:
      "Your website is often the first serious look someone takes at your business. If it is slow, confusing or hard to use on a phone, visitors leave before they ever get in touch.",
    problemPoints: [
      "It takes too long to understand what the business offers",
      "No clear next step, so visitors leave without enquiring",
      "A site that looks dated or breaks on mobile",
    ],
    approach: [
      {
        title: "Plan the pages and the message",
        body: "We work out what your visitors need to know and the action you want them to take, then plan the pages and content around that.",
      },
      {
        title: "Design and build",
        body: "A clean, modern design in your brand style, built to load quickly and work smoothly on phones, tablets and desktops.",
      },
      {
        title: "Launch and hand over",
        body: "We test everything, connect your contact forms and WhatsApp, and show your team how to keep the site up to date.",
      },
    ],
    deliverables: [
      "Site structure and page plan",
      "Website design in your brand style",
      "Mobile-friendly development",
      "Contact forms and WhatsApp integration",
      "Speed and quality testing",
      "Launch support and handover",
    ],
    faqs: [
      {
        q: "What platforms do you build on?",
        a: "We choose what fits the job, such as WordPress, Shopify or a custom build. We explain the options before you decide.",
      },
      {
        q: "Can you update our existing website?",
        a: "Yes. We can redesign an existing site or improve specific pages. Ongoing support can be agreed as a separate scope.",
      },
    ],
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    shortName: "Google Ads",
    tagline: "Be found by people who are already looking for you.",
    summary:
      "Search, Performance Max and YouTube campaigns that put your business in front of people actively searching for what you offer.",
    division: "digital",
    icon: "Search",
    image: "/assets/images/search-ads.svg",
    imageAlt: "Analytics dashboard artwork representing search advertising",
    photo: "/assets/images/services/google-ads.jpg",
    problem:
      "Google Ads works best when someone already has a need. But broad keywords, weak ads and missing tracking can spend your budget on clicks that never turn into customers.",
    problemPoints: [
      "Budget spent on irrelevant searches",
      "Ads that look like every competitor",
      "No way of knowing which clicks became enquiries",
    ],
    approach: [
      {
        title: "Find the right searches",
        body: "We research the searches your customers actually use and exclude the ones that waste money.",
      },
      {
        title: "Write ads that answer the search",
        body: "Clear ad copy and extensions that match what people are looking for, sending them to a page with an easy next step.",
      },
      {
        title: "Track and improve",
        body: "Conversion tracking from day one. We review search terms, bids and budgets regularly and report in plain language.",
      },
    ],
    deliverables: [
      "Account setup or audit",
      "Keyword research and planning",
      "Search, Performance Max and YouTube campaigns",
      "Ad copy and extensions",
      "Conversion tracking setup",
      "Monthly performance report",
    ],
    faqs: [
      {
        q: "How much should we spend on Google Ads?",
        a: "It depends on your goals, your industry and how competitive your searches are. We recommend a starting budget after understanding your business.",
      },
      {
        q: "Do you guarantee results?",
        a: "No. We do not guarantee leads or sales. We commit to a careful setup, regular improvements and honest reporting.",
      },
    ],
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    shortName: "Meta Ads",
    tagline: "Get noticed on Facebook and Instagram.",
    summary:
      "Facebook and Instagram campaigns with scroll-stopping creative, the right audiences and a clear next step that turns attention into enquiries.",
    division: "digital",
    icon: "Megaphone",
    image: "/assets/images/content-system.svg",
    imageAlt: "Abstract content cards representing social advertising",
    photo: "/assets/images/services/meta-ads.jpg",
    problem:
      "On Facebook and Instagram, people are scrolling, not searching. Your ad has a second to earn attention. Boosted posts and the same tired creative running for months rarely reach the right people.",
    problemPoints: [
      "Boosting posts instead of running proper campaigns",
      "Creative that gets ignored after a few days",
      "No pixel or tracking to learn from",
    ],
    approach: [
      {
        title: "Know the audience and the offer",
        body: "We agree who the campaign is for, what it offers and what action counts as success before a single ad is made.",
      },
      {
        title: "Create ads worth watching",
        body: "Reels, stories, carousels and static ads made in-house, with a few different angles to test.",
      },
      {
        title: "Test, learn and scale",
        body: "We read the results, refresh creative before it gets stale and put more budget behind what works.",
      },
    ],
    deliverables: [
      "Audience and offer planning",
      "Campaign setup and structure",
      "Ad creative: Reels, stories, carousels and statics",
      "Meta Pixel and tracking setup",
      "Creative testing and refresh",
      "Monthly performance report",
    ],
    faqs: [
      {
        q: "Do you create the ads as well as run them?",
        a: "Yes. Strategy, design, video and campaign management are all done under one roof, so the ads and the targeting are planned together.",
      },
      {
        q: "Do you guarantee results?",
        a: "No. We do not guarantee leads or sales. We commit to strong creative, a careful setup and honest reporting.",
      },
    ],
  },
  {
    slug: "video-production",
    name: "Video Production & Editing",
    shortName: "Video Production & Editing",
    tagline: "From the first idea to the final cut.",
    summary:
      "Brand films, Reels, corporate and product videos, podcasts and more, planned, shot and edited for the platforms they will be seen on.",
    division: "production",
    icon: "Video",
    image: "/assets/images/video-frame.svg",
    imageAlt: "Cinematic frame artwork with a violet orbital motif",
    photo: "/assets/images/services/video-production-camera.jpg",
    problem:
      "A great-looking video can still go unwatched if it was not planned for where it will be seen. Long videos with slow openings, no captions and the wrong format end up sitting unused.",
    problemPoints: [
      "No clear idea or purpose before the shoot",
      "One long video instead of cuts for each platform",
      "Slow openings that lose viewers in the first few seconds",
    ],
    approach: [
      {
        title: "Plan the story",
        body: "We start with your goal and audience, then write the concept, script and shot list, so the shoot day runs smoothly.",
      },
      {
        title: "Shoot indoors or outdoors",
        body: "We handle the shoot with the right crew and equipment, capturing vertical and horizontal footage so one shoot gives you plenty to use.",
      },
      {
        title: "Edit for every platform",
        body: "Editing, colour, sound, motion graphics and captions, with versions sized for Instagram, YouTube, your website and ads.",
      },
    ],
    deliverables: [
      "Social media Reels and Shorts",
      "Branding shoots and films",
      "Corporate and training videos",
      "Promotional and advertising videos",
      "Testimonial and educational videos",
      "Podcast shoots and editing",
      "Product photography and videos",
      "Animation films",
      "AI-assisted video production",
    ],
    faqs: [
      {
        q: "Can you edit footage we already have?",
        a: "Yes. We can turn your existing footage into Reels, ads or a brand film, and suggest any extra shots that would help.",
      },
      {
        q: "Do you shoot on location?",
        a: "Yes. We shoot indoors and outdoors, in a studio or at your location. Locations and shoot days are agreed before work begins.",
      },
    ],
  },
  {
    slug: "marketing-research",
    name: "Marketing Research and Analytics",
    shortName: "Marketing Research and Analytics",
    tagline: "Make decisions based on facts, not guesses.",
    summary:
      "Audience, competitor and market research, plus analytics and simple reports that show what is working and what to do next.",
    division: "digital",
    icon: "ChartColumn",
    image: "/assets/images/insight-measurement.svg",
    imageAlt: "Measurement artwork representing marketing analytics",
    photo: "/assets/images/services/marketing-research.jpg",
    problem:
      "Many marketing decisions are made on gut feeling, and many reports are full of numbers nobody acts on. Without research before and clear measurement after, it is hard to know where to spend next.",
    problemPoints: [
      "Little understanding of customers or competitors",
      "Analytics installed but not tracking what matters",
      "Reports full of numbers with no clear recommendation",
    ],
    approach: [
      {
        title: "Research your market",
        body: "We study your audience, competitors and industry to find opportunities and gaps you can use.",
      },
      {
        title: "Track what matters",
        body: "We set up analytics and conversion tracking around the actions that matter to your business, not vanity numbers.",
      },
      {
        title: "Turn numbers into next steps",
        body: "Short, plain reports that end with clear recommendations on what to keep, change or stop.",
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
        q: "Can you review our current analytics?",
        a: "Yes. We check what is being tracked today, fix the gaps and set up reporting your team can actually use.",
      },
      {
        q: "What do you need from us to get started?",
        a: "Usually access to your analytics and ad accounts, plus a short conversation about your goals. Access can be removed at any time.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const serviceNames = services.map((s) => s.name);

export const serviceOptions = [
  ...serviceNames,
  "A few of the above",
  "Not sure yet",
];
