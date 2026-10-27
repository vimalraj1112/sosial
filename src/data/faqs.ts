export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What kind of businesses do you work with?",
    a: "Businesses that need marketing, creative and production planned together: founders, marketing leads and in-house teams who want one clear direction across their channels. We work across B2B and consumer categories.",
  },
  {
    q: "Do you work on retainers or projects?",
    a: "Both. Brand, website, campaign and production work can run as defined projects. Social media, paid media and ongoing content work best as a monthly retainer. The scope, deliverables and timeline are agreed in writing.",
  },
  {
    q: "Can you work with our existing team or agency?",
    a: "Yes. We can act as the strategic, creative or production layer alongside internal specialists or another agency. We are clear about who owns what so the work does not fall between suppliers.",
  },
  {
    q: "How quickly can we start?",
    a: "It depends on the current schedule and the size of the engagement. A short conversation is the fastest way to find out. If we are not the right fit, we will say so.",
  },
  {
    q: "Do you guarantee results?",
    a: "No. We do not guarantee leads, sales, revenue, engagement, rankings, map positions, ad performance or any other commercial outcome. We commit to the quality of the work, clear scope and honest reporting.",
  },
  {
    q: "What happens after we enquire?",
    a: "We read your note and, if there is a fit, reply with a few clarifying questions or a short conversation. You then receive a written proposal covering scope, timeline, responsibilities and fees. There is no drip campaign and no obligation.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Brief",
    body: "We start with the business, the audience and the job the work needs to do. Goals, constraints, channels and what has already been tried are agreed before anything is made.",
    detail: "Discovery notes, objectives, scope and success measures",
  },
  {
    number: "02",
    title: "Plan",
    body: "The idea becomes a practical plan: the message, the creative direction, the deliverables and the decisions that need to happen along the way.",
    detail: "Strategy, creative direction, schedule and responsibilities",
  },
  {
    number: "03",
    title: "Make",
    body: "Design, content, build or production happens in the open. Early reviews catch problems while they are still cheap to fix.",
    detail: "Design, copy, development, content and production",
  },
  {
    number: "04",
    title: "Review",
    body: "We check the work against the brief, agree final changes and hand over the files with the context needed to use them properly.",
    detail: "Feedback, final files, handover and agreed reporting",
  },
];
