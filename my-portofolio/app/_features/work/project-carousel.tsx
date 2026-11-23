"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import useProjectMotion from "@/app/_components/use-project-motion";
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
  const [selection, setSelection] = useState({ index: 0, changed: false });
  const requested = useRef(0);
  const { index: selected, changed } = selection;
  const pageSize = narrow ? 1 : 2;
  const first = Math.floor(selected / pageSize) * pageSize;
  const { pageRef, transitionTo } = useProjectMotion(first, pageSize);
  const end = Math.min(first + pageSize, projects.length);
  const range = `Projects ${first + 1}${end > first + 1 ? `–${end}` : ""} / ${projects.length}`;
  function changeProject(index: number) {
    requested.current = index;
    transitionTo(Math.floor(index / pageSize) * pageSize, () => setSelection({ index, changed: true }));
  }
  function movePage(direction: number) {
    const pendingFirst = Math.floor(requested.current / pageSize) * pageSize;
    changeProject(Math.max(0, Math.min(projects.length - 1, pendingFirst + direction * pageSize)));
  }

  return (
    <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects">
      <div className="project-pages" id="project-pages" key={first} ref={pageRef} data-page-change={changed} data-content-motion>
        {projects.slice(first, end).map(project => <ProjectCard key={project.name} project={project} compact />)}
      </div>
      <div className="project-carousel-controls">
        {showIndex ? <label className="project-chooser">
          <span className="sr-only">Choose a project</span>
          <select value={selected} onChange={event => changeProject(Number(event.target.value))} aria-controls="project-pages">
            {projects.map((project, index) => <option key={project.art} value={index}>{project.name}</option>)}
          </select>
          <span className="sr-only" aria-live="polite">{range}</span>
        </label> : <span aria-live="polite">{range}</span>}
        <div>
          <button type="button" onClick={() => movePage(-1)} disabled={first === 0} aria-controls="project-pages" aria-label="Previous projects"><span className="carousel-previous"><Arrow /></span></button>
          <button type="button" onClick={() => movePage(1)} disabled={end === projects.length} aria-controls="project-pages" aria-label="Next projects"><Arrow /></button>
        </div>
      </div>
    </div>
  );
}
