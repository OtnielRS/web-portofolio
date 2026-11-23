"use client";

import { useLayoutEffect, type RefObject } from "react";

type RevealState = { phase: "visible" | "pending" | "animating"; animation?: Animation; intersecting?: boolean };

export default function useContentMotion(rootRef: RefObject<HTMLElement | null>, route: string) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const states = new Map<HTMLElement, RevealState>();

    function outside(target: HTMLElement) {
      const rect = target.getBoundingClientRect();
      return rect.bottom <= 0 || rect.top >= window.innerHeight;
    }
    function cancel(state: RevealState) {
      const animation = state.animation;
      state.animation = undefined;
      animation?.cancel();
    }
    function arm(target: HTMLElement, state: RevealState) {
      if (preference.matches || typeof target.animate !== "function" || target.contains(document.activeElement)) return;
      cancel(state);
      state.phase = "pending";
      // Animation effects do not change React-owned HTML attributes during hydration.
      state.animation = target.animate([{ opacity: 0 }, { opacity: 0 }], { duration: 1, fill: "forwards" });
    }
    function reveal(target: HTMLElement, state: RevealState, animated = true) {
      cancel(state);
      state.phase = "visible";
      if (!animated || preference.matches || typeof target.animate !== "function") return;
      state.phase = "animating";
      const animation = target.animate([
        { opacity: 0, transform: "translateY(18px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 1100, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "none" });
      state.animation = animation;
      animation.addEventListener("finish", () => {
        if (state.animation !== animation) return;
        state.animation = undefined;
        state.phase = "visible";
        if (target.getClientRects().length > 0 && state.intersecting === false) arm(target, state);
      }, { once: true });
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        const state = states.get(target);
        if (!state || target.getClientRects().length === 0) continue;
        state.intersecting = entry.isIntersecting;
        if (entry.isIntersecting && state.phase === "pending") reveal(target, state);
        else if (!entry.isIntersecting && state.phase === "visible") arm(target, state);
      }
    }, { threshold: .08 });

    function scan() {
      if (!root) return;
      for (const [target, state] of states) {
        if (root.contains(target)) continue;
        cancel(state);
        observer.unobserve(target);
        states.delete(target);
      }
      root.querySelectorAll<HTMLElement>("[data-content-motion]").forEach(target => {
        if (states.has(target) || target.getClientRects().length === 0) return;
        const state: RevealState = { phase: "visible" };
        states.set(target, state);
        // Keep CSS first-paint motion for content already on screen.
        if (outside(target)) arm(target, state);
        observer.observe(target);
      });
    }
    scan();
    const mutations = typeof MutationObserver === "undefined" ? null : new MutationObserver(scan);
    mutations?.observe(root, { childList: true, subtree: true });

    function focusContent(event: FocusEvent) {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-content-motion]");
      const state = target ? states.get(target) : undefined;
      if (target && state) reveal(target, state, false);
    }
    function changePreference() {
      for (const [target, state] of states) {
        if (preference.matches) reveal(target, state, false);
        else if (target.getClientRects().length > 0 && outside(target)) arm(target, state);
      }
    }
    root.addEventListener("focusin", focusContent);
    preference.addEventListener("change", changePreference);
    return () => {
      observer.disconnect();
      mutations?.disconnect();
      root.removeEventListener("focusin", focusContent);
      preference.removeEventListener("change", changePreference);
      for (const state of states.values()) cancel(state);
      states.clear();
    };
  }, [rootRef, route]);
}
