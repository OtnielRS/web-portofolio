import Link from "next/link";
import Arrow from "@/app/_components/arrow";
import ProjectArt from "./project-art";
import { projects } from "./projects";
import { engineeringNotes } from "./engineering-notes";
import ProjectGallery from "./project-gallery";

export default function ProjectDetails({ art }: { art: "bastion" | "chess" | "store" | "social" | "animal" }) {
  const project = projects.find(item => item.art === art)!;
  const notes = engineeringNotes.find(item => item.art === art)!;
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
            <ProjectArt type={project.art} />
            <p>{art === "social" ? "Styled cover combining four application screens" : "Actual application screenshot"}</p>
            {art === "social" && <ProjectGallery />}
          </div>
        </div>
        <div className="project-case-sections" data-content-motion>
          <article><h2>{notes.overviewOnly ? "Project overview" : "My contribution"}</h2><p>{notes.contribution}</p><ul>{notes.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></article>
          <article><h2>{notes.overviewOnly ? "Learning experience" : "The engineering challenge"}</h2><p>{notes.challenge}</p><h2>{notes.overviewOnly ? "Application features" : "Implementation approach"}</h2><p>{notes.approach}</p><h2>{notes.overviewOnly ? "Parent access" : "Validation & resilience"}</h2><p>{notes.validation}</p></article>
        </div>
      </section>
    </div>
  );
}
