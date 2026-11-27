import Arrow from "@/app/_components/arrow";
import ProjectPreview from "./project-preview";
import ProjectGallery from "./project-gallery";
import type { Project } from "./projects";
import Link from "next/link";
import { engineeringNotes } from "./engineering-notes";

export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const notes = engineeringNotes.find(item => item.art === project.art);
  return (
    <article className={`project${compact ? " project-compact" : ""}`} id={`project-${project.art}`}>
      <ProjectPreview project={project} compact={compact} />
      <div className="project-card-copy">
      {(project.role || project.date) && <div className="project-meta">
        {project.role && <span>{project.role}</span>}
        {project.date && <time>{project.date}</time>}
      </div>}
      <h3>
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          {project.name}<Arrow diagonal />
        </a>
      </h3>
      <p className="project-kind">{project.kind}</p>
      <p className="project-description">{project.text}</p>
      {compact && project.stack.length > 0 && <p className="project-stack-summary">{project.stack.slice(0, 3).join(" · ")}</p>}
      </div>
      <div className="project-actions">
        {notes && <Link href={notes.href}>Project details <Arrow /></Link>}
        <a href={project.url} target="_blank" rel="noopener noreferrer">Live demo <Arrow diagonal /></a>
        {project.art === "social" && <ProjectGallery compact={compact} />}
      </div>
      {!compact && project.stack.length > 0 && (
        <ul className="tags" aria-label={`${project.name} technologies`}>
          {project.stack.map(technology => <li key={technology}>{technology}</li>)}
        </ul>
      )}
    </article>
  );
}
