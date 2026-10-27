import { media } from "@/data/media";
import { VideoShowcase } from "@/components/media/VideoShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function VideoSection() {
  return (
    <section className="relative overflow-hidden bg-night py-20 text-paper sm:py-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-light opacity-20" />
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="07" tone="light">
              Inside SOSIAL
            </SectionLabel>
            <h2 className="display mt-5 max-w-2xl text-[clamp(1.9rem,3.8vw,3.1rem)]">
              How the work comes{" "}
              <span className="serif-accent text-coral-soft">together</span>.
            </h2>
          </div>
          <p className="max-w-sm text-[0.9rem] leading-relaxed text-paper/55 lg:col-span-4">
            A short film on the studio, the process and the thinking behind a campaign. Final footage
            will replace this placeholder reel before launch.
          </p>
        </div>

        <Reveal className="mt-9">
          <VideoShowcase
            poster="/assets/images/hero-frame.svg"
            src={media.hero.video}
            alt="Abstract SOSIAL showreel artwork with orbital rings and a coral signal dot"
            label="Play the studio reel"
            className="media-frame aspect-[16/9] w-full border-paper/30 shadow-[6px_6px_0_0_var(--color-coral)] lg:aspect-[21/9]"
          />
        </Reveal>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.14em] text-paper/35">
          <span>Showreel · placeholder footage</span>
          <span>No audio autoplay · keyboard accessible</span>
        </div>
      </div>
    </section>
  );
}
