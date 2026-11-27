"use client";

import Image, { type StaticImageData } from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import Arrow from "@/app/_components/arrow";
import "./screenshot-carousel.css";

type Screenshot = { src: StaticImageData; title: string; caption: string };

export default function ScreenshotCarousel({ screens, name }: { screens: Screenshot[]; name: string }) {
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const slideId = useId();
  if (!screens.length) return null;
  const screen = screens[index];
  function move(delta: number) {
    setIndex(current => Math.max(0, Math.min(screens.length - 1, current + delta)));
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.key === "Home") setIndex(0);
    else if (event.key === "End") setIndex(screens.length - 1);
    else move(event.key === "ArrowRight" ? 1 : -1);
  }
  return (
    <div className="screenshot-carousel" role="region" aria-roledescription="carousel" aria-label={`${name} screenshots`} onKeyDown={onKeyDown}>
      <figure id={slideId} aria-roledescription="slide" aria-label={`${index + 1} of ${screens.length}`}>
        <a className="screenshot-stage" href={screen.src.src} target="_blank" rel="noopener noreferrer" aria-label={`View original ${screen.title.toLowerCase()} screenshot (opens in a new tab)`}
          onTouchStart={event => {
            touch.current = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
          }}
          onTouchCancel={() => { touch.current = null; }}
          onTouchEnd={event => {
            const start = touch.current;
            touch.current = null;
            if (!start || !event.changedTouches.length) return;
            const dx = start.x - event.changedTouches[0].clientX;
            const dy = start.y - event.changedTouches[0].clientY;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
              event.preventDefault();
              move(dx > 0 ? 1 : -1);
            }
          }}>
          <Image key={screen.src.src} src={screen.src} alt={`${name}: ${screen.title}`} fill sizes="(max-width: 700px) 90vw, (max-width: 1400px) 92vw, 1320px" />
        </a>
        <figcaption aria-live="polite" aria-atomic="true">
          <h3>{screen.title}</h3><p>{screen.caption}</p>
        </figcaption>
      </figure>
      <div className="screenshot-controls">
        <p>{index + 1} / {screens.length} screenshots</p>
        <div>
          <button type="button" aria-label="Previous screenshot" aria-controls={slideId} disabled={index === 0} onClick={() => move(-1)}><span className="screenshot-previous"><Arrow /></span></button>
          <button type="button" aria-label="Next screenshot" aria-controls={slideId} disabled={index === screens.length - 1} onClick={() => move(1)}><Arrow /></button>
        </div>
      </div>
      <div className="screenshot-thumbnails" role="group" aria-label="Choose a screenshot">
        {screens.map((item, itemIndex) => <button key={item.src.src} type="button" aria-label={`Show ${item.title.toLowerCase()}`} aria-pressed={index === itemIndex} aria-controls={slideId} onClick={() => setIndex(itemIndex)}>
          <span className="screenshot-thumbnail-image"><Image src={item.src} alt="" fill sizes="(max-width: 700px) 28vw, 200px" /></span>
          <span>{item.title}</span>
        </button>)}
      </div>
    </div>
  );
}
