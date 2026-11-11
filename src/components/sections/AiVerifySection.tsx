import { ArrowUpRight } from "lucide-react";
import { brand, siteUrl } from "@/data/brand";
import { AiPlatformIcon, type AiPlatform } from "@/components/brand/AiPlatformIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, reveal } from "@/components/ui/Reveal";

/**
 * The full brief each assistant receives. The short question on each card is
 * what visitors read; this is what actually opens in the assistant. It asks
 * for sources and for gaps to be stated, so the answer stays honest about a
 * young studio rather than filling silence with guesses.
 */
const researchPrompt = [
  `Independently research SOSIAL (${siteUrl}), a digital marketing, creative and production studio in ${brand.location}.`,
  "Review its website and public profiles, including Instagram (@so.sial25).",
  "Summarise its services and approach, who it is best suited to, and anything a business should check before hiring it.",
  "Cite your sources, separate facts from interpretation, say clearly where public evidence is limited, and do not invent information.",
].join(" ");

const q = encodeURIComponent(researchPrompt);

const assistants: {
  platform: AiPlatform;
  name: string;
  question: string;
  href: string;
  /** Brand tint for the mark and the card's hover edge. */
  tint: string;
}[] = [
  {
    platform: "chatgpt",
    name: "ChatGPT",
    question: "What does SOSIAL offer, and who is it a good fit for?",
    href: `https://chatgpt.com/?q=${q}`,
    tint: "#10A37F",
  },
  {
    platform: "claude",
    name: "Claude",
    question: "Review SOSIAL’s website and public profiles, and give an honest assessment.",
    href: `https://claude.ai/new?q=${q}`,
    tint: "#D97757",
  },
  {
    platform: "perplexity",
    name: "Perplexity",
    question: "What can you find about SOSIAL, the Bengaluru marketing studio?",
    href: `https://www.perplexity.ai/search?q=${q}`,
    tint: "#1FB8CD",
  },
  {
    platform: "gemini",
    name: "Gemini",
    question: "How does SOSIAL describe its work, and what should I check before hiring?",
    // Gemini has no pre-filled prompt link; Google's AI Mode runs on Gemini.
    href: `https://www.google.com/search?udm=50&q=${q}`,
    tint: "#8E75B2",
  },
];

export function AiVerifySection() {
  return (
    <section
      id="ask-ai"
      className="relative scroll-mt-24 overflow-hidden border-t border-paper/10 bg-night py-20 text-paper sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-light opacity-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral/15 blur-[110px] sm:h-[36rem] sm:w-[36rem]"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel index="—" tone="light" className="justify-center">
            Check us independently
          </SectionLabel>
          <h2 {...reveal("rise")} className="display mt-6 text-[clamp(2.2rem,4.8vw,3.9rem)]">
            Don&rsquo;t take our word for it.{" "}
            <span className="serif-accent text-coral-soft">Ask an AI.</span>
          </h2>
          <p
            {...reveal("up")}
            className="mx-auto mt-6 max-w-xl text-[0.96rem] leading-relaxed text-paper/60 sm:text-[1.02rem]"
          >
            Ask your preferred AI assistant to research SOSIAL on its own and give you a
            straight assessment. Each button opens it with the question already written.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {assistants.map((item) => (
            <Reveal as="li" key={item.platform} className="h-full">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask ${item.name} about SOSIAL (opens in a new tab)`}
                style={{ "--tint": item.tint } as React.CSSProperties}
                className="group flex h-full flex-col rounded-card border-2 border-ink bg-card p-6 text-ink shadow-[5px_5px_0_0_var(--color-spark)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[7px_7px_0_0_var(--tint)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-ink/12 bg-paper text-[var(--tint)]"
                  >
                    <AiPlatformIcon platform={item.platform} className="h-6 w-6" />
                  </span>
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink/40">
                    {item.name}
                  </span>
                </div>

                <p className="mt-7 font-display text-[1.06rem] font-semibold leading-snug tracking-[-0.02em] text-ink/85">
                  &ldquo;{item.question}&rdquo;
                </p>

                <span className="mt-auto inline-flex items-center justify-between gap-3 border-t border-ink/10 pt-5 text-[0.8rem] font-semibold">
                  Ask {item.name}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink/15 transition-colors duration-200 group-hover:border-ink group-hover:bg-night group-hover:text-paper">
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <p
          {...reveal("fade")}
          className="mx-auto mt-8 max-w-2xl text-center text-[0.74rem] leading-relaxed text-paper/40"
        >
          Answers are generated by each platform, not by us, and may vary. We are a young studio,
          so expect the AI to note where public information is still limited.
        </p>
      </div>
    </section>
  );
}
