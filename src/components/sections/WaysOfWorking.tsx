import { media } from "@/data/media";
import { Reveal, reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { ButtonLink } from "@/components/ui/Button";

const commitments = [
  {
    number: "01",
    title: "Let’s understand your needs",
    body: "Tell us what you have in mind. We’ll discuss your goals and what needs to be done.",
  },
  {
    number: "02",
    title: "One person to talk to",
    body: "You’ll have one point of contact for questions, feedback and project updates.",
  },
  {
    number: "03",
    title: "Time to create",
    body: "We’ll work on your designs, content, campaigns or videos and share them with you for feedback.",
  },
  {
    number: "04",
    title: "Keep track of progress",
    body: "We’ll share regular updates and show you what’s working and what can be improved.",
  },
];

export function WaysOfWorking() {
  return (
    <section className="border-y border-ink/10 bg-paper-deep py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionLabel index="03">How we work</SectionLabel>
              <h2 {...reveal("rise")} className="display mt-5 text-[clamp(2rem,3.8vw,3.1rem)]">
                No guesswork.{" "}
                <span className="serif-accent text-coral">You&rsquo;ll know what&rsquo;s happening.</span>
              </h2>
              <p {...reveal("up")} className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
                We keep things simple. We understand what you need, plan the work and keep you
                involved at every step.
              </p>

              <Visual
                reveal="mask-left"
                src={media.studio.src}
                alt={media.studio.alt}
                className="media-frame mt-8 hidden aspect-[16/10] w-full shadow-hard-sm lg:block"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div {...reveal("up")} className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/about" variant="dark" size="sm" arrow>
                  More about us
                </ButtonLink>
                <ButtonLink href="#contact" variant="outline" size="sm">
                  Ask us anything
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-3.5 sm:gap-4">
              {commitments.map((item) => (
                <Reveal key={item.number} variant="right">
                  <div className="grid gap-4 rounded-card border-2 border-ink bg-card p-6 shadow-hard-xs transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard-sm sm:grid-cols-[3.25rem_1fr] sm:gap-5 sm:p-7">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-coral text-[0.66rem] font-bold tracking-[0.06em] text-white">
                      {item.number}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.25rem] font-semibold tracking-[-0.025em]">{item.title}</h3>
                      <p className="mt-2 max-w-lg text-[0.9rem] leading-relaxed text-ink/65">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div {...reveal("fade")} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.72rem] uppercase tracking-[0.12em] text-ink/45">
              <span>Independent studio</span>
              <span className="h-1 w-1 rounded-full bg-coral" />
              <span>Scope agreed in writing</span>
              <span className="h-1 w-1 rounded-full bg-coral" />
              <span>Based in India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
