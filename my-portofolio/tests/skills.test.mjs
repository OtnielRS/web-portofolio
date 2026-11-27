import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function compile(path) {
  return ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
}

function mount() {
  const data = {};
  vm.runInNewContext(compile("app/_features/skills/skills.ts"), { exports: data });
  const exports = {};
  const states = [];
  let cursor = 0;
  const scrollRegion = { scrollTop: 300 };
  const jsx = (type, props) => ({ type, props });
  const dependencies = {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    "next/image": { default: "Image" },
    "./skills": data,
    react: {
      useId: () => "skills-test-catalog",
      useRef: () => ({ current: scrollRegion }),
      useState: initial => {
        const index = cursor++;
        if (!(index in states)) states[index] = initial;
        return [states[index], value => { states[index] = typeof value === "function" ? value(states[index]) : value; }];
      },
    },
  };
  vm.runInNewContext(compile("app/_features/skills/skills-section.tsx"), { exports, require: name => dependencies[name] });
  function render() { cursor = 0; return exports.default({ standalone: true }); }
  return { render, scrollRegion };
}

function nodes(root, predicate) {
  if (!root || typeof root !== "object") return [];
  if (Array.isArray(root)) return root.flatMap(child => nodes(child, predicate));
  return [...(predicate(root) ? [root] : []), ...nodes(root.props?.children, predicate)];
}

const disclosure = root => nodes(root, node => node.type === "button" && "aria-expanded" in node.props)[0];
const skillNames = root => nodes(root, node => node.type === "li").map(node => node.props.children[1].props.children);

test("overview prioritizes core development skills; View all reveals every skill and retains the disclosure", () => {
  const { render, scrollRegion } = mount();
  let tree = render();
  assert.equal(nodes(tree, node => node.type === "h3").length, 7);
  assert.equal(skillNames(tree).length, 16);
  assert.deepEqual(skillNames(tree).slice(0, 8), ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express.js"]);
  assert.equal(skillNames(tree).includes("AWS"), false);
  assert.deepEqual(skillNames(tree).slice(8, 10), ["Gemini API", "OpenAI"]);
  assert.equal(disclosure(tree).props["aria-expanded"], false);
  disclosure(tree).props.onClick();
  tree = render();
  assert.equal(skillNames(tree).length, 28);
  assert.equal(new Set(skillNames(tree)).size, 28);
  assert.equal(disclosure(tree).props["aria-expanded"], true);
  assert.equal(scrollRegion.scrollTop, 0);
  const region = nodes(tree, node => node.props?.role === "region")[0];
  assert.equal(region.props.id, disclosure(tree).props["aria-controls"]);
  assert.equal(region.props.tabIndex, 0);
});

test("environment filters narrow the catalogue; collapse resets the next expansion to All", () => {
  const { render, scrollRegion } = mount();
  let tree = render();
  disclosure(tree).props.onClick();
  tree = render();
  const filter = nodes(tree, node => node.type === "button" && node.props.children === "AI & cloud")[0];
  scrollRegion.scrollTop = 500;
  filter.props.onClick();
  tree = render();
  assert.deepEqual(skillNames(tree), ["Gemini API", "OpenAI", "AWS"]);
  assert.equal(scrollRegion.scrollTop, 0);
  assert.equal(nodes(tree, node => node.type === "button" && node.props.children === "AI & cloud")[0].props["aria-pressed"], true);
  disclosure(tree).props.onClick();
  tree = render();
  assert.equal(skillNames(tree).length, 16);
  disclosure(tree).props.onClick();
  tree = render();
  assert.equal(skillNames(tree).length, 28);
  assert.equal(nodes(tree, node => node.type === "button" && node.props.children === "All")[0].props["aria-pressed"], true);
});
