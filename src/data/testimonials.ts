export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  status: "placeholder";
};

/**
 * IMPORTANT: these are sample layouts, not real client feedback.
 * The UI labels them as placeholders everywhere they appear.
 * Replace only with written, approved quotes from real clients.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "For the first time we have a brand and a plan that say the same thing. The team challenged our assumptions without slowing us down.",
    name: "Client name pending",
    role: "Founder",
    company: "Sample company",
    image: "/assets/images/testimonial-1.svg",
    status: "placeholder",
  },
  {
    quote:
      "They asked better questions than our previous agency and spent less time presenting. The work was clearer because the thinking was clearer.",
    name: "Client name pending",
    role: "Marketing lead",
    company: "Sample company",
    image: "/assets/images/testimonial-2.svg",
    status: "placeholder",
  },
  {
    quote:
      "We finally have a way to judge marketing decisions that does not depend on whoever is loudest in the room.",
    name: "Client name pending",
    role: "Managing director",
    company: "Sample company",
    image: "/assets/images/testimonial-3.svg",
    status: "placeholder",
  },
];

export const testimonialDisclaimer =
  "The quotes below are sample layouts, not client endorsements. Verified testimonials will replace them once written approval has been supplied.";
