import type { Metadata } from "next";
import ProjectDetails from "../../_features/work/project-details";

export const metadata: Metadata = { title: "Bastionfall · Engineering notes · Otniel", description: "Otniel's backend contribution to Bastionfall: a TypeScript game engine, Gemini events, validation, and fallbacks." };

export default function BastionfallPage() {
  return <ProjectDetails art="bastion" />;
}
