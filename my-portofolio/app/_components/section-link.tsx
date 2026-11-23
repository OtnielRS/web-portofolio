"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import scrollToSection from "./scroll-to-section";
import visibleSection from "./visible-section";

export type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  sectionId: string;
  pageHref: string;
};

export default function SectionLink({ sectionId, pageHref, ...props }: SectionLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if ((pathname !== "/" && pathname !== pageHref.split("#")[0]) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || (props.target && props.target !== "_self")) return;
    const section = visibleSection(sectionId);
    if (!section) return;

    event.preventDefault();
    const top = sectionId === "home" ? 0 : section.getBoundingClientRect().top + window.scrollY;
    scrollToSection(top, () => {
      section.scrollTop = 0;
      const hash = `#${sectionId}`;
      if (window.location.hash !== hash) window.history.pushState(window.history.state, "", hash);
      const destination = section.querySelector<HTMLElement>("h1, h2") ?? section;
      const previousTabIndex = destination.getAttribute("tabindex");
      destination.setAttribute("tabindex", "-1");
      destination.focus({ preventScroll: true });
      destination.addEventListener("blur", () => {
        if (previousTabIndex === null) destination.removeAttribute("tabindex");
        else destination.setAttribute("tabindex", previousTabIndex);
      }, { once: true });
    });
  }

  return <Link {...props} href={pathname === "/" ? `/#${sectionId}` : pageHref} onClick={handleClick} />;
}
