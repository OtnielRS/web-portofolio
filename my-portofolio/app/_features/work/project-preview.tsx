"use client";

import { useEffect, useRef, useState } from "react";
import ProjectArt from "./project-art";
import { projectVideoUrl } from "./project-videos";

export default function ProjectPreview({ art, name }: { art: string; name: string }) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const src = projectVideoUrl(art);

  useEffect(() => {
    if (!playing || !src || !frame.current) return;
    const player = frame.current;
    // Restore the source when a cached route becomes active again. Clearing it
    // in cleanup also stops playback when React hides or unmounts the route.
    player.src = src;
    const stop = () => setPlaying(false);
    const onVisibility = () => { if (document.hidden) stop(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !document.fullscreenElement) stop();
    });
    if (container.current) observer.observe(container.current);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      player.removeAttribute("src");
    };
  }, [playing, src]);

  return (
    <div ref={container} className={`project-image-link project-video-preview${playing ? " is-playing" : ""}`}>
      {playing && src ? <>
        <iframe
          ref={frame}
          title={`${name} video demo`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <button type="button" className="project-video-close" onClick={() => setPlaying(false)} aria-label={`Close ${name} video`}>×</button>
      </> : <>
        <ProjectArt type={art} />
        {src && <button type="button" className="project-video-poster" onClick={() => setPlaying(true)} aria-label={`Play ${name} video demo`}>
          <span className="project-video-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z" fill="currentColor" /></svg></span>
        </button>}
      </>}
    </div>
  );
}
