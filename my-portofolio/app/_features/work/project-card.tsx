import Arrow from "@/app/_components/arrow";
import ProjectArt from "./project-art";
import ProjectGallery from "./project-gallery";
import type { Project } from "./projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project">
      <a
        className="project-image-link"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name} live project`}
      >
        <ProjectArt type={project.art} />
        <span className="project-open"><Arrow diagonal /></span>
      </a>
      <div className="project-meta">
        <span>{project.role}</span>
        {project.date && <time>{project.date}</time>}
      </div>
      <h3>
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          {project.name}<Arrow diagonal />
        </a>
      </h3>
      <p className="project-kind">{project.kind}</p>
      <p className="project-description">{project.text}</p>
      {project.art === "social" && <ProjectGallery />}
      {project.stack.length > 0 && (
        <ul className="tags" aria-label={`${project.name} technologies`}>
          {project.stack.map(technology => <li key={technology}>{technology}</li>)}
        </ul>
      )}
    </article>
  );
}
