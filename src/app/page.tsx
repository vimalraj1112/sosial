import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { PlatformStrip } from "@/components/sections/PlatformStrip";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { HowItStarts } from "@/components/sections/HowItStarts";
import { WhatWeMake } from "@/components/sections/WhatWeMake";
import { MidCta } from "@/components/sections/MidCta";
import { WaysOfWorking } from "@/components/sections/WaysOfWorking";
import { AiVerifySection } from "@/components/sections/AiVerifySection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalEnquiry } from "@/components/sections/FinalEnquiry";

export const metadata: Metadata = buildMetadata({
  title: "SOSIAL: Digital marketing, content and video production",
  description:
    "SOSIAL is one creative partner for digital marketing, content and video production. Marketing with clarity. Creative with purpose. Execution you can count on.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformStrip />
      <IntroSection />
      <ServicesGrid />
      <HowItStarts />
      <WhatWeMake />
      <MidCta />
      <WaysOfWorking />
      <AiVerifySection />
      <InsightsSection />
      <FaqSection />
      <BookingSection />
      <FinalEnquiry />
    </>
  );
}
