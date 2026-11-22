import {
  siBuffer,
  siElevenlabs,
  siExpress,
  siFigma,
  siFreepik,
  siGoogle,
  siGoogleads,
  siGoogleanalytics,
  siGoogletagmanager,
  siHootsuite,
  siMeta,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siSemrush,
  siShopify,
  siWordpress,
  siZoho,
  type SimpleIcon,
} from "simple-icons";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Tools the team works with. Official marks come from Simple Icons; brands
 * that are not in that set (several asked to be removed) get a neat initials
 * badge instead of a hand-redrawn logo.
 */
type Tool = { name: string; icon?: SimpleIcon; initials?: string };

const tools: Tool[] = [
  { name: "Canva", initials: "C" },
  { name: "Adobe", initials: "A" },
  { name: "Figma", icon: siFigma },
  { name: "Freepik", icon: siFreepik },
  { name: "ElevenLabs", icon: siElevenlabs },
  { name: "Higgsfield", initials: "H" },
  { name: "Meta Business Suite", icon: siMeta },
  { name: "Sprout Social", initials: "S" },
  { name: "Zoho Social", icon: siZoho },
  { name: "Google Keyword Planner", icon: siGoogleads },
  { name: "Google Trends", icon: siGoogle },
  { name: "Buffer", icon: siBuffer },
  { name: "Semrush", icon: siSemrush },
  { name: "SocialPilot", initials: "SP" },
  { name: "Hootsuite", icon: siHootsuite },
  { name: "Node.js", icon: siNodedotjs },
  { name: "Express.js", icon: siExpress },
  { name: "React.js", icon: siReact },
  { name: "Next.js", icon: siNextdotjs },
  { name: "Shopify", icon: siShopify },
  { name: "Google Ads", icon: siGoogleads },
  { name: "LinkedIn Ads", initials: "in" },
  { name: "Google Merchant Center", icon: siGoogle },
  { name: "Meta Ads", icon: siMeta },
  { name: "WordPress", icon: siWordpress },
  { name: "Google Analytics 4", icon: siGoogleanalytics },
  { name: "Google Tag Manager", icon: siGoogletagmanager },
];

function ToolMark({ tool }: { tool: Tool }) {
  if (tool.icon) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0 fill-current">
        <path d={tool.icon.path} />
      </svg>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-[5px] bg-current px-1"
    >
      <span className="text-[0.56rem] font-bold leading-none tracking-[-0.02em] text-paper">
        {tool.initials}
      </span>
    </span>
  );
}

export function PlatformStrip() {
  const row = [...tools, ...tools];
  return (
    <section className="border-b border-ink/10 bg-paper" aria-label="Tools we work with">
      <div className="container-x grid gap-4 py-7 md:grid-cols-[13rem_1fr] md:items-center md:gap-8">
        <SectionLabel className="shrink-0 whitespace-nowrap">Tools we work with</SectionLabel>
        <div data-reveal="fade" className="min-w-0">
          <ul className="sr-only">
            {tools.map((tool) => (
              <li key={tool.name}>{tool.name}</li>
            ))}
          </ul>
          <div aria-hidden="true" className="mask-fade-x flex w-full overflow-hidden">
            {/* A longer list than before, so the loop runs longer to keep the same speed. */}
            <div className="marquee-track flex w-max shrink-0 items-center" style={{ animationDuration: "95s" }}>
              {row.map((tool, index) => (
                <span
                  key={`${tool.name}-${index}`}
                  className="flex items-center gap-2.5 whitespace-nowrap px-5 font-display text-[1rem] font-semibold tracking-[-0.015em] text-ink/75"
                >
                  <ToolMark tool={tool} />
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
