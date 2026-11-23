import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const compiled = ts.transpileModule(fs.readFileSync("app/_components/use-content-motion.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;

function setup({ reduced = false, supported = true, initialInView = false, animateSupported = true } = {}) {
  const exports = {};
  const observers = [];
  const listeners = new Map();
  const rootListeners = new Map();
  const animations = [];
  let effect;
  const mutations = [];
  const document = { activeElement: null };
  const preference = { matches: reduced, addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: name => listeners.delete(name) };
  function makeTarget(inView = false) {
    return {
      visible: true,
      dataset: Object.freeze({}),
      bounds: inView ? { top: 100, bottom: 400 } : { top: 1200, bottom: 1600 },
      getClientRects() { return this.visible ? [{}] : []; },
      getBoundingClientRect() { return this.bounds; },
      contains(node) { return node === this; },
      closest() { return this; },
      setAttribute() { throw new Error("React-owned attribute mutation"); },
      removeAttribute() { throw new Error("React-owned attribute mutation"); },
      ...(animateSupported ? { animate(keyframes, options) {
        const events = new Map();
        const animation = { target: this, keyframes, options, cancelled: false, addEventListener: (name, callback) => events.set(name, callback), cancel() { this.cancelled = true; }, finish: () => events.get("finish")?.() };
        animations.push(animation);
        return animation;
      } } : {}),
    };
  }
  const target = makeTarget(initialInView);
  const targets = [target];
  const root = { querySelectorAll: () => targets, contains: node => targets.includes(node), addEventListener: (name, callback) => rootListeners.set(name, callback), removeEventListener: name => rootListeners.delete(name) };
  class Observer {
    constructor(callback) { this.callback = callback; this.observed = new Set(); observers.push(this); }
    observe(element) { this.observed.add(element); }
    unobserve(element) { this.observed.delete(element); }
    disconnect() { this.disconnected = true; }
  }
  class Changes {
    constructor(callback) { this.callback = callback; mutations.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  }
  vm.runInNewContext(compiled, {
    exports, document,
    require: () => ({ useLayoutEffect: callback => { effect = callback; } }),
    window: { innerHeight: 800, matchMedia: () => preference },
    ...(supported ? { IntersectionObserver: Observer, MutationObserver: Changes } : {}),
  });
  exports.default({ current: root }, "/work");
  const cleanup = effect();
  const enter = (node = target) => { node.bounds = { top: 100, bottom: 400 }; observers[0].callback([{ target: node, isIntersecting: true }]); };
  const pending = (node = target) => animations.some(animation => animation.target === node && animation.options.duration === 1 && !animation.cancelled);
  return { target, targets, makeTarget, animations, pending, get reveals() { return animations.filter(animation => animation.options.duration === 1100); }, observer: observers[0], mutation: mutations[0], listeners, rootListeners, preference, document, cleanup, enter };
}

test("offscreen content waits for scroll entry and replays only after leaving the viewport completely", () => {
  const state = setup();
  assert.equal(state.pending(), true);
  assert.equal(state.reveals.length, 0);
  state.enter();
  assert.equal(state.reveals[0].options.duration, 1100);
  assert.equal(state.reveals[0].keyframes[0].opacity, 0);
  assert.equal(state.reveals[0].keyframes[0].transform, "translateY(18px)");
  assert.equal(state.reveals[0].options.fill, "none");
  state.reveals[0].finish();
  state.target.bounds = { top: -100, bottom: 300 };
  state.observer.callback([{ target: state.target, isIntersecting: true, intersectionRatio: .04 }]);
  state.enter();
  assert.equal(state.reveals.length, 1);
  state.target.bounds = { top: -500, bottom: -100 };
  state.observer.callback([{ target: state.target, isIntersecting: false }]);
  assert.equal(state.pending(), true);
  state.enter();
  assert.equal(state.reveals.length, 2);
  state.cleanup();
  assert.equal(state.reveals[1].cancelled, true);
  assert.equal(state.pending(), false);
  assert.equal(state.observer.disconnected, true);
  assert.equal(state.mutation.disconnected, true);
  assert.equal(state.rootListeners.size, 0);
});

test("content clipped by an inner scroll container reveals when that container scrolls it into view", () => {
  const state = setup({ initialInView: true });
  state.observer.callback([{ target: state.target, isIntersecting: false }]);
  assert.equal(state.pending(), true);
  state.enter();
  assert.equal(state.reveals.length, 1);
  state.observer.callback([{ target: state.target, isIntersecting: false }]);
  state.reveals[0].finish();
  assert.equal(state.pending(), true);
  state.enter();
  assert.equal(state.reveals.length, 2);
  state.cleanup();
});

test("initially visible content keeps its first-paint CSS entrance", () => {
  const state = setup({ initialInView: true });
  state.enter();
  assert.equal(state.pending(), false);
  assert.equal(state.reveals.length, 0);
  state.cleanup();
});

test("keyboard focus reveals content immediately and focused content is never hidden on scroll", () => {
  const state = setup();
  state.rootListeners.get("focusin")({ target: state.target });
  assert.equal(state.pending(), false);
  assert.equal(state.reveals.length, 0);
  state.document.activeElement = state.target;
  state.observer.callback([{ target: state.target, isIntersecting: false }]);
  assert.equal(state.pending(), false);
  state.cleanup();
});

test("reduced motion keeps content visible and settles active reveals immediately", () => {
  const state = setup({ reduced: true });
  assert.equal(state.pending(), false);
  state.preference.matches = false;
  state.listeners.get("change")();
  assert.equal(state.pending(), true);
  state.enter();
  state.preference.matches = true;
  state.listeners.get("change")();
  assert.equal(state.reveals[0].cancelled, true);
  assert.equal(state.pending(), false);
  state.cleanup();
  assert.equal(state.listeners.size, 0);
});

test("browsers without animation or observer support never hide content", () => {
  const fallback = setup({ supported: false });
  assert.equal(fallback.cleanup, undefined);
  assert.equal(fallback.target.dataset.contentReveal, undefined);
  const noAnimation = setup({ animateSupported: false });
  assert.equal(noAnimation.target.dataset.contentReveal, undefined);
  noAnimation.enter();
  assert.equal(noAnimation.animations.length, 0);
  noAnimation.cleanup();
});

test("dynamic content joins scroll reveals while hidden cached and removed content are handled safely", () => {
  const state = setup({ initialInView: true });
  const added = state.makeTarget();
  state.targets.push(added);
  state.mutation.callback();
  assert.equal(state.pending(added), true);
  added.visible = false;
  state.observer.callback([{ target: added, isIntersecting: true }]);
  assert.equal(state.reveals.length, 0);
  added.visible = true;
  state.enter(added);
  assert.equal(state.reveals.length, 1);
  state.targets.pop();
  state.mutation.callback();
  assert.equal(state.reveals[0].cancelled, true);
  assert.equal(state.pending(added), false);
  assert.equal(state.observer.observed.has(added), false);
  state.cleanup();
});

test("scroll reveal leaves server-rendered attributes unchanged throughout hydration and cleanup", () => {
  const state = setup();
  assert.deepEqual(Object.keys(state.target.dataset), []);
  assert.equal(state.animations[0].options.fill, "forwards");
  state.enter();
  assert.equal(state.animations[0].cancelled, true);
  state.reveals[0].finish();
  state.observer.callback([{ target: state.target, isIntersecting: false }]);
  assert.equal(state.pending(), true);
  state.preference.matches = true;
  state.listeners.get("change")();
  assert.equal(state.pending(), false);
  state.cleanup();
  assert.deepEqual(Object.keys(state.target.dataset), []);
});
