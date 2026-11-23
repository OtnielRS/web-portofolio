import type { Metadata } from "next";
import AboutSection from "../_features/about/about-section";
import JourneySection from "../_features/about/journey-section";

export const metadata: Metadata = {
  title: "About · Otniel Rahadiyan Sumantri",
  description: "Get to know Otniel, a junior full-stack developer based in Jakarta, and explore his skills, education, and experience.",
};

export default function AboutPage() {
  return (
    <div className="page-content">
      <AboutSection standalone />
      <JourneySection />
    </div>
  );
}
