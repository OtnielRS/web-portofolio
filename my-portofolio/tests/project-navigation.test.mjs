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
  let selection = { index: 0, changed: false };
  const requested = { current: 0 };
  const jsx = (type, props) => ({ type, props });
  const component = load("app/_features/work/project-carousel.tsx", {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    react: { useState: () => [selection, value => { selection = value; }], useSyncExternalStore: () => narrow, useRef: () => requested },
    "@/app/_components/use-project-motion": { default: () => ({ pageRef: { current: null }, transitionTo: (key, commit) => commit() }) },
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
  const links = [{ href: "/", sectionId: "home" }, { href: "/work", sectionId: "projects" }, { href: "/about", sectionId: "about" }];
  for (const path of ["/work/bastionfall", "/work/hacktiv-chess"]) assert.equal(renderActiveSection(path, links), "/work");
  assert.equal(renderActiveSection("/skills", links), "/skills");
  assert.equal(renderActiveSection("/work/all", links), "/work");
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

test("View all projects opens the full collection from either compact preview", () => {
  const data = load("app/_features/work/projects.ts");
  const jsx = (type, props) => ({ type, props });
  const section = load("app/_features/work/work-section.tsx", {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    "./projects": data,
    "./project-card": { default: "ProjectCard" },
    "./project-carousel": { default: "ProjectCarousel" },
    "next/link": { default: "Link" },
    "@/app/_components/arrow": { default: "Arrow" },
  }).default;
  for (const standalone of [false, true]) {
    const preview = section({ standalone, screen: true });
    assert.equal(nodes(preview, node => node.type === "Link")[0].props.href, "/work/all");
    assert.equal(nodes(preview, node => node.type === "ProjectCarousel").length, 1);
  }
  const collection = section({ standalone: true, title: "All projects" });
  assert.deepEqual(nodes(collection, node => node.type === "ProjectCard").map(card => card.props.project.name), Array.from(data.projects, project => project.name));
  assert.equal(nodes(collection, node => node.type === "ProjectCarousel").length, 0);
  assert.equal(nodes(collection, node => node.type === "h1")[0].props.children[0], "All projects");
});
test("the collection route uses document flow with its own canonical metadata", () => {
  const data = load("app/_features/work/projects.ts");
  const jsx = (type, props) => ({ type, props });
  const page = load("app/work/all/page.tsx", {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    "next/link": { default: "Link" },
    "@/app/_components/arrow": { default: "Arrow" },
    "@/app/_lib/metadata": { pageMetadata: (title, description, canonical) => ({ title, description, canonical }) },
    "@/app/_features/work/projects": data,
    "@/app/_features/work/work-section": { default: "WorkSection" },
  });
  const tree = page.default();
  assert.equal(tree.props.className.includes("screen-flow"), false);
  assert.equal(page.metadata.canonical, "/work/all");
  assert.equal(nodes(tree, node => node.type === "Link")[0].props.href, "/#projects", "Selected projects must return to the scrollable homepage, not the one-screen preview route");
  assert.equal(nodes(tree, node => node.type === "WorkSection")[0].props.screen, undefined);
});
