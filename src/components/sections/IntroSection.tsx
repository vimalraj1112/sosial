import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { media } from "@/data/media";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { ButtonLink } from "@/components/ui/Button";

const principles = [
  "Clear direction: we agree what we are making, why it matters and how it will be judged.",
  "Coordinated work: strategy, content, campaigns and production are connected, not handled in isolation.",
  "Consistent expression: one message and one standard across every channel and format.",
];

export function IntroSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <SectionLabel index="01">The studio</SectionLabel>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="display max-w-2xl text-[clamp(2.1rem,4.4vw,3.6rem)]">
                One studio for the whole story,{" "}
                <span className="serif-accent text-coral">all of it connected.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-ink/70">
                Sosial is a digital marketing and creative brand from Bengaluru. We bring digital
                marketing, creative content and production together, so every message, visual and
                channel works as one.
              </p>
              <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ink/70">
                That means the promise, the visual language and the channel plan are decided in the
                same room. The work stays connected from the first brief to the final file.
              </p>
            </Reveal>

            <ul className="mt-9 space-y-4 border-t border-ink/12 pt-7">
              {principles.map((item) => (
                <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink/75">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-coral" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="outline" arrow>
                About SOSIAL
              </ButtonLink>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 px-1 py-3 text-[0.82rem] font-medium text-ink/70 transition-colors hover:text-coral"
              >
                How we can help
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="media-frame relative shadow-hard-sm">
                <Visual
                  src={media.studio.src}
                  alt={media.studio.alt}
                  className="aspect-[4/5] w-full"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-full border border-paper/25 bg-night/85 px-4 py-2.5 text-paper backdrop-blur-sm">
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-paper/75">
                    One brand · Two divisions
                  </p>
                  <p className="text-[0.6rem] font-semibold tracking-[0.1em] text-paper/45">SOSIAL / BENGALURU</p>
                </div>
              </div>
              <p className="mt-3 text-[0.75rem] leading-relaxed text-ink/55">
                Placeholder studio artwork. Client photography will replace this asset.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
