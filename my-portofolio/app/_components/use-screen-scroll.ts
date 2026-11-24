"use client";

import { useEffect, type RefObject } from "react";
import installScreenScroll from "./screen-scroll";

export default function useScreenScroll(rootRef: RefObject<HTMLElement | null>, route: string) {
  useEffect(() => {
    if (rootRef.current) return installScreenScroll(rootRef.current);
  }, [rootRef, route]);
}
