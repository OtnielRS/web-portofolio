"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

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
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    if (sectionId === "home") {
      window.scrollTo({ top: 0, left: 0, behavior });
    } else {
      section.scrollIntoView({ behavior, block: "start" });
    }
  }

  return <Link {...props} href={pathname === "/" ? `/#${sectionId}` : pageHref} onClick={handleClick} />;
}
