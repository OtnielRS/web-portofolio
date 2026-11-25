import HeroSection from "./_features/home/hero-section";
import WorkSection from "./_features/work/work-section";
import AboutSection from "./_features/about/about-section";
import JourneySection from "./_features/about/journey-section";
import ContactSection from "./_features/contact/contact-section";
import SkillsSection from "./_features/skills/skills-section";

export default function HomePage() {
  return (
    <div className="screen-flow">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorkSection screen />
      <JourneySection />
      <ContactSection />
    </div>
  );
}
