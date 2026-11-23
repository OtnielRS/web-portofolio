import { pageMetadata } from "@/app/_lib/metadata";
import WorkSection from "../_features/work/work-section";

export const metadata = pageMetadata("Projects · Otniel Rahadiyan Sumantri", "Explore Otniel’s web, mobile, real-time multiplayer, and AI-powered projects.", "/work");

export default function WorkPage() {
  return <div className="page-content screen-flow"><WorkSection standalone screen /></div>;
}
