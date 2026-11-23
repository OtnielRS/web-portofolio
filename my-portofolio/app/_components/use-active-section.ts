"use client";

import { useEffect, useState } from "react";
import visibleSection from "./visible-section";

type SectionLink = { href: string; sectionId: string };

export default function useActiveSection(pathname: string, sections: readonly SectionLink[]) {
  const [activeSection, setActiveSection] = useState({ pathname: "/", href: "/" });
  const routeHref = sections.find(section => section.href !== "/" && pathname.startsWith(`${section.href.split("#")[0]}/`))?.href ?? pathname;

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/about") return;
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const headerBottom = document.querySelector(".portfolio-header")?.getBoundingClientRect().bottom ?? 0;
      const readingLine = headerBottom + Math.min(120, window.innerHeight * .15);
      const available = sections.filter(section => (pathname === "/" || section.href.split("#")[0] === pathname) && visibleSection(section.sectionId));
      let current = available[0]?.href ?? routeHref;

      for (const section of available) {
        const element = visibleSection(section.sectionId);
        if (element && element.getBoundingClientRect().top <= readingLine) {
          current = section.href;
        }
      }

      // The final section may be too short to reach the reading line before the page ends.
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        current = available[available.length - 1]?.href ?? current;
      }

      setActiveSection(previous => previous.pathname === pathname && previous.href === current ? previous : { pathname, href: current });
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    }

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname, routeHref, sections]);

  if (pathname !== "/" && pathname !== "/about") return routeHref;
  return activeSection.pathname === pathname ? activeSection.href : routeHref;
}
