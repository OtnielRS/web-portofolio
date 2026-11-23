let cancelScroll: (() => void) | undefined;

/** A deliberate section-to-section flight, interruptible by the visitor. */
export default function scrollToSection(top: number, onComplete?: () => void) {
  cancelScroll?.();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top, left: 0, behavior: "instant" });
    onComplete?.();
    return;
  }

  const root = document.documentElement;
  const previousSnap = root.style.scrollSnapType;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollSnapType = "none";
  root.style.scrollBehavior = "auto";
  const from = window.scrollY;
  const distance = top - from;
  const duration = Math.min(1400, 750 + Math.abs(distance) / 3);
  const started = performance.now();
  let frame = 0;
  const inputs = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

  function finish() {
    window.cancelAnimationFrame(frame);
    root.style.scrollSnapType = previousSnap;
    root.style.scrollBehavior = previousBehavior;
    inputs.forEach(type => window.removeEventListener(type, finish));
    cancelScroll = undefined;
  }

  function tick(now: number) {
    const progress = Math.min((now - started) / duration, 1);
    // Zero acceleration at both ends avoids a hard start or stop.
    const eased = progress * progress * progress * (progress * (progress * 6 - 15) + 10);
    window.scrollTo({ top: from + distance * eased, left: 0, behavior: "instant" });
    if (progress < 1) frame = window.requestAnimationFrame(tick);
    else {
      finish();
      onComplete?.();
    }
  }

  cancelScroll = finish;
  inputs.forEach(type => window.addEventListener(type, finish, { passive: true }));
  frame = window.requestAnimationFrame(tick);
}
