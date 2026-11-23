import type { Metadata } from "next";
import SkillsSection from "../_features/skills/skills-section";

export const metadata: Metadata = {
  title: "Skills · Otniel Rahadiyan Sumantri",
  description: "Explore Otniel's web, mobile, backend, database, and development tools, grouped by environment.",
};

export default function SkillsPage() {
  return <div className="screen-flow"><SkillsSection standalone /></div>;
}
