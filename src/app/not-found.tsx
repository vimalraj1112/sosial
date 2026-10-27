import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { HeroBackdrop } from "@/components/media/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const suggestions = [
  { label: "Selected work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-night py-24 text-paper sm:py-32">
      <HeroBackdrop />
      <div className="container-x relative">
        <SectionLabel index="404" tone="light">
          Off the map
        </SectionLabel>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-display text-[clamp(5rem,16vw,12rem)] font-bold leading-[0.8] tracking-[-0.05em] text-paper/15">
              404
            </p>
            <h1 className="display mt-4 text-[clamp(2.1rem,5vw,4rem)]">
              That page isn&rsquo;t{" "}
              <span className="serif-accent text-coral-soft">here</span>.
            </h1>
            <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-paper/60">
              The link may be out of date, or the page may have moved. Nothing is broken that we cannot
              help you find.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/" variant="primary" arrow>
                Back to the homepage
              </ButtonLink>
              <ButtonLink href="/contact" variant="light">
                Talk to us
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-card border-2 border-paper/20 bg-night-soft p-6 shadow-[4px_4px_0_0_var(--color-coral)]">
              <p className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.16em] text-paper/45">
                <Compass aria-hidden="true" className="h-4 w-4" strokeWidth={1.6} />
                Try one of these
              </p>
              <ul className="mt-5 divide-y divide-paper/10">
                {suggestions.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between py-3 text-[0.9rem] text-paper/75 transition-colors hover:text-coral-soft"
                    >
                      {item.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-paper/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-coral-soft"
                        strokeWidth={1.6}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
