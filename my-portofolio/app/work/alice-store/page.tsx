import type { Metadata } from "next";
import ProjectDetails from "../../_features/work/project-details";

export const metadata: Metadata = { title: "Alice Store · Project details · Otniel", description: "A full-stack laptop catalog built with Next.js, React, MongoDB, authentication, and input validation." };

export default function AliceStorePage() {
  return <ProjectDetails art="store" />;
}
