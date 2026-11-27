"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "@/app/_components/arrow";
import ProjectArt from "./project-art";
import { projectVideos } from "./project-videos";
import type { Project } from "./projects";

export default function ProjectPreview({ project, compact = false, linkFallback = true }: { project: Project; compact?: boolean; linkFallback?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const video = projectVideos[project.art];

  useEffect(() => {
    const player = videoRef.current;
    if (!playing || !player) return;
    player.focus({ preventScroll: true });
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      if (!entries[0]?.isIntersecting) player.pause();
    });
    observer?.observe(player);
    function pauseWhenHidden() { if (document.visibilityState === "hidden") player!.pause(); }
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      player.pause();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, [playing]);

  if (!video) {
    if (!linkFallback) return <ProjectArt type={project.art} />;
    return <a className="project-image-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name} live project`}>
      <ProjectArt type={project.art} />
      {compact && <span className="project-preview-label">App screenshot</span>}
      <span className="project-open"><Arrow diagonal /></span>
    </a>;
  }

  return (
    <div className="project-image-link project-video">
      <div className="project-art project-video-frame">
        {playing ? <video ref={videoRef} data-project-video controls autoPlay playsInline preload="none" poster={video.poster} tabIndex={0} aria-label={`${project.name} video demonstration`}
          onPlay={event => {
            for (const other of document.querySelectorAll<HTMLVideoElement>("video[data-project-video]")) {
              if (other !== event.currentTarget) other.pause();
            }
          }}>
          <source src={video.src} type="video/mp4" />
          Your browser does not support embedded video. <a href={video.src}>Open the project video</a>.
        </video> : <button type="button" className="project-video-poster" onClick={() => setPlaying(true)} aria-label={`Play ${project.name} video`}>
          <ProjectArt type={project.art} />
          <span className="project-video-play" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7Z" /></svg></span>
          {compact && <span className="project-preview-label">{project.art === "social" ? "Styled cover" : "App screenshot"}</span>}
        </button>}
      </div>
    </div>
  );
}
