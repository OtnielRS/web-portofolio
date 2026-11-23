"use client";

import { usePathname } from "next/navigation";
import useActiveSection from "./use-active-section";
import ThemeToggle from "./theme-toggle";
import SectionLink from "./section-link";

const navigation = [
  { href: "/", label: "Home", sectionId: "home" },
  { href: "/work", label: "Work", sectionId: "work" },
  { href: "/about", label: "About", sectionId: "about" },
  { href: "/contact", label: "Contact", sectionId: "contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const activeHref = useActiveSection(pathname, navigation);

  return (
    <header className="portfolio-header">
      <nav className="portfolio-navigation" aria-label="Main navigation">
        {navigation.map(({ href, label, sectionId }) => (
          <SectionLink
            key={href}
            pageHref={href === "/" ? "/#home" : href}
            sectionId={sectionId}
            className="portfolio-navigation-link"
            aria-current={activeHref === href ? (pathname === "/" && href !== "/" ? "location" : "page") : undefined}
          >
            {label}
          </SectionLink>
        ))}
        <ThemeToggle compact />
      </nav>
    </header>
  );
}
