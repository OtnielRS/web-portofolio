import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compiled = ts.transpileModule(fs.readFileSync("app/_components/screen-scroll.ts", "utf8"), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } }).outputText;

function setup({ offsets = [0, 900, 1800] } = {}) {
  const exports = {};
  const listeners = new Map(), windowListeners = new Map();
  const moves = [];
  let now = 0, modal = false, instant = false;
  const heading = { getAttribute: () => null, setAttribute() {}, removeAttribute() {}, addEventListener() {}, focus() { this.focused = true; } };
  const root = { addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: name => listeners.delete(name), querySelectorAll: () => sections };
  const target = { parentElement: root, closest: () => null };
  const window = { scrollY: 0, innerHeight: 900, getComputedStyle: element => ({ overflowY: element.overflowY ?? "visible" }), addEventListener: (name, callback) => windowListeners.set(name, callback), removeEventListener: name => windowListeners.delete(name) };
  const hidden = { getClientRects: () => [] };
  const sections = [hidden, ...offsets.map(top => ({ scrollTop: 0, getClientRects: () => [{}], getBoundingClientRect: () => ({ top: top - window.scrollY }), querySelector: () => heading }))];
  vm.runInNewContext(compiled, {
    exports, window, document: { querySelector: () => modal ? {} : null }, performance: { now: () => now },
    require: () => ({ default: (top, complete, cancelled) => {
      const move = { top, cancelled: false, finish: () => { if (!move.cancelled) { window.scrollY = top; complete(); } } };
      moves.push(move);
      if (instant) move.finish();
      return () => { move.cancelled = true; cancelled(); };
    } }),
  });
  const cleanup = exports.default(root);
  function wheel(overrides = {}) {
    now += 20;
    const event = { target, deltaY: 120, deltaX: 0, deltaMode: 0, cancelable: true, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...overrides };
    windowListeners.get("wheel")(event);
    return event;
  }
  return { wheel, moves, window, root, target, listeners, windowListeners, heading, sections, cleanup,
    advance: ms => { now += ms; }, modal: value => { modal = value; }, instant: () => { instant = true; } };
}

test("one downward gesture goes Home → About; a new gesture goes About → Skills", () => {
  const state = setup();
  assert.equal(state.wheel().defaultPrevented, true);
  state.wheel(); state.wheel();
  assert.deepEqual(state.moves.map(move => move.top), [900]);
  state.moves[0].finish();
  state.wheel();
  assert.equal(state.moves.length, 1, "momentum cannot skip About");
  state.advance(250);
  state.wheel();
  assert.deepEqual(state.moves.map(move => move.top), [900, 1800]);
});

test("trackpad input accumulates into one screen turn and upward scrolling returns one screen", () => {
  const state = setup();
  for (let i = 0; i < 6; i++) state.wheel({ deltaY: 8 });
  assert.equal(state.moves.length, 1);
  state.moves[0].finish();
  state.advance(250);
  state.wheel({ deltaY: -120 });
  assert.equal(state.moves[1].top, 0);
});

test("long content scrolls inside its screen before the next screen can be selected", () => {
  const state = setup();
  const inner = { ...state.target, overflowY: "auto", scrollHeight: 1000, clientHeight: 400, scrollTop: 0 };
  assert.equal(state.wheel({ target: inner }).defaultPrevented, false);
  assert.equal(state.moves.length, 0);
  inner.scrollTop = 600;
  state.wheel({ target: inner });
  assert.equal(state.moves.length, 0, "the tail of the inner scroll cannot also change screens");
  state.advance(250);
  state.wheel({ target: inner });
  assert.equal(state.moves[0].top, 900);
});

test("galleries, horizontal scrolling, zoom gestures and document boundaries stay native", () => {
  const state = setup();
  state.modal(true);
  assert.equal(state.wheel().defaultPrevented, false);
  state.modal(false);
  for (const overrides of [{ deltaX: 200 }, { ctrlKey: true }, { cancelable: false }, { deltaY: -120 }]) {
    assert.equal(state.wheel(overrides).defaultPrevented, false);
  }
  state.window.scrollY = 1800;
  assert.equal(state.wheel().defaultPrevented, false);
  assert.equal(state.moves.length, 0);
});

test("keyboard navigation keeps control keys native and focuses the destination heading", () => {
  const state = setup();
  state.windowListeners.get("keydown")({ key: "PageDown", target: { closest: () => ({}) } });
  assert.equal(state.moves.length, 0);
  state.windowListeners.get("keydown")({ key: "PageDown", target: state.target, preventDefault() {} });
  state.moves[0].finish();
  assert.equal(state.heading.focused, true);
  assert.equal(state.window.scrollY, 900);
});

test("one swipe selects one section even when the finger continues moving", () => {
  const state = setup();
  state.listeners.get("touchstart")({ touches: [{ clientX: 100, clientY: 400 }] });
  const move = y => state.listeners.get("touchmove")({ target: state.target, cancelable: true, touches: [{ clientX: 100, clientY: y }], preventDefault() {} });
  move(300); move(200);
  state.moves[0].finish();
  move(100);
  assert.equal(state.moves.length, 1);
  assert.equal(state.moves[0].top, 900);
});

test("instant navigation retains one-screen boundaries and route cleanup cancels pending motion", () => {
  const state = setup();
  state.instant();
  state.wheel(); state.wheel();
  assert.equal(state.window.scrollY, 900);
  assert.equal(state.moves.length, 1);
  const pending = setup();
  pending.wheel(); pending.cleanup();
  pending.moves[0].finish();
  assert.equal(pending.window.scrollY, 0);
  assert.equal(pending.listeners.size, 0);
  assert.equal(pending.windowListeners.size, 0);
});

test("scrolling over the floating header still selects the next full screen", () => {
  const state = setup();
  state.wheel({ target: { parentElement: null, closest: () => null } });
  assert.equal(state.moves[0].top, 900);
});

test("About to Skills to Projects cannot be combined with Skills catalogue momentum", () => {
  const state = setup({ offsets: [0, 900, 1800, 2700, 3600, 4500] });
  state.window.scrollY = 900;
  state.wheel();
  assert.equal(state.moves[0].top, 1800, "About must land on Skills");
  state.moves[0].finish();
  state.advance(250);
  const catalogue = { ...state.target, overflowY: "auto", scrollHeight: 1200, clientHeight: 400, scrollTop: 0 };
  state.wheel({ target: catalogue });
  catalogue.scrollTop = 800;
  assert.equal(state.wheel({ target: catalogue }).defaultPrevented, true);
  assert.equal(state.moves.length, 1, "Skills remains selected when its inner scroll reaches the edge");
  state.advance(250);
  state.wheel({ target: catalogue });
  assert.equal(state.moves[1].top, 2700, "a new gesture advances exactly to Projects");
});
test("a swipe spent reading Skills cannot advance to Projects when the catalogue reaches its edge", () => {
  const state = setup({ offsets: [0, 900, 1800, 2700, 3600, 4500] });
  state.window.scrollY = 1800;
  const catalogue = { ...state.target, overflowY: "auto", scrollHeight: 1200, clientHeight: 400, scrollTop: 0 };
  state.listeners.get("touchstart")({ touches: [{ clientX: 100, clientY: 400 }] });
  const move = y => state.listeners.get("touchmove")({ target: catalogue, cancelable: true, touches: [{ clientX: 100, clientY: y }], preventDefault() {} });
  move(300);
  catalogue.scrollTop = 800;
  move(200);
  assert.equal(state.moves.length, 0);
  state.listeners.get("touchend")();
  state.listeners.get("touchstart")({ touches: [{ clientX: 100, clientY: 400 }] });
  move(200);
  assert.equal(state.moves[0].top, 2700);
});
