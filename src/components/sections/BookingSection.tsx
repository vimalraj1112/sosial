import { BookingCalendar } from "@/components/forms/BookingCalendar";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { booking } from "@/data/booking";
import { reveal } from "@/components/ui/Reveal";

export function BookingSection() {
  return (
    <section id="book" className="relative overflow-hidden bg-night py-20 text-paper sm:py-24 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-light opacity-25" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral/10 blur-[110px] sm:h-[42rem] sm:w-[42rem]"
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


      </div>
    </section>
  );
}
