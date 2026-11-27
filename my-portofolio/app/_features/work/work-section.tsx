import { projects } from "./projects";
import ProjectCard from "./project-card";
import ProjectCarousel from "./project-carousel";
import Link from "next/link";
import Arrow from "@/app/_components/arrow";

export default function WorkSection({ standalone = false, screen = false, title = "Selected projects" }: { standalone?: boolean; screen?: boolean; title?: string }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className={`work-section container${screen ? " screen-work" : ""}`} id="projects" aria-labelledby="work-title">
      <div className="section-heading" data-content-motion>
        <Heading id="work-title">{title}<span>.</span></Heading>
        <p>Ideas brought down to Earth.</p>
        <div className="mini-system" aria-hidden="true"><i/><i/><i/><i/><i/></div>
      </div>
      <div className={screen ? "work-screen-body" : undefined}>
        {screen ? <ProjectCarousel showIndex={standalone} /> : <div className="project-grid" data-content-motion>
          {projects.map(project => <ProjectCard key={project.name} project={project} />)}
        </div>}
        {screen && <Link className="work-details-link" href="/work/all">View all projects <Arrow diagonal /></Link>}
        {!screen && <p className="art-disclosure">
          Bastionfall, Chess, Animal Quiz, and Alice Store show actual app screenshots. Tempat Gosip combines
          four app screens in a styled mockup; use its screenshot button to explore the originals.
        </p>}
      </div>
    </section>
  );
}
