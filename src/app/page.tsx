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
import { EngagementModels } from "@/components/sections/EngagementModels";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Gallery } from "@/components/sections/Gallery";
import { VideoSection } from "@/components/sections/VideoSection";
import { SuccessStory } from "@/components/sections/SuccessStory";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TeamStrip } from "@/components/sections/TeamStrip";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AiVerifySection } from "@/components/sections/AiVerifySection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalEnquiry } from "@/components/sections/FinalEnquiry";

export const metadata: Metadata = buildMetadata({
  title: "SOSIAL — Digital marketing, creative and production",
  description:
    "Sosial is a digital marketing and creative brand in Bengaluru, bringing digital marketing, creative content and production together to work as one.",
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
      <EngagementModels />
      <FeaturedWork />
      <Gallery />
      <VideoSection />
      <SuccessStory />
      <ProcessSection />
      <TeamStrip />
      <TestimonialsSection />
      <AiVerifySection />
      <InsightsSection />
      <BookingSection />
      <FaqSection />
      <FinalEnquiry />
    </>
  );
}
