"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Arrow from "@/app/_components/arrow";
import ProjectCard from "./project-card";
import { projects } from "./projects";

export default function ProjectCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 0, visible: 2, hasNext: true });

  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const cards = Array.from(element.children) as HTMLElement[];
    const next = Math.max(0, Math.min(cards.length - 1, position.index + direction));
    element.scrollTo({ left: cards[next].offsetLeft - cards[0].offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  const updateIndex = useCallback(() => {
    const element = track.current;
    const first = element?.firstElementChild as HTMLElement | null;
    const second = element?.children[1] as HTMLElement | undefined;
    if (!element || !first) return;
    const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    const visible = Math.max(1, Math.round(element.clientWidth / Math.max(1, step)));
    const index = Math.max(0, Math.min(projects.length - visible, Math.round(element.scrollLeft / Math.max(1, step))));
    const hasNext = element.scrollLeft + element.clientWidth < element.scrollWidth - 2;
    setPosition(previous => previous.index === index && previous.visible === visible && previous.hasNext === hasNext ? previous : { index, visible, hasNext });
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new ResizeObserver(updateIndex);
    observer.observe(element);
    return () => observer.disconnect();
  }, [updateIndex]);

  return (
    <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects">
      <div className="project-carousel-track" ref={track} onScroll={updateIndex} tabIndex={0} aria-label="Project cards; scroll horizontally to browse">
        {projects.map(project => <ProjectCard key={project.name} project={project} />)}
      </div>
      <div className="project-carousel-controls">
        <span aria-live="polite">Projects {position.index + 1}{position.visible > 1 ? `–${Math.min(projects.length, position.index + position.visible)}` : ""} / {projects.length}</span>
        <div>
          <button type="button" onClick={() => move(-1)} disabled={position.index === 0} aria-label="Previous project"><span className="carousel-previous"><Arrow /></span></button>
          <button type="button" onClick={() => move(1)} disabled={!position.hasNext} aria-label="Next project"><Arrow /></button>
        </div>
      </div>
    </div>
  );
}
