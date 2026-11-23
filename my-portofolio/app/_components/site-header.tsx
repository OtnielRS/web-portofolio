"use client";

import { usePathname } from "next/navigation";
import useActiveSection from "./use-active-section";
import ThemeToggle from "./theme-toggle";
import SectionLink from "./section-link";
import { useLayoutEffect, useRef } from "react";

const navigation = [
  { href: "/", label: "Home", sectionId: "home" },
  { href: "/work", label: "Projects", sectionId: "work" },
  { href: "/about", label: "About", sectionId: "about" },
  { href: "/skills", label: "Skills", sectionId: "skills" },
  { href: "/about#experience", label: "Experience", sectionId: "experience" },
  { href: "/contact", label: "Contact", sectionId: "contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const activeHref = useActiveSection(pathname, navigation);
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const updateHeight = () => document.documentElement.style.setProperty("--header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="portfolio-header" ref={headerRef}>
      <nav className="portfolio-navigation" aria-label="Main navigation">
        <svg className="navigation-orbit" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
          <ellipse cx="490" cy="30" rx="470" ry="23" />
          <path d="M30 30H930" />
        </svg>
        {navigation.map(({ href, label, sectionId }) => (
          <SectionLink
            key={href}
            pageHref={href === "/" ? "/#home" : href}
            sectionId={sectionId}
            className="portfolio-navigation-link"
            aria-current={activeHref === href ? ((pathname === "/" && href !== "/") || href.includes("#") ? "location" : "page") : undefined}
          >
            <span className={`navigation-planet navigation-planet-${sectionId}`} aria-hidden="true" />
            <span className="navigation-label">{label}
              <svg className="navigation-shuttle" width="23" height="15" viewBox="0 0 32 20" fill="none" aria-hidden="true">
                <path className="shuttle-exhaust" d="M12 14 16 19 20 14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16 1c-3 3-4 7-4 12l-6 3 1-6 5-3M16 1c3 3 4 7 4 12l6 3-1-6-5-3M12 13h8l-1 3h-6Z" fill="var(--background)" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M14 7h4v3h-4Z" fill="currentColor" />
              </svg>
            </span>
          </SectionLink>
        ))}
        <ThemeToggle compact />
      </nav>
    </header>
  );
}
