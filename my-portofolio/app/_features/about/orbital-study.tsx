"use client";

import { useEffect, useId, useRef, useState } from "react";

const orbitPath = "M110 0 A110 52 0 1 1 -110 0 A110 52 0 1 1 110 0";

export default function OrbitalStudy() {
  const scene = useRef<HTMLElement>(null);
  const illustration = useRef<SVGSVGElement>(null);
  const [paused, setPaused] = useState(false);
  const earthClip = useId();

  useEffect(() => {
    const element = scene.current;
    const svg = illustration.current;
    if (!element || !svg) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inViewport = false;
    function update() {
      if (inViewport && !paused && !document.hidden && !reducedMotion.matches) svg!.unpauseAnimations();
      else svg!.pauseAnimations();
    }
    const observer = new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; update(); });
    svg.pauseAnimations();
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, [paused]);

  return (
    <figure className="orbital-study" ref={scene}>
      <svg ref={illustration} viewBox="0 0 280 180" role="img" aria-label="Light mode: Earth orbits the Sun. Dark mode: the Moon orbits Earth. Orbital sizes and speeds are illustrative.">
        <defs><clipPath id={earthClip}><circle r="22"/></clipPath></defs>
        <g transform="translate(140 90) rotate(-25)">
          <ellipse rx="110" ry="52" fill="none" stroke="var(--line)" strokeWidth="1"/>
          <g className="orbital-day">
            <animateMotion dur="18s" repeatCount="indefinite" path={orbitPath}/>
            <circle r="9" fill="#438da6"/>
            <ellipse cx="-2" cy="-2" rx="3" ry="5" fill="#8eac84"/>
            <ellipse cx="3" cy="3" rx="2" ry="3" fill="#8eac84"/>
            <circle cx="-3" cy="-4" r="2" fill="#d4e8df" opacity=".6"/>
          </g>
          <g className="orbital-night">
            <animateMotion dur="12s" repeatCount="indefinite" path={orbitPath}/>
            <circle r="7" fill="#d5d9cf"/>
            <circle cx="-2" cy="-2" r="1.7" fill="#a5b0ad"/>
            <circle cx="2" cy="2" r="1.1" fill="#a5b0ad"/>
          </g>
        </g>
        <g className="orbital-day" transform="translate(140 90)">
          <circle r="28" fill="none" stroke="var(--accent)" strokeOpacity=".22"/>
          <circle r="23" fill="#e9a06b"/>
          <circle cx="-5" cy="-5" r="15" fill="#f5bb7c" opacity=".65"/>
        </g>
        <g className="orbital-night" transform="translate(140 90)">
          <circle r="22" fill="#438da6"/>
          <g clipPath={`url(#${earthClip})`} fill="#86a887">
            <ellipse cx="-8" cy="-6" rx="7" ry="12" transform="rotate(-25)"/>
            <ellipse cx="5" cy="12" rx="6" ry="10" transform="rotate(-25)"/>
            <ellipse cx="17" cy="-10" rx="8" ry="6"/>
          </g>
          <path d="M-15 -10Q0 -18 14 -10M-17 7Q-3 0 13 6" fill="none" stroke="#d9ebe9" strokeWidth="2" opacity=".5"/>
        </g>
      </svg>
      <figcaption>
        <span className="orbital-day">Earth around the Sun</span>
        <span className="orbital-night">Moon around Earth</span>
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Play orbital animation" : "Pause orbital animation"}>{paused ? "Play" : "Pause"}</button>
      </figcaption>
    </figure>
  );
}
