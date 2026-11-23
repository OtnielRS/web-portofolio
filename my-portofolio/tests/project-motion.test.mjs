import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const code = ts.transpileModule(fs.readFileSync("app/_components/use-project-motion.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;

function setup({ reduced = false, supported = true } = {}) {
  const exports = {};
  const refs = [];
  const animations = [];
  const listeners = new Map();
  const microtasks = [];
  let cursor = 0;
  let layout;
  let effect;
  let cleanup;
  const preference = { matches: reduced, addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: name => listeners.delete(name) };
  const computed = { opacity: ".73", transform: "matrix(1, 0, 0, 1, 0, 5)" };
  const node = supported ? { animate(keyframes, options) {
    const animation = { keyframes, options, onfinish: null, cancelled: false, cancel() { this.cancelled = true; }, finish() { this.onfinish?.(); } };
    animations.push(animation);
    return animation;
  } } : {};
  vm.runInNewContext(code, {
    exports,
    queueMicrotask: callback => microtasks.push(callback),
    window: { matchMedia: () => preference, getComputedStyle: () => computed },
    require: name => name === "react-dom" ? { flushSync: callback => callback() } : {
      useRef: initial => { const index = cursor++; return refs[index] ??= { current: initial }; },
      useLayoutEffect: callback => { layout = callback; },
      useEffect: callback => { effect = callback; },
    },
  });
  function render(key, size = 1) {
    cursor = 0;
    const result = exports.default(key, size);
    result.pageRef.current = node;
    layout();
    if (!cleanup) cleanup = effect();
    return result;
  }
  return { render, animations, computed, preference, listeners, flush: () => { while (microtasks.length) microtasks.shift()(); }, cleanup: () => cleanup() };
}

test("project changes finish their short exit before replacing content, using the latest rapid-click destination", () => {
  const state = setup();
  const commits = [];
  const page = state.render(0);
  page.transitionTo(2, () => commits.push(2));
  assert.equal(commits.length, 0);
  assert.equal(state.animations[0].options.duration, 180);
  page.transitionTo(4, () => commits.push(4));
  assert.equal(state.animations.length, 1);
  state.animations[0].finish();
  assert.deepEqual(commits, [4]);
  state.render(4);
  assert.equal(state.animations[0].cancelled, true);
  assert.equal(state.animations[1].options.duration, 720);
  assert.equal(state.animations[1].options.fill, "none");
  state.cleanup();
});

test("viewport regrouping settles pending destinations whether or not the first card index changes", () => {
  for (const scenario of [{ before: 1, after: 0, destination: 2 }, { before: 0, after: 0, destination: 1 }]) {
    const state = setup();
    const commits = [];
    state.render(scenario.before, 1).transitionTo(scenario.destination, () => commits.push(scenario.destination));
    state.render(scenario.after, 2);
    assert.equal(state.animations[0].cancelled, true);
    state.flush();
    assert.deepEqual(commits, [scenario.destination]);
    state.render(Math.floor(scenario.destination / 2) * 2, 2);
    state.cleanup();
  }
});

test("unmounting before a regrouped destination settles discards the queued update", () => {
  const state = setup();
  let committed = false;
  state.render(1, 1).transitionTo(2, () => { committed = true; });
  state.render(0, 2);
  state.cleanup();
  state.flush();
  assert.equal(committed, false);
});

test("interrupting an entrance starts the next exit from its actual current appearance", () => {
  const state = setup();
  let key = 0;
  state.render(0).transitionTo(2, () => { key = 2; });
  state.animations[0].finish();
  const page = state.render(key);
  const entrance = state.animations[1];
  page.transitionTo(4, () => {});
  assert.equal(entrance.cancelled, true);
  assert.equal(state.animations[2].keyframes[0].opacity, ".73");
  assert.equal(state.animations[2].keyframes[0].transform, state.computed.transform);
  state.cleanup();
  assert.equal(state.animations[2].cancelled, true);
  assert.equal(state.animations[2].onfinish, null);
  assert.equal(state.listeners.size, 0);
});

test("reduced motion and unavailable animation support commit immediately; enabling reduced motion settles pending content", () => {
  for (const options of [{ reduced: true }, { supported: false }]) {
    const state = setup(options);
    let committed = false;
    state.render(0).transitionTo(2, () => { committed = true; });
    assert.equal(committed, true);
    assert.equal(state.animations.length, 0);
    state.cleanup();
  }
  const state = setup();
  let committed = false;
  state.render(0).transitionTo(2, () => { committed = true; });
  state.preference.matches = true;
  state.listeners.get("change")();
  assert.equal(committed, true);
  assert.equal(state.animations[0].cancelled, true);
  state.cleanup();
});
