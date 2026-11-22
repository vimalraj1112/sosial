import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChartColumn,
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  Search,
  TrendingUp,
  UserRound,
  Video,
} from "lucide-react";
import { services, type IconName } from "@/data/services";
import { Reveal, reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons: Record<IconName, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MessagesSquare,
  TrendingUp,
  UserRound,
  MonitorSmartphone,
  Search,
  Megaphone,
  Video,
  ChartColumn,
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
            <h2 {...reveal("rise")} className="display mt-5 max-w-2xl text-[clamp(2.1rem,4.4vw,3.6rem)]">
              Everything you need to be{" "}
              <span className="serif-accent text-coral-soft">noticed</span>, and chosen.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.slug} as="article" variant="scale">
                <Link
                  id={`service-${service.slug}`}
                  href={`/services/${service.slug}`}
                  className="group relative isolate flex h-full min-h-[21rem] scroll-mt-28 flex-col justify-between gap-8 overflow-hidden rounded-card border-2 border-ink bg-night p-6 text-paper shadow-[4px_4px_0_0_var(--color-coral)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0_0_var(--color-coral)] sm:p-7"
                >
                  {/* Photo with a dark fade so the text reads on any image. */}
                  <Image
                    src={service.photo}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="-z-20 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-night/25"
                  />

                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-paper/30 bg-paper">
                      <Icon aria-hidden="true" className="h-[1.35rem] w-[1.35rem] text-coral" strokeWidth={1.8} />
                    </span>
                    <span className="text-[0.68rem] font-semibold tracking-[0.12em] text-paper/70">
                      0{index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[1.3rem] font-semibold leading-tight tracking-[-0.025em]">
                      {service.shortName}
                    </h3>
                    <p className="mt-2 text-[0.87rem] leading-relaxed text-paper/80">
                      {service.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-coral-soft">
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

        <p {...reveal("fade")} className="mt-5 text-[0.75rem] text-paper/50">
          Not sure which you need? That is what the first conversation is for.
        </p>
      </div>
    </section>
  );
}
