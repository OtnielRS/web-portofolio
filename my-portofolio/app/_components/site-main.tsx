"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import useContentMotion from "./use-content-motion";

const screenRoutes = new Set(["/", "/work", "/about", "/skills", "/contact"]);

export default function SiteMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  useContentMotion(mainRef, pathname);

  useLayoutEffect(() => {
    // A route change must not inherit horizontal or vertical scroll from another page.
    // Fragment destinations are left to Next's hash navigation.
    window.scrollTo({ top: window.location.hash ? window.scrollY : 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return <main id="main" ref={mainRef} tabIndex={-1} data-screen-flow={screenRoutes.has(pathname)} data-route={pathname}>{children}</main>;
}
