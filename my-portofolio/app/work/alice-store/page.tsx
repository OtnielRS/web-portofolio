import { pageMetadata } from "@/app/_lib/metadata";
import ProjectDetails from "../../_features/work/project-details";

export const metadata = pageMetadata("Alice Store · Project details · Otniel", "A full-stack laptop catalog built with Next.js, React, MongoDB, authentication, and input validation.", "/work/alice-store");

export default function AliceStorePage() {
  return <ProjectDetails art="store" />;
}
