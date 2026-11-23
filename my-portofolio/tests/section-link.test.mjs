import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compiled = ts.transpileModule(fs.readFileSync("app/_components/section-link.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function render({ pathname = "/", reduced = false, sectionId = "work" } = {}) {
  const calls = [];
  const exports = {};
  const dependencies = {
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
    "next/link": { default: "Link" },
    "next/navigation": { usePathname: () => pathname },
  };
  vm.runInNewContext(compiled, {
    exports,
    require: name => dependencies[name],
    document: { getElementById: () => ({ scrollIntoView: options => calls.push({ kind: "section", ...options }) }) },
    window: { matchMedia: () => ({ matches: reduced }), scrollTo: options => calls.push({ kind: "top", ...options }) },
  });
  const link = exports.default({ sectionId, pageHref: sectionId === "home" ? "/#home" : `/${sectionId}`, children: "Navigate" });
  const event = { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, preventDefault: () => calls.push({ kind: "prevent" }) };
  return { link, event, calls };
}

test("homepage navigation animates to its section instead of loading another page", () => {
  const { link, event, calls } = render();
  assert.equal(link.props.href, "/#work");
  link.props.onClick(event);
  assert.equal(calls[0].kind, "prevent");
  assert.equal(calls[1].kind, "section");
  assert.equal(calls[1].behavior, "smooth");
  assert.equal(calls[1].block, "start");
});

test("Home returns to the actual top", () => {
  const { link, event, calls } = render({ sectionId: "home" });
  link.props.onClick(event);
  assert.equal(calls[1].kind, "top");
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
