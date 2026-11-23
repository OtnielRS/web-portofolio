import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, dependencies = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, { exports, require: name => dependencies[name], ...globals });
  return exports;
}

function nodes(root, predicate) {
  if (!root || typeof root !== "object") return [];
  if (Array.isArray(root)) return root.flatMap(child => nodes(child, predicate));
  return [...(predicate(root) ? [root] : []), ...nodes(root.props?.children, predicate)];
}

function mountPager(narrow = false) {
  const data = load("app/_features/work/projects.ts");
  let selected = 0;
  const jsx = (type, props) => ({ type, props });
  const component = load("app/_features/work/project-carousel.tsx", {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    react: { useState: () => [selected, value => { selected = value; }], useSyncExternalStore: () => narrow },
    "./projects": data,
    "./project-card": { default: "ProjectCard" },
    "@/app/_components/arrow": { default: "Arrow" },
  }).default;
  return () => component({ showIndex: true });
}

test("desktop project pages replace cards instead of adding a scrolling track", () => {
  const render = mountPager();
  let page = render();
  const names = root => nodes(root, node => node.type === "ProjectCard").map(node => node.props.project.name);
  const control = (root, label) => nodes(root, node => node.type === "button" && node.props["aria-label"] === label)[0];
  assert.deepEqual(names(page), ["Bastionfall", "Hacktiv Chess Ultimate"]);
  assert.equal(control(page, "Previous projects").props.disabled, true);
  control(page, "Next projects").props.onClick();
  page = render();
  assert.deepEqual(names(page), ["Alice Store", "Tempat Gosip"]);
  control(page, "Next projects").props.onClick();
  page = render();
  assert.deepEqual(names(page), ["Animal Quiz"]);
  assert.equal(control(page, "Next projects").props.disabled, true);
  control(page, "Previous projects").props.onClick();
  assert.deepEqual(names(render()), ["Alice Store", "Tempat Gosip"]);
});

test("mobile shows one project and the picker can reach every project directly", () => {
  const render = mountPager(true);
  let page = render();
  assert.equal(nodes(page, node => node.type === "ProjectCard").length, 1);
  assert.equal(nodes(page, node => node.type === "option").length, 5);
  nodes(page, node => node.type === "select")[0].props.onChange({ target: { value: "4" } });
  page = render();
  assert.equal(nodes(page, node => node.type === "ProjectCard")[0].props.project.name, "Animal Quiz");
});

test("both engineering routes keep Work current in the header", () => {
  const renderActiveSection = load("app/_components/use-active-section.ts", {
    react: { useState: value => [value, () => {}], useEffect: () => {} },
  }).default;
  const links = [{ href: "/", sectionId: "home" }, { href: "/work", sectionId: "work" }, { href: "/about", sectionId: "about" }];
  for (const path of ["/work/bastionfall", "/work/hacktiv-chess"]) assert.equal(renderActiveSection(path, links), "/work");
  assert.equal(renderActiveSection("/skills", links), "/skills");
});

test("every project card has a details link backed by an existing route", () => {
  const data = load("app/_features/work/projects.ts");
  const notes = load("app/_features/work/engineering-notes.ts");
  const jsx = (type, props) => ({ type, props });
  const card = load("app/_features/work/project-card.tsx", {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    "next/link": { default: "Link" },
    "./engineering-notes": notes,
    "./project-art": { default: "ProjectArt" },
    "./project-gallery": { default: "ProjectGallery" },
    "@/app/_components/arrow": { default: "Arrow" },
  }).default;
  for (const project of data.projects) {
    const detailsLinks = nodes(card({ project }), node => node.type === "Link");
    assert.equal(detailsLinks.length, 1, `${project.name} needs a details link`);
    const href = detailsLinks[0].props.href;
    assert.ok(fs.existsSync(`app${href}/page.tsx`), `Missing route for ${project.name}`);
  }
  assert.equal(notes.engineeringNotes.find(note => note.art === "animal").overviewOnly, true);
});
