export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Social Media" | "Advertising" | "Branding" | "Video" | "Websites" | "Analytics";
  date: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  author: string;
  featured?: boolean;
  content: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "social-media-plan-that-lasts",
    title: "A social media plan you can actually keep up with",
    excerpt:
      "Posting every day is not a strategy. A few clear content pillars and a realistic calendar will do more for your brand than chasing every trend.",
    category: "Social Media",
    date: "2026-10-28",
    readingTime: "5 min read",
    image: "/assets/images/insight-strategy.svg",
    imageAlt: "Geometric grid artwork in cloud, ink, violet and soft violet",
    author: "SOSIAL",
    featured: true,
    content: [
      {
        type: "p",
        text: "Most businesses do not struggle with ideas. They struggle with consistency. A burst of posts in the first week, then silence for a month, then another burst. The audience notices, and so do the platforms.",
      },
      {
        type: "p",
        text: "A good social media plan is not about posting more. It is about knowing why each post exists and making sure you can keep going.",
      },
      { type: "h2", text: "Start with the goal, not the platform" },
      {
        type: "p",
        text: "Before choosing Instagram, LinkedIn or YouTube, decide what you want social media to do for the business. Build awareness? Earn trust? Bring in enquiries? The answer changes what you post and where you post it.",
      },
      { type: "h2", text: "Pick four or five content pillars" },
      {
        type: "p",
        text: "Content pillars are the few themes your brand talks about again and again. They keep your feed focused and make planning much easier. For most businesses, a mix like this works well:",
      },
      {
        type: "ul",
        items: [
          "Helpful tips your customers can use straight away",
          "What you offer and how it works",
          "Behind the scenes: your people, process and work",
          "Proof of quality: finished work and project highlights",
          "A clear next step for people who are ready to talk",
        ],
      },
      { type: "h2", text: "Not every post should sell" },
      {
        type: "p",
        text: "If every post is an offer, people stop paying attention. Balance useful, interesting and conversion-focused content. The selling posts work better when the rest of your feed has already built trust.",
      },
      { type: "h2", text: "Plan a month, review every month" },
      {
        type: "p",
        text: "A simple monthly calendar with the date, platform, pillar, format and caption is enough. At the end of the month, look at what was saved, shared and acted on, then adjust the next one. Small, steady improvements beat starting over.",
      },
    ],
  },
  {
    slug: "google-ads-or-meta-ads",
    title: "Google Ads or Meta Ads: which one fits your goal?",
    excerpt:
      "Both can bring in customers, but they work in very different ways. Here is a simple way to decide where your first ad budget should go.",
    category: "Advertising",
    date: "2026-10-14",
    readingTime: "5 min read",
    image: "/assets/images/insight-measurement.svg",
    imageAlt: "Abstract measurement artwork in violet and ink",
    author: "SOSIAL",
    content: [
      {
        type: "p",
        text: "One of the most common questions we hear is whether a business should advertise on Google or on Facebook and Instagram. The honest answer is that it depends on how your customers look for you.",
      },
      { type: "h2", text: "Google Ads: reach people who are already searching" },
      {
        type: "p",
        text: "Google Ads shows your business to people who are actively looking for what you offer. Someone searching for a service near them already has a need. Your job is to show up with a clear answer and an easy next step.",
      },
      {
        type: "p",
        text: "It usually works well for services people search for when they need them, and for businesses with a clear, specific offer.",
      },
      { type: "h2", text: "Meta Ads: get noticed by people who are not searching yet" },
      {
        type: "p",
        text: "Meta Ads runs on Facebook and Instagram. People are scrolling, not searching, so your ad has to earn attention first. Strong creative matters more here, and you can reach people based on their interests and behaviour.",
      },
      {
        type: "p",
        text: "It usually works well for building awareness, launching something new, and products or services people do not know they want yet.",
      },
      { type: "h2", text: "A simple way to decide" },
      {
        type: "ul",
        items: [
          "If people already search for what you sell, start with Google Ads",
          "If you need to create interest or show your product, start with Meta Ads",
          "If you have the budget for both, they often work best together",
        ],
      },
      { type: "h2", text: "Whatever you choose, track the right thing" },
      {
        type: "p",
        text: "Clicks and likes are easy to count, but they are not the goal. Set up tracking before you spend, and judge your ads on enquiries, cost per lead and the customers they actually bring in.",
      },
    ],
  },
  {
    slug: "personal-branding-for-founders",
    title: "Personal branding for founders: where to start",
    excerpt:
      "People buy from people. If you are the face of your business, a clear personal brand can open doors your company page cannot.",
    category: "Branding",
    date: "2026-09-30",
    readingTime: "4 min read",
    image: "/assets/images/insight-brand.svg",
    imageAlt: "Layered brand artwork in violet and cloud",
    author: "SOSIAL",
    content: [
      {
        type: "p",
        text: "Founders, doctors, consultants and coaches are often the best thing about their business. Yet their online presence is quiet, out of date or says very little about what they actually do.",
      },
      { type: "h2", text: "Decide what you want to be known for" },
      {
        type: "p",
        text: "Pick one or two topics you know well and genuinely care about. Trying to talk about everything makes you forgettable. Being clear about your area of expertise makes you easy to recommend.",
      },
      { type: "h2", text: "Fix the basics first" },
      {
        type: "ul",
        items: [
          "A clear profile photo and a bio that says what you do and who you help",
          "The same name, look and message across LinkedIn, Instagram and your website",
          "A few good posts pinned so new visitors understand you quickly",
        ],
      },
      { type: "h2", text: "Share what you know" },
      {
        type: "p",
        text: "You do not need to be loud. Share lessons from your work, answer the questions your clients ask, and show the thinking behind your decisions. Useful beats polished.",
      },
      { type: "h2", text: "Show up regularly" },
      {
        type: "p",
        text: "One thoughtful post a week, every week, builds more trust than ten posts in one month. Choose formats you can keep up with, whether that is writing, photos or short videos.",
      },
    ],
  },
  {
    slug: "reels-that-hold-attention",
    title: "Reels that hold attention: get the first three seconds right",
    excerpt:
      "On short-form video, people decide almost instantly whether to keep watching. Here is how to plan Reels and Shorts that earn the next few seconds.",
    category: "Video",
    date: "2026-09-16",
    readingTime: "4 min read",
    image: "/assets/images/insight-video.svg",
    imageAlt: "Abstract video frame artwork in violet and ink",
    author: "SOSIAL",
    content: [
      {
        type: "p",
        text: "Short-form video is one of the best ways to get a brand noticed. It is also the easiest place to be ignored. The difference is usually decided in the first few seconds.",
      },
      { type: "h2", text: "Lead with the hook" },
      {
        type: "p",
        text: "Open with the most interesting part: a question, a bold visual, a surprising result or a problem your audience recognises. Save the logo and the introduction for later, or leave them out.",
      },
      { type: "h2", text: "Plan the shot before you press record" },
      {
        type: "ul",
        items: [
          "Know the one message the video needs to get across",
          "Write a simple scene list: what we see, what we hear, what text appears",
          "Shoot vertical first, with space for captions",
          "Keep the pace moving: cut anything that does not add to the story",
        ],
      },
      { type: "h2", text: "Design for sound off" },
      {
        type: "p",
        text: "Many people watch without sound. Clear captions and on-screen text make sure your message still lands, and they help viewers follow along even with the sound on.",
      },
      { type: "h2", text: "End with one clear action" },
      {
        type: "p",
        text: "Tell people what to do next: follow, visit the website, send a message. One clear action works better than three competing ones.",
      },
    ],
  },
  {
    slug: "website-that-brings-enquiries",
    title: "What your business website needs before it looks good",
    excerpt:
      "A beautiful website that does not bring in enquiries is just an expensive brochure. Get these basics right first, then make it look great.",
    category: "Websites",
    date: "2026-09-02",
    readingTime: "5 min read",
    image: "/assets/images/insight-creative.svg",
    imageAlt: "Creative layout artwork in cloud and violet",
    author: "SOSIAL",
    content: [
      {
        type: "p",
        text: "Your website is often the first serious look someone takes at your business. It needs to answer their questions quickly and make it easy to get in touch. Design matters, but it should support those jobs, not replace them.",
      },
      { type: "h2", text: "Say what you do in one sentence" },
      {
        type: "p",
        text: "Within a few seconds of landing, a visitor should know what you offer, who it is for and why they should care. If they have to scroll to find out, many will leave first.",
      },
      { type: "h2", text: "Make the next step obvious" },
      {
        type: "ul",
        items: [
          "One main action per page, such as a call, a WhatsApp message or an enquiry form",
          "Contact details that are easy to find on every page",
          "Short forms that only ask for what you really need",
        ],
      },
      { type: "h2", text: "Build it for phones first" },
      {
        type: "p",
        text: "Most visitors will see your site on a phone. Text should be easy to read, buttons easy to tap and pages quick to load, even on a slow connection.",
      },
      { type: "h2", text: "Show real proof" },
      {
        type: "p",
        text: "Real photos of your work, your team and your space build far more trust than stock images. Approved client feedback and finished projects do the same.",
      },
    ],
  },
  {
    slug: "marketing-numbers-that-matter",
    title: "Measuring marketing: the numbers that actually matter",
    excerpt:
      "Likes and followers feel good, but they do not pay the bills. Here is how to tell whether your marketing is really working.",
    category: "Analytics",
    date: "2026-08-19",
    readingTime: "5 min read",
    image: "/assets/images/insight-measurement.svg",
    imageAlt: "Abstract measurement artwork in violet and ink",
    author: "SOSIAL",
    content: [
      {
        type: "p",
        text: "It is easy to judge marketing by the numbers that are easiest to see. A post with lots of likes feels like a win. But likes, views and followers only tell part of the story.",
      },
      { type: "h2", text: "Know which stage you are measuring" },
      {
        type: "p",
        text: "Marketing moves people through stages: noticing you, engaging with you, considering you, contacting you and finally buying. Each stage needs its own measure.",
      },
      {
        type: "ul",
        items: [
          "Awareness: reach, impressions and video watch time",
          "Interest: engagement rate, profile visits and website traffic",
          "Action: click-through rate, enquiries and conversion rate",
          "Value: cost per lead, customer acquisition cost and revenue",
        ],
      },
      { type: "h2", text: "Pick a few numbers and watch them closely" },
      {
        type: "p",
        text: "You do not need a dashboard with fifty charts. Choose the few numbers that match your goal, track them every month, and look at how they change over time rather than day to day.",
      },
      { type: "h2", text: "Turn numbers into decisions" },
      {
        type: "p",
        text: "A good report ends with clear next steps: what to keep doing, what to change and what to stop. If a number does not change any decision, it probably does not need to be in the report.",
      },
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

export const featuredArticles = articles.filter((a) => a.featured);

export const articleCategories = [
  "All",
  ...Array.from(new Set(articles.map((a) => a.category))),
] as string[];

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
