import { projects } from "./projects";
import ProjectCard from "./project-card";
import ProjectGallery from "./project-gallery";

export default function WorkSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section className="work-section container" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <Heading id="work-title">Selected work<span>.</span></Heading>
        <p>Ideas brought down to Earth.</p>
        <div className="mini-system" aria-hidden="true"><i/><i/><i/><i/><i/></div>
      </div>
      <div className="project-grid">
        {projects.map(project => <ProjectCard key={project.name} project={project} />)}
      </div>
      <ProjectGallery />
      <p className="art-disclosure">
        Bastionfall, Chess, and Animal Quiz show actual app screenshots. Tempat Gosip combines
        four app screens in a styled mockup; originals are available above. Alice Store uses illustrative cover artwork.
      </p>
    </section>
  );
}
