import { featuredProjects, projects } from "@/data/work";
import { WorkShowcase } from "@/components/work/WorkShowcase";

export function FeaturedWork() {
  return <WorkShowcase projects={featuredProjects} allProjectsCount={projects.length} />;
}
