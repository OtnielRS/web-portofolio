"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useActiveSection from "./use-active-section";
import ThemeToggle from "./theme-toggle";
import HomeLink from "./home-link";

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
        {navigation.map(({ href, label }) => (
          href === "/" ? (
            <HomeLink key={href} className="portfolio-navigation-link" aria-current={activeHref === "/" ? "page" : undefined}>
              {label}
            </HomeLink>
          ) : <Link
            key={href}
            href={href}
            className="portfolio-navigation-link"
            aria-current={activeHref === href ? (pathname === "/" && href !== "/" ? "location" : "page") : undefined}
          >
            {label}
          </Link>
        ))}
        <ThemeToggle compact />
      </nav>
    </header>
  );
}
