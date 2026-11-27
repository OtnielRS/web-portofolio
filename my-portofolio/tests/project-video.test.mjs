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
const videos = load("app/_features/work/project-videos.ts");

test("each project embeds its supplied YouTube video without tracking parameters", () => {
  for (const [art, id] of Object.entries({ bastion: "X9j7WtuHdNI", social: "gDlMq68r7Sg", store: "9rBs3WDwJ24", chess: "XaV3FRlHK3I", animal: "Wg--eS-X1QA" })) {
    const url = new URL(videos.projectVideoUrl(art));
    assert.equal(url.origin, "https://www.youtube-nocookie.com");
    assert.equal(url.pathname, `/embed/${id}`);
    assert.equal(url.searchParams.get("autoplay"), "1");
    assert.equal(url.searchParams.has("si"), false);
  }
  assert.equal(videos.projectVideoUrl("unknown"), undefined);
});

test("cover click loads an inline player; leaving the page stops playback", () => {
  let playing = false;
  let effect;
  let visibility;
  let intersection;
  const player = { src: undefined, removeAttribute: () => { player.src = undefined; } };
  const jsx = (type, props) => ({ type, props });
  let refs = 0;
  const document = { hidden: false, addEventListener: (_, listener) => { visibility = listener; }, removeEventListener: () => {} };
  const Preview = load("app/_features/work/project-preview.tsx", {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    react: {
      useState: () => [playing, value => { playing = value; }],
      useRef: () => ({ current: refs++ % 2 === 0 ? player : {} }),
      useEffect: callback => { effect = callback; },
    },
    "./project-videos": videos,
    "./project-art": { default: "ProjectArt" },
  }, { document, IntersectionObserver: class { constructor(callback) { intersection = callback; } observe() {} disconnect() {} } }).default;
  const render = () => Preview({ art: "chess", name: "Chess" });
  let view = render();
  assert.equal(effect(), undefined);
  assert.equal(player.src, undefined, "No YouTube request before click");
  view.props.children.props.children[1].props.onClick();
  view = render();
  const iframe = view.props.children.props.children[0];
  assert.equal(iframe.type, "iframe");
  assert.equal(iframe.props.title, "Chess video demo");
  assert.equal(iframe.props.allowFullScreen, true);
  assert.equal(iframe.props.referrerPolicy, "strict-origin-when-cross-origin");
  const cleanup = effect();
  assert.equal(player.src, videos.projectVideoUrl("chess"));
  intersection([{ isIntersecting: false }]);
  assert.equal(playing, false);
  playing = true;
  document.hidden = true;
  visibility();
  assert.equal(playing, false);
  cleanup();
  assert.equal(player.src, undefined, "Route cleanup stops the player");
});
