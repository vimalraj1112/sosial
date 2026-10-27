"use client";

import { usePathname } from "next/navigation";
import { FinalCta } from "@/components/layout/FinalCta";

/**
 * The closing CTA belongs directly before the footer on marketing pages.
 * The contact page already ends with a working enquiry form, and portfolio
 * routes use their own closing statement, so repeating "Start a conversation"
 * there would create a second, redundant CTA.
 */
export function FooterCta() {
  const pathname = usePathname();

  if (pathname === "/contact" || pathname === "/work" || pathname.startsWith("/work/")) {
    return null;
  }

  return <FinalCta />;
}
