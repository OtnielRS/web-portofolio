"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const screens = ["Sign in", "Home feed", "Profile", "Create account"];

export default function ProjectGallery({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <button className="project-screens-button" type="button" aria-label="View Tempat Gosip screenshots" aria-haspopup="dialog" onClick={() => { setActive(0); setOpen(true); }}>
        {compact ? "Screens" : "View app screenshots"} <span aria-hidden="true">↗</span>
      </button>
      {open && createPortal(
        <dialog ref={dialogRef} className="project-gallery-modal" aria-labelledby={titleId}
          onCancel={() => setOpen(false)} onClose={() => setOpen(false)}
          onClick={event => { if (event.target === event.currentTarget) setOpen(false); }}
          onKeyDown={event => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              setActive(index => (index + (event.key === "ArrowRight" ? 1 : screens.length - 1)) % screens.length);
            }
          }}>
          <div className="project-gallery-content">
            <div className="project-gallery-heading">
              <h2 id={titleId}>Tempat Gosip <span>App screenshots</span></h2>
              <button type="button" className="gallery-close" onClick={() => setOpen(false)} aria-label="Close screenshots">×</button>
            </div>
            <div className="project-gallery-viewer">
              <Image src={`/projects/tempat-gosip-${active + 1}.jpeg`} alt={`Tempat Gosip ${screens[active].toLowerCase()} screen`} width={738} height={1599} sizes="(max-width: 600px) 75vw, 360px" />
            </div>
            <p className="project-gallery-status" aria-live="polite">{active + 1} / {screens.length} · {screens[active]}</p>
            <div className="project-gallery-select" aria-label="Choose an app screenshot">
              {screens.map((label, index) => <button type="button" key={label} aria-pressed={active === index} onClick={() => setActive(index)}>{label}</button>)}
            </div>
          </div>
        </dialog>, document.body,
      )}
    </>
  );
}
