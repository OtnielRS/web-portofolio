"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Arrow from "./arrow";
import styles from "./site-header.module.css";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={`container ${styles.header}`}>
      <Link className={styles.wordmark} href="/" aria-label="Otniel — home">
        <svg width="44" height="36" viewBox="0 0 48 40" fill="none" aria-hidden="true">
          <ellipse cx="24" cy="20" rx="23" ry="12" transform="rotate(-28 24 20)" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="24" cy="20" r="7" fill="var(--accent)" />
          <circle cx="42" cy="8" r="3" fill="currentColor" />
        </svg>
        <span>otniel<span className={styles.dot}>.</span></span>
      </Link>
      <nav className={styles.navigation} aria-label="Main navigation">
        {navigation.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={styles.link}
            aria-current={pathname === href ? "page" : undefined}
          >
            {label}
            {href === "/contact" && <Arrow diagonal />}
          </Link>
        ))}
      </nav>
    </header>
  );
}
