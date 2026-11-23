"use client";

import Image from "next/image";
import { useState } from "react";

const planets = [
  { name: "Sun", color: "#d96a20", note: "Our solar system’s star. A reminder to stay curious.", size: 14 },
  { name: "Earth", color: "#287a94", note: "Our little home in a very big universe.", size: 10 },
  { name: "Saturn", color: "#a27b42", note: "A different perspective can reveal something remarkable.", size: 12 },
];

export default function SolarSystem() {
  const [selected, setSelected] = useState(0);
  return <figure className="solar-system"><div className="solar-image"><Image src="/solar-system.png" alt="The Sun and eight planets arranged along delicate elliptical orbits, with Saturn’s rings and a blue Earth" width={1536} height={1024} priority sizes="(max-width: 700px) 100vw, 48vw"/></div><div className="solar-controls" role="group" aria-label="Explore the solar system">{planets.map((planet,index)=><button key={planet.name} aria-pressed={selected===index} onClick={()=>setSelected(index)}><span style={{background:planet.color,width:planet.size,height:planet.size}}/>{planet.name}</button>)}</div><figcaption aria-live="polite">{planets[selected].note}</figcaption></figure>;
}
