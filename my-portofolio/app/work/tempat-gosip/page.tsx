import { pageMetadata } from "@/app/_lib/metadata";
import ProjectDetails from "../../_features/work/project-details";

export const metadata = pageMetadata("Tempat Gosip · Project details · Otniel", "A React Native social application with a GraphQL API, secure sessions, and original app screenshots.", "/work/tempat-gosip");

export default function TempatGosipPage() {
  return <ProjectDetails art="social" />;
}
