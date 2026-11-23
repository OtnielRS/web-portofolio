import SectionLink from "@/app/_components/section-link";
import Arrow from "@/app/_components/arrow";
import ProgrammerScene from "./programmer-scene";

export default function HeroSection() {
  return (
    <section className="hero container" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">Software developer.<br /><span>Curious by nature.</span></h1>
        <p>
          Hi, I’m <strong>Otniel Rahadiyan Sumantri.</strong><br />
          A junior full-stack developer building thoughtful web and mobile experiences, from the interface to the API.
        </p>
        <div className="hero-actions">
          <SectionLink className="button button-primary" sectionId="work" pageHref="/work">Explore my projects <Arrow /></SectionLink>
          <a className="button button-secondary" href="/otniel-resume.pdf" target="_blank" rel="noopener noreferrer">
            View résumé <Arrow diagonal />
          </a>
        </div>
        <div className="hero-location"><span className="location-dot" />Based on Earth. Jakarta, to be precise.</div>
      </div>
      <ProgrammerScene />
    </section>
  );
}
