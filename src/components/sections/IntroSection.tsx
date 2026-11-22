import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";

const principles = [
  {
    title: "Dream it. Let’s create it.",
    body: "From branding and design to content that brings your ideas to life.",
  },
  {
    title: "Get people talking.",
    body: "Creative campaigns and marketing that help your brand get noticed.",
  },
  {
    title: "All under one roof.",
    body: "Design, social media, advertising and video production, all working together.",
  },
];

export function IntroSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-paper py-20 sm:py-24 lg:py-28">
      <div className="container-x">
        <SectionLabel index="01">The studio</SectionLabel>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 {...reveal("rise")} className="display max-w-2xl text-[clamp(2.1rem,4.4vw,3.6rem)]">
              Big plans for your brand?{" "}
              <span className="serif-accent text-coral">Let&rsquo;s make them happen.</span>
            </h2>
            <Reveal>
              <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
                You&rsquo;ve got a vision for your brand. You shouldn&rsquo;t have to find one person
                for design and another for marketing. Bring it all together with SOSIAL: one
                creative partner, from the first idea to the final output.
              </p>
            </Reveal>

            <ul className="mt-9 divide-y divide-ink/10 border-y border-ink/12">
              {principles.map((item, index) => (
                <li key={item.title} {...reveal("left")} className="flex gap-4 py-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral text-[0.66rem] font-bold text-white"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-[1.08rem] font-semibold tracking-[-0.02em] text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.92rem] leading-relaxed text-ink/65">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div {...reveal("up")} className="mt-9 flex flex-wrap gap-3">
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
            <Reveal variant="right">
              <div className="media-frame relative shadow-hard-sm">
                <div data-reveal="mask-up" className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/assets/images/studio-lights.jpg"
                    alt="The SOSIAL studio set up for a shoot, with softboxes and studio lights on a white stage"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/45 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-full border border-paper/25 bg-night/85 px-4 py-2.5 text-paper backdrop-blur-sm">
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-paper/75">
                    One brand · Two divisions
                  </p>
                  <p className="text-[0.6rem] font-semibold tracking-[0.1em] text-paper/45">SOSIAL / INDIA</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
