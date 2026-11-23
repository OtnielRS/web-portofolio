import { pageMetadata } from "@/app/_lib/metadata";
import SkillsSection from "../_features/skills/skills-section";

export const metadata = pageMetadata("Skills · Otniel Rahadiyan Sumantri", "Explore Otniel's web, mobile, backend, database, and development tools, grouped by environment.", "/skills");

export default function SkillsPage() {
  return <div className="screen-flow"><SkillsSection standalone /></div>;
}
