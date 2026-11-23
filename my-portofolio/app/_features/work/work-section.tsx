import { projects } from "./projects";
import ProjectCard from "./project-card";
import ProjectCarousel from "./project-carousel";
import Link from "next/link";
import Arrow from "@/app/_components/arrow";

export default function WorkSection({ standalone = false, screen = false }: { standalone?: boolean; screen?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className={`work-section container${screen ? " screen-work" : ""}`} id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <Heading id="work-title">Selected projects<span>.</span></Heading>
        <p>Ideas brought down to Earth.</p>
        <div className="mini-system" aria-hidden="true"><i/><i/><i/><i/><i/></div>
      </div>
      <div className={screen ? "work-screen-body" : undefined}>
        {screen ? <ProjectCarousel showIndex={standalone} /> : <div className="project-grid">
          {projects.map(project => <ProjectCard key={project.name} project={project} />)}
        </div>}
        {screen && !standalone && <Link className="work-details-link" href="/work">View all projects <Arrow diagonal /></Link>}
        {!screen && <p className="art-disclosure">
          Bastionfall, Chess, Animal Quiz, and Alice Store show actual app screenshots. Tempat Gosip combines
          four app screens in a styled mockup; use its screenshot button to explore the originals.
        </p>}
      </div>
    </section>
  );
}
