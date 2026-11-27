import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compiled = ts.transpileModule(fs.readFileSync("app/_components/section-link.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const scrollCompiled = ts.transpileModule(fs.readFileSync("app/_components/scroll-to-section.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const visibleCompiled = ts.transpileModule(fs.readFileSync("app/_components/visible-section.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function render({ pathname = "/", reduced = false, sectionId = "projects" } = {}) {
  const calls = [];
  const exports = {};
  const scrollExports = {};
  let frame;
  const listeners = new Map();
  const style = { scrollSnapType: "", scrollBehavior: "" };
  const attributes = new Map();
  const headingListeners = new Map();
  const heading = {
    getAttribute: name => attributes.get(name) ?? null,
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: name => attributes.delete(name),
    focus: options => calls.push({ kind: "focus", ...options }),
    addEventListener: (name, callback) => headingListeners.set(name, callback),
  };
  const window = {
    scrollY: 0,
    matchMedia: () => ({ matches: reduced }),
    scrollTo: options => calls.push({ kind: "scroll", ...options }),
    requestAnimationFrame: callback => { frame = callback; return 1; },
    cancelAnimationFrame: () => { frame = undefined; },
    addEventListener: (type, callback) => listeners.set(type, callback),
    removeEventListener: type => listeners.delete(type),
    location: { hash: "" },
    history: { state: { existing: true }, pushState: (state, title, hash) => { calls.push({ kind: "history", state, hash }); window.location.hash = hash; } },
  };
  const section = { id: sectionId, scrollTop: 400, getClientRects: () => [{}], getBoundingClientRect: () => ({ top: 900 }), querySelector: () => heading };
  const hiddenSection = { id: sectionId, getClientRects: () => [] };
  const document = { documentElement: { style }, querySelectorAll: () => [hiddenSection, section] };
  const visibleExports = {};
  vm.runInNewContext(visibleCompiled, { exports: visibleExports, document });
  vm.runInNewContext(scrollCompiled, { exports: scrollExports, window, document, performance: { now: () => 0 } });
  const dependencies = {
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
    "next/link": { default: "Link" },
    "next/navigation": { usePathname: () => pathname },
    "./scroll-to-section": scrollExports,
    "./visible-section": visibleExports,
  };
  vm.runInNewContext(compiled, {
    exports,
    require: name => dependencies[name],
    document,
    window,
  });
  const link = exports.default({ sectionId, pageHref: sectionId === "home" ? "/#home" : sectionId === "experience" ? "/about#experience" : sectionId === "projects" ? "/work" : `/${sectionId}`, children: "Navigate" });
  const event = { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault: () => calls.push({ kind: "prevent" }) };
  return { link, event, calls, style, listeners, attributes, headingListeners, section, advance: time => frame?.(time) };
}

test("homepage navigation animates to its section instead of loading another page", () => {
  const { link, event, calls, advance, style } = render();
  assert.equal(link.props.href, "/#projects");
  link.props.onClick(event);
  assert.equal(calls[0].kind, "prevent");
  assert.equal(style.scrollSnapType, "none");
  advance(525);
  assert.equal(calls.at(-1).top, 450);
  advance(1050);
  assert.equal(calls.filter(call => call.kind === "scroll").at(-1).top, 900);
  assert.equal(style.scrollSnapType, "");
});

test("Home returns to the actual top", () => {
  const { link, event, calls, advance } = render({ sectionId: "home" });
  link.props.onClick(event);
  advance(1050);
  assert.equal(calls[1].kind, "scroll");
  assert.equal(calls[1].top, 0);
});

test("reduced-motion visitors get instant scrolling", () => {
  const { link, event, calls } = render({ reduced: true });
  link.props.onClick(event);
  assert.equal(calls[1].behavior, "instant");
});

test("dedicated-page navigation and modified clicks retain normal link behavior", () => {
  const dedicated = render({ pathname: "/about" });
  assert.equal(dedicated.link.props.href, "/work");
  dedicated.link.props.onClick(dedicated.event);
  assert.equal(dedicated.calls.length, 0);
  const modified = render();
  modified.link.props.onClick({ ...modified.event, ctrlKey: true });
  assert.equal(modified.calls.length, 0);
});

test("manual input cancels the flight and restores scroll snapping", () => {
  const { link, event, calls, advance, style, listeners } = render();
  link.props.onClick(event);
  advance(200);
  listeners.get("wheel")();
  const count = calls.length;
  advance(1050);
  assert.equal(calls.length, count);
  assert.equal(style.scrollSnapType, "");
  assert.equal(listeners.size, 0);
});

test("Experience links scroll locally on Home and About and retain their dedicated fallback", () => {
  for (const pathname of ["/", "/about"]) {
    const { link, event, calls, advance } = render({ pathname, sectionId: "experience" });
    assert.equal(link.props.href, pathname === "/" ? "/#experience" : "/about#experience");
    link.props.onClick(event);
    advance(1050);
    assert.equal(calls.filter(call => call.kind === "scroll").at(-1).top, 900);
  }
  const work = render({ pathname: "/work", sectionId: "experience" });
  assert.equal(work.link.props.href, "/about#experience");
  work.link.props.onClick(work.event);
  assert.equal(work.calls.length, 0);
});

test("completed navigation updates the fragment and focuses its heading without another scroll", () => {
  const { link, event, calls, advance, attributes, headingListeners, section } = render();
  link.props.onClick(event);
  advance(525);
  assert.equal(calls.some(call => call.kind === "focus" || call.kind === "history"), false);
  advance(1050);
  assert.equal(calls.find(call => call.kind === "history").hash, "#projects");
  assert.equal(calls.at(-1).kind, "focus");
  assert.equal(calls.at(-1).preventScroll, true);
  assert.equal(attributes.get("tabindex"), "-1");
  assert.equal(section.scrollTop, 0);
  headingListeners.get("blur")();
  assert.equal(attributes.has("tabindex"), false);
});

test("cancelled navigation does not steal focus or create history; reduced motion completes immediately", () => {
  const cancelled = render();
  cancelled.link.props.onClick(cancelled.event);
  cancelled.advance(200);
  cancelled.listeners.get("keydown")();
  cancelled.advance(1050);
  assert.equal(cancelled.calls.some(call => call.kind === "focus" || call.kind === "history"), false);
  assert.equal(cancelled.section.scrollTop, 400);
  const instant = render({ reduced: true });
  instant.link.props.onClick(instant.event);
  assert.equal(instant.calls.find(call => call.kind === "history").hash, "#projects");
  assert.equal(instant.calls.at(-1).kind, "focus");
});

test("consumed wheel momentum does not interrupt a screen transition midway", () => {
  const state = render();
  state.link.props.onClick(state.event);
  state.advance(200);
  state.listeners.get("wheel")({ defaultPrevented: true });
  state.advance(1050);
  assert.equal(state.calls.filter(call => call.kind === "scroll").at(-1).top, 900);
  assert.equal(state.calls.some(call => call.kind === "focus"), true);
});
