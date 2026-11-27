import Link from "next/link";
import Arrow from "@/app/_components/arrow";
import ProjectPreview from "./project-preview";
import { projects } from "./projects";
import { engineeringNotes } from "./engineering-notes";
import ProjectGallery from "./project-gallery";
import ProjectScreenshots from "./project-screenshots";
import { projectOverviews } from "./project-overviews";

export default function ProjectDetails({ art }: { art: "bastion" | "chess" | "store" | "social" | "animal" }) {
  const project = projects.find(item => item.art === art)!;
  const notes = engineeringNotes.find(item => item.art === art)!;
  const overview = projectOverviews[art];
  return (
    <div className="page-content project-page">
      <section className="project-case container" aria-labelledby="project-case-title">
        <Link className="project-case-back" href="/work/all"><span className="carousel-previous"><Arrow /></span> All projects</Link>
        <div className="project-case-intro" data-content-motion>
          <div>
            <h1 id="project-case-title">{project.name}<span>.</span></h1>
            <p className="project-case-focus">{notes.focus}</p>
            <p className="project-case-scope">{notes.scope}</p>
            {project.stack.length > 0 && <ul className="tags" aria-label={`${project.name} technologies`}>{project.stack.map(technology => <li key={technology}>{technology}</li>)}</ul>}
            <a className="button button-primary" href={project.url} target="_blank" rel="noopener noreferrer">Open live demo <Arrow diagonal /></a>
          </div>
          <div className="project-case-art">
            <ProjectPreview art={project.art} name={project.name} />
            <p>Click the image to play the project video.</p>
            {art === "social" && <ProjectGallery />}
          </div>
        </div>
        <ProjectScreenshots art={art} name={project.name} />
        <div className="project-case-sections" data-content-motion>
          <article><h2>Project overview</h2><p>{overview.summary}</p><ul>{overview.features.map(feature => <li key={feature}>{feature}</li>)}</ul></article>
          <article><h2>{overview.experienceTitle}</h2><p>{overview.experience}</p><h2>Application features</h2><p>{overview.details}</p><h2>{overview.accessTitle}</h2><p>{overview.access}</p></article>
        </div>
        <div className="project-case-sections" data-content-motion>
          <article><h2>My contribution</h2><p>{notes.contribution}</p><ul>{notes.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></article>
          <article><h2>The engineering challenge</h2><p>{notes.challenge}</p><h2>Implementation approach</h2><p>{notes.approach}</p><h2>Validation &amp; resilience</h2><p>{notes.validation}</p></article>
        </div>
      </section>
    </div>
  );
}
