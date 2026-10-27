import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";

const platforms = [
  "Google Ads",
  "Meta",
  "GA4",
  "Search Console",
  "Shopify",
  "Next.js",
  "HubSpot",
  "Figma",
  "LinkedIn Ads",
  "Klaviyo",
];

export function PlatformStrip() {
  return (
    <section className="border-b border-ink/10 bg-paper" aria-label="Platforms and tools">
      <div className="container-x grid gap-4 py-7 md:grid-cols-[17rem_1fr] md:items-center md:gap-8">
        <SectionLabel index="—" className="shrink-0 whitespace-nowrap">
          Platforms we work in
        </SectionLabel>
        <Marquee items={platforms} className="w-full" />
      </div>
    </section>
  );
}
