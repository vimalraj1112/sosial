import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  MessagesSquare,
  Mic,
  MonitorSmartphone,
  TrendingUp,
  User,
  Film,
} from "lucide-react";
import { brand } from "@/data/brand";

const items = [
  {
    title: "Reels & Shorts",
    ask: "a Reels and Shorts project",
    icon: Clapperboard,
    gradient: "bg-gradient-to-br from-[#8221FC] to-[#2A0F66]",
  },
  {
    title: "Brand films",
    ask: "a brand film",
    icon: Film,
    gradient: "bg-gradient-to-br from-[#373743] to-[#14141C]",
  },
  {
    title: "Websites",
    ask: "a website",
    icon: MonitorSmartphone,
    gradient: "bg-gradient-to-br from-[#6A1BD0] to-[#B58CFD]",
  },
  {
    title: "Paid ads",
    ask: "ads",
    icon: TrendingUp,
    gradient: "bg-gradient-to-br from-[#8221FC] to-[#2A0F66]",
  },
  {
    title: "Podcasts",
    ask: "a podcast shoot and editing",
    icon: Mic,
    gradient: "bg-gradient-to-br from-[#373743] to-[#14141C]",
  },
  {
    title: "Photography",
    ask: "a photography project",
    icon: Camera,
    gradient: "bg-gradient-to-br from-[#6A1BD0] to-[#B58CFD]",
  },
  {
    title: "Social content",
    ask: "social media content",
    icon: MessagesSquare,
    gradient: "bg-gradient-to-br from-[#8221FC] to-[#2A0F66]",
  },
  {
    title: "Personal branding",
    ask: "personal branding",
    icon: User,
    gradient: "bg-gradient-to-br from-[#373743] to-[#14141C]",
  },
] as const;

function tileHref(ask: string) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    `Hi Sosial, I’d like to discuss ${ask}.`,
  )}`;
}

function Tile({ item, duplicate }: { item: (typeof items)[number]; duplicate?: boolean }) {
  const Icon = item.icon;
  return (
    <li className="shrink-0">
      <a
        href={tileHref(item.ask)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={duplicate ? -1 : undefined}
        aria-label={`Ask about ${item.title} on WhatsApp`}
        className={`group relative flex h-[16.5rem] w-[14.5rem] flex-col overflow-hidden rounded-[1.35rem] p-5 text-white shadow-[0_20px_44px_-26px_rgba(20,20,28,0.6)] transition-transform duration-300 hover:-translate-y-1 sm:h-[18rem] sm:w-[16rem] ${item.gradient}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-9 h-52 w-16 skew-x-[-24deg] bg-white/15 transition-transform duration-500 group-hover:-translate-x-6"
        />

        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10">
          <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.9} />
        </span>

        <div className="relative mt-auto">
          <h3 className="font-display text-[1.35rem] font-bold leading-[1.08] tracking-[-0.025em] sm:text-[1.45rem]">
            {item.title}
          </h3>
          <span className="mt-2.5 inline-flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/70">
            Ask about this
            <ArrowUpRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </span>
        </div>
      </a>
    </li>
  );
}

export function WhatWeMake() {
  return (
    <section
      id="what-we-make"
      className="relative scroll-mt-24 overflow-hidden border-y border-ink/10 bg-paper-deep py-20 sm:py-24 lg:py-28"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow inline-flex items-center gap-2.5 text-coral">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
              What we make
            </p>
            <h2 className="display mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)]">
              Things we can make <span className="serif-accent text-coral">for you.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-ink/65">
              Tap any tile to start that conversation on WhatsApp, with the detail already written
              for you.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-[0.82rem] font-semibold text-ink/65 transition-colors hover:text-coral"
          >
            See every service
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.9}
            />
          </Link>
        </div>
      </div>

      <div className="mask-fade-x no-scrollbar mt-9 overflow-x-auto sm:mt-12">
        <div className="marquee-track flex w-max [animation-duration:52s]">
          <ul className="flex shrink-0 gap-3.5 pr-3.5 sm:gap-4 sm:pr-4">
            {items.map((item) => (
              <Tile key={item.title} item={item} />
            ))}
          </ul>
          <ul className="flex shrink-0 gap-3.5 pr-3.5 sm:gap-4 sm:pr-4" aria-hidden="true">
            {items.map((item) => (
              <Tile key={`${item.title}-duplicate`} item={item} duplicate />
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x">
        <div className="mt-8 flex flex-col gap-3 border-t border-ink/12 pt-6 text-[0.86rem] text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Want to see how we post? Follow{" "}
            <a
              href="https://www.instagram.com/so.sial25/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-coral underline underline-offset-4 transition-colors hover:text-violet-deep"
            >
              @so.sial25
            </a>
            .
          </p>
          <p className="text-[0.76rem] font-medium uppercase tracking-[0.12em] text-ink/40">
            {brand.location}
          </p>
        </div>
      </div>
    </section>
  );
}
