import { pageMetadata } from "@/app/_lib/metadata";
import AboutSection from "../_features/about/about-section";
import JourneySection from "../_features/about/journey-section";

export const metadata = pageMetadata("About · Otniel Rahadiyan Sumantri", "Get to know Otniel, a junior full-stack developer based in Jakarta, and explore his skills, education, and experience.", "/about");

export default function AboutPage() {
  return (
    <div className="page-content screen-flow">
      <AboutSection standalone />
      <JourneySection />
    </div>
  );
}
