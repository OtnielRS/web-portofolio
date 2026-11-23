import type { Metadata } from "next";
import ProjectDetails from "../../_features/work/project-details";

export const metadata: Metadata = { title: "Tempat Gosip · Project details · Otniel", description: "A React Native social application with a GraphQL API, secure sessions, and original app screenshots." };

export default function TempatGosipPage() {
  return <ProjectDetails art="social" />;
}
