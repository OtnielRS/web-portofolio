"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import scrollToSection from "./scroll-to-section";

export type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  sectionId: string;
  pageHref: string;
};

export default function SectionLink({ sectionId, pageHref, ...props }: SectionLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/" || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || (props.target && props.target !== "_self")) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    event.preventDefault();
    const top = sectionId === "home" ? 0 : section.getBoundingClientRect().top + window.scrollY;
    scrollToSection(top);
  }

  return <Link {...props} href={pathname === "/" ? `/#${sectionId}` : pageHref} onClick={handleClick} />;
}
