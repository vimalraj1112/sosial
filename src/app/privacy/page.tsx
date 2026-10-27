import type { Metadata } from "next";
import { brand, mailHref } from "@/data/brand";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — Interim notice",
  description:
    "An interim privacy notice explaining what SOSIAL collects through the project enquiry form and how it is used.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy, in plain language."
      intro="Our full privacy policy is being finalised. This interim notice explains what we collect today, why we collect it and how to ask us to remove it."
      updated="October 2026"
      sections={[
        {
          heading: "What we collect",
          body: (
            <p>
              When you send a project enquiry, we collect the details you choose to provide: your
              name, email address, optional phone number, company, area of interest, budget range
              and message. We also receive a timestamp and a technical identifier used to prevent
              duplicate submissions.
            </p>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              We use enquiry details only to respond to you, clarify the brief and prepare a
              proposal. We do not sell personal data, and we do not use enquiry details for
              unrelated marketing.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep enquiries only for as long as we need them to respond and maintain reasonable
              business records. If you would like your enquiry deleted earlier, ask us and we will
              remove it unless we are required to retain it.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask to see, correct or delete the information you have sent us. Email{" "}
              <a href={mailHref} className="underline underline-offset-4 hover:text-ink">
                {brand.email}
              </a>{" "}
              with the subject line &ldquo;Privacy request&rdquo;.
            </p>
          ),
        },
        {
          heading: "Who to contact",
          body: (
            <p>
              Questions about this notice can be sent to{" "}
              <a href={mailHref} className="underline underline-offset-4 hover:text-ink">
                {brand.email}
              </a>
              . We will publish the complete, reviewed policy here when it is available.
            </p>
          ),
        },
      ]}
    />
  );
}
