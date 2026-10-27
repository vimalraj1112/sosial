import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Visual } from "@/components/ui/Visual";
import { ButtonLink } from "@/components/ui/Button";

const roles = [
  { role: "Strategy Lead", focus: "Positioning, research, measurement", image: "/assets/images/team-1.svg" },
  { role: "Creative Director", focus: "Identity, art direction, campaigns", image: "/assets/images/team-2.svg" },
  { role: "Performance Lead", focus: "Paid media, experiments, reporting", image: "/assets/images/team-3.svg" },
  { role: "Design Lead", focus: "Web, product, design systems", image: "/assets/images/team-4.svg" },
];

export function TeamStrip() {
  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="10">The team</SectionLabel>
            <h2 className="display mt-5 max-w-xl text-[clamp(1.9rem,3.7vw,2.9rem)]">
              The disciplines behind{" "}
              <span className="serif-accent text-coral">the work</span>.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-[0.85rem] leading-relaxed text-ink/55">
              Four disciplines, one integrated team. Named profiles, biographies and photography are
              pending approval.
            </p>
            <ButtonLink href="/about" variant="outline" size="sm" className="mt-4" arrow>
              Meet the studio
            </ButtonLink>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {roles.map((person, index) => (
            <Reveal key={person.role} delay={index * 0.05} className="h-full">
              <div className="group flex h-full flex-col rounded-card border-2 border-ink bg-card p-3 shadow-hard-xs transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-hard">
                <Visual
                  src={person.image}
                  alt={`Placeholder portrait for the ${person.role} role`}
                  className="aspect-square w-full rounded-xl"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 25vw, 45vw"
                />
                <div className="mt-3 flex flex-1 flex-wrap items-start justify-between gap-2 border-t border-ink/10 px-1 pt-3">
                  <div className="min-w-0">
                    <p className="font-display text-[0.98rem] font-semibold tracking-[-0.02em] sm:text-[1.05rem]">{person.role}</p>
                    <p className="mt-1 text-[0.76rem] leading-snug text-ink/55">{person.focus}</p>
                  </div>
                  <span className="mt-0.5 shrink-0 rounded-full border border-ink/20 px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.08em] text-ink/40">
                    Profile pending
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
