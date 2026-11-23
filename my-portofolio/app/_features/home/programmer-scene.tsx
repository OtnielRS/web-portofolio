"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/app/_components/theme-toggle";
import PixelWorkspace from "./pixel-workspace";

export default function ProgrammerScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    let inViewport = false;
    const update = () => setVisible(inViewport && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return (
    <figure className="programmer-scene" ref={sceneRef} data-animate={visible && !paused}>
      <div className="pixel-studio"><PixelWorkspace /></div>
      <figcaption className="scene-caption">
        <span className="scene-caption-text"><span className="theme-icon-light">A little code. A little sunshine.</span><span className="theme-icon-dark">A little code. A little moonlight.</span></span>
        <div className="scene-actions">
          <button type="button" className="scene-pause" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play scene" : "Pause scene"}</button>
          <ThemeToggle />
        </div>
      </figcaption>
    </figure>
  );
}
