import { pageMetadata } from "@/app/_lib/metadata";
import ProjectDetails from "../../_features/work/project-details";

export const metadata = pageMetadata("Bastionfall · Engineering notes · Otniel", "Otniel's backend contribution to Bastionfall: a TypeScript game engine, Gemini events, validation, and fallbacks.", "/work/bastionfall");

export default function BastionfallPage() {
  return <ProjectDetails art="bastion" />;
}
