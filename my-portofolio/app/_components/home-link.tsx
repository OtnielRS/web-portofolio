"use client";

import SectionLink, { type SectionLinkProps } from "./section-link";

type HomeLinkProps = Omit<SectionLinkProps, "sectionId" | "pageHref">;

export default function HomeLink(props: HomeLinkProps) {
  return <SectionLink {...props} sectionId="home" pageHref="/#home" />;
}
