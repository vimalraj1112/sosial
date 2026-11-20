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
  category: "Strategy" | "SEO" | "Performance" | "Branding" | "Video" | "Analytics";
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
    slug: "attention-audit",
    title: "The attention audit: what to fix before you spend more on media",
    excerpt:
      "If acquisition is getting more expensive, the answer is not always a bigger budget. Start by auditing where attention is actually being lost.",
    category: "Strategy",
    date: "2026-09-18",
    readingTime: "6 min read",
    image: "/assets/images/insight-strategy.svg",
    imageAlt: "Geometric grid artwork in cloud, ink, violet and soft violet",
    author: "SOSIAL Studio",
    featured: true,
    content: [
      {
        type: "p",
        text: "When performance dips, the fastest response is usually to increase spend or add a channel. Both can work, but both treat a symptom. Attention is lost in specific places, and those places are usually cheaper to fix than the cost of buying more of it.",
      },
      {
        type: "p",
        text: "An attention audit is a structured look at the journey between discovering a brand and acting on it. It is not a creative review and it is not a media audit. It asks a simpler question: at which point do people stop caring, and why?",
      },
      { type: "h2", text: "Start with the first three seconds" },
      {
        type: "p",
        text: "Most paid attention is decided before your message is fully delivered. A viewer needs a reason to stay, and that reason has to be visible immediately: a specific problem, a surprising image, a clear claim. If the opening frame could belong to any competitor, it is doing no work.",
      },
      {
        type: "p",
        text: "Review your best-performing and worst-performing creative side by side. Forget the production budget and look at the first frame, the first line and the first promise. The pattern is usually obvious once the noise is removed.",
      },
      { type: "h2", text: "Then the landing experience" },
      {
        type: "p",
        text: "A strong ad buys you a few seconds of goodwill. A mismatched landing page spends it immediately. The most common failures are not aesthetic: they are continuity failures. The page repeats the category rather than the promise, or hides the next step below three screens of brand storytelling.",
      },
      {
        type: "ul",
        items: [
          "Does the page headline echo the promise that earned the click?",
          "Is the primary action visible without scrolling on a phone?",
          "Is the offer specific enough to evaluate, or deliberately vague?",
          "Does the page load fast enough to keep someone who is only half-interested?",
        ],
      },
      { type: "h2", text: "Check the offer, not just the funnel" },
      {
        type: "p",
        text: "Sometimes the cheapest fix is the least popular one: the offer is not compelling. No amount of optimisation will make a weak incentive strong. Ask what a customer gives up to say yes, and whether the value is obvious to someone who has never heard of you.",
      },
      {
        type: "quote",
        text: "Attention is not a budget line. It is the sum of every small decision between curiosity and action.",
      },
      { type: "h2", text: "Measure the cost of confusion" },
      {
        type: "p",
        text: "Look for signals we tend to ignore: high time on page with low conversion, repeated visits that never progress, common questions in sales calls that the site should answer. These are places where attention exists but is being wasted, and they are usually more profitable to fix than a new channel.",
      },
      { type: "h2", text: "A simple starting point" },
      {
        type: "p",
        text: "Pick your three highest-traffic entry points. For each one, write down the promise that brought the visitor there, the next action you want, and the single biggest obstacle. Fix the obstacle before increasing spend. It is unglamorous, measurable and usually compounds.",
      },
    ],
  },
  {
    slug: "seo-is-a-product-problem",
    title: "SEO is a product problem, not a content problem",
    excerpt:
      "Publishing more articles will not fix a site that is hard to crawl, slow to load and structured around internal departments instead of customer questions.",
    category: "SEO",
    date: "2026-08-27",
    readingTime: "5 min read",
    image: "/assets/images/insight-seo.svg",
    imageAlt: "Abstract analytics dashboard illustration on a dark background",
    author: "SOSIAL Studio",
    content: [
      {
        type: "p",
        text: "Organic growth gets framed as a content discipline: publish consistently, target keywords, build links. That framing hides the fact that most search problems are product problems. The site architecture, page speed, template quality and internal linking decide whether good content can perform at all.",
      },
      { type: "h2", text: "Architecture is the strategy" },
      {
        type: "p",
        text: "If a page cannot be reached in a few clicks from a relevant page, it is competing with a handicap. Internal links are not a technical detail; they are how you tell a search engine which pages matter and how topics relate. A clean topic structure will outperform a long list of disconnected posts every time.",
      },
      { type: "h2", text: "Speed is a content decision" },
      {
        type: "p",
        text: "Heavy templates, unoptimised images and third-party scripts are often introduced by marketing rather than engineering. Every new embed and tag is a tax on the reading experience. Agree a performance budget early and treat it like a brand guideline.",
      },
      { type: "h2", text: "Write for one page, not one keyword" },
      {
        type: "p",
        text: "Search engines increasingly reward pages that fully answer an intent. That means fewer, better pages that cover a topic properly, with clear sections, useful examples and a reason to trust the author. Ten thin posts targeting variants of the same phrase are usually one good page waiting to be written.",
      },
      {
        type: "ul",
        items: [
          "One page, one clear job in the customer journey",
          "Headings that follow the questions people actually ask",
          "Specific examples and evidence instead of generic advice",
          "A visible next step for the reader who is ready",
        ],
      },
      { type: "h2", text: "Make maintenance part of the plan" },
      {
        type: "p",
        text: "Content decays. Products change, links break, competitors publish better answers. A quarterly review of your highest-value pages is often more valuable than another new article. Update, consolidate or retire. Treat the library as a product with a roadmap.",
      },
    ],
  },
  {
    slug: "creative-testing-system",
    title: "Creative testing is a system, not a lucky ad",
    excerpt:
      "Most creative testing produces noise because it changes too many variables at once. A simple structure turns it into something you can learn from.",
    category: "Performance",
    date: "2026-08-04",
    readingTime: "6 min read",
    image: "/assets/images/insight-creative.svg",
    imageAlt: "Violet, ink and soft-violet wave bands on a cloud background",
    author: "SOSIAL Studio",
    content: [
      {
        type: "p",
        text: "Paid social rewards volume of ideas, but volume without structure produces expensive randomness. The teams that improve consistently are not the ones with the most variants. They are the ones who know what they are testing and why.",
      },
      { type: "h2", text: "Test one argument at a time" },
      {
        type: "p",
        text: "A common mistake is to change the hook, the format, the music and the call to action in one new ad, then declare the winner. If it performs, you do not know which decision mattered. Build tests around a single variable, starting with the argument rather than the execution.",
      },
      {
        type: "ul",
        items: [
          "Which problem does the audience feel most urgently?",
          "Which proof point is most believable?",
          "Which objection needs to be removed first?",
          "Which moment of the product is most persuasive?",
        ],
      },
      { type: "h2", text: "Separate concepts from production" },
      {
        type: "p",
        text: "A concept can be tested cheaply. Once an angle wins, invest in production quality. Doing it the other way around means paying for polish on ideas the market never wanted.",
      },
      { type: "h2", text: "Give a test time to mean something" },
      {
        type: "p",
        text: "Platform dashboards encourage premature conclusions. Decide the sample size and the metric before launch, then wait for enough data to answer the question. Stopping as soon as a variant leads on one day is how teams end up scaling noise.",
      },
      {
        type: "quote",
        text: "The goal is not to find a winning ad. It is to build a repeatable understanding of what your market responds to.",
      },
      { type: "h2", text: "Write down what you learned" },
      {
        type: "p",
        text: "Keep a simple log: hypothesis, variant, result, decision, next test. It becomes the most valuable document in the account, and it survives staff changes. Six months of disciplined notes will outperform any dashboard.",
      },
    ],
  },
  {
    slug: "one-clear-idea",
    title: "Your brand does not need more touchpoints. It needs one clear idea.",
    excerpt:
      "Consistency is not repetition for its own sake. It is the discipline of expressing the same sharp idea across every surface.",
    category: "Branding",
    date: "2026-07-15",
    readingTime: "4 min read",
    image: "/assets/images/insight-brand.svg",
    imageAlt: "Dark editorial artwork with a large circle and a violet accent",
    author: "SOSIAL Studio",
    content: [
      {
        type: "p",
        text: "Brand guidelines often spend pages on logo clear space and almost none on what the brand actually means. The result is a consistent-looking company with an inconsistent argument. People recognise the colours but cannot repeat the promise.",
      },
      { type: "h2", text: "A useful idea is repeatable" },
      {
        type: "p",
        text: "The test of a positioning idea is whether an employee can explain it in a sentence and apply it to a decision they have not been briefed on. If it requires a slide deck to defend, it is too complicated to function.",
      },
      { type: "h2", text: "Design is how the idea behaves" },
      {
        type: "p",
        text: "Type, colour and layout are not decoration; they are the tone of voice made visible. A restrained interface supports a claim of clarity. A dense, loud identity supports urgency. The system should make the idea obvious before anyone reads the copy.",
      },
      { type: "h2", text: "Cut the touchpoints that dilute" },
      {
        type: "p",
        text: "More channels rarely create more meaning. A brand present in twelve places with a slightly different story in each is weaker than one present in four places with a recognisable point of view. Choose the surfaces where your audience actually spends time, and do them properly.",
      },
      {
        type: "ul",
        items: [
          "One sentence that states what you believe about your category",
          "Three proof points that make the claim credible",
          "A visual system that expresses the claim without words",
          "A rule for saying no to work that does not fit",
        ],
      },
      { type: "h2", text: "Consistency is a maintenance job" },
      {
        type: "p",
        text: "A brand does not stay consistent because it was designed well. It stays consistent because templates, approvals and examples make the right choice the easy one. Build for the person producing the hundredth asset, not the first.",
      },
    ],
  },
  {
    slug: "first-frame-strategy",
    title: "Short-form video: the first frame is the strategy",
    excerpt:
      "You have roughly one second to earn the next five. Here is how to design for that reality without sacrificing the story.",
    category: "Video",
    date: "2026-06-23",
    readingTime: "5 min read",
    image: "/assets/images/insight-video.svg",
    imageAlt: "Dark orbital artwork with a violet dashed ring",
    author: "SOSIAL Studio",
    content: [
      {
        type: "p",
        text: "Short-form video is not television compressed. It is a different medium with a different contract: the viewer owes you nothing, and the platform is designed to replace you. The opening frame has to do narrative work immediately.",
      },
      { type: "h2", text: "Open on the tension, not the logo" },
      {
        type: "p",
        text: "Brand films often start with an establishing shot and a logo. Feed video cannot afford that. Start on the problem, the result or the surprising detail. The brand can arrive once attention has been earned.",
      },
      { type: "h2", text: "Design for sound off and captions on" },
      {
        type: "p",
        text: "Assume silence. Text should carry the argument, with visuals supporting rather than duplicating it. Captions are not accessibility theatre; they are a design element that keeps the story readable at speed.",
      },
      { type: "h2", text: "Shoot for the edit you will actually need" },
      {
        type: "p",
        text: "Plan the cutdowns before the shoot: vertical hero, fifteen-second product proof, six-second hook. Coverage decisions on set should be driven by those edits. One well-planned shoot can produce a month of assets; one unplanned shoot produces a film nobody can use.",
      },
      {
        type: "ul",
        items: [
          "A hook that works with the sound off",
          "One idea per video, not three",
          "Movement or a visual change every few seconds",
          "A clear next action, spoken and shown",
        ],
      },
      { type: "h2", text: "Measure where people leave" },
      {
        type: "p",
        text: "Retention curves are the most honest creative feedback available. If viewers drop at the same second across multiple videos, the problem is structural, not a one-off. Fix the pattern, then test the details.",
      },
    ],
  },
  {
    slug: "reporting-that-changes-decisions",
    title: "Reporting that changes decisions (and the metrics that don't)",
    excerpt:
      "A report is not a record of activity. It is an argument for what to do next. Most dashboards are built for the wrong job.",
    category: "Analytics",
    date: "2026-05-30",
    readingTime: "5 min read",
    image: "/assets/images/insight-measurement.svg",
    imageAlt: "Radar-style illustration with connected data points",
    author: "SOSIAL Studio",
    content: [
      {
        type: "p",
        text: "Most marketing reports are activity logs with a chart on top. They show what happened, rarely why, and almost never what should change. A useful report answers three questions: what did we expect, what happened, and what are we doing about it?",
      },
      { type: "h2", text: "Start with the decision" },
      {
        type: "p",
        text: "Before choosing metrics, decide which decisions the report should support. Budget reallocation, creative direction, channel investment, pricing and offer design all require different evidence. A single dashboard for everything serves no decision well.",
      },
      { type: "h2", text: "Separate health from growth" },
      {
        type: "p",
        text: "Some metrics tell you the system is working: conversion rate, repeat purchase, qualified pipeline. Others tell you it is growing: reach, new users, share of demand. Both matter, but conflating them creates confusing reports and bad decisions.",
      },
      { type: "h2", text: "Beware metrics that only go up" },
      {
        type: "p",
        text: "Impressions, followers and time on site can rise while the business stands still. If a metric cannot fall in a way that would change your behaviour, it is probably decoration. Keep it in the appendix, not the summary.",
      },
      {
        type: "ul",
        items: [
          "One page: what changed, why we think so, what we will do",
          "Each channel judged against the job it was given",
          "A clear owner for every recommended action",
          "A short list of questions the data cannot yet answer",
        ],
      },
      { type: "h2", text: "Make uncertainty explicit" },
      {
        type: "p",
        text: "Attribution is imperfect and every model is an approximation. Saying so builds trust and improves decisions. The most useful sentence in a report is often: we do not know yet, and here is the test that will tell us.",
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
