import type { Metadata } from "next";
import ProjectDetails from "../../_features/work/project-details";

export const metadata: Metadata = { title: "Hacktiv Chess · Engineering notes · Otniel", description: "Otniel's backend contribution to Hacktiv Chess: real-time synchronization, server-side validation, and session recovery." };

export default function ChessPage() {
  return <ProjectDetails art="chess" />;
}
