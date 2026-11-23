"use client";

import { useState } from "react";
import Arrow from "@/app/_components/arrow";

const journey = [
  {
    date: "JUL — NOV 2026",
    title: "Full-stack JavaScript development",
    organization: "Hacktiv8 Indonesia",
    description: "16 weeks of building, testing, and collaborating on full-stack applications.",
    type: "Education",
  },
  {
    date: "APR — AUG 2024",
    title: "Procurement Staff",
    organization: "Panca Nekasa",
    description: "Material planning, supplier analysis, and procurement tracking.",
    type: "Experience",
  },
  {
    date: "MAY — AUG 2022",
    title: "Business Development · Long Tail Analyst",
    organization: "Shopee Indonesia",
    description: "Technical and operational support for 400+ seller accounts.",
    type: "Experience",
  },
  {
    date: "2017 — 2021",
    title: "Bachelor of International Relation",
    organization: "UPN Veteran Jakarta · GPA 3.79",
    description: "International Economics and World Politics.",
    type: "Education",
  },
];

const destinations = [
  { x: 70, y: 280, progress: 0, planet: "earth", year: "2017–2021", name: "UPN Veteran Jakarta" },
  { x: 205, y: 230, progress: .3203798326, planet: "mars", year: "2022", name: "Shopee" },
  { x: 285, y: 105, progress: .6619350629, planet: "jupiter", year: "2024", name: "Panca Nekasa" },
  { x: 430, y: 65, progress: 1, planet: "saturn", year: "2026", name: "Hacktiv8" },
];
const milestones = [...journey].reverse();
const roleLabels = ["International Relation", "Business development", "Procurement", "Full-stack training"];
const flightPath = "M70 280C135 335 185 290 205 230S175 75 285 105S375 170 430 65";

export default function JourneySection() {
  const [active, setActive] = useState(3);
  const entry = milestones[active];
  const destination = destinations[active];
  return (
    <section className="journey-section space-journey container" id="experience" aria-labelledby="journey-title">
      <div className="journey-intro" data-content-motion>
        <h2 id="journey-title">The journey so far<span>.</span></h2>
        <p>A different starting point. The same drive to figure things out.</p>
      </div>
      <div className="journey-flight" data-content-motion>
        <div className="journey-map" role="group" aria-label="Career flight path: select a milestone">
          <svg className="journey-chart" viewBox="0 0 520 360" aria-hidden="true">
            <g className="journey-stars">
              <circle cx="40" cy="45" r="1.5"/><circle cx="165" cy="68" r="2"/><circle cx="380" cy="30" r="1"/>
              <circle cx="480" cy="225" r="1.5"/><circle cx="330" cy="285" r="2"/><circle cx="35" cy="190" r="1"/>
              <path d="M105 115v8m-4-4h8M425 275v10m-5-5h10M350 205v6m-3-3h6" />
            </g>
            <path className="journey-route" d={flightPath} />
            <path className="journey-route-traveled" d={flightPath} pathLength="100" style={{ strokeDashoffset: (1 - destination.progress) * 100 }} />
            <g className="journey-vessel" style={{ transform: `translate(${destination.x}px, ${destination.y - 38}px)` }}>
              <path d="M0-12C-5-7-6-1-5 5L-12 10-10 1-5-3M0-12C5-7 6-1 5 5L12 10 10 1 5-3M-5 5H5L3 9H-3Z" fill="var(--background)" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cy="-2" r="2" fill="currentColor" />
              <path d="m-2 12 2 5 2-5" stroke="currentColor" strokeWidth="1.5" />
            </g>
          </svg>
          {destinations.map((stop, index) => (
            <button className="journey-stop" type="button" key={stop.name} style={{ left: `${stop.x / 520 * 100}%`, top: `${stop.y / 360 * 100}%` }} aria-pressed={active === index} aria-controls="journey-milestone" onClick={() => setActive(index)}>
              <span className={`journey-planet journey-planet-${stop.planet}`} aria-hidden="true" />
              <span className="journey-stop-year">{stop.year}</span>
              <span className="journey-stop-name">{stop.name}</span>
              <span className="journey-stop-role">{roleLabels[index]}</span>
            </button>
          ))}
          <p className="journey-map-caption">Choose a planet to explore a chapter.</p>
        </div>
        <div className="journey-reading">
          <div id="journey-milestone" className="journey-milestone" aria-live="polite" aria-atomic="true">
            <div key={active} className="journey-entry">
            <h3>{entry.title}</h3>
            <p className="journey-organization">{entry.organization}</p>
            <div className="journey-milestone-meta"><span>{entry.date}</span><span>{entry.type}</span></div>
            <p className="journey-description">{entry.description}</p>
            </div>
          </div>
          <div className="journey-flight-controls">
            <p>{destination.year} <span>selected</span></p>
            <div>
              <button type="button" disabled={active === 0} onClick={() => setActive(index => index - 1)} aria-label="Earlier career milestone"><span className="journey-previous"><Arrow /></span> Earlier</button>
              <button type="button" disabled={active === milestones.length - 1} onClick={() => setActive(index => index + 1)} aria-label="Later career milestone">Later <Arrow /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
