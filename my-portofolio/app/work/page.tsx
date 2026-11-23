import type { Metadata } from "next";
import WorkSection from "../_features/work/work-section";

export const metadata: Metadata = {
  title: "Work · Otniel Rahadiyan Sumantri",
  description: "Explore Otniel’s web, mobile, real-time multiplayer, and AI-powered projects.",
};

export default function WorkPage() {
  return <div className="page-content"><WorkSection standalone /></div>;
}
