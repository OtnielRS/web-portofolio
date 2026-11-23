"use client";

import { useState, useSyncExternalStore } from "react";
import Arrow from "@/app/_components/arrow";
import ProjectCard from "./project-card";
import { projects } from "./projects";

function subscribeToViewport(notify: () => void) {
  const query = window.matchMedia("(max-width: 700px)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
function isNarrow() { return window.matchMedia("(max-width: 700px)").matches; }
function serverIsNarrow() { return false; }

export default function ProjectCarousel({ showIndex = false }: { showIndex?: boolean }) {
  const narrow = useSyncExternalStore(subscribeToViewport, isNarrow, serverIsNarrow);
  const [selected, setSelected] = useState(0);
  const pageSize = narrow ? 1 : 2;
  const first = Math.floor(selected / pageSize) * pageSize;
  const end = Math.min(first + pageSize, projects.length);
  const range = `Projects ${first + 1}${end > first + 1 ? `–${end}` : ""} / ${projects.length}`;

  return (
    <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects">
      <div className="project-pages" id="project-pages" key={first}>
        {projects.slice(first, end).map(project => <ProjectCard key={project.name} project={project} compact />)}
      </div>
      <div className="project-carousel-controls">
        {showIndex ? <label className="project-chooser">
          <span className="sr-only">Choose a project</span>
          <select value={selected} onChange={event => setSelected(Number(event.target.value))} aria-controls="project-pages">
            {projects.map((project, index) => <option key={project.art} value={index}>{project.name}</option>)}
          </select>
          <span className="sr-only" aria-live="polite">{range}</span>
        </label> : <span aria-live="polite">{range}</span>}
        <div>
          <button type="button" onClick={() => setSelected(Math.max(0, first - pageSize))} disabled={first === 0} aria-controls="project-pages" aria-label="Previous projects"><span className="carousel-previous"><Arrow /></span></button>
          <button type="button" onClick={() => setSelected(end)} disabled={end === projects.length} aria-controls="project-pages" aria-label="Next projects"><Arrow /></button>
        </div>
      </div>
    </div>
  );
}