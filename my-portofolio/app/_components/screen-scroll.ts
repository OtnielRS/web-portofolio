import scrollToSection from "./scroll-to-section";

export function innerScrollAvailable(target: HTMLElement, root: HTMLElement, direction: number) {
  for (let element: HTMLElement | null = target; element && element !== root; element = element.parentElement) {
    if (!/(auto|scroll)/.test(window.getComputedStyle(element).overflowY)) continue;
    if (element.scrollHeight <= element.clientHeight + 2) continue;
    if (direction > 0 ? element.scrollTop + element.clientHeight < element.scrollHeight - 2 : element.scrollTop > 2) return true;
  }
  return false;
}

/** One deliberate gesture selects one adjacent full-height section. */
export default function installScreenScroll(root: HTMLElement) {
  let moving = false;
  let cancelMove: (() => void) | undefined;
  let lastWheel = -Infinity;
  let wheelDelta = 0;
  let gestureUsed = false;
  let touch: { x: number; y: number; used: boolean } | undefined;

  function destination(direction: number) {
    const sections = Array.from(root.querySelectorAll<HTMLElement>(".screen-flow > section")).filter(section => section.getClientRects().length > 0);
    if (sections.length < 2) return;
    const index = sections.reduce((best, section, next) => Math.abs(section.getBoundingClientRect().top) < Math.abs(sections[best].getBoundingClientRect().top) ? next : best, 0);
    return sections[index + direction];
  }
  function blocked(target: HTMLElement, direction: number) {
    return Boolean(document.fullscreenElement || document.querySelector("dialog[open]")) || innerScrollAvailable(target, root, direction);
  }
  function interrupt() {
    cancelMove?.();
    cancelMove = undefined;
    moving = false;
  }
  function go(section: HTMLElement, keyboard = false) {
    interrupt();
    moving = true;
    cancelMove = scrollToSection(section.getBoundingClientRect().top + window.scrollY, () => {
      moving = false;
      cancelMove = undefined;
      if (!keyboard) return;
      section.scrollTop = 0;
      const heading = section.querySelector<HTMLElement>("h1, h2");
      if (!heading) return;
      const previous = heading.getAttribute("tabindex");
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      heading.addEventListener("blur", () => {
        if (previous === null) heading.removeAttribute("tabindex");
        else heading.setAttribute("tabindex", previous);
      }, { once: true });
    }, () => { moving = false; cancelMove = undefined; });
  }
  function wheel(event: WheelEvent) {
    if (event.defaultPrevented || event.cancelable === false || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const direction = Math.sign(event.deltaY);
    if (!direction) return;
    if (moving) {
      lastWheel = performance.now(); gestureUsed = true; wheelDelta = 0;
      event.preventDefault();
      return;
    }
    if (blocked(event.target as HTMLElement, direction)) {
      // A gesture spent reading a panel must not also advance the outer screen
      // when that panel reaches its edge. Wait for a fresh gesture instead.
      lastWheel = performance.now();
      gestureUsed = true;
      wheelDelta = 0;
      return;
    }
    const section = destination(direction);
    if (!section) return;
    const now = performance.now();
    if (now - lastWheel > 220) { wheelDelta = 0; gestureUsed = false; }
    lastWheel = now;
    event.preventDefault();
    if (gestureUsed) return;
    const amount = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
    wheelDelta = Math.sign(wheelDelta) !== direction ? amount : wheelDelta + amount;
    if (Math.abs(wheelDelta) < 45) return;
    gestureUsed = true;
    go(section);
  }
  function key(event: KeyboardEvent) {
    if (event.key === "Escape") { interrupt(); return; }
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
    if ((event.target as HTMLElement).closest("a, button, input, textarea, select, [contenteditable], [role=slider]")) return;
    const direction = ["PageDown", "ArrowDown", " "].includes(event.key) ? (event.shiftKey ? -1 : 1) : ["PageUp", "ArrowUp"].includes(event.key) ? -1 : 0;
    if (!direction) return;
    if (moving) { event.preventDefault(); return; }
    if (blocked(event.target as HTMLElement, direction)) return;
    const section = destination(direction);
    if (!section) return;
    event.preventDefault();
    go(section, true);
  }
  function touchStart(event: TouchEvent) {
    interrupt();
    touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY, used: false } : undefined;
  }
  function touchMove(event: TouchEvent) {
    if (!touch || event.touches.length !== 1 || !event.cancelable) return;
    if (moving) { event.preventDefault(); return; }
    const dx = touch.x - event.touches[0].clientX;
    const dy = touch.y - event.touches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy)) return;
    if (blocked(event.target as HTMLElement, Math.sign(dy))) { touch.used = true; return; }
    const section = destination(Math.sign(dy));
    if (!section || Math.abs(dy) < 8) return;
    event.preventDefault();
    if (touch.used || Math.abs(dy) < 65) return;
    touch.used = true;
    go(section);
  }
  function touchEnd() { touch = undefined; }
  window.addEventListener("wheel", wheel, { passive: false });
  root.addEventListener("touchstart", touchStart, { passive: true });
  root.addEventListener("touchmove", touchMove, { passive: false });
  root.addEventListener("touchend", touchEnd);
  root.addEventListener("touchcancel", touchEnd);
  window.addEventListener("keydown", key);
  window.addEventListener("pointerdown", interrupt, { passive: true });
  window.addEventListener("resize", interrupt);
  return () => {
    window.removeEventListener("wheel", wheel);
    root.removeEventListener("touchstart", touchStart);
    root.removeEventListener("touchmove", touchMove);
    root.removeEventListener("touchend", touchEnd);
    root.removeEventListener("touchcancel", touchEnd);
    window.removeEventListener("keydown", key);
    window.removeEventListener("pointerdown", interrupt);
    window.removeEventListener("resize", interrupt);
    interrupt();
  };
}
