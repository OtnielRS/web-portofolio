"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";

type MotionState = {
  key: number | null;
  size: number | null;
  animation: Animation | null;
  pending: (() => void) | null;
  phase: "idle" | "out" | "in";
};

function stop(state: MotionState) {
  if (state.animation) {
    state.animation.onfinish = null;
    state.animation.cancel();
    state.animation = null;
  }
  state.phase = "idle";
}

export default function useProjectMotion(pageKey: number, pageSize = 1) {
  const pageRef = useRef<HTMLDivElement>(null);
  const motion = useRef<MotionState>({ key: null, size: null, animation: null, pending: null, phase: "idle" });

  useLayoutEffect(() => {
    const state = motion.current;
    const previous = state.key;
    const previousSize = state.size;
    state.key = pageKey;
    state.size = pageSize;
    const page = pageRef.current;
    if (previous === null || (previous === pageKey && previousSize === pageSize) || !page) return;
    stop(state);
    if (state.pending) {
      const pending = state.pending;
      // Viewport regrouping can cancel an exit. Settle its latest destination
      // after the layout commit, even when the first visible index stays the same.
      queueMicrotask(() => {
        if (state.pending !== pending) return;
        state.pending = null;
        flushSync(pending);
      });
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof page.animate !== "function") return;
    const incoming = page.animate([
      { opacity: .45, transform: "translateY(12px)" },
      { opacity: 1, transform: "translateY(0)" },
    ], { duration: 720, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "none" });
    state.animation = incoming;
    state.phase = "in";
    incoming.onfinish = () => {
      if (state.animation === incoming) { state.animation = null; state.phase = "idle"; }
    };
  }, [pageKey, pageSize]);

  useEffect(() => {
    const state = motion.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function changePreference() {
      if (!preference.matches) return;
      const pending = state.pending;
      state.pending = null;
      stop(state);
      pending?.();
    }
    preference.addEventListener("change", changePreference);
    return () => {
      preference.removeEventListener("change", changePreference);
      state.pending = null;
      stop(state);
    };
  }, []);

  function transitionTo(nextKey: number, commit: () => void) {
    const state = motion.current;
    const page = pageRef.current;
    state.pending = commit;
    if (nextKey === state.key || !page || typeof page.animate !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      state.pending = null;
      stop(state);
      commit();
      return;
    }
    // Repeated clicks update the pending destination instead of stacking animations.
    if (state.phase === "out") return;
    const current = window.getComputedStyle(page);
    const from = { opacity: current.opacity, transform: current.transform };
    stop(state);
    const outgoing = page.animate([from, { opacity: .45, transform: "translateY(-4px)" }], { duration: 180, easing: "ease-out", fill: "forwards" });
    state.animation = outgoing;
    state.phase = "out";
    outgoing.onfinish = () => {
      const latest = state.pending;
      state.pending = null;
      if (latest) flushSync(latest);
    };
  }

  return { pageRef, transitionTo };
}
