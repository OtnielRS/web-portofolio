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

function render({ pathname = "/", reduced = false, sectionId = "work" } = {}) {
  const calls = [];
  const exports = {};
  const scrollExports = {};
  let frame;
  const listeners = new Map();
  const style = { scrollSnapType: "", scrollBehavior: "" };
  const window = {
    scrollY: 0,
    matchMedia: () => ({ matches: reduced }),
    scrollTo: options => calls.push({ kind: "scroll", ...options }),
    requestAnimationFrame: callback => { frame = callback; return 1; },
    cancelAnimationFrame: () => { frame = undefined; },
    addEventListener: (type, callback) => listeners.set(type, callback),
    removeEventListener: type => listeners.delete(type),
  };
  const document = { documentElement: { style }, getElementById: () => ({ getBoundingClientRect: () => ({ top: 900 }) }) };
  vm.runInNewContext(scrollCompiled, { exports: scrollExports, window, document, performance: { now: () => 0 } });
  const dependencies = {
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
    "next/link": { default: "Link" },
    "next/navigation": { usePathname: () => pathname },
    "./scroll-to-section": scrollExports,
  };
  vm.runInNewContext(compiled, {
    exports,
    require: name => dependencies[name],
    document,
    window,
  });
  const link = exports.default({ sectionId, pageHref: sectionId === "home" ? "/#home" : sectionId === "experience" ? "/about#experience" : `/${sectionId}`, children: "Navigate" });
  const event = { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault: () => calls.push({ kind: "prevent" }) };
  return { link, event, calls, style, listeners, advance: time => frame?.(time) };
}

test("homepage navigation animates to its section instead of loading another page", () => {
  const { link, event, calls, advance, style } = render();
  assert.equal(link.props.href, "/#work");
  link.props.onClick(event);
  assert.equal(calls[0].kind, "prevent");
  assert.equal(style.scrollSnapType, "none");
  advance(525);
  assert.equal(calls.at(-1).top, 450);
  advance(1050);
  assert.equal(calls.at(-1).top, 900);
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
    assert.equal(calls.at(-1).top, 900);
  }
  const work = render({ pathname: "/work", sectionId: "experience" });
  assert.equal(work.link.props.href, "/about#experience");
  work.link.props.onClick(work.event);
  assert.equal(work.calls.length, 0);
});
