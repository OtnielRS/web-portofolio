import { pageMetadata } from "@/app/_lib/metadata";
import ProjectDetails from "../../_features/work/project-details";

export const metadata = pageMetadata("Hacktiv Chess · Engineering notes · Otniel", "Otniel's backend contribution to Hacktiv Chess: real-time synchronization, server-side validation, and session recovery.", "/work/hacktiv-chess");

export default function ChessPage() {
  return <ProjectDetails art="chess" />;
}
