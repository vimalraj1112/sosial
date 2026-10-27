import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  MapPin,
  MessagesSquare,
  MonitorSmartphone,
  PenTool,
  Sun,
  TrendingUp,
} from "lucide-react";
import { services, type IconName } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";

const icons: Record<IconName, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MessagesSquare,
  TrendingUp,
  PenTool,
  MonitorSmartphone,
  MapPin,
  Clapperboard,
  Camera,
  Sun,
};

export function ServicesGrid() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden bg-night py-20 text-paper sm:py-24 lg:py-28">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-30" />
      <div className="container-x relative">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="02" tone="light">
              Capabilities
            </SectionLabel>
            <h2 className="display mt-5 max-w-2xl text-[clamp(2.1rem,4.4vw,3.6rem)]">
              Everything you need to be{" "}
              <span className="serif-accent text-coral-soft">noticed</span>, and chosen.
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-[0.95rem] leading-relaxed text-paper/65">
              Eight services across two divisions, designed to work as one system rather than
              separate suppliers.
            </p>
            <ButtonLink href="/services" variant="light" size="sm" className="mt-5" arrow>
              All services
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.slug} as="article" delay={index * 0.04}>
                <Link
                  id={`service-${service.slug}`}
                  href={`/services/${service.slug}`}
                  className="group flex h-full scroll-mt-28 flex-col justify-between gap-8 rounded-card border-2 border-ink bg-card p-6 text-ink shadow-[4px_4px_0_0_var(--color-coral)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_0_var(--color-coral)] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink/15 bg-paper">
                      <Icon aria-hidden="true" className="h-[1.35rem] w-[1.35rem] text-coral" strokeWidth={1.8} />
                    </span>
                    <span className="text-[0.68rem] font-semibold tracking-[0.12em] text-ink/35">
                      0{index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[1.3rem] font-semibold leading-tight tracking-[-0.025em]">
                      {service.shortName}
                    </h3>
                    <p className="mt-2 text-[0.87rem] leading-relaxed text-ink/60">
                      {service.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-coral">
                      Explore
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-5 text-[0.75rem] text-paper/50">
          Not sure which you need? That is what the first conversation is for.
        </p>
      </div>
    </section>
  );
}
