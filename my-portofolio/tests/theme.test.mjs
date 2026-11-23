import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function loadModule(file, globals, dependencies = {}) {
  const source = fs.readFileSync(file, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports, ...globals, require: name => dependencies[name] ?? {} });
  return exports;
}

const config = loadModule("app/_components/theme-config.ts", {});

test("saved preferences select the theme before hydration", () => {
  for (const systemDark of [false, true]) {
    for (const stored of ["dark", "light", null, "unknown"]) {
      const document = { documentElement: { dataset: {} } };
      vm.runInNewContext(config.themeBootstrap, {
        document, localStorage: { getItem: () => stored },
        window: { matchMedia: () => ({ matches: systemDark }) },
      });
      const preference = stored === "dark" || stored === "light" ? stored : "system";
      assert.equal(document.documentElement.dataset.themePreference, preference);
      assert.equal(document.documentElement.dataset.theme, preference === "system" ? (systemDark ? "dark" : "light") : preference);
    }
  }
});

test("blocked browser storage still follows the device theme before hydration", () => {
  const document = { documentElement: { dataset: {} } };
  vm.runInNewContext(config.themeBootstrap, {
    document, localStorage: { getItem: () => { throw new Error("blocked"); } },
    window: { matchMedia: () => ({ matches: true }) },
  });
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(document.documentElement.dataset.themePreference, "system");
});

test("toggle synchronizes the document, saved preference, and subscribers", () => {
  const document = { documentElement: { dataset: { theme: "light" } } };
  const saved = new Map();
  const events = [];
  const theme = loadModule("app/_components/use-theme.ts", {
    document, Event,
    localStorage: { setItem: (key, value) => saved.set(key, value) },
    window: { dispatchEvent: event => events.push(event.type) },
  }, { "./theme-config": config });
  theme.toggleTheme();
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(document.documentElement.dataset.themePreference, "dark");
  assert.equal(saved.get(config.THEME_STORAGE_KEY), "dark");
  assert.equal(events[0], "portfolio-theme-change");
  theme.toggleTheme();
  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(saved.get(config.THEME_STORAGE_KEY), "light");
});

test("a storage write error does not prevent the switch or notification", () => {
  const document = { documentElement: { dataset: { theme: "light" } } };
  let notifications = 0;
  const theme = loadModule("app/_components/use-theme.ts", {
    document, Event,
    localStorage: { setItem: () => { throw new Error("blocked"); } },
    window: { dispatchEvent: () => notifications++ },
  }, { "./theme-config": config });
  theme.toggleTheme();
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(notifications, 1);
});

function subscribeToDevice({ blocked = false } = {}) {
  const document = { documentElement: { dataset: { theme: "light", themePreference: "system" } } };
  const listeners = new Map();
  const mediaListeners = new Map();
  const media = {
    matches: false,
    addEventListener: (type, callback) => mediaListeners.set(type, callback),
    removeEventListener: type => mediaListeners.delete(type),
  };
  let cleanup;
  let notifications = 0;
  const window = {
    matchMedia: () => media,
    addEventListener: (type, callback) => listeners.set(type, callback),
    removeEventListener: type => listeners.delete(type),
    dispatchEvent: event => listeners.get(event.type)?.(event),
  };
  const theme = loadModule("app/_components/use-theme.ts", {
    document, window, Event,
    localStorage: { setItem: () => { if (blocked) throw new Error("blocked"); } },
  }, {
    "./theme-config": config,
    react: { useSyncExternalStore: (subscribe, snapshot) => { cleanup = subscribe(() => notifications++); return snapshot(); } },
  });
  theme.default();
  return { document, media, listeners, mediaListeners, theme, cleanup, notifications: () => notifications };
}

test("device theme changes update the page until a visitor manually chooses a theme", () => {
  const state = subscribeToDevice({ blocked: true });
  state.media.matches = true;
  state.mediaListeners.get("change")();
  assert.equal(state.document.documentElement.dataset.theme, "dark");
  state.theme.toggleTheme();
  assert.equal(state.document.documentElement.dataset.theme, "light");
  state.mediaListeners.get("change")();
  assert.equal(state.document.documentElement.dataset.theme, "light");
  assert.ok(state.notifications() >= 2);
  state.cleanup();
  assert.equal(state.listeners.size, 0);
  assert.equal(state.mediaListeners.size, 0);
});

test("cross-tab saved themes override the device; clearing storage resumes device tracking", () => {
  const state = subscribeToDevice();
  state.media.matches = true;
  state.listeners.get("storage")({ key: config.THEME_STORAGE_KEY, newValue: "light" });
  assert.equal(state.document.documentElement.dataset.theme, "light");
  state.listeners.get("storage")({ key: "unrelated", newValue: "dark" });
  assert.equal(state.document.documentElement.dataset.themePreference, "light");
  for (const event of [{ key: config.THEME_STORAGE_KEY, newValue: null }, { key: null, newValue: null }]) {
    state.listeners.get("storage")(event);
    assert.equal(state.document.documentElement.dataset.themePreference, "system");
    assert.equal(state.document.documentElement.dataset.theme, "dark");
  }
  state.cleanup();
});
