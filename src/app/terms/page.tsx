import type { Metadata } from "next";
import { brand, mailHref } from "@/data/brand";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions — Interim notice",
  description:
    "An interim terms notice covering the SOSIAL preview site, its illustrative concept portfolio and project enquiries.",
  path: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms, without the fog."
      intro="Our full terms are being finalised. This interim notice covers the preview site, the concept portfolio and how project enquiries work."
      updated="October 2026"
      sections={[
        {
          heading: "The preview site",
          body: (
            <p>
              This site is a preview build for SOSIAL. Content, layout and imagery may change before
              launch. Nothing on this site is an offer, a guarantee of availability or a binding
              agreement to provide services.
            </p>
          ),
        },
        {
          heading: "Concept work is illustrative",
          body: (
            <p>
              The projects in the portfolio are original illustrative concepts, not client
              engagements. They do not represent approved client work, real results, testimonials or
              endorsements. We do not publish performance numbers for a concept, and nothing in the
              portfolio should be read as a promise of similar results.
            </p>
          ),
        },
        {
          heading: "Enquiries",
          body: (
            <p>
              Sending an enquiry does not create a client relationship. Any engagement begins only
              after both sides agree a written scope, fee and terms. We may decline work that is not
              a fit.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              The SOSIAL name, identity, site design and original artwork are owned by SOSIAL or used
              with permission. Please do not reproduce them commercially without written permission.
            </p>
          ),
        },
        {
          heading: "Questions",
          body: (
            <p>
              For questions about these interim terms, email{" "}
              <a href={mailHref} className="underline underline-offset-4 hover:text-ink">
                {brand.email}
              </a>
              . The complete terms will be published here once reviewed.
            </p>
          ),
        },
      ]}
    />
  );
}
