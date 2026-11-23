import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, globals = {}, dependencies = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, { exports, require: name => dependencies[name], ...globals });
  return exports.default;
}

const navigation = [
  { href: "/", sectionId: "home" }, { href: "/work", sectionId: "work" },
  { href: "/about", sectionId: "about" }, { href: "/skills", sectionId: "skills" },
  { href: "/about#experience", sectionId: "experience" }, { href: "/contact", sectionId: "contact" },
];

test("hidden cached sections cannot replace a visible section with the same ID", () => {
  const hidden = { id: "work", getClientRects: () => [] };
  const visible = { id: "work", getClientRects: () => [{}] };
  const findSection = load("app/_components/visible-section.ts", { document: { querySelectorAll: () => [hidden, visible] } });
  assert.equal(findSection("work"), visible);
  assert.equal(findSection("contact"), undefined);
});

test("Work stays active even when cached Contact markup remains in the document", () => {
  let scanned = false;
  const getActive = load("app/_components/use-active-section.ts", {}, {
    react: { useState: value => [value, () => {}], useEffect: callback => callback() },
    "./visible-section": { default: () => { scanned = true; return { id: "contact" }; } },
  });
  assert.equal(getActive("/work", navigation), "/work");
  assert.equal(getActive("/work/alice-store", navigation), "/work");
  assert.equal(scanned, false);
});

test("homepage scroll tracking ignores hidden Contact and selects the visible Work section", () => {
  const elements = [
    { id: "contact", getClientRects: () => [], getBoundingClientRect: () => ({ top: 0 }) },
    ...navigation.map((section, index) => ({ id: section.sectionId, getClientRects: () => [{}], getBoundingClientRect: () => ({ top: (index - 1) * 900 }) })),
  ];
  const document = { querySelectorAll: () => elements, querySelector: () => ({ getBoundingClientRect: () => ({ bottom: 109 }) }), documentElement: { scrollHeight: 5400 } };
  const findSection = load("app/_components/visible-section.ts", { document });
  let state = { pathname: "/", href: "/" };
  let effect;
  let frame;
  const getActive = load("app/_components/use-active-section.ts", {
    document,
    window: { innerHeight: 900, scrollY: 900, requestAnimationFrame: callback => { frame = callback; return 1; }, addEventListener() {}, removeEventListener() {}, cancelAnimationFrame() {} },
  }, {
    react: { useState: () => [state, update => { state = update(state); }], useEffect: callback => { effect = callback; } },
    "./visible-section": { default: findSection },
  });
  getActive("/", navigation);
  effect();
  frame();
  assert.equal(getActive("/", navigation), "/work");
});

test("layout mode follows the active route and normal route changes reset both scroll axes", () => {
  let path = "/work";
  let effect;
  const calls = [];
  const window = { scrollY: 2400, location: { hash: "" }, scrollTo: options => calls.push(options) };
  const renderMain = load("app/_components/site-main.tsx", { window }, {
    react: { useLayoutEffect: callback => { effect = callback; } },
    "next/navigation": { usePathname: () => path },
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
  });
  let main = renderMain({ children: "page" });
  assert.equal(main.props["data-screen-flow"], true);
  assert.equal(main.props["data-route"], "/work");
  effect();
  assert.equal(calls.at(-1).top, 0);
  assert.equal(calls.at(-1).left, 0);
  path = "/work/alice-store";
  main = renderMain({ children: "cached screen-flow markup" });
  assert.equal(main.props["data-screen-flow"], false);
  path = "/about";
  window.location.hash = "#experience";
  renderMain({ children: "page" });
  effect();
  assert.equal(calls.at(-1).top, 2400);
});
