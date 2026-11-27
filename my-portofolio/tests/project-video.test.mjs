import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function load(file, dependencies = {}, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(code, { exports, require: name => dependencies[name], ...globals });
  return exports;
}
function nodes(root, type) {
  if (!root || typeof root !== "object") return [];
  if (Array.isArray(root)) return root.flatMap(child => nodes(child, type));
  return [...(root.type === type ? [root] : []), ...nodes(root.props?.children, type)];
}
function fixture(art = "chess", linkFallback = true) {
  let playing = false, effect, observer;
  const listeners = new Map();
  const player = { paused: 0, focus() { this.focused = true; }, pause() { this.paused++; } };
  const other = { paused: 0, pause() { this.paused++; } };
  const document = { visibilityState: "visible", querySelectorAll: () => [player, other], addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: name => listeners.delete(name) };
  class Observer {
    constructor(callback) { this.callback = callback; observer = { callback, observed: false, disconnected: false }; }
    observe() { observer.observed = true; }
    disconnect() { observer.disconnected = true; }
  }
  const jsx = (type, props) => ({ type, props });
  const component = load("app/_features/work/project-preview.tsx", {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    react: { useState: () => [playing, value => { playing = value; }], useRef: () => ({ current: player }), useEffect: callback => { effect = callback; } },
    "@/app/_components/arrow": { default: "Arrow" },
    "./project-art": { default: "ProjectArt" },
    "./project-videos": load("app/_features/work/project-videos.ts"),
  }, { document, IntersectionObserver: Observer }).default;
  return { render: () => component({ project: { art, name: "Test project", url: "https://example.com" }, compact: true, linkFallback }), runEffect: () => effect(), get observer() { return observer; }, listeners, document, player, other };
}

test("the cover starts playback inline only after activation, with native controls", () => {
  const state = fixture();
  let preview = state.render();
  assert.equal(nodes(preview, "video").length, 0);
  const poster = nodes(preview, "button")[0];
  assert.equal(poster.props["aria-label"], "Play Test project video");
  poster.props.onClick();
  preview = state.render();
  const video = nodes(preview, "video")[0];
  assert.equal(video.props.controls, true);
  assert.equal(video.props.autoPlay, true);
  assert.equal(video.props.playsInline, true);
  assert.equal(video.props.preload, "none");
  assert.equal(nodes(video, "source")[0].props.src, "/projects/videos/hacktiv-chess.mp4");
  assert.equal(nodes(preview, "button").length, 0);
});

test("playback pauses outside the viewport, in hidden tabs, and during route cleanup", () => {
  const state = fixture();
  nodes(state.render(), "button")[0].props.onClick();
  state.render();
  const cleanup = state.runEffect();
  assert.equal(state.player.focused, true);
  assert.equal(state.observer.observed, true);
  state.observer.callback([{ isIntersecting: false }]);
  assert.equal(state.player.paused, 1);
  state.document.visibilityState = "hidden";
  state.listeners.get("visibilitychange")();
  assert.equal(state.player.paused, 2);
  cleanup();
  assert.equal(state.player.paused, 3);
  assert.equal(state.observer.disconnected, true);
  assert.equal(state.listeners.size, 0);
});

test("starting a video pauses other project videos without pausing itself", () => {
  const state = fixture();
  nodes(state.render(), "button")[0].props.onClick();
  nodes(state.render(), "video")[0].props.onPlay({ currentTarget: state.player });
  assert.equal(state.player.paused, 0);
  assert.equal(state.other.paused, 1);
});

test("projects without supplied videos retain their screenshot and existing demo link", () => {
  const preview = fixture("unrecorded").render();
  assert.equal(nodes(preview, "a")[0].props.href, "https://example.com");
  assert.equal(nodes(preview, "video").length, 0);
  const detailPreview = fixture("unrecorded", false).render();
  assert.equal(detailPreview.type, "ProjectArt");
});

test("all five supplied videos are mapped to the matching project and exist locally", () => {
  const { projectVideos } = load("app/_features/work/project-videos.ts");
  assert.equal(projectVideos.bastion.src, "/projects/videos/bastionfall.mp4");
  assert.equal(projectVideos.social.src, "/projects/videos/tempat-gosip.mp4");
  assert.equal(projectVideos.store.src, "/projects/videos/alice-store.mp4");
  assert.equal(projectVideos.chess.src, "/projects/videos/hacktiv-chess.mp4");
  assert.equal(projectVideos.animal.src, "/projects/videos/animal-quiz.mp4");
  for (const video of Object.values(projectVideos)) {
    assert.ok(fs.statSync(`public${video.src}`).size > 0);
    assert.ok(fs.existsSync(`public${video.poster}`));
  }
});
