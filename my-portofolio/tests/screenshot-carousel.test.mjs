import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function mount() {
  let index = 0;
  const touch = { current: null };
  const jsx = (type, props) => ({ type, props });
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync("app/_features/work/screenshot-carousel.tsx", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const dependencies = {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    react: { useState: () => [index, value => { index = typeof value === "function" ? value(index) : value; }], useRef: () => touch, useId: () => "screens" },
    "next/image": { default: "Image" },
    "@/app/_components/arrow": { default: "Arrow" },
  };
  vm.runInNewContext(code, { exports, require: name => dependencies[name] });
  const screens = ["Sign in", "Chess lobby", "Stockfish match", "Analysis", "Profile", "Board & pieces"].map((title, i) => ({ title, caption: title, src: { src: `/chess/${i}.png` } }));
  return { render: () => exports.default({ screens, name: "Chess" }), empty: () => exports.default({ screens: [], name: "Empty" }), get index() { return index; } };
}
function find(root, predicate) {
  if (!root || typeof root !== "object") return [];
  if (Array.isArray(root)) return root.flatMap(child => find(child, predicate));
  return [...(predicate(root) ? [root] : []), ...find(root.props?.children, predicate)];
}
const button = (view, label) => find(view, node => node.type === "button" && node.props["aria-label"] === label)[0];

test("screenshot controls and thumbnails reach all six screens without going past their boundaries", () => {
  const state = mount();
  assert.equal(button(state.render(), "Previous screenshot").props.disabled, true);
  button(state.render(), "Next screenshot").props.onClick();
  assert.equal(state.index, 1);
  button(state.render(), "Show board & pieces").props.onClick();
  assert.equal(state.index, 5);
  assert.equal(button(state.render(), "Next screenshot").props.disabled, true);
  button(state.render(), "Next screenshot").props.onClick();
  assert.equal(state.index, 5);
  button(state.render(), "Previous screenshot").props.onClick();
  assert.equal(state.index, 4);
  const stage = find(state.render(), node => node.type === "a")[0];
  assert.equal(stage.props.href, "/chess/4.png");
  assert.equal(find(state.render(), node => node.props?.["aria-pressed"] === true).length, 1);
  assert.equal(state.empty(), null);
});

test("keyboard and swipe navigation stay local and vertical gestures keep native page scrolling", () => {
  const state = mount();
  let consumed = 0;
  const key = key => state.render().props.onKeyDown({ key, preventDefault() { consumed++; }, stopPropagation() {} });
  key("End");
  assert.equal(state.index, 5);
  key("ArrowLeft");
  assert.equal(state.index, 4);
  key("Home");
  assert.equal(state.index, 0);
  key("ArrowDown");
  assert.equal(consumed, 3);
  const stage = find(state.render(), node => node.type === "a")[0];
  stage.props.onTouchStart({ touches: [{ clientX: 150, clientY: 50 }] });
  stage.props.onTouchEnd({ changedTouches: [{ clientX: 50, clientY: 55 }], preventDefault() { consumed++; } });
  assert.equal(state.index, 1);
  stage.props.onTouchStart({ touches: [{ clientX: 150, clientY: 50 }] });
  stage.props.onTouchEnd({ changedTouches: [{ clientX: 145, clientY: 200 }], preventDefault() { throw new Error("Vertical scrolling must stay native"); } });
  assert.equal(state.index, 1);
});
