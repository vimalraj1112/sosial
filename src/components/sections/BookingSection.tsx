import { Check, Clock, Mail } from "lucide-react";
import { BookingCalendar } from "@/components/forms/BookingCalendar";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { booking } from "@/data/booking";
import { brand, mailHref } from "@/data/brand";
import { reveal } from "@/components/ui/Reveal";

const assurances = [
  { icon: Clock, label: booking.durationLabel + " intro call" },
  { icon: Check, label: "No commitment required" },
  { icon: Check, label: "A clear next step" },
  { icon: Check, label: "Reply within one business day" },
];

export function BookingSection() {
  return (
    <section id="book" className="relative overflow-hidden bg-night py-20 text-paper sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-light opacity-25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark/10 blur-[110px] sm:h-[42rem] sm:w-[42rem]"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="&#8212;" tone="light" className="justify-center">
            Get in touch
          </SectionLabel>

          <h2 {...reveal("rise")} className="display mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)]">
            Find a time to <span className="serif-accent text-coral-soft">talk.</span>
          </h2>

          <p {...reveal("up")} className="mx-auto mt-6 max-w-xl text-[0.96rem] leading-relaxed text-paper/60 sm:text-[1.02rem]">
            Book a free {booking.durationLabel} intro call. No pitch, no pressure&mdash;just an honest
            conversation about the business, the goal and what needs to change.
          </p>
        </div>

        <div {...reveal("scale")} className="mt-10 sm:mt-12">
          <BookingCalendar />
        </div>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map(({ icon: Icon, label }) => (
            <li
              key={label}
              {...reveal("up")}
              className="flex items-center gap-3 rounded-xl border border-paper/10 bg-paper/[0.03] px-4 py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-coral/15 text-coral-soft">
                <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="text-[0.8rem] font-medium leading-snug text-paper/75">{label}</span>
            </li>
          ))}
        </ul>

        <div {...reveal("fade")} className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-paper/12 pt-6 text-[0.76rem] text-paper/40 sm:flex-row">
          <p className="flex items-center gap-2.5">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spark opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-spark" />
            </span>
            {brand.location} <span className="text-paper/20">/</span> {booking.timezoneLabel}
          </p>
          <p className="flex items-center gap-1.5">
            <Mail aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
            Prefer email?{" "}
            <a
              href={mailHref}
              className="font-medium text-paper/70 underline underline-offset-4 transition-colors hover:text-coral-soft"
            >
              {brand.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
