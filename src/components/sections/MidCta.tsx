import { ButtonLink } from "@/components/ui/Button";

export function MidCta() {
  return (
    <section className="border-y border-white/20 bg-coral text-white">
      <div className="container-x grid gap-6 py-9 md:grid-cols-12 md:items-center md:py-10">
        <div className="md:col-span-8">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-white/60">
            The next step
          </p>
          <h2 className="display mt-2 text-[clamp(1.65rem,3.4vw,2.55rem)]">
            Have a project in mind?
          </h2>
          <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-white/80">
            Tell us what you&rsquo;re trying to change. We&rsquo;ll come back with a clear next step,
            not a sales pitch.
          </p>
        </div>
        <div className="md:col-span-4 md:justify-self-end">
          <ButtonLink href="/contact" variant="dark" size="md" arrow>
            Discuss Your Project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
