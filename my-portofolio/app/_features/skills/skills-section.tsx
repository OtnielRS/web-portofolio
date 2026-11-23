"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { skillGroups } from "./skills";

export default function SkillsSection({ standalone = false }: { standalone?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [environment, setEnvironment] = useState("All");
  const catalogRef = useRef<HTMLDivElement>(null);
  const catalogId = useId();
  const Heading = standalone ? "h1" : "h2";
  const groups = environment === "All" ? skillGroups : skillGroups.filter(group => group.name === environment);
  const total = skillGroups.reduce((count, group) => count + group.skills.length, 0);
  const visibleCount = groups.reduce((count, group) => count + group.skills.length, 0);

  function changeView() {
    setExpanded(value => !value);
    setEnvironment("All");
    if (catalogRef.current) catalogRef.current.scrollTop = 0;
  }

  function filterSkills(name: string) {
    setEnvironment(name);
    if (catalogRef.current) catalogRef.current.scrollTop = 0;
  }

  return (
    <section className="skills-section container" id="skills" aria-labelledby="skills-title" data-expanded={expanded}>
      <div className="skills-heading">
        <div>
        <Heading id="skills-title">Skills<span>.</span></Heading>
        <p>The technologies I work with, from the interface to the API.</p>
        </div>
        <button className="skills-expand" type="button" aria-expanded={expanded} aria-controls={catalogId} onClick={changeView}>
          {expanded ? "Back to overview" : "View all skills"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={expanded ? "m15 6-6 6 6 6" : "M4 12h15m-6-6 6 6-6 6"} /></svg>
        </button>
      </div>
      {expanded && (
        <div className="skills-catalog-tools">
          <div className="skills-filters" role="group" aria-label="Filter skills by environment">
            {["All", ...skillGroups.map(group => group.name)].map(name => (
              <button key={name} type="button" aria-pressed={environment === name} onClick={() => filterSkills(name)}>{name}</button>
            ))}
          </div>
          <p role="status">Showing {visibleCount} of {total} skills{environment === "All" ? " across all environments." : ` in ${environment}.`}</p>
        </div>
      )}
      <div className={`skill-catalog ${expanded ? "skill-catalog-expanded" : "skill-catalog-overview"}`} id={catalogId} ref={catalogRef} role="region" aria-label={expanded ? "Complete skills catalogue" : "Skills overview"} tabIndex={0}>
        {groups.map(group => (
          <div className="skill-environment" key={group.name}>
            <div className="skill-environment-heading"><h3>{group.name}</h3><span>{group.skills.length} skills</span></div>
            <ul>
              {group.skills.slice(0, expanded ? undefined : 2).map(skill => (
                <li className="skill-item" key={skill.name}>
                  <Image className={"monochrome" in skill && skill.monochrome ? "skill-logo skill-logo-monochrome" : "skill-logo"} src={`/skills/${skill.icon}.svg`} alt="" width={24} height={24} />
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
            {!expanded && group.skills.length > 2 && <p className="skill-more">+{group.skills.length - 2} more in the full list</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
